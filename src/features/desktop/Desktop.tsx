import { useEffect, useMemo, useState } from "react"
import { MenuBar } from "./MenuBar"
import { Dock } from "./Dock"
import { DesktopIcons } from "./DesktopIcons"
import { DraggableWindow } from "./DraggableWindow"
import { useWindowManager } from "./useWindowManager"
import { useWallpaper } from "./useWallpaper"
import { DesktopServicesContext } from "./DesktopServices"
import { APP_ORDER } from "./apps"

// The rm -rf / aftermath: instant black, then a faint kernel panic hint so
// visitors know a refresh brings the system back.
function CrashScreen() {
  const [hint, setHint] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHint(true), 4000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="fixed inset-0 z-[9999] cursor-default bg-black font-mono2 text-[13px] leading-[1.7]">
      {hint && (
        <div className="p-6 text-white/35">
          <p className="m-0">panic(cpu 0): init died — attempted to remove '/'</p>
          <p className="m-0">We are hanging here...</p>
          <p className="m-0">Reload the page to reboot. (⌘R)</p>
          <span className="mt-1 inline-block h-[15px] w-[8px] animate-pulse bg-white/35" />
        </div>
      )}
    </div>
  )
}

export function Desktop() {
  const {
    windows,
    openIds,
    positions,
    zOrder,
    current,
    hiddenIds,
    sizes,
    minimizedIds,
    openApp,
    closeWindow,
    removeApp,
    focusWindow,
    moveWindow,
    resizeWindow,
    minimizeWindow,
    toggleMaximize,
  } = useWindowManager("about")

  const { url, loaded } = useWallpaper()
  const [crashed, setCrashed] = useState(false)

  const services = useMemo(
    () => ({ openApp, removeApp, closeWindow, crash: () => setCrashed(true) }),
    [openApp, removeApp, closeWindow],
  )

  const visibleOrder = APP_ORDER.filter((id) => !hiddenIds.includes(id))

  return (
    <DesktopServicesContext.Provider value={services}>
      <div className="relative h-screen w-screen overflow-hidden bg-[var(--surface-desktop)] font-chrome">
        {/* Wallpaper */}
        {url && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{ backgroundImage: `url(${url})`, opacity: loaded ? 1 : 0 }}
          />
        )}
        {/* Legibility overlay so icons/text stay readable on any photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

        <DesktopIcons order={visibleOrder} onOpen={openApp} />

        {windows.map((win) => (
          <DraggableWindow
            key={win.id}
            win={win}
            pos={positions[win.id] || { x: 100, y: 100 }}
            size={sizes[win.id] ?? { w: win.width, h: win.height ?? null }}
            sized={win.id in sizes}
            zIndex={10 + zOrder.indexOf(win.id)}
            active={current === win.id}
            minimized={minimizedIds.includes(win.id)}
            onClose={closeWindow}
            onFocus={focusWindow}
            onMove={moveWindow}
            onResize={resizeWindow}
            onMinimize={minimizeWindow}
            onZoom={toggleMaximize}
          />
        ))}

        <MenuBar />
        <Dock order={visibleOrder} openIds={openIds} onOpen={openApp} />

        {crashed && <CrashScreen />}
      </div>
    </DesktopServicesContext.Provider>
  )
}
