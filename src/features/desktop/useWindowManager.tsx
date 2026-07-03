import { useState, useCallback } from "react"
import type { ReactNode } from "react"
import { APPS } from "./apps"
import { ProjectsWindow } from "@/features/windows/ProjectsWindow"
import { ProjectDetailWindow } from "@/features/windows/ProjectDetailWindow"
import type { Project } from "@/data/projects"
import type { WindowInstance } from "./DraggableWindow"

type Pos = { x: number; y: number }

export function useWindowManager(initialAppId = "about") {
  const [instances, setInstances] = useState<Record<string, WindowInstance>>({})
  const [openIds, setOpenIds] = useState<string[]>([])
  const [positions, setPositions] = useState<Record<string, Pos>>({})
  const [zOrder, setZOrder] = useState<string[]>([])
  const [current, setCurrent] = useState<string | null>(null)

  const focusWindow = useCallback((id: string) => {
    setZOrder((z) => [...z.filter((x) => x !== id), id])
    setCurrent(id)
  }, [])

  const moveWindow = useCallback((id: string, pos: Pos) => {
    setPositions((p) => ({ ...p, [id]: pos }))
  }, [])

  const closeWindow = useCallback((id: string) => {
    setOpenIds((ids) => ids.filter((x) => x !== id))
    setZOrder((z) => {
      const next = z.filter((x) => x !== id)
      setCurrent(next.length ? next[next.length - 1] : null)
      return next
    })
  }, [])

  // Internal: register a window (bring to front, assign a cascade position).
  const spawn = useCallback((instance: WindowInstance, render: () => ReactNode) => {
    const inst = { ...instance, render }
    setInstances((prev) => ({ ...prev, [inst.id]: inst }))
    setOpenIds((ids) => (ids.includes(inst.id) ? ids : [...ids, inst.id]))
    setPositions((p) => {
      if (p[inst.id]) return p
      const n = Object.keys(p).length
      return { ...p, [inst.id]: { x: 120 + n * 30, y: 60 + n * 30 } }
    })
    setZOrder((z) => [...z.filter((x) => x !== inst.id), inst.id])
    setCurrent(inst.id)
  }, [])

  // Open a project detail window (one per project).
  const openProject = useCallback(
    (project: Project) => {
      const id = `project:${project.id}`
      spawn(
        { id, title: `${project.title}`, icon: "📄", width: 440, render: () => null },
        () => ProjectDetailWindow({ project }),
      )
    },
    [spawn],
  )

  // Open a top-level app window by id.
  const openApp = useCallback(
    (id: string) => {
      const app = APPS[id]
      if (!app) return
      if (openIds.includes(id)) {
        focusWindow(id)
        return
      }
      const render =
        id === "projects"
          ? () => ProjectsWindow({ onOpenProject: openProject })
          : () => {
              const C = app.Content
              return <C />
            }
      spawn(
        { id, title: app.title, icon: app.icon, width: app.width, render: () => null },
        render,
      )
    },
    [openIds, focusWindow, spawn, openProject],
  )

  // Ensure the initial window exists exactly once.
  const [booted, setBooted] = useState(false)
  if (!booted) {
    setBooted(true)
    openApp(initialAppId)
  }

  const windows = openIds.map((id) => instances[id]).filter(Boolean) as WindowInstance[]

  return {
    windows,
    openIds,
    positions,
    zOrder,
    current,
    openApp,
    closeWindow,
    focusWindow,
    moveWindow,
  }
}
