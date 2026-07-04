import { Suspense, useRef, useState } from "react"
import type { ReactNode } from "react"
import { motion } from "motion/react"
import { WindowFrame } from "@/components/macos"
import type { Size } from "./useWindowManager"

const MENUBAR_HEIGHT = 26
// Minimum pixels of the window that must stay on screen.
const VISIBLE_MARGIN = 80
const MIN_W = 300
const MIN_H = 160

export interface WindowInstance {
  id: string
  title: string
  icon: ReactNode
  width: number
  height?: number
  contentStyle?: React.CSSProperties
  content: ReactNode
}

interface DraggableWindowProps {
  win: WindowInstance
  pos: { x: number; y: number }
  size: Size
  zIndex: number
  active: boolean
  minimized: boolean
  onClose: (id: string) => void
  onFocus: (id: string) => void
  onMove: (id: string, pos: { x: number; y: number }) => void
  onResize: (id: string, size: Size) => void
  onMinimize: (id: string) => void
  onZoom: (id: string, current: Size | null) => void
  /** Was the size ever set explicitly (resize/zoom)? Used to restore natural height. */
  sized: boolean
}

// Period-correct Aqua resize grip: diagonal lines in the bottom-right corner.
function ResizeGrip(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        position: "absolute",
        right: 1,
        bottom: 1,
        width: 14,
        height: 14,
        cursor: "nwse-resize",
        touchAction: "none",
        zIndex: 5,
        ...props.style,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <g stroke="var(--gray-400)" strokeWidth="1">
          <line x1="12" y1="3" x2="3" y2="12" />
          <line x1="12" y1="7" x2="7" y2="12" />
          <line x1="12" y1="11" x2="11" y2="12" />
        </g>
      </svg>
    </div>
  )
}

export function DraggableWindow({
  win,
  pos,
  size,
  zIndex,
  active,
  minimized,
  onClose,
  onFocus,
  onMove,
  onResize,
  onMinimize,
  onZoom,
  sized,
}: DraggableWindowProps) {
  // Play a short exit animation, then actually remove the window.
  const [closing, setClosing] = useState(false)
  // While a pointer drag/resize is live, position/size must track it 1:1 —
  // the CSS transition is only for zoom/restore jumps.
  const [interacting, setInteracting] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{
    pointerId: number
    startX: number
    startY: number
    origin: { x: number; y: number }
  } | null>(null)
  const resize = useRef<{
    pointerId: number
    startX: number
    startY: number
    origin: { w: number; h: number }
  } | null>(null)

  // Live size before any explicit sizing, needed to restore after zoom.
  function measuredSize(): Size | null {
    if (sized) return size
    return null
  }

  function onTitleBarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Don't start a drag from the traffic-light buttons.
    if ((e.target as HTMLElement).closest("button")) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setInteracting(true)
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
      x: Math.min(Math.max(x, VISIBLE_MARGIN - size.w), window.innerWidth - VISIBLE_MARGIN),
      y: Math.min(Math.max(y, MENUBAR_HEIGHT), window.innerHeight - VISIBLE_MARGIN / 2),
    })
  }

  function onTitleBarPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId === e.pointerId) {
      drag.current = null
      setInteracting(false)
    }
  }

  function onGripPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    setInteracting(true)
    resize.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origin: {
        w: size.w,
        h: size.h ?? frameRef.current?.offsetHeight ?? MIN_H,
      },
    }
  }

  function onGripPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = resize.current
    if (!r || e.pointerId !== r.pointerId) return
    onResize(win.id, {
      w: Math.max(MIN_W, r.origin.w + (e.clientX - r.startX)),
      h: Math.max(MIN_H, r.origin.h + (e.clientY - r.startY)),
    })
  }

  function onGripPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    if (resize.current?.pointerId === e.pointerId) {
      resize.current = null
      setInteracting(false)
    }
  }

  return (
    <div
      className="absolute"
      style={{
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h ?? "auto",
        zIndex,
        pointerEvents: minimized ? "none" : "auto",
        transition: interacting
          ? "none"
          : "left 220ms var(--ease-standard), top 220ms var(--ease-standard), width 220ms var(--ease-standard), height 220ms var(--ease-standard)",
        animation: closing
          ? "hdd-window-close 140ms var(--ease-standard) forwards"
          : "hdd-window-open 190ms var(--ease-standard)",
      }}
      onPointerDown={() => onFocus(win.id)}
      onAnimationEnd={() => {
        if (closing) onClose(win.id)
      }}
    >
      {/* Minimize animation: shrink and fall toward the dock. */}
      <motion.div
        ref={frameRef}
        initial={false}
        animate={
          minimized
            ? {
                opacity: 0,
                scale: 0.08,
                y: window.innerHeight - pos.y - 40,
                x: window.innerWidth / 2 - pos.x - size.w / 2,
              }
            : { opacity: 1, scale: 1, y: 0, x: 0 }
        }
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: "relative", height: size.h ? "100%" : "auto" }}
      >
        <WindowFrame
          title={win.title}
          icon={win.icon}
          onClose={() => setClosing(true)}
          onMinimize={() => onMinimize(win.id)}
          onZoom={() => onZoom(win.id, measuredSize())}
          width="100%"
          active={active}
          style={{ height: size.h ? "100%" : undefined }}
          contentStyle={win.contentStyle}
          titleBarProps={{
            onPointerDown: onTitleBarPointerDown,
            onPointerMove: onTitleBarPointerMove,
            onPointerUp: onTitleBarPointerEnd,
            onPointerCancel: onTitleBarPointerEnd,
            onDoubleClick: () => onZoom(win.id, measuredSize()),
            style: { cursor: "move", touchAction: "none", userSelect: "none" },
          }}
        >
          {/* Lazy-loaded windows (Tuner, Chords) suspend while their chunk
              downloads; everything else renders through this untouched. */}
          <Suspense
            fallback={
              <div className="flex min-h-24 items-center justify-center text-body-sm text-secondary-ink">
                载入中…
              </div>
            }
          >
            {win.content}
          </Suspense>
        </WindowFrame>
        <ResizeGrip
          onPointerDown={onGripPointerDown}
          onPointerMove={onGripPointerMove}
          onPointerUp={onGripPointerEnd}
          onPointerCancel={onGripPointerEnd}
        />
      </motion.div>
    </div>
  )
}
