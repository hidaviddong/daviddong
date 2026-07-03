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
