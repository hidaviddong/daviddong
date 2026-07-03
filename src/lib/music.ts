// Shared note math + Web Audio synthesis for Tuner.app and Chords.app.

export const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]

export const midiToFreq = (m: number) => 440 * 2 ** ((m - 69) / 12)
export const midiToName = (m: number) => `${NOTE_NAMES[m % 12]}${Math.floor(m / 12) - 1}`

// ---- Karplus-Strong plucked string ----

let toneCtx: AudioContext | null = null

function audioCtx(): AudioContext {
  toneCtx ??= new AudioContext()
  if (toneCtx.state === "suspended") toneCtx.resume()
  return toneCtx
}

// `when` is seconds from now, so chords can schedule staggered plucks.
export function playPluck(freq: number, when = 0, duration = 2) {
  const ctx = audioCtx()
  const sr = ctx.sampleRate
  const buf = ctx.createBuffer(1, Math.ceil(sr * duration), sr)
  const data = buf.getChannelData(0)
  const period = Math.round(sr / freq)
  for (let i = 0; i < period; i++) data[i] = Math.random() * 2 - 1
  // Two-point average feedback: the noise burst decays into a string-like tone.
  for (let i = period; i < data.length; i++) {
    data[i] = (data[i - period] + data[i - period + 1]) * 0.498
  }

  const src = ctx.createBufferSource()
  src.buffer = buf
  // The rounded period detunes slightly; playbackRate corrects it exactly.
  src.playbackRate.value = freq / (sr / period)
  const start = ctx.currentTime + when
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.35, start)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  src.connect(gain)
  gain.connect(ctx.destination)
  src.start(start)
}

// Strum a chord: pluck each note low → high with a slight stagger.
export function strumChord(midi: number[], when = 0) {
  midi.forEach((m, i) => playPluck(midiToFreq(m), when + i * 0.045, 2.2))
}
