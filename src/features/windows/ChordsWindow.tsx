import { useEffect, useRef, useState } from "react"
import { Button, Input, Select, Separator, Slider } from "@/components/macos"
import { findChord, type ChordMatch, type ChordPosition } from "@/lib/chords"
import { strumChord } from "@/lib/music"

interface SheetChord {
  name: string
  position: ChordPosition
}

interface SheetMeta {
  id: string
  name: string
}

const TOKEN_KEY = "chords:token"

// ---- Chord diagram (SVG) ----

const STRINGS = 6
const X0 = 30 // left edge of the grid
const Y0 = 32 // top edge of the grid (nut)
const SX = 16 // string spacing
const FY = 26 // fret spacing

function ChordDiagram({
  position,
  width,
  showFingers = false,
}: {
  position: ChordPosition
  width: number
  showFingers?: boolean
}) {
  const { frets, fingers, baseFret, barres } = position
  const fretCount = Math.max(4, ...frets)
  const height = Y0 + fretCount * FY + 6
  const stringX = (i: number) => X0 + i * SX
  const fretY = (f: number) => Y0 + f * FY // grid line below fret f
  const dotY = (f: number) => Y0 + (f - 0.5) * FY

  return (
    <svg viewBox={`0 0 ${X0 + (STRINGS - 1) * SX + 22} ${height}`} width={width} aria-hidden="true">
      {/* nut / base fret label */}
      {baseFret === 1 ? (
        <rect x={X0 - 1.5} y={Y0 - 3.5} width={(STRINGS - 1) * SX + 3} height={4} rx={1.5} fill="var(--gray-800)" />
      ) : (
        <text x={X0 - 7} y={Y0 + FY / 2 + 3.5} textAnchor="end" fontSize="10" fill="var(--text-secondary)">
          {baseFret}fr
        </text>
      )}

      {/* grid */}
      {Array.from({ length: STRINGS }, (_, i) => (
        <line key={`s${i}`} x1={stringX(i)} y1={Y0} x2={stringX(i)} y2={fretY(fretCount)} stroke="var(--gray-500)" strokeWidth="1" />
      ))}
      {Array.from({ length: fretCount + 1 }, (_, f) => (
        <line key={`f${f}`} x1={X0} y1={fretY(f)} x2={stringX(STRINGS - 1)} y2={fretY(f)} stroke="var(--gray-400)" strokeWidth="1" />
      ))}

      {/* muted / open markers above the nut */}
      {frets.map((f, i) =>
        f === -1 ? (
          <text key={`m${i}`} x={stringX(i)} y={Y0 - 9} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            ×
          </text>
        ) : f === 0 ? (
          <circle key={`m${i}`} cx={stringX(i)} cy={Y0 - 12} r="3.2" fill="none" stroke="var(--text-secondary)" strokeWidth="1.1" />
        ) : null,
      )}

      {/* barres */}
      {barres.map((b) => {
        const on = frets.map((f, i) => (f === b ? i : -1)).filter((i) => i >= 0)
        if (on.length < 2) return null
        const x1 = stringX(Math.min(...on))
        const x2 = stringX(Math.max(...on))
        return (
          <rect
            key={`b${b}`}
            x={x1 - 6.5}
            y={dotY(b) - 6.5}
            width={x2 - x1 + 13}
            height={13}
            rx={6.5}
            fill="var(--gray-800)"
          />
        )
      })}

      {/* fingered notes */}
      {frets.map((f, i) =>
        f > 0 ? (
          <g key={`d${i}`}>
            <circle cx={stringX(i)} cy={dotY(f)} r="6.5" fill="var(--gray-800)" />
            {showFingers && fingers[i] > 0 && (
              <text x={stringX(i)} y={dotY(f) + 3} textAnchor="middle" fontSize="8.5" fill="#ffffff">
                {fingers[i]}
              </text>
            )}
          </g>
        ) : null,
      )}
    </svg>
  )
}

// ---- API helpers ----

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, init)
  const data = (await res.json().catch(() => null)) as (T & { ok: boolean; error?: string }) | null
  if (!res.ok || !data?.ok) throw new Error(data?.error ?? `http_${res.status}`)
  return data
}

// ---- Window ----

export function ChordsWindow() {
  // chord lookup
  const [input, setInput] = useState("")
  const [match, setMatch] = useState<ChordMatch | null>(null)
  const [posIndex, setPosIndex] = useState(0)
  const [lookupError, setLookupError] = useState<string | null>(null)

  // current sheet
  const [sheetName, setSheetName] = useState("未命名图谱")
  const [sheetChords, setSheetChords] = useState<SheetChord[]>([])
  const [sheetId, setSheetId] = useState<string | null>(null)
  const [bpm, setBpm] = useState(90)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const playTimer = useRef<number | null>(null)

  // persistence
  const [savedSheets, setSavedSheets] = useState<SheetMeta[]>([])
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) ?? "")
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    api<{ sheets: SheetMeta[] }>("/api/sheets")
      .then((d) => setSavedSheets(d.sheets))
      .catch(() => {})
    return stopSheet
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function flash(msg: string) {
    setStatus(msg)
    window.setTimeout(() => setStatus((s) => (s === msg ? null : s)), 2500)
  }

  async function lookup() {
    if (!input.trim()) return
    const found = await findChord(input)
    if (!found) {
      setMatch(null)
      setLookupError(`没认出「${input}」。试试 C、Am、F#m7、Gsus4、Dmaj7、E7、C/G 这样的写法。`)
      return
    }
    setLookupError(null)
    setMatch(found)
    setPosIndex(0)
    strumChord(found.positions[0].midi)
  }

  function switchVoicing(delta: number) {
    if (!match) return
    const next = (posIndex + delta + match.positions.length) % match.positions.length
    setPosIndex(next)
    strumChord(match.positions[next].midi)
  }

  function addToSheet() {
    if (!match) return
    setSheetChords((s) => [...s, { name: match.name, position: match.positions[posIndex] }])
  }

  function removeChord(i: number) {
    stopSheet()
    setSheetChords((s) => s.filter((_, j) => j !== i))
  }

  function moveChord(i: number, delta: number) {
    setSheetChords((s) => {
      const j = i + delta
      if (j < 0 || j >= s.length) return s
      const next = [...s]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  function stopSheet() {
    if (playTimer.current) window.clearTimeout(playTimer.current)
    playTimer.current = null
    setPlayingIndex(null)
  }

  // Play the sheet: one strum per chord, two beats each.
  function playSheet() {
    stopSheet()
    const chords = sheetChords
    const stepMs = (60 / bpm) * 2 * 1000
    const step = (i: number) => {
      if (i >= chords.length) {
        stopSheet()
        return
      }
      setPlayingIndex(i)
      strumChord(chords[i].position.midi)
      playTimer.current = window.setTimeout(() => step(i + 1), stepMs)
    }
    step(0)
  }

  function newSheet() {
    stopSheet()
    setSheetId(null)
    setSheetName("未命名图谱")
    setSheetChords([])
  }

  async function loadSheet(id: string) {
    try {
      const { sheet } = await api<{ sheet: { id: string; name: string; chords: SheetChord[] } }>(`/api/sheets/${id}`)
      stopSheet()
      setSheetId(sheet.id)
      setSheetName(sheet.name)
      setSheetChords(sheet.chords)
    } catch {
      flash("加载失败")
    }
  }

  async function saveSheet() {
    const id = sheetId ?? `s${Date.now().toString(36)}`
    try {
      await api(`/api/sheets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: sheetName, chords: sheetChords }),
      })
      setSheetId(id)
      const { sheets } = await api<{ sheets: SheetMeta[] }>("/api/sheets")
      setSavedSheets(sheets)
      flash("已保存到云端 ✓")
    } catch (e) {
      flash(e instanceof Error && e.message === "unauthorized" ? "口令不对，保存被拒绝" : "保存失败")
    }
  }

  async function deleteSheet() {
    if (!sheetId) return
    try {
      await api(`/api/sheets/${sheetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setSavedSheets((s) => s.filter((x) => x.id !== sheetId))
      newSheet()
      flash("已删除")
    } catch (e) {
      flash(e instanceof Error && e.message === "unauthorized" ? "口令不对，删除被拒绝" : "删除失败")
    }
  }

  const pos = match?.positions[posIndex]

  return (
    <div className="flex w-full flex-col gap-3 font-body text-body-md text-primary-ink">
      {/* lookup */}
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookup()}
          placeholder="输入和弦名，如 Am7、F#m、Gsus4、C/G…"
        />
        <Button variant="primary" onClick={lookup}>
          生成
        </Button>
      </div>
      {lookupError && <p className="m-0 text-body-sm text-[#d70015]">{lookupError}</p>}

      {/* preview */}
      {match && pos && (
        <div
          className="flex items-center gap-3 rounded-aqua-md p-3"
          style={{ background: "var(--surface-inset)", boxShadow: "var(--bevel-field)" }}
        >
          <ChordDiagram position={pos} width={120} showFingers />
          <div className="flex flex-1 flex-col gap-2">
            <div className="font-chrome text-[26px] font-bold leading-none">{match.name}</div>
            <div className="flex items-center gap-1 text-body-sm text-secondary-ink">
              <Button size="sm" variant="ghost" onClick={() => switchVoicing(-1)}>
                ‹
              </Button>
              把位 {posIndex + 1}/{match.positions.length}
              <Button size="sm" variant="ghost" onClick={() => switchVoicing(1)}>
                ›
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => strumChord(pos.midi)}>
                ♪ 试听
              </Button>
              <Button size="sm" variant="primary" onClick={addToSheet}>
                ＋ 添加到图谱
              </Button>
            </div>
          </div>
        </div>
      )}

      <Separator />

      {/* sheet */}
      <div className="flex items-center gap-2">
        <Input value={sheetName} onChange={(e) => setSheetName(e.target.value)} style={{ fontWeight: 600 }} />
        <Button size="sm" onClick={playingIndex === null ? playSheet : stopSheet} disabled={sheetChords.length === 0}>
          {playingIndex === null ? "▶ 播放" : "■ 停止"}
        </Button>
      </div>

      <div className="flex items-center gap-2 text-body-sm text-secondary-ink">
        <span className="whitespace-nowrap">♩ = {bpm}</span>
        <Slider value={bpm} min={50} max={160} onChange={setBpm} />
        <span className="whitespace-nowrap">每个和弦 2 拍</span>
      </div>

      {sheetChords.length === 0 ? (
        <p className="m-0 py-3 text-center text-body-sm text-secondary-ink">
          图谱还是空的 —— 在上面生成一个和弦，然后「添加到图谱」。
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {sheetChords.map((c, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center rounded-aqua-md px-1 pb-0.5"
              style={{
                background: playingIndex === i ? "var(--accent-100, #d6e8fd)" : "var(--gray-100)",
                boxShadow: playingIndex === i ? "0 0 0 2px var(--accent-500)" : "var(--bevel-raised)",
              }}
            >
              <button
                type="button"
                onClick={() => strumChord(c.position.midi)}
                title="点击试听"
                className="flex cursor-pointer flex-col items-center border-none bg-transparent p-0"
              >
                <span className="pt-1 font-chrome text-body-sm font-semibold">{c.name}</span>
                <ChordDiagram position={c.position} width={68} />
              </button>
              <div className="flex gap-1">
                <button type="button" onClick={() => moveChord(i, -1)} className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-secondary-ink" title="左移">
                  ◂
                </button>
                <button type="button" onClick={() => removeChord(i)} className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-secondary-ink" title="移除">
                  ✕
                </button>
                <button type="button" onClick={() => moveChord(i, 1)} className="cursor-pointer border-none bg-transparent p-0 text-[10px] text-secondary-ink" title="右移">
                  ▸
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Separator />

      {/* persistence */}
      <div className="flex items-center gap-2">
        <Select
          options={savedSheets.map((s) => ({ value: s.id, label: s.name }))}
          value={sheetId ?? undefined}
          onChange={loadSheet}
          placeholder="打开云端图谱…"
        />
        <Button size="sm" onClick={newSheet}>
          新建
        </Button>
        <Button size="sm" variant="primary" onClick={saveSheet} disabled={sheetChords.length === 0 || !sheetName.trim()}>
          保存
        </Button>
        {sheetId && (
          <Button size="sm" variant="destructive" onClick={deleteSheet}>
            删除
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 text-body-sm">
        <span className="whitespace-nowrap text-secondary-ink">写入口令</span>
        <Input
          type="password"
          value={token}
          onChange={(e) => {
            setToken(e.target.value)
            localStorage.setItem(TOKEN_KEY, e.target.value)
          }}
          placeholder="保存 / 删除需要口令"
          style={{ maxWidth: 180 }}
        />
        {status && <span className="whitespace-nowrap text-secondary-ink">{status}</span>}
      </div>
    </div>
  )
}
