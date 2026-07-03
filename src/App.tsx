import { useState, useEffect, useRef } from "react"

import { WindowFrame, Button, Input, Textarea, Label, Badge, Separator, Table } from "@/components/macos"

/* ============================================================
 * Window content components
 * ============================================================ */

function AboutWindow() {
  return (
    <div
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body-md)",
        color: "var(--text-primary)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: 340,
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            width: 48,
            height: 48,
            background: "var(--gray-200)",
            boxShadow: "var(--bevel-raised)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-chrome)",
            fontSize: 22,
            borderRadius: "var(--radius-md)",
          }}
        >
          D
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-chrome)", fontSize: "var(--text-chrome-md)" }}>
            hidaviddong
          </div>
          <Badge tone="terminal">est. 1999</Badge>
        </div>
      </div>
      <Separator />
      <p style={{ margin: 0, lineHeight: "var(--leading-normal)" }}>
        Software engineer, born in '99. Building things that feel like the internet used to —
        beige boxes turned glossy blue, dial-up patience, and a desktop you actually decorate.
      </p>
      <p style={{ margin: 0, color: "var(--text-secondary)" }}>
        Double-click the icons to explore.
      </p>
    </div>
  )
}

function ProjectsWindow() {
  const PROJECTS = [
    { name: { label: "retro-shell", tone: "success" as const }, type: "CLI", status: "active" },
    { name: { label: "aqua-ui-kit", tone: "primary" as const }, type: "React", status: "active" },
    { name: { label: "dial-up.fm", tone: "terminal" as const }, type: "Audio", status: "archived" },
  ]

  return (
    <div style={{ width: 380, fontFamily: "var(--font-body)" }}>
      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "status", label: "Status" },
        ]}
        rows={PROJECTS.map((p) => ({
          name: <Badge tone={p.name.tone}>{p.name.label}</Badge>,
          type: p.type,
          status: p.status,
        }))}
      />
    </div>
  )
}

function BlogWindow() {
  const POSTS = [
    { date: "1999.03.12", title: "why i still miss the modem sound" },
    { date: "2004.11.02", title: "building my first geocities page" },
    { date: "2026.06.30", title: "bringing Aqua gloss back for the web" },
  ]

  return (
    <div
      style={{
        width: 340,
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body-md)",
        color: "var(--text-primary)",
      }}
    >
      {POSTS.map((p, i) => (
        <div key={i}>
          <div style={{ padding: "8px 0" }}>
            <div
              style={{
                fontFamily: "var(--font-chrome)",
                fontSize: "var(--text-chrome-sm)",
                color: "var(--text-link)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {p.title}
            </div>
            <div style={{ fontSize: "var(--text-body-xs)", color: "var(--text-secondary)" }}>
              {p.date}
            </div>
          </div>
          {i < POSTS.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}

function ContactWindow() {
  const [sent, setSent] = useState(false)
  return (
    <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 10 }}>
      {sent ? (
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)" }}>
          Message sent. ✓
        </div>
      ) : (
        <>
          <div>
            <Label htmlFor="email">Your email</Label>
            <Input id="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" rows={4} placeholder="Say hi..." />
          </div>
          <Button variant="primary" onClick={() => setSent(true)}>
            Send
          </Button>
        </>
      )}
    </div>
  )
}

function TerminalWindow() {
  const lines = [
    { prompt: true, text: "david@hidaviddong ~ % whoami" },
    { text: "david — software engineer, est. 1999" },
    { prompt: true, text: "david@hidaviddong ~ % cat about.txt" },
    { text: "building things that feel like the internet used to." },
    { prompt: true, text: "david@hidaviddong ~ % ls projects/" },
    { text: "retro-shell   aqua-ui-kit   dial-up.fm" },
    { prompt: true, text: "david@hidaviddong ~ % _" },
  ]

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        height: 220,
        background: "var(--terminal-bg)",
        borderRadius: 6,
        padding: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        lineHeight: 1.6,
        overflow: "hidden",
      }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            color: l.prompt ? "var(--terminal-green)" : "rgba(255,255,255,0.75)",
          }}
        >
          {l.text}
        </div>
      ))}
    </div>
  )
}

/* ============================================================
 * Window definitions
 * ============================================================ */

const WINDOW_DEFS = {
  about: { title: "About Me.txt", icon: "📄", Content: AboutWindow, width: 380 },
  projects: { title: "Projects", icon: "📁", Content: ProjectsWindow, width: 420 },
  blog: { title: "Blog.app", icon: "📰", Content: BlogWindow, width: 380 },
  contact: { title: "Contact.txt", icon: "✉️", Content: ContactWindow, width: 340 },
  resume: { title: "Resume.pdf", icon: "📋", width: 300 },
  terminal: { title: "Terminal — zsh", icon: "⌨️", Content: TerminalWindow, width: 384 },
} as const

type WindowId = keyof typeof WINDOW_DEFS

/* ============================================================
 * Draggable window
 * ============================================================ */

interface DraggableWindowProps {
  id: WindowId
  def: (typeof WINDOW_DEFS)[WindowId]
  pos: { x: number; y: number }
  zIndex: number
  active: boolean
  onClose: (id: WindowId) => void
  onFocus: (id: WindowId) => void
  onMove: (id: WindowId, pos: { x: number; y: number }) => void
}

function DraggableWindow({
  id,
  def,
  pos,
  zIndex,
  active,
  onClose,
  onFocus,
  onMove,
}: DraggableWindowProps) {
  function onDragStart(e: React.MouseEvent) {
    onFocus()
    const startX = e.clientX
    const startY = e.clientY
    const origin = { ...pos }

    function onMouseMove(ev: MouseEvent) {
      onMove(id, {
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
      style={{ position: "absolute", left: pos.x, top: pos.y, zIndex }}
      onMouseDown={() => onFocus()}
    >
      <div onMouseDown={onDragStart} style={{ cursor: "move" }}>
        <WindowFrame
          title={def.title}
          icon={def.icon}
          onClose={() => onClose(id)}
          width={def.width}
          active={active}
        >
          {def.Content ? <def.Content /> : <ResumePlaceholder />}
        </WindowFrame>
      </div>
    </div>
  )
}

function ResumePlaceholder() {
  return (
    <div style={{ fontFamily: "var(--font-body)", width: 260 }}>
      Résumé preview placeholder — drop in a real PDF/image asset.
    </div>
  )
}

/* ============================================================
 * Desktop icons
 * ============================================================ */

const DESKTOP_ICONS = [
  { id: "about" as WindowId, label: "About Me.txt", glyph: "📄" },
  { id: "projects" as WindowId, label: "Projects", glyph: "📁" },
  { id: "blog" as WindowId, label: "Blog.app", glyph: "📰" },
  { id: "contact" as WindowId, label: "Contact.txt", glyph: "✉️" },
  { id: "resume" as WindowId, label: "Resume.pdf", glyph: "📋" },
  { id: "terminal" as WindowId, label: "Terminal", glyph: "⌨️" },
]

/* ============================================================
 * Menu bar
 * ============================================================ */

function MenuBar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 26,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 14px",
        background: "var(--surface-menubar)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        fontFamily: "var(--font-chrome)",
        fontSize: "var(--text-chrome-md)",
        color: "var(--text-primary)",
        zIndex: 1000,
        userSelect: "none",
      }}
    >
      <span style={{ fontSize: 14 }} aria-hidden="true">
        ◆
      </span>
      <span style={{ fontWeight: 700 }}>hidaviddong</span>
      {["File", "Edit", "View", "Window", "Help"].map((m) => (
        <span key={m} style={{ color: "var(--text-secondary)" }}>
          {m}
        </span>
      ))}
      <span style={{ flex: 1 }} />
      <span style={{ color: "var(--text-secondary)" }}>
        {time.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </span>
      <span>
        {time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
      </span>
    </div>
  )
}

/* ============================================================
 * Dock
 * ============================================================ */

interface DockIconProps {
  glyph: string
  label: string
  running: boolean
  active: boolean
  onClick: () => void
}

function DockIcon({ glyph, label, running, active, onClick }: DockIconProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            background: "var(--surface-tooltip)",
            color: "var(--text-on-tooltip)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-body-xs)",
            padding: "3px 8px",
            borderRadius: 5,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
      <button
        onClick={onClick}
        style={{
          width: 46,
          height: 46,
          border: "none",
          background: "transparent",
          fontSize: 30,
          cursor: "pointer",
          transform: hover ? "translateY(-8px) scale(1.12)" : "translateY(0) scale(1)",
          transition: "transform var(--duration-fast) var(--ease-standard)",
        }}
      >
        {glyph}
      </button>
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: running ? "var(--text-primary)" : "transparent",
          marginTop: 2,
        }}
      />
    </div>
  )
}

const DOCK_APPS = [
  { id: "about" as WindowId, glyph: "📄", label: "About Me" },
  { id: "projects" as WindowId, glyph: "📁", label: "Projects" },
  { id: "blog" as WindowId, glyph: "📰", label: "Blog" },
  { id: "contact" as WindowId, glyph: "✉️", label: "Contact" },
  { id: "resume" as WindowId, glyph: "📋", label: "Resume" },
  { id: "terminal" as WindowId, glyph: "⌨️", label: "Terminal" },
]

interface DockProps {
  openIds: WindowId[]
  current: WindowId | null
  onOpen: (id: WindowId) => void
}

function Dock({ openIds, current, onOpen }: DockProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        padding: "6px 10px",
        background: "var(--surface-dock)",
        backdropFilter: "blur(20px)",
        borderRadius: 18,
        boxShadow: "var(--shadow-dock), inset 0 1px 0 0 rgba(255,255,255,0.5)",
        zIndex: 900,
      }}
    >
      {DOCK_APPS.map((app) => (
        <DockIcon
          key={app.id}
          glyph={app.glyph}
          label={app.label}
          running={openIds.includes(app.id)}
          active={current === app.id}
          onClick={() => onOpen(app.id)}
        />
      ))}
      <div
        style={{
          width: 1,
          alignSelf: "stretch",
          background: "rgba(0,0,0,0.15)",
          margin: "0 4px",
        }}
      />
      <DockIcon glyph="🗑️" label="Trash" running={false} active={false} onClick={() => {}} />
    </div>
  )
}

/* ============================================================
 * App
 * ============================================================ */

export default function App() {
  const [openIds, setOpenIds] = useState<WindowId[]>(["about"])
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({
    about: { x: 140, y: 60 },
  })
  const [zOrder, setZOrder] = useState<WindowId[]>(["about"])
  const [current, setCurrent] = useState<WindowId>("about")

  function openWindow(id: WindowId) {
    setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
    setPositions((p) =>
      p[id]
        ? p
        : { ...p, [id]: { x: 120 + Object.keys(p).length * 30, y: 60 + Object.keys(p).length * 30 } }
    )
    setZOrder((z) => [...z.filter((x) => x !== id), id])
    setCurrent(id)
  }

  function closeWindow(id: WindowId) {
    setOpenIds((ids) => ids.filter((x) => x !== id))
    setZOrder((z) => z.filter((x) => x !== id))
    if (current === id) {
      const remaining = zOrder.filter((x) => x !== id)
      setCurrent(remaining.length > 0 ? remaining[remaining.length - 1] : null as any)
    }
  }

  function focusWindow(id: WindowId) {
    setZOrder((z) => [...z.filter((x) => x !== id), id])
    setCurrent(id)
  }

  function moveWindow(id: WindowId, pos: { x: number; y: number }) {
    setPositions((p) => ({ ...p, [id]: pos }))
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "var(--surface-desktop)",
        overflow: "hidden",
        fontFamily: "var(--font-chrome)",
      }}
    >
      {/* Desktop icons */}
      <div
        style={{
          position: "absolute",
          top: 44,
          right: 20,
          display: "grid",
          gridTemplateColumns: "repeat(1, 76px)",
          gap: 20,
        }}
      >
        {DESKTOP_ICONS.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={() => openWindow(icon.id)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              cursor: "default",
              color: "#fff",
              padding: 0,
            }}
          >
            <span
              style={{
                fontSize: 30,
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
              }}
            >
              {icon.glyph}
            </span>
            <span
              style={{
                fontSize: "var(--text-chrome-sm)",
                textShadow: "0 1px 2px rgba(0,0,0,0.7)",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Open windows */}
      {openIds.map((id) => (
        <DraggableWindow
          key={id}
          id={id}
          def={WINDOW_DEFS[id]}
          pos={positions[id] || { x: 100, y: 100 }}
          zIndex={10 + zOrder.indexOf(id)}
          active={current === id}
          onClose={closeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
        />
      ))}

      {/* Menu bar */}
      <MenuBar />

      {/* Dock */}
      <Dock openIds={openIds} current={current} onOpen={openWindow} />
    </div>
  )
}
