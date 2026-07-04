import { useEffect, useState } from "react"
import { PitchDetector } from "pitchy"
import { Button, Select, Separator } from "@/components/macos"
import { NOTE_NAMES, midiToFreq, midiToName, playPluck } from "@/lib/music"

// Strings are listed low → high (6th string first).
const TUNINGS = [
  { id: "standard", label: "Standard (EADGBE)", midi: [40, 45, 50, 55, 59, 64] },
  { id: "drop-d", label: "Drop D (DADGBE)", midi: [38, 45, 50, 55, 59, 64] },
  { id: "dadgad", label: "DADGAD", midi: [38, 45, 50, 55, 57, 62] },
  { id: "open-g", label: "Open G (DGDGBD)", midi: [38, 43, 50, 55, 59, 62] },
  { id: "open-d", label: "Open D (DADF♯AD)", midi: [38, 45, 50, 54, 57, 62] },
  { id: "open-c", label: "Open C (CGCGCE)", midi: [36, 43, 48, 55, 60, 64] },
  { id: "half-down", label: "Half-Step Down (E♭)", midi: [39, 44, 49, 54, 58, 63] },
]

const CUSTOM_OPTION = { value: "custom", label: "Custom（自定义）" }
const IN_TUNE_CENTS = 5

// Pitch detection is handled by `pitchy` (McLeod Pitch Method).
// 4096 samples ≈ 85 ms at 48 kHz — enough to resolve a low drop-D (~73 Hz).
const FFT_SIZE = 4096
const MIN_CLARITY = 0.9
const MIN_FREQ = 50
const MAX_FREQ = 900

// Streams mic audio and reports a smoothed pitch. Holds the last reading for a
// short grace period so the needle doesn't flicker between plucks.
function useMicPitch(running: boolean) {
  const [freq, setFreq] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!running) {
      setFreq(null)
      setError(null)
      return
    }

    let cancelled = false
    let raf = 0
    let ctx: AudioContext | null = null
    let stream: MediaStream | null = null
    let smoothed: number | null = null
    let lastHeard = 0

    navigator.mediaDevices
      .getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        stream = s
        ctx = new AudioContext()
        const analyser = ctx.createAnalyser()
        analyser.fftSize = FFT_SIZE
        ctx.createMediaStreamSource(s).connect(analyser)
        const data = new Float32Array(analyser.fftSize)
        const detector = PitchDetector.forFloat32Array(analyser.fftSize)
        detector.minVolumeDecibels = -40

        const tick = () => {
          analyser.getFloatTimeDomainData(data)
          const [pitch, clarity] = detector.findPitch(data, ctx!.sampleRate)
          const f = clarity >= MIN_CLARITY && pitch >= MIN_FREQ && pitch <= MAX_FREQ ? pitch : null
          const now = performance.now()
          if (f) {
            // Reset smoothing on a jump to a different note (> ~1 semitone).
            smoothed = smoothed && Math.abs(1200 * Math.log2(f / smoothed)) < 100
              ? smoothed * 0.6 + f * 0.4
              : f
            lastHeard = now
            setFreq(smoothed)
          } else if (now - lastHeard > 800) {
            smoothed = null
            setFreq(null)
          }
          raf = requestAnimationFrame(tick)
        }
        tick()
      })
      .catch(() => {
        if (!cancelled) setError("无法访问麦克风，请检查浏览器权限。")
      })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      stream?.getTracks().forEach((t) => t.stop())
      ctx?.close()
    }
  }, [running])

  return { freq, error }
}

// ---- Gauge ----

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) }
}

function arcPath(cx: number, cy: number, r: number, fromDeg: number, toDeg: number) {
  const p1 = polar(cx, cy, r, fromDeg)
  const p2 = polar(cx, cy, r, toDeg)
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y}`
}

const CX = 130
const CY = 122
const centsToDeg = (cents: number) => (Math.max(-50, Math.min(50, cents)) / 50) * 45

function Gauge({ cents }: { cents: number | null }) {
  const silent = cents === null
  const angle = silent ? -45 : centsToDeg(cents)
  const inTune = !silent && Math.abs(cents) <= IN_TUNE_CENTS

  const ticks = []
  for (let v = -50; v <= 50; v += 5) {
    const major = v % 25 === 0
    const o = polar(CX, CY, 96, centsToDeg(v))
    const i = polar(CX, CY, major ? 82 : 88, centsToDeg(v))
    ticks.push(
      <line
        key={v}
        x1={i.x}
        y1={i.y}
        x2={o.x}
        y2={o.y}
        stroke={v === 0 ? "var(--text-primary)" : "var(--gray-400)"}
        strokeWidth={major ? 2 : 1}
      />,
    )
  }

  return (
    <svg viewBox="0 0 260 148" className="w-full" aria-hidden="true">
      {/* dial arcs */}
      <path d={arcPath(CX, CY, 100, -45, 45)} fill="none" stroke="var(--gray-300)" strokeWidth="2" />
      <path
        d={arcPath(CX, CY, 100, centsToDeg(-IN_TUNE_CENTS), centsToDeg(IN_TUNE_CENTS))}
        fill="none"
        stroke="#34c759"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {ticks}
      <text x={polar(CX, CY, 110, -45).x} y={polar(CX, CY, 110, -45).y} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">♭</text>
      <text x={polar(CX, CY, 110, 45).x} y={polar(CX, CY, 110, 45).y} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">♯</text>
      <text x={CX} y={CY - 106} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">0</text>

      {/* needle */}
      <g
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: `${CX}px ${CY}px`,
          transition: "transform 120ms var(--ease-standard)",
          opacity: silent ? 0.25 : 1,
        }}
      >
        <line
          x1={CX}
          y1={CY - 10}
          x2={CX}
          y2={CY - 92}
          stroke={inTune ? "#34c759" : "#ff3b30"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      <circle cx={CX} cy={CY} r="7" fill="var(--gray-700)" />
      <circle cx={CX} cy={CY} r="3" fill="var(--gray-400)" />
    </svg>
  )
}

// ---- Window ----

export function TunerWindow() {
  const [running, setRunning] = useState(false)
  const [presetId, setPresetId] = useState("standard")
  const [strings, setStrings] = useState(TUNINGS[0].midi)
  // Index into `strings`; null = auto-pick the nearest string.
  const [locked, setLocked] = useState<number | null>(null)
  const { freq, error } = useMicPitch(running)

  function selectPreset(id: string) {
    setPresetId(id)
    const t = TUNINGS.find((t) => t.id === id)
    if (t) setStrings(t.midi)
  }

  // Shifting a string by semitones turns the current tuning into a custom one.
  function shiftString(index: number, semitones: number) {
    playPluck(midiToFreq(strings[index] + semitones))
    setStrings((s) => s.map((m, i) => (i === index ? m + semitones : m)))
    setPresetId("custom")
  }

  let stringIndex: number | null = locked
  if (stringIndex === null && freq !== null) {
    let best = 0
    let bestDist = Infinity
    strings.forEach((m, i) => {
      const dist = Math.abs(Math.log2(freq / midiToFreq(m)))
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    stringIndex = best
  }

  const target = stringIndex !== null ? strings[stringIndex] : null
  const cents = freq !== null && target !== null ? 1200 * Math.log2(freq / midiToFreq(target)) : null
  const inTune = cents !== null && Math.abs(cents) <= IN_TUNE_CENTS

  const hint =
    cents === null
      ? running
        ? "弹一根弦…"
        : "点击「开始」并允许使用麦克风"
      : inTune
        ? "✓ 准了"
        : cents < 0
          ? `偏低 ${Math.abs(cents).toFixed(0)} 音分 — 调紧一点 ♯`
          : `偏高 ${cents.toFixed(0)} 音分 — 调松一点 ♭`

  return (
    <div className="flex w-full flex-col gap-3 font-body text-body-md text-primary-ink">
      <div className="flex items-center justify-between gap-2">
        <Select
          options={presetId === "custom" ? [...TUNINGS.map((t) => ({ value: t.id, label: t.label })), CUSTOM_OPTION] : TUNINGS.map((t) => ({ value: t.id, label: t.label }))}
          value={presetId}
          onChange={selectPreset}
        />
        <Button variant={running ? "default" : "primary"} onClick={() => setRunning((r) => !r)}>
          {running ? "停止" : "开始"}
        </Button>
      </div>

      {error && <p className="m-0 text-body-sm text-[#d70015]">{error}</p>}

      {/* dial panel */}
      <div
        className="rounded-aqua-md px-3 pt-3 pb-1"
        style={{ background: "var(--surface-inset)", boxShadow: "var(--bevel-field)" }}
      >
        <Gauge cents={cents} />
        <div className="flex flex-col items-center gap-0.5 pb-2 text-center">
          <div className="font-chrome text-[28px] font-bold leading-none" style={{ color: inTune ? "#34c759" : "var(--text-primary)" }}>
            {target !== null ? midiToName(target) : "—"}
          </div>
          <div className="font-mono2 text-body-xs text-secondary-ink">
            {freq !== null ? `${freq.toFixed(1)} Hz` : "· · ·"}
            {target !== null && ` / 目标 ${midiToFreq(target).toFixed(1)} Hz`}
          </div>
          <div className="text-body-sm" style={{ color: inTune ? "#34c759" : "var(--text-secondary)" }}>{hint}</div>
        </div>
      </div>

      {/* string pegs, low → high */}
      <div className="flex justify-center gap-1.5">
        {strings.map((m, i) => {
          const active = stringIndex === i && (locked !== null || freq !== null)
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                playPluck(midiToFreq(m))
                setLocked((l) => (l === i ? null : i))
              }}
              title={locked === i ? "点击恢复自动识别" : "点击试听并锁定这根弦"}
              className="flex h-11 w-11 flex-col items-center justify-center rounded-aqua-md font-chrome"
              style={{
                border: "none",
                cursor: "pointer",
                background: active ? "var(--accent-500)" : "var(--gray-200)",
                color: active ? "var(--text-on-accent)" : "var(--text-primary)",
                boxShadow: locked === i ? "var(--bevel-sunken)" : "var(--bevel-raised)",
              }}
            >
              <span className="text-body-md font-semibold leading-none">{NOTE_NAMES[m % 12]}</span>
              <span className="text-[9px] opacity-70">{Math.floor(m / 12) - 1}</span>
            </button>
          )
        })}
      </div>
      <p className="m-0 text-center text-body-xs text-secondary-ink">
        6 弦（低音）→ 1 弦（高音） · 点击可锁定单弦
      </p>

      {/* per-string custom tuning, only for a locked string */}
      {locked !== null && (
        <>
          <Separator />
          <div className="flex items-center justify-center gap-2 text-body-sm">
            <span className="text-secondary-ink">自定义第 {6 - locked} 弦：</span>
            <Button size="sm" onClick={() => shiftString(locked, -1)}>♭ 降半音</Button>
            <span className="min-w-[34px] text-center font-chrome font-semibold">{midiToName(strings[locked])}</span>
            <Button size="sm" onClick={() => shiftString(locked, 1)}>♯ 升半音</Button>
          </div>
        </>
      )}
    </div>
  )
}
