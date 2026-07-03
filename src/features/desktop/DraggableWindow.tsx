import { useRef, useState } from "react"
import type { ReactNode } from "react"
import { WindowFrame } from "@/components/macos"

const MENUBAR_HEIGHT = 26
// Minimum pixels of the window that must stay on screen.
const VISIBLE_MARGIN = 80

export interface WindowInstance {
  id: string
  title: string
  icon: ReactNode
  width: number
  content: ReactNode
}

interface DraggableWindowProps {
  win: WindowInstance
  pos: { x: number; y: number }
  zIndex: number
  active: boolean
  onClose: (id: string) => void
  onFocus: (id: string) => void
  onMove: (id: string, pos: { x: number; y: number }) => void
}

export function DraggableWindow({
  win,
  pos,
  zIndex,
  active,
  onClose,
  onFocus,
  onMove,
}: DraggableWindowProps) {
  // Play a short exit animation, then actually remove the window.
  const [closing, setClosing] = useState(false)
  const drag = useRef<{
    pointerId: number
    startX: number
    startY: number
    origin: { x: number; y: number }
  } | null>(null)

  function onTitleBarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Don't start a drag from the traffic-light buttons.
    if ((e.target as HTMLElement).closest("button")) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origin: pos,
    }
  }

  function onTitleBarPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || e.pointerId !== d.pointerId) return
    const x = d.origin.x + (e.clientX - d.startX)
    const y = d.origin.y + (e.clientY - d.startY)
    onMove(win.id, {
      x: Math.min(Math.max(x, VISIBLE_MARGIN - win.width), window.innerWidth - VISIBLE_MARGIN),
      y: Math.min(Math.max(y, MENUBAR_HEIGHT), window.innerHeight - VISIBLE_MARGIN / 2),
    })
  }

  function onTitleBarPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId === e.pointerId) drag.current = null
  }

  return (
    <div
      className="absolute"
      style={{
        left: pos.x,
        top: pos.y,
        zIndex,
        animation: closing
          ? "hdd-window-close 140ms var(--ease-standard) forwards"
          : "hdd-window-open 190ms var(--ease-standard)",
      }}
      onPointerDown={() => onFocus(win.id)}
      onAnimationEnd={() => {
        if (closing) onClose(win.id)
      }}
    >
      <WindowFrame
        title={win.title}
        icon={win.icon}
        onClose={() => setClosing(true)}
        width={win.width}
        active={active}
        titleBarProps={{
          onPointerDown: onTitleBarPointerDown,
          onPointerMove: onTitleBarPointerMove,
          onPointerUp: onTitleBarPointerEnd,
          onPointerCancel: onTitleBarPointerEnd,
          style: { cursor: "move", touchAction: "none", userSelect: "none" },
        }}
      >
        {win.content}
      </WindowFrame>
    </div>
  )
}
