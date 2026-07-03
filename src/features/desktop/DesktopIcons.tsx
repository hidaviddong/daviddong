import { APPS } from "./apps"

interface DesktopIconsProps {
  order: string[]
  onOpen: (id: string) => void
}

export function DesktopIcons({ order, onOpen }: DesktopIconsProps) {
  return (
    <div className="absolute right-5 top-11 grid grid-cols-[76px] gap-4">
      {order.map((id) => {
        const app = APPS[id]
        return (
          <button
            key={id}
            onDoubleClick={() => onOpen(id)}
            className="group flex cursor-default select-none flex-col items-center gap-1 border-none bg-transparent p-0 text-white"
          >
            <span className="flex rounded-lg p-1 transition-colors duration-150 [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.4))] group-hover:bg-white/15">
              <app.Icon size={36} />
            </span>
            <span className="rounded-[4px] px-1.5 py-px text-center text-chrome-sm leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.7)] transition-colors duration-150 group-hover:bg-white/20">
              {app.title}
            </span>
          </button>
        )
      })}
    </div>
  )
}
