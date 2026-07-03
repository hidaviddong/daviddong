import { useEffect, useState } from "react"

// Free, no-API-key random photo source (Unsplash-backed via Lorem Picsum).
// A per-load random seed keeps the wallpaper stable during a session.
function buildUrl(seed: string) {
  const w = Math.min(2560, Math.round(window.innerWidth * (window.devicePixelRatio || 1)))
  const h = Math.min(1600, Math.round(window.innerHeight * (window.devicePixelRatio || 1)))
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

function randomSeed() {
  return Math.random().toString(36).slice(2, 10)
}

export function useWallpaper() {
  const [seed] = useState(randomSeed)
  const [url, setUrl] = useState("")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    const next = buildUrl(seed)
    setLoaded(false)
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      setUrl(next)
      setLoaded(true)
    }
    // On failure keep the previous wallpaper (or the plain desktop color).
    img.onerror = () => {
      if (!cancelled) setLoaded(true)
    }
    img.src = next
    return () => {
      cancelled = true
    }
  }, [seed])

  return { url, loaded }
}
