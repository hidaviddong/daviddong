import { useState, useCallback, useEffect } from "react"
import { APPS } from "./apps"
import { DocumentIcon } from "./icons"
import { ProjectsWindow } from "@/features/windows/ProjectsWindow"
import { ProjectDetailWindow } from "@/features/windows/ProjectDetailWindow"
import type { Project } from "@/data/projects"
import type { WindowInstance } from "./DraggableWindow"

type Pos = { x: number; y: number }

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

  // Register a window and bring it to front; an already-open window is only
  // refocused. First open gets a cascade position.
  const openWindow = useCallback((win: WindowInstance) => {
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

  // Open a top-level app window by id.
  const openApp = useCallback(
    (id: string) => {
      const app = APPS[id]
      if (!app) return
      const content =
        id === "projects" ? <ProjectsWindow onOpenProject={openProject} /> : <app.Content />
      openWindow({
        id,
        title: app.title,
        icon: <app.Icon size={15} />,
        width: app.width,
        content,
      })
    },
    [openWindow, openProject],
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
    openApp,
    closeWindow,
    focusWindow,
    moveWindow,
  }
}
