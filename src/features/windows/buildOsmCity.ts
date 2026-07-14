import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import cityData from "./causeway-bay-buildings.json"

interface OsmBuilding {
  id: number
  footprint: [number, number][]
  height: number
  name: string | null
  type: string | null
  shop: boolean
}

interface OsmCityData {
  origin: { lat: number; lon: number }
  radius: number
  buildings: OsmBuilding[]
}

export interface Landmark {
  name: string
  position: THREE.Vector3
  height: number
}

export interface OsmCity {
  group: THREE.Group
  radius: number
  landmarks: Landmark[]
}

// Dusk-toned facade tints — Hong Kong high-rises read as glass/concrete
// towers with warm window-light rather than flat toy-block colour.
const PALETTE = [0x8a97a6, 0x93a0a6, 0x9aa19c, 0x8f96a3, 0xa39a90, 0x8c99a0]

function colorForBuilding(index: number, height: number): THREE.Color {
  const base = new THREE.Color(PALETTE[index % PALETTE.length])
  const hsl = { h: 0, s: 0, l: 0 }
  base.getHSL(hsl)
  const lightness = THREE.MathUtils.clamp(hsl.l - (height / 220) * 0.12, 0.28, hsl.l)
  return new THREE.Color().setHSL(hsl.h, hsl.s, lightness)
}

const BAY_WIDTH = 3.4 // metres per window bay — keeps window size consistent across every building
const FLOOR_HEIGHT = 3.2 // metres per storey

// A tileable window-grid facade, procedurally drawn: mostly dark dusk glass
// with a scatter of warm lit windows, like an occupied residential tower at
// dusk. Reused as both the colour map and (via its own bright pixels) the
// emissive map, so lit windows actually read as glowing against the dim sky.
function buildFacadeTexture(): THREE.Texture {
  const bays = 4
  const floors = 6
  const cell = 48
  const canvas = document.createElement("canvas")
  canvas.width = bays * cell
  canvas.height = floors * cell
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("2D canvas context unavailable")

  ctx.fillStyle = "#3a4048"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let fy = 0; fy < floors; fy++) {
    for (let fx = 0; fx < bays; fx++) {
      const x = fx * cell
      const y = fy * cell

      ctx.fillStyle = "#23272c"
      ctx.fillRect(x, y, cell, cell)

      const lit = Math.random() < 0.24
      ctx.fillStyle = lit
        ? `hsl(${32 + Math.random() * 14}, 78%, ${58 + Math.random() * 14}%)`
        : `hsl(${205 + Math.random() * 18}, ${16 + Math.random() * 12}%, ${16 + Math.random() * 8}%)`
      const pad = cell * 0.16
      ctx.fillRect(x + pad, y + pad, cell - pad * 2, cell - pad * 2.3)

      ctx.fillStyle = "rgba(10,12,14,0.55)"
      ctx.fillRect(x + pad, y + cell - pad * 1.3, cell - pad * 2, cell * 0.09)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.colorSpace = THREE.SRGBColorSpace
  // ExtrudeGeometry's default UV generator writes UVs in raw local units
  // (metres, since our footprints/heights already are), so repeat can be
  // set directly from real-world bay/floor size — every building tiles at
  // the same window scale regardless of footprint size.
  texture.repeat.set(1 / (bays * BAY_WIDTH), 1 / (floors * FLOOR_HEIGHT))
  return texture
}

const NEON_COLORS = [0xff5d73, 0xffb23e, 0x4fd9ff]

// Builds a drivable, stylised Causeway Bay out of real OSM building
// footprints + heights (extruded blocks with a window-lit facade texture)
// instead of the raw photogrammetry mesh, which is only usable up close as
// noisy geometry. Shop-tagged buildings get a glowing ground-floor podium.
export function buildOsmCity(): OsmCity {
  const data = cityData as OsmCityData

  const buildingGeoms: THREE.BufferGeometry[] = []
  const neonGeoms: THREE.BufferGeometry[][] = [[], [], []]
  const tankPositions: THREE.Vector3[] = []
  const landmarks: Landmark[] = []

  data.buildings.forEach((b, i) => {
    if (b.footprint.length < 3) return

    const shape = new THREE.Shape()
    b.footprint.forEach(([x, z], idx) => {
      if (idx === 0) shape.moveTo(x, z)
      else shape.lineTo(x, z)
    })
    shape.closePath()

    const podiumHeight = b.shop ? Math.min(4.5, b.height * 0.4) : 0

    const towerGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: b.height - podiumHeight,
      bevelEnabled: false,
    })
    // ExtrudeGeometry extrudes the XY shape along +Z; rotate so the
    // footprint lies flat on the ground (XZ) and height runs up +Y.
    towerGeometry.rotateX(-Math.PI / 2)
    if (podiumHeight > 0) towerGeometry.translate(0, podiumHeight, 0)

    const color = colorForBuilding(i, b.height)
    const count = towerGeometry.attributes.position.count
    const colors = new Float32Array(count * 3)
    for (let v = 0; v < count; v++) {
      colors[v * 3] = color.r
      colors[v * 3 + 1] = color.g
      colors[v * 3 + 2] = color.b
    }
    towerGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    buildingGeoms.push(towerGeometry)

    if (podiumHeight > 0) {
      const podiumGeometry = new THREE.ExtrudeGeometry(shape, { depth: podiumHeight, bevelEnabled: false })
      podiumGeometry.rotateX(-Math.PI / 2)
      neonGeoms[i % NEON_COLORS.length].push(podiumGeometry)
    }

    let cx = 0
    let cz = 0
    for (const [x, z] of b.footprint) {
      cx += x
      cz += z
    }
    cx /= b.footprint.length
    cz /= b.footprint.length

    if (b.height > 20) tankPositions.push(new THREE.Vector3(cx, b.height, cz))
    if (b.name) landmarks.push({ name: b.name, position: new THREE.Vector3(cx, b.height, cz), height: b.height })
  })

  const merged = mergeGeometries(buildingGeoms, false)
  merged.computeVertexNormals()
  buildingGeoms.forEach((g) => g.dispose())

  const facadeTexture = buildFacadeTexture()
  const buildingsMesh = new THREE.Mesh(
    merged,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      map: facadeTexture,
      emissiveMap: facadeTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.9,
      roughness: 0.8,
      metalness: 0.05,
    }),
  )
  buildingsMesh.name = "osm-buildings"

  const group = new THREE.Group()

  const groundSize = data.radius * 2.4
  const groundGeom = new THREE.PlaneGeometry(groundSize, groundSize)
  groundGeom.rotateX(-Math.PI / 2)
  const groundMesh = new THREE.Mesh(groundGeom, new THREE.MeshStandardMaterial({ color: 0x3c4248, roughness: 1 }))
  groundMesh.name = "ground"
  group.add(groundMesh)
  group.add(buildingsMesh)

  neonGeoms.forEach((geoms, colorIndex) => {
    if (geoms.length === 0) return
    const neonMerged = mergeGeometries(geoms, false)
    geoms.forEach((g) => g.dispose())
    const neonMesh = new THREE.Mesh(
      neonMerged,
      new THREE.MeshStandardMaterial({
        color: NEON_COLORS[colorIndex],
        emissive: NEON_COLORS[colorIndex],
        emissiveIntensity: 1.4,
        roughness: 0.4,
      }),
    )
    neonMesh.name = "neon-podium"
    group.add(neonMesh)
  })

  if (tankPositions.length > 0) {
    const tankGeom = new THREE.CylinderGeometry(1.1, 1.2, 2.2, 8)
    const tankMesh = new THREE.InstancedMesh(
      tankGeom,
      new THREE.MeshStandardMaterial({ color: 0x556066, roughness: 0.9 }),
      tankPositions.length,
    )
    const m = new THREE.Matrix4()
    tankPositions.forEach((pos, i) => {
      m.makeTranslation(pos.x + (Math.random() - 0.5) * 4, pos.y + 1.1, pos.z + (Math.random() - 0.5) * 4)
      tankMesh.setMatrixAt(i, m)
    })
    tankMesh.name = "roof-tanks"
    group.add(tankMesh)
  }

  return { group, radius: data.radius, landmarks }
}
