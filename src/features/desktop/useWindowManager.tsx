import { useState, useCallback, useEffect } from "react"
import { APPS } from "./apps"
import { DocumentIcon } from "./icons"
import { ProjectsWindow } from "@/features/windows/ProjectsWindow"
import { ProjectDetailWindow } from "@/features/windows/ProjectDetailWindow"
import { DiaryWindow, type DiaryEntry } from "@/features/windows/DiaryWindow"
import { DiaryEntryWindow } from "@/features/windows/DiaryEntryWindow"
import type { Project } from "@/data/projects"
import type { WindowInstance } from "./DraggableWindow"

type Pos = { x: number; y: number }
// h === null means "natural height" (the window hugs its content).
export type Size = { w: number; h: number | null }

const MENUBAR_HEIGHT = 26
const DOCK_CLEARANCE = 78

// All window state lives in one object so open/close/focus stay consistent
// (no way for zOrder, positions and the window list to drift apart).
// Positions are kept after close so a reopened window comes back where it was.
interface WindowState {
  windows: WindowInstance[]
  positions: Record<string, Pos>
  zOrder: string[]
}

export function useWindowManager(initialAppId = "about") {
  const [state, setState] = useState<WindowState>({
    windows: [],
    positions: {},
    zOrder: [],
  })

  const focusWindow = useCallback((id: string) => {
    setState((s) =>
      s.zOrder[s.zOrder.length - 1] === id
        ? s
        : { ...s, zOrder: [...s.zOrder.filter((x) => x !== id), id] },
    )
  }, [])

  const moveWindow = useCallback((id: string, pos: Pos) => {
    setState((s) => ({ ...s, positions: { ...s.positions, [id]: pos } }))
  }, [])

  const closeWindow = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      windows: s.windows.filter((w) => w.id !== id),
      zOrder: s.zOrder.filter((x) => x !== id),
    }))
  }, [])

  // Apps "rm"-ed from the fake filesystem: hidden from desktop and dock.
  const [hiddenIds, setHiddenIds] = useState<string[]>([])

  const removeApp = useCallback(
    (id: string) => {
      setHiddenIds((h) => (h.includes(id) ? h : [...h, id]))
      closeWindow(id)
    },
    [closeWindow],
  )

  // User-resized dimensions (unset = the app's default width, natural height),
  // minimized window ids, and the pre-zoom rect of maximized windows.
  const [sizes, setSizes] = useState<Record<string, Size>>({})
  const [minimizedIds, setMinimizedIds] = useState<string[]>([])
  const [zoomRects, setZoomRects] = useState<Record<string, { pos: Pos; size: Size | null }>>({})

  // Manual resize breaks out of the maximized state.
  const resizeWindow = useCallback((id: string, size: Size) => {
    setSizes((s) => ({ ...s, [id]: size }))
    setZoomRects(({ [id]: _, ...rest }) => rest)
  }, [])

  // Minimize also drops the window to the back so focus falls elsewhere.
  const minimizeWindow = useCallback((id: string) => {
    setMinimizedIds((m) => (m.includes(id) ? m : [...m, id]))
    setState((s) => ({ ...s, zOrder: [id, ...s.zOrder.filter((x) => x !== id)] }))
  }, [])

  // Zoom (green light): fill the screen between menubar and dock, or restore
  // the rect saved when the window was zoomed. `current` = live size before
  // zooming, measured by the caller (null = natural height).
  const toggleMaximize = useCallback(
    (id: string, current: Size | null) => {
      const saved = zoomRects[id]
      if (saved) {
        setState((s) => ({ ...s, positions: { ...s.positions, [id]: saved.pos } }))
        setSizes(({ [id]: _drop, ...rest }) =>
          saved.size ? { ...rest, [id]: saved.size } : rest,
        )
        setZoomRects(({ [id]: _drop, ...rest }) => rest)
      } else {
        const pos = state.positions[id] ?? { x: 100, y: 100 }
        setZoomRects((z) => ({ ...z, [id]: { pos, size: current } }))
        setState((s) => ({
          ...s,
          positions: { ...s.positions, [id]: { x: 8, y: MENUBAR_HEIGHT + 8 } },
        }))
        setSizes((sz) => ({
          ...sz,
          [id]: {
            w: window.innerWidth - 16,
            h: window.innerHeight - MENUBAR_HEIGHT - DOCK_CLEARANCE - 16,
          },
        }))
      }
    },
    [zoomRects, state.positions],
  )

  // Register a window and bring it to front; an already-open window is only
  // refocused (and un-minimized). First open gets a cascade position.
  const openWindow = useCallback((win: WindowInstance) => {
    setMinimizedIds((m) => (m.includes(win.id) ? m.filter((x) => x !== win.id) : m))
    setState((s) => {
      const exists = s.windows.some((w) => w.id === win.id)
      let positions = s.positions
      if (!positions[win.id]) {
        const n = Object.keys(positions).length
        positions = { ...positions, [win.id]: { x: 120 + n * 30, y: 60 + n * 30 } }
      }
      return {
        windows: exists ? s.windows : [...s.windows, win],
        positions,
        zOrder: [...s.zOrder.filter((x) => x !== win.id), win.id],
      }
    })
  }, [])

  // Open a project detail window (one per project).
  const openProject = useCallback(
    (project: Project) => {
      openWindow({
        id: `project:${project.id}`,
        title: project.title,
        icon: <DocumentIcon size={15} />,
        width: 440,
        content: <ProjectDetailWindow project={project} />,
      })
    },
    [openWindow],
  )

  // Open a diary entry window (one per date).
  const openDiaryEntry = useCallback(
    (entry: DiaryEntry) => {
      openWindow({
        id: `diary:${entry.date}`,
        title: `${entry.date}.md`,
        icon: <DocumentIcon size={15} />,
        width: 460,
        content: <DiaryEntryWindow date={entry.date} />,
      })
    },
    [openWindow],
  )

  // Open a top-level app window by id.
  const openApp = useCallback(
    (id: string) => {
      const app = APPS[id]
      if (!app) return
      const content =
        id === "projects" ? (
          <ProjectsWindow onOpenProject={openProject} />
        ) : id === "diary" ? (
          <DiaryWindow onOpenEntry={openDiaryEntry} />
        ) : (
          <app.Content />
        )
      openWindow({
        id,
        title: app.title,
        icon: <app.Icon size={15} />,
        width: app.width,
        height: app.height,
        contentStyle: app.contentStyle,
        content,
      })
    },
    [openWindow, openProject, openDiaryEntry],
  )

  useEffect(() => {
    openApp(initialAppId)
  }, [openApp, initialAppId])

  return {
    windows: state.windows,
    openIds: state.windows.map((w) => w.id),
    positions: state.positions,
    zOrder: state.zOrder,
    current: state.zOrder[state.zOrder.length - 1] ?? null,
    hiddenIds,
    sizes,
    minimizedIds,
    maximizedIds: Object.keys(zoomRects),
    openApp,
    closeWindow,
    removeApp,
    focusWindow,
    moveWindow,
    resizeWindow,
    minimizeWindow,
    toggleMaximize,
  }
}
