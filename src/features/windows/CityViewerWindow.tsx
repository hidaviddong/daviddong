import { useEffect, useState } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Spinner } from "@/components/macos"
import { fetchTileManifest, HKTileWorld, type GroundHit } from "./hkTileWorld"

const UP = new THREE.Vector3(0, 1, 0)

const FORWARD_KEYS = new Set(["KeyW", "ArrowUp"])
const BACK_KEYS = new Set(["KeyS", "ArrowDown"])
const LEFT_KEYS = new Set(["KeyA", "ArrowLeft"])
const RIGHT_KEYS = new Set(["KeyD", "ArrowRight"])
const HANDBRAKE_KEY = "Space"
const RESPAWN_KEY = "KeyR"
const BOUND_KEYS = new Set([
  ...FORWARD_KEYS,
  ...BACK_KEYS,
  ...LEFT_KEYS,
  ...RIGHT_KEYS,
  HANDBRAKE_KEY,
  RESPAWN_KEY,
])

const TILE_BASE_URL = "/models/hk-tiles/"
const DRACO_DECODER_PATH = "/draco/"
const KTX2_TRANSCODER_PATH = "/basis/"
const TAXI_URL = "/models/hk-taxi.glb"

// Daytime aerial-survey textures — a hazy Hong Kong noon. Fog doubles as the
// tile-streaming curtain: unloaded tiles sit past the fully fogged distance.
const HORIZON_COLOR = 0xc3d1dc
const ZENITH_COLOR = 0x87a5c4
const FOG_NEAR = 130
const FOG_FAR = 380

// Gradient sky dome — the flat background colour reads as a void; a zenith→
// horizon ramp sells the haze the fog implies. Rendered inside-out on a
// sphere that follows the camera, and skips tone mapping like the tiles so
// the horizon exactly matches the fog colour.
function buildSkyDome(): THREE.Mesh {
  const geo = new THREE.SphereGeometry(900, 24, 12)
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      zenith: { value: new THREE.Color(ZENITH_COLOR) },
      horizon: { value: new THREE.Color(HORIZON_COLOR) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        // Pin to the camera so the dome never gets driven out of.
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = (projectionMatrix * mv).xyww; // depth = far plane
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 zenith;
      uniform vec3 horizon;
      varying vec3 vDir;
      void main() {
        float h = clamp(normalize(vDir).y, 0.0, 1.0);
        // Haze hugs the horizon; sky clears up fast overhead.
        vec3 col = mix(horizon, zenith, pow(h, 0.55));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.renderOrder = -1
  mesh.frustumCulled = false
  return mesh
}

// Soft radial "contact shadow" blob that hugs the ground under the taxi.
// The photogrammetry tiles are unlit (MeshBasicMaterial) so they can't
// receive real shadow maps — this cheap decal is what keeps the car looking
// planted instead of floating.
function buildBlobShadow(carLength: number): THREE.Mesh {
  const size = 128
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, size * 0.05, size / 2, size / 2, size / 2)
    g.addColorStop(0, "rgba(0,0,0,0.42)")
    g.addColorStop(0.55, "rgba(0,0,0,0.25)")
    g.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  const tex = new THREE.CanvasTexture(canvas)
  const geo = new THREE.PlaneGeometry(carLength * 0.62, carLength * 1.18)
  geo.rotateX(-Math.PI / 2)
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.renderOrder = 1
  return mesh
}

function anyPressed(pressed: Set<string>, keys: Set<string>) {
  for (const key of pressed) if (keys.has(key)) return true
  return false
}

// Loads the taxi authored by scripts/build_hk_taxi.py. Any GLB whose wheel
// meshes are named WheelFL/FR/RL/RR (origins at wheel centres, car facing
// +Z, ground at y=0, real-world metres) can be dropped in as a replacement.
async function loadTaxi() {
  const gltf = await new GLTFLoader().loadAsync(TAXI_URL)
  const model = gltf.scene
  const wheels: THREE.Mesh[] = []
  const steerGroups: THREE.Group[] = []
  for (const name of ["WheelFL", "WheelFR", "WheelRL", "WheelRR"] as const) {
    const wheel = model.getObjectByName(name)
    if (!(wheel instanceof THREE.Mesh)) continue
    wheels.push(wheel)
    if (name === "WheelFL" || name === "WheelFR") {
      // Front wheels get a pivot at the wheel centre so rotation.y steers
      // while the wheel itself keeps spinning on rotation.x.
      const parent = wheel.parent
      if (!parent) continue
      const pivot = new THREE.Group()
      pivot.position.copy(wheel.position)
      parent.add(pivot)
      pivot.add(wheel)
      wheel.position.set(0, 0, 0)
      steerGroups.push(pivot)
    }
  }
  return { model, wheels, steerGroups }
}

// Scans outward from the sheet centre for flat, street-level ground — low
// (within a few metres of the sheet's lowest surface, so not a rooftop),
// near-horizontal, and with a flat neighbourhood (so not a roof edge or
// awning). Returns several spread-out spots so R can hop between them.
function findSpawnCandidates(world: HKTileWorld): THREE.Vector3[] {
  const candidates: THREE.Vector3[] = []
  const hit: GroundHit = { point: new THREE.Vector3(), normal: new THREE.Vector3() }
  const probe: GroundHit = { point: new THREE.Vector3(), normal: new THREE.Vector3() }
  const probeOffsets: Array<[number, number]> = [
    [2.5, 0],
    [-2.5, 0],
    [0, 2.5],
    [0, -2.5],
  ]

  for (let radius = 0; radius <= 300 && candidates.length < 16; radius += 7) {
    const steps = radius === 0 ? 1 : Math.max(10, Math.round((radius * Math.PI * 2) / 15))
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      if (!world.raycastDown(x, z, hit)) continue
      // Streets sit near their own tile's floor (this sheet climbs Caroline
      // Hill, so a sheet-wide threshold would reject the southern streets).
      if (hit.point.y > world.tileFloorY(x, z) + 12 || hit.normal.y < 0.92) continue

      let flat = true
      for (const [ox, oz] of probeOffsets) {
        if (
          !world.raycastDown(x + ox, z + oz, probe) ||
          Math.abs(probe.point.y - hit.point.y) > 1.1 ||
          probe.normal.y < 0.88
        ) {
          flat = false
          break
        }
      }
      if (!flat) continue

      const candidate = new THREE.Vector3(x, hit.point.y, z)
      // Keep spawn points spread out so respawning actually goes somewhere new.
      if (candidates.every((c) => c.distanceToSquared(candidate) > 25 * 25)) {
        candidates.push(candidate)
      }
    }
  }

  // Lowest first: on this terraced sheet the lowest flat spots are roads,
  // the higher ones tend to be podium roofs.
  candidates.sort((a, b) => a.y - b.y)
  if (candidates.length === 0) candidates.push(new THREE.Vector3(0, world.floorY + 0.5, 0))
  return candidates
}

interface DriveState {
  car: THREE.Group
  wheels: THREE.Mesh[]
  steerGroups: THREE.Group[]
  wheelRadius: number
  carLength: number
  heading: number
  speed: number
  groundY: number
  maxForwardSpeed: number
  maxReverseSpeed: number
  acceleration: number
  brakeDeceleration: number
  friction: number
  maxSteerRate: number
  maxClimb: number
}

function useCityScene(mount: HTMLDivElement | null) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [focused, setFocused] = useState(false)
  const [progress, setProgress] = useState({ ready: 0, wanted: 1 })

  useEffect(() => {
    if (!mount) return
    let cancelled = false
    setStatus("loading")
    setFocused(false)
    setProgress({ ready: 0, wanted: 1 })

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(HORIZON_COLOR, FOG_NEAR, FOG_FAR)

    const camera = new THREE.PerspectiveCamera(55, 1, 0.5, 1200)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // Filmic response for the lit taxi (paint rolls off instead of clipping);
    // tiles and sky opt out via toneMapped: false since they're photographs.
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const sky = buildSkyDome()
    scene.add(sky)

    // Tiles render unlit (photogrammetry has baked lighting); lights and the
    // studio environment below exist for the taxi alone — the env map is what
    // makes its paint and chrome read glossy.
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = envRT.texture
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xe8eef4, 0x8f959b, 0.7))
    // The sun matches the survey's baked light direction (high, slightly
    // south-west) and casts a tight shadow map that only the taxi occupies —
    // it re-anchors the car to the photographed world every frame.
    const sun = new THREE.DirectionalLight(0xfff1dd, 1.3)
    sun.position.set(250, 300, 150)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    sun.shadow.camera.near = 50
    sun.shadow.camera.far = 700
    sun.shadow.camera.left = -8
    sun.shadow.camera.right = 8
    sun.shadow.camera.top = 8
    sun.shadow.camera.bottom = -8
    sun.shadow.bias = -0.0004
    scene.add(sun)
    scene.add(sun.target)

    let frame = 0
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    // Keyboard capture is scoped to this window's mount element so driving
    // doesn't hijack WASD typed into other desktop windows.
    mount.tabIndex = 0
    mount.style.outline = "none"
    const pressed = new Set<string>()
    const focusMount = () => mount.focus()
    const handleFocus = () => setFocused(true)
    const handleBlur = () => {
      setFocused(false)
      pressed.clear()
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== mount) return
      if (BOUND_KEYS.has(e.code)) e.preventDefault()
      pressed.add(e.code)
    }
    const handleKeyUp = (e: KeyboardEvent) => pressed.delete(e.code)
    const handleWindowBlur = () => pressed.clear()

    mount.addEventListener("pointerdown", focusMount)
    mount.addEventListener("focus", handleFocus)
    mount.addEventListener("blur", handleBlur)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", handleWindowBlur)

    const carLength = 4.7 // Crown Comfort footprint, metres
    const car = new THREE.Group()
    car.visible = false
    scene.add(car)

    const blobShadow = buildBlobShadow(carLength)
    blobShadow.visible = false
    scene.add(blobShadow)

    const drive: DriveState = {
      car,
      wheels: [], // filled once the taxi GLB arrives
      steerGroups: [],
      wheelRadius: 0.31, // matches scripts/build_hk_taxi.py
      carLength,
      heading: 0,
      speed: 0,
      groundY: 0,
      maxForwardSpeed: 22,
      maxReverseSpeed: 8,
      acceleration: 14,
      brakeDeceleration: 20,
      friction: 10,
      maxSteerRate: Math.PI * 0.9,
      // Height jumps bigger than this (a building wall) act as an implicit
      // collision instead of a ramp; kerb-height bumps still climb.
      maxClimb: carLength * 0.5,
    }

    // Reused scratch objects so the drive loop doesn't allocate every frame.
    const groundHit: GroundHit = { point: new THREE.Vector3(), normal: new THREE.Vector3() }
    const forward = new THREE.Vector3()
    const groundNormal = new THREE.Vector3(0, 1, 0)
    const yawQuat = new THREE.Quaternion()
    const alignQuat = new THREE.Quaternion()
    const targetQuat = new THREE.Quaternion()
    const camOffset = new THREE.Vector3()
    const sunOffset = new THREE.Vector3(250, 300, 150).normalize().multiplyScalar(300)
    const desiredCamPos = new THREE.Vector3()
    const lookTarget = new THREE.Vector3()
    const camDir = new THREE.Vector3()

    let world: HKTileWorld | null = null
    let spawnCandidates: THREE.Vector3[] = []
    let spawnIndex = 0
    let spawned = false
    let respawnLatch = false
    let lastProgressKey = ""

    const placeCar = (spot: THREE.Vector3) => {
      car.position.copy(spot)
      drive.groundY = spot.y
      drive.speed = 0
      drive.heading = Math.PI / 2 + (spawnIndex * Math.PI) / 3
      groundNormal.copy(UP)
      car.visible = true
      // Snap the camera behind the car so respawns don't swoop across town.
      camOffset.set(Math.sin(drive.heading), 0, Math.cos(drive.heading))
      camera.position
        .copy(spot)
        .addScaledVector(camOffset, -carLength * 2.6)
        .add(new THREE.Vector3(0, carLength * 1.1, 0))
      camera.lookAt(spot)
    }

    Promise.all([fetchTileManifest(`${TILE_BASE_URL}manifest.json`), loadTaxi()])
      .then(([manifest, taxi]) => {
        // If unmounted, the taxi never rendered, so it holds no GPU
        // resources — safe to just drop it for GC.
        if (cancelled) return
        taxi.model.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            // Self-shadowing (roof onto bonnet, body onto wheels) is the only
            // real-shadow pass in the scene; the ground contact is the blob.
            obj.castShadow = true
            obj.receiveShadow = true
          }
        })
        car.add(taxi.model)
        drive.wheels = taxi.wheels
        drive.steerGroups = taxi.steerGroups
        world = new HKTileWorld(manifest, {
          baseUrl: TILE_BASE_URL,
          decoderPath: DRACO_DECODER_PATH,
          ktx2TranscoderPath: KTX2_TRANSCODER_PATH,
          renderer,
        })
        scene.add(world.group)
        world.update(0, 0)
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    const clock = new THREE.Clock()
    const tick = () => {
      frame = requestAnimationFrame(tick)
      const dt = Math.min(clock.getDelta(), 0.05)

      if (world) {
        world.update(car.position.x, car.position.z)

        if (!spawned) {
          const wanted = world.wantedCount(0, 0)
          const key = `${world.readyCount}/${wanted}`
          if (key !== lastProgressKey) {
            lastProgressKey = key
            setProgress({ ready: world.readyCount, wanted })
          }
          if (world.isGroundReadyAt(0, 0)) {
            spawnCandidates = findSpawnCandidates(world)
            placeCar(spawnCandidates[0])
            spawned = true
            setStatus("ready")
          }
        }
      }

      if (spawned && world) {
        const d = drive
        const throttleForward = anyPressed(pressed, FORWARD_KEYS)
        const throttleBack = anyPressed(pressed, BACK_KEYS)
        const steerInput =
          (anyPressed(pressed, LEFT_KEYS) ? 1 : 0) - (anyPressed(pressed, RIGHT_KEYS) ? 1 : 0)
        const handbrake = pressed.has(HANDBRAKE_KEY)

        if (pressed.has(RESPAWN_KEY)) {
          if (!respawnLatch && spawnCandidates.length > 0) {
            respawnLatch = true
            spawnIndex = (spawnIndex + 1) % spawnCandidates.length
            placeCar(spawnCandidates[spawnIndex])
          }
        } else {
          respawnLatch = false
        }

        if (throttleForward) d.speed += d.acceleration * dt
        else if (throttleBack) d.speed -= d.brakeDeceleration * dt
        else {
          const friction = handbrake ? 26 : d.friction
          if (d.speed > 0) d.speed = Math.max(0, d.speed - friction * dt)
          else if (d.speed < 0) d.speed = Math.min(0, d.speed + friction * dt)
        }
        d.speed = THREE.MathUtils.clamp(d.speed, -d.maxReverseSpeed, d.maxForwardSpeed)

        if (Math.abs(d.speed) > 0.001) {
          const steerFactor = d.speed / d.maxForwardSpeed
          const rate = d.maxSteerRate * (handbrake ? 1.8 : 1)
          d.heading += steerInput * rate * dt * steerFactor
        }

        forward.set(Math.sin(d.heading), 0, Math.cos(d.heading))
        const stepX = forward.x * d.speed * dt
        const stepZ = forward.z * d.speed * dt

        // Axis-separated collision: a blocked diagonal still slides along the
        // wall instead of dead-stopping — essential in narrow streets.
        const moves: Array<[number, number]> = [
          [car.position.x + stepX, car.position.z + stepZ],
          [car.position.x + stepX, car.position.z],
          [car.position.x, car.position.z + stepZ],
        ]
        let moved = false
        for (let i = 0; i < moves.length; i++) {
          const [nx, nz] = moves[i]
          // Cast from just above the car, below bridge decks, so flyovers
          // overhead don't read as walls.
          if (!world.raycastDown(nx, nz, groundHit, d.groundY + 4.5, 60)) continue
          if (Math.abs(groundHit.point.y - d.groundY) > d.maxClimb) continue
          car.position.x = nx
          car.position.z = nz
          d.groundY = groundHit.point.y
          // Blend towards up to keep noisy photogrammetry normals from
          // rattling the car.
          groundNormal.copy(groundHit.normal).lerp(UP, 0.4).normalize()
          if (i > 0) d.speed *= 0.25 ** dt // scraping the wall bleeds speed over ~1s
          moved = true
          break
        }
        if (!moved) d.speed *= -0.2 // head-on: soft bounce back
        if (world.clampToBounds(car.position)) d.speed *= 0.5

        car.position.y = THREE.MathUtils.damp(car.position.y, d.groundY, 8, dt)

        yawQuat.setFromAxisAngle(UP, d.heading)
        alignQuat.setFromUnitVectors(UP, groundNormal)
        targetQuat.copy(alignQuat).multiply(yawQuat)
        car.quaternion.slerp(targetQuat, 1 - 0.001 ** dt)

        const rollDelta = (d.speed * dt) / d.wheelRadius
        for (const wheel of d.wheels) wheel.rotation.x += rollDelta
        const steerAngle = steerInput * 0.5
        for (const group of d.steerGroups) group.rotation.y = steerAngle

        // Contact shadow rides the ground plane just under the car, and the
        // sun's tight shadow frustum tracks the car so the taxi never drives
        // out of its own shadow map.
        blobShadow.visible = true
        blobShadow.position.set(car.position.x, d.groundY + 0.04, car.position.z)
        blobShadow.quaternion.copy(car.quaternion)
        sun.target.position.copy(car.position)
        sun.position.copy(car.position).add(sunOffset)

        // Chase camera with speed-based FOV and building avoidance.
        lookTarget.copy(car.position).setY(car.position.y + carLength * 0.65)
        camOffset.set(0, carLength * 0.95, -carLength * 2.6).applyQuaternion(car.quaternion)
        desiredCamPos.copy(car.position).add(camOffset)
        const blocked = world.blockedDistance(lookTarget, desiredCamPos)
        if (blocked !== null) {
          camDir.copy(desiredCamPos).sub(lookTarget).normalize()
          desiredCamPos.copy(lookTarget).addScaledVector(camDir, Math.max(blocked * 0.85, 2.5))
        }
        camera.position.lerp(desiredCamPos, 1 - 0.0001 ** dt)
        camera.lookAt(lookTarget)

        const speedRatio = THREE.MathUtils.clamp(Math.abs(d.speed) / d.maxForwardSpeed, 0, 1)
        const targetFov = 55 + speedRatio * 11
        if (Math.abs(camera.fov - targetFov) > 0.05) {
          camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 4, dt)
          camera.updateProjectionMatrix()
        }
      }

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      mount.removeEventListener("pointerdown", focusMount)
      mount.removeEventListener("focus", handleFocus)
      mount.removeEventListener("blur", handleBlur)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", handleWindowBlur)
      world?.dispose()
      envRT.dispose()
      renderer.dispose()
      renderer.domElement.remove()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => {
            if ("map" in m && m.map instanceof THREE.Texture) m.map.dispose()
            m.dispose()
          })
        }
      })
    }
  }, [mount])

  return { status, focused, progress }
}

export function CityViewerWindow() {
  const [mount, setMount] = useState<HTMLDivElement | null>(null)
  const { status, focused, progress } = useCityScene(mount)

  return (
    <div ref={setMount} className="relative h-full w-full">
      {status !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--surface-inset)]">
          {status === "loading" ? (
            <>
              <Spinner size={28} />
              <span className="text-body-sm text-secondary-ink">
                正在加载铜锣湾街区… {progress.ready}/{progress.wanted}
              </span>
            </>
          ) : (
            <span className="text-body-sm text-[#d70015]">模型加载失败</span>
          )}
        </div>
      )}
      {status === "ready" && !focused && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
          <span className="rounded-full bg-black/60 px-3 py-1 text-body-sm text-white">
            点击进入 · WASD 驾驶 · Space 手刹 · R 换条街
          </span>
        </div>
      )}
    </div>
  )
}
