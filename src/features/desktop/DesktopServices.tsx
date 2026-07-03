import { createContext, useContext } from "react"

// Lets window content (mainly Terminal.app) drive the desktop itself:
// launch apps, "delete" them off the desktop, close windows, or take the
// whole system down.
export interface DesktopServices {
  openApp: (id: string) => void
  removeApp: (id: string) => void
  closeWindow: (id: string) => void
  crash: () => void
}

export const DesktopServicesContext = createContext<DesktopServices | null>(null)

export function useDesktopServices(): DesktopServices | null {
  return useContext(DesktopServicesContext)
}
