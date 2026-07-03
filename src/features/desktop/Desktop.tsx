import { MenuBar } from "./MenuBar"
import { Dock } from "./Dock"
import { DesktopIcons } from "./DesktopIcons"
import { DraggableWindow } from "./DraggableWindow"
import { useWindowManager } from "./useWindowManager"
import { useWallpaper } from "./useWallpaper"

export function Desktop() {
  const {
    windows,
    openIds,
    positions,
    zOrder,
    current,
    openApp,
    closeWindow,
    focusWindow,
    moveWindow,
  } = useWindowManager("about")

  const { url, loaded, shuffle } = useWallpaper()

  return (
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

      <DesktopIcons onOpen={openApp} />

      {windows.map((win) => (
        <DraggableWindow
          key={win.id}
          win={win}
          pos={positions[win.id] || { x: 100, y: 100 }}
          zIndex={10 + zOrder.indexOf(win.id)}
          active={current === win.id}
          onClose={closeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
        />
      ))}

      <MenuBar onShuffleWallpaper={shuffle} />
      <Dock openIds={openIds} onOpen={openApp} />
    </div>
  )
}
