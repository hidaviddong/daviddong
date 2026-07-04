// Shared note math + guitar-pluck playback for Tuner.app and Chords.app.
// Synthesis is delegated to Tone.js (PluckSynth = Karplus-Strong).

import * as Tone from "tone"

export const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]

export const midiToFreq = (m: number) => 440 * 2 ** ((m - 69) / 12)
export const midiToName = (m: number) => `${NOTE_NAMES[m % 12]}${Math.floor(m / 12) - 1}`

// Browsers require a user gesture before audio can start; all our callers are
// click handlers, so this resolves immediately in practice.
async function ensureStarted() {
  if (Tone.getContext().state !== "running") await Tone.start()
}

// `when` is seconds from now, so chords can schedule staggered plucks.
// PluckSynth is monophonic, so each note gets its own short-lived instance.
export function playPluck(freq: number, when = 0, duration = 2) {
  void ensureStarted().then(() => {
    const synth = new Tone.PluckSynth({
      volume: -6,
      dampening: 4000,
      resonance: 0.97,
      release: duration,
    }).toDestination()
    synth.triggerAttack(freq, Tone.now() + when)
    setTimeout(() => synth.dispose(), (when + duration + 0.5) * 1000)
  })
}

// Strum a chord: pluck each note low → high with a slight stagger.
export function strumChord(midi: number[], when = 0) {
  midi.forEach((m, i) => playPluck(midiToFreq(m), when + i * 0.045, 2.2))
}
