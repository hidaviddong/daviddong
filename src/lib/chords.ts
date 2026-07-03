// Chord-name lookup backed by @tombatossals/chords-db (2000+ guitar voicings).
// The database is ~1 MB of JSON, so it's loaded lazily on first lookup.

export interface ChordPosition {
  frets: number[] // low E → high e; -1 = muted, 0 = open, else fret relative to baseFret
  fingers: number[]
  baseFret: number
  barres: number[]
  midi: number[]
}

export interface ChordMatch {
  name: string // normalized display name, e.g. "C#m7"
  positions: ChordPosition[]
}

interface DbChord {
  key: string
  suffix: string
  positions: ChordPosition[]
}

// JSON object keys used by chords-db for each root (covers enharmonics).
const DB_KEYS: Record<string, string> = {
  C: "C", "C#": "Csharp", Db: "Csharp", D: "D", "D#": "Eb", Eb: "Eb", E: "E", F: "F",
  "F#": "Fsharp", Gb: "Fsharp", G: "G", "G#": "Ab", Ab: "Ab", A: "A", "A#": "Bb", Bb: "Bb", B: "B",
}

// Common ways people write chord qualities → chords-db suffix names.
const SUFFIX_ALIASES: Record<string, string> = {
  "": "major", maj: "major", M: "major",
  m: "minor", min: "minor", "-": "minor",
  "△": "maj7", "Δ": "maj7", "Δ7": "maj7", M7: "maj7", ma7: "maj7", maj7: "maj7",
  M9: "maj9", maj9: "maj9",
  m7: "m7", "-7": "m7", min7: "m7",
  mM7: "mmaj7", mmaj7: "mmaj7", minmaj7: "mmaj7", "m(maj7)": "mmaj7",
  "+": "aug", aug: "aug", "7+": "aug7", "+7": "aug7",
  "°": "dim", o: "dim", dim: "dim", "°7": "dim7", o7: "dim7", dim7: "dim7",
  "ø": "m7b5", "ø7": "m7b5", "m7-5": "m7b5", m7b5: "m7b5",
  sus: "sus4", sus4: "sus4", sus2: "sus2",
  "7sus": "7sus4", "7sus4": "7sus4",
  "2": "add9", add2: "add9", add9: "add9", madd2: "madd9", madd9: "madd9",
  "6/9": "69", "m6/9": "m69",
}

let dbPromise: Promise<Record<string, DbChord[]>> | null = null

function loadDb() {
  dbPromise ??= import("@tombatossals/chords-db/lib/guitar.json").then(
    (m) => (m.default as { chords: Record<string, DbChord[]> }).chords,
  )
  return dbPromise
}

// Parse e.g. "c#m7" → { root: "C#", rest: "m7" }. Accepts ♯/♭ and lowercase.
function parseName(input: string): { root: string; rest: string } | null {
  const m = input.trim().match(/^([A-Ga-g])([#♯b♭]?)(.*)$/)
  if (!m) return null
  const acc = m[2] === "♯" ? "#" : m[2] === "♭" ? "b" : m[2]
  return { root: m[1].toUpperCase() + acc, rest: m[3].trim() }
}

export async function findChord(input: string): Promise<ChordMatch | null> {
  const parsed = parseName(input)
  if (!parsed) return null
  const dbKey = DB_KEYS[parsed.root]
  if (!dbKey) return null

  const chords = (await loadDb())[dbKey]
  const rest = parsed.rest

  // Exact db suffix first (covers "7", "9", "13", "add9", slash chords "/G",
  // "m/B"…), then the alias table, then a case-insensitive alias match.
  const suffix =
    chords.find((c) => c.suffix === rest)?.suffix ??
    SUFFIX_ALIASES[rest] ??
    SUFFIX_ALIASES[rest.toLowerCase()]
  const chord = suffix ? chords.find((c) => c.suffix === suffix) : undefined
  if (!chord) return null

  const display =
    chord.suffix === "major" ? chord.key : chord.suffix === "minor" ? `${chord.key}m` : chord.key + chord.suffix
  return { name: display, positions: chord.positions }
}

// ---- Reverse lookup: pressed notes → chord name ----

const PC_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

// Pitch-class formulas above the root. Ordered most-specific first so when
// several roots fit (C6 vs Am7), richer/lower-scored names rank by this order.
// The trailing 3-note entries are common "shell" voicings with the 5th omitted.
const FORMULAS: Array<[string, number[]]> = [
  ["maj9", [0, 2, 4, 7, 11]],
  ["9", [0, 2, 4, 7, 10]],
  ["m9", [0, 2, 3, 7, 10]],
  ["maj7", [0, 4, 7, 11]],
  ["7", [0, 4, 7, 10]],
  ["m7", [0, 3, 7, 10]],
  ["mmaj7", [0, 3, 7, 11]],
  ["dim7", [0, 3, 6, 9]],
  ["m7b5", [0, 3, 6, 10]],
  ["6", [0, 4, 7, 9]],
  ["m6", [0, 3, 7, 9]],
  ["add9", [0, 2, 4, 7]],
  ["madd9", [0, 2, 3, 7]],
  ["7sus4", [0, 5, 7, 10]],
  ["", [0, 4, 7]],
  ["m", [0, 3, 7]],
  ["dim", [0, 3, 6]],
  ["aug", [0, 4, 8]],
  ["sus2", [0, 2, 7]],
  ["sus4", [0, 5, 7]],
  ["maj7", [0, 4, 11]],
  ["7", [0, 4, 10]],
  ["m7", [0, 3, 10]],
  ["5", [0, 7]],
]

// Name every chord the pressed notes spell exactly, best guess first
// (roots in the bass beat slash-chord readings).
export function identifyChord(midi: number[]): string[] {
  if (midi.length < 2) return []
  const bass = Math.min(...midi) % 12
  const pcs = [...new Set(midi.map((m) => m % 12))]

  const out: Array<{ name: string; score: number }> = []
  for (const root of pcs) {
    const rel = new Set(pcs.map((p) => (p - root + 12) % 12))
    const fi = FORMULAS.findIndex(([, f]) => f.length === rel.size && f.every((x) => rel.has(x)))
    if (fi === -1) continue
    const name = PC_NAMES[root] + FORMULAS[fi][0] + (root === bass ? "" : `/${PC_NAMES[bass]}`)
    out.push({ name, score: (root === bass ? 0 : 100) + fi })
  }
  out.sort((a, b) => a.score - b.score)
  return [...new Set(out.map((o) => o.name))]
}
