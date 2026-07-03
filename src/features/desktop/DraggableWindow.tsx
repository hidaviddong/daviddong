import type { ReactNode } from "react"
import { WindowFrame } from "@/components/macos"

export interface WindowInstance {
  id: string
  title: string
  icon: string
  width: number
  render: () => ReactNode
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
  function onDragStart(e: React.MouseEvent) {
    onFocus(win.id)
    const startX = e.clientX
    const startY = e.clientY
    const origin = { ...pos }

    function onMouseMove(ev: MouseEvent) {
      onMove(win.id, {
        x: origin.x + (ev.clientX - startX),
        y: origin.y + (ev.clientY - startY),
      })
    }
    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  return (
    <div
      className="absolute"
      style={{ left: pos.x, top: pos.y, zIndex }}
      onMouseDown={() => onFocus(win.id)}
    >
      <div className="cursor-move" onMouseDown={onDragStart}>
        <WindowFrame
          title={win.title}
          icon={win.icon}
          onClose={() => onClose(win.id)}
          width={win.width}
          active={active}
        >
          {win.render()}
        </WindowFrame>
      </div>
    </div>
  )
}
