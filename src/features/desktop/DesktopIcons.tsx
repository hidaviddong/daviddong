import { APPS, APP_ORDER } from "./apps"

interface DesktopIconsProps {
  onOpen: (id: string) => void
}

export function DesktopIcons({ onOpen }: DesktopIconsProps) {
  return (
    <div className="absolute right-5 top-11 grid grid-cols-[76px] gap-5">
      {APP_ORDER.map((id) => {
        const app = APPS[id]
        return (
          <button
            key={id}
            onDoubleClick={() => onOpen(id)}
            className="flex cursor-default flex-col items-center gap-[5px] border-none bg-none p-0 text-white"
          >
            <span className="text-[30px] [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.4))]">
              {app.icon}
            </span>
            <span className="text-center text-chrome-sm leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]">
              {app.title}
            </span>
          </button>
        )
      })}
    </div>
  )
}
