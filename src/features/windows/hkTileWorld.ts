import * as THREE from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js"
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh"

// Accelerated raycasts are what make per-frame ground/wall/camera queries
// against ~300K-triangle photogrammetry tiles affordable.
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

// Produced by scripts/hk-tiles/build-manifest.mjs. Coordinates are metres in
// three.js space (y up); the whole sheet sits ~36km from the HK1980 origin,
// hence the recentring below.
export interface TileManifest {
  min: number[]
  max: number[]
  tiles: { name: string; url: string; min: number[]; max: number[] }[]
}

export async function fetchTileManifest(url: string): Promise<TileManifest> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`)
  return res.json()
}

export interface GroundHit {
  point: THREE.Vector3
  normal: THREE.Vector3
}

type TileState = "empty" | "loading" | "building" | "ready" | "failed"

interface TileRuntime {
  url: string
  // Recentred world-space footprint.
  minX: number
  maxX: number
  minZ: number
  maxZ: number
  minY: number
  centerX: number
  centerZ: number
  state: TileState
  root: THREE.Object3D | null
  // Meshes waiting for a BVH; built one per frame to avoid a long hitch.
  pendingMeshes: THREE.Mesh[]
  meshes: THREE.Mesh[]
  failures: number
}

const RAY_TOP = 400 // metres above the tallest tower, for from-the-sky casts

export class HKTileWorld {
  readonly group = new THREE.Group()
  /** Lowest surface in the sheet (harbour/street level) in world metres. */
  readonly floorY: number
  readonly boundsMin: THREE.Vector2
  readonly boundsMax: THREE.Vector2

  private readonly tiles: TileRuntime[]
  private readonly loader: GLTFLoader
  private readonly draco: DRACOLoader
  private readonly ktx2: KTX2Loader
  private readonly anisotropy: number
  private readonly baseUrl: string
  private readonly loadRadius: number
  private readonly unloadRadius: number
  private readonly maxConcurrent: number
  private readonly raycastTargets: THREE.Mesh[] = []
  private readonly ray = new THREE.Raycaster()
  private readonly rayOrigin = new THREE.Vector3()
  private readonly rayDir = new THREE.Vector3()
  private inflight = 0
  private disposed = false

  constructor(
    manifest: TileManifest,
    opts: {
      baseUrl: string
      decoderPath: string
      /** Basis Universal transcoder path for the KTX2 GPU textures. */
      ktx2TranscoderPath: string
      /** Needed by KTX2Loader to pick a target GPU format (ASTC/BC7/…). */
      renderer: THREE.WebGLRenderer
      loadRadius?: number
      unloadRadius?: number
      maxConcurrent?: number
    },
  ) {
    this.baseUrl = opts.baseUrl
    this.loadRadius = opts.loadRadius ?? 240
    this.unloadRadius = opts.unloadRadius ?? 340
    this.maxConcurrent = opts.maxConcurrent ?? 3

    // Recentre the sheet so gameplay happens near the origin instead of at
    // the raw grid offsets (~36km out), which float32 handles poorly.
    const cx = (manifest.min[0] + manifest.max[0]) / 2
    const cz = (manifest.min[2] + manifest.max[2]) / 2
    this.group.position.set(-cx, 0, -cz)
    this.floorY = manifest.min[1]
    this.boundsMin = new THREE.Vector2(manifest.min[0] - cx, manifest.min[2] - cz)
    this.boundsMax = new THREE.Vector2(manifest.max[0] - cx, manifest.max[2] - cz)

    this.tiles = manifest.tiles.map((t) => ({
      url: t.url,
      minX: t.min[0] - cx,
      maxX: t.max[0] - cx,
      minZ: t.min[2] - cz,
      maxZ: t.max[2] - cz,
      minY: t.min[1],
      centerX: (t.min[0] + t.max[0]) / 2 - cx,
      centerZ: (t.min[2] + t.max[2]) / 2 - cz,
      state: "empty" as TileState,
      root: null,
      pendingMeshes: [],
      meshes: [],
      failures: 0,
    }))

    this.draco = new DRACOLoader()
    this.draco.setDecoderPath(opts.decoderPath)
    this.ktx2 = new KTX2Loader()
    this.ktx2.setTranscoderPath(opts.ktx2TranscoderPath)
    this.ktx2.detectSupport(opts.renderer)
    // Sharp facades at grazing angles — street-level driving looks along
    // walls and roads, exactly where isotropic mip filtering smears worst.
    this.anisotropy = Math.min(8, opts.renderer.capabilities.getMaxAnisotropy())
    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(this.draco)
    this.loader.setKTX2Loader(this.ktx2)
    this.ray.firstHitOnly = true
  }

  get readyCount(): number {
    return this.tiles.filter((t) => t.state === "ready").length
  }

  get totalCount(): number {
    return this.tiles.length
  }

  /** Tiles currently wanted around (x, z) — the denominator for loading UI. */
  wantedCount(x: number, z: number): number {
    return this.tiles.filter((t) => Math.hypot(t.centerX - x, t.centerZ - z) < this.loadRadius).length
  }

  isGroundReadyAt(x: number, z: number): boolean {
    const t = this.tileAt(x, z)
    return t !== undefined && t.state === "ready"
  }

  /**
   * Lowest surface of the tile under (x, z) — a much tighter "street level"
   * reference than the sheet-wide floor on this hilly sheet.
   */
  tileFloorY(x: number, z: number): number {
    return this.tileAt(x, z)?.minY ?? this.floorY
  }

  /**
   * Streams tiles around the focus point: kicks off nearest-first loads,
   * unloads far tiles, and builds at most one BVH per call so physics
   * readiness never stalls a frame for long.
   */
  update(x: number, z: number): void {
    if (this.disposed) return

    this.buildOnePendingBVH()

    const wanted: TileRuntime[] = []
    for (const t of this.tiles) {
      const dist = Math.hypot(t.centerX - x, t.centerZ - z)
      if (t.state === "empty" && dist < this.loadRadius && t.failures < 3) {
        wanted.push(t)
      } else if ((t.state === "ready" || t.state === "building") && dist > this.unloadRadius) {
        this.unloadTile(t)
      }
    }

    wanted.sort(
      (a, b) => Math.hypot(a.centerX - x, a.centerZ - z) - Math.hypot(b.centerX - x, b.centerZ - z),
    )
    for (const t of wanted) {
      if (this.inflight >= this.maxConcurrent) break
      this.loadTile(t)
    }
  }

  /** Casts straight down and reports the first surface under (x, z). */
  raycastDown(x: number, z: number, out: GroundHit, fromY = RAY_TOP, maxDist = RAY_TOP * 2): boolean {
    this.ray.set(this.rayOrigin.set(x, fromY, z), HKTileWorld.DOWN)
    this.ray.far = maxDist
    const hits = this.ray.intersectObjects(this.raycastTargets, false)
    if (hits.length === 0) return false
    const hit = hits[0]
    out.point.copy(hit.point)
    if (hit.face) {
      out.normal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld).normalize()
    } else {
      out.normal.set(0, 1, 0)
    }
    return true
  }

  /** Distance from `from` towards `to` at which geometry blocks the segment, or null. */
  blockedDistance(from: THREE.Vector3, to: THREE.Vector3): number | null {
    const len = this.rayDir.copy(to).sub(from).length()
    if (len < 1e-4) return null
    this.rayDir.divideScalar(len)
    this.ray.set(from, this.rayDir)
    this.ray.far = len
    const hits = this.ray.intersectObjects(this.raycastTargets, false)
    return hits.length > 0 ? hits[0].distance : null
  }

  /** Keeps a position inside the sheet; returns true if it had to clamp. */
  clampToBounds(pos: THREE.Vector3, margin = 8): boolean {
    const cx = THREE.MathUtils.clamp(pos.x, this.boundsMin.x + margin, this.boundsMax.x - margin)
    const cz = THREE.MathUtils.clamp(pos.z, this.boundsMin.y + margin, this.boundsMax.y - margin)
    const clamped = cx !== pos.x || cz !== pos.z
    pos.x = cx
    pos.z = cz
    return clamped
  }

  dispose(): void {
    this.disposed = true
    for (const t of this.tiles) {
      if (t.state === "ready" || t.state === "building") this.unloadTile(t)
      t.state = "failed" // block any in-flight onLoad from re-adding
    }
    this.draco.dispose()
    this.ktx2.dispose()
  }

  private static readonly DOWN = new THREE.Vector3(0, -1, 0)

  private tileAt(x: number, z: number): TileRuntime | undefined {
    return this.tiles.find((t) => x >= t.minX && x <= t.maxX && z >= t.minZ && z <= t.maxZ)
  }

  private loadTile(t: TileRuntime): void {
    t.state = "loading"
    this.inflight++
    this.loader.load(
      this.baseUrl + t.url,
      (gltf) => {
        this.inflight--
        if (this.disposed || t.state !== "loading") {
          disposeSubtree(gltf.scene)
          return
        }
        gltf.scene.traverse((obj) => {
          // Compose the loader-supplied local transform once, then freeze —
          // tiles never move, so skip per-frame matrix work.
          obj.updateMatrix()
          obj.matrixAutoUpdate = false
          if (obj instanceof THREE.Mesh) {
            obj.material = toUnlit(obj.material, this.anisotropy)
            t.pendingMeshes.push(obj)
          }
        })
        t.root = gltf.scene
        this.group.add(gltf.scene)
        this.group.updateMatrixWorld(true)
        t.state = "building"
      },
      undefined,
      () => {
        this.inflight--
        if (this.disposed) return
        t.failures++
        t.state = "empty"
      },
    )
  }

  private buildOnePendingBVH(): void {
    const t = this.tiles.find((t) => t.state === "building")
    if (!t) return
    const mesh = t.pendingMeshes.pop()
    if (mesh) {
      mesh.geometry.computeBoundsTree()
      t.meshes.push(mesh)
      this.raycastTargets.push(mesh)
    }
    if (t.pendingMeshes.length === 0) t.state = "ready"
  }

  private unloadTile(t: TileRuntime): void {
    if (t.root) {
      this.group.remove(t.root)
      disposeSubtree(t.root)
    }
    for (const mesh of t.meshes) {
      const i = this.raycastTargets.indexOf(mesh)
      if (i !== -1) this.raycastTargets.splice(i, 1)
    }
    t.root = null
    t.pendingMeshes = []
    t.meshes = []
    t.state = "empty"
  }
}

// Photogrammetry has lighting baked into its textures, so unlit rendering is
// both correct and the cheapest possible material.
function toUnlit(material: THREE.Material | THREE.Material[], anisotropy: number): THREE.MeshBasicMaterial {
  const src = Array.isArray(material) ? material[0] : material
  const map = src instanceof THREE.MeshStandardMaterial ? src.map : null
  if (map) map.anisotropy = anisotropy
  // DoubleSided like the source data — photogrammetry has occasional flipped
  // faces, and it keeps walls visible when the camera gets pushed inside one.
  // toneMapped: false — the aerial survey is already a photograph; running it
  // through ACES would wash out the baked-in daylight.
  const basic = new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide, toneMapped: false })
  // Dispose the PBR material but keep its texture — the new material owns it.
  if (src instanceof THREE.MeshStandardMaterial) src.map = null
  ;(Array.isArray(material) ? material : [material]).forEach((m) => m.dispose())
  return basic
}

function disposeSubtree(root: THREE.Object3D): void {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.disposeBoundsTree()
      obj.geometry.dispose()
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      for (const m of mats) {
        if ("map" in m && m.map instanceof THREE.Texture) m.map.dispose()
        m.dispose()
      }
    }
  })
}
