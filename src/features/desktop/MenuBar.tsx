import { useState, useEffect } from "react"

export function MenuBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-x-0 top-0 z-[1000] flex h-[26px] select-none items-center gap-[18px] border-b border-black/10 bg-menubar px-[14px] font-chrome text-chrome-md text-primary-ink backdrop-blur-[20px]">
      <span className="text-[14px]" aria-hidden="true">
        ◆
      </span>
      <span className="font-bold">hidaviddong</span>
      {["File", "Edit", "View", "Window", "Help"].map((m) => (
        <span key={m} className="text-secondary-ink">
          {m}
        </span>
      ))}
      <span className="flex-1" />
      <span className="text-secondary-ink">
        {time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
      </span>
      <span>{time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
    </div>
  )
}
