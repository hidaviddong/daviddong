import { useState } from "react"
import type { ReactNode } from "react"
import { APPS } from "./apps"
import { TrashIcon } from "./icons"

interface DockIconProps {
  icon: ReactNode
  label: string
  running: boolean
  onClick: () => void
}

function DockIcon({ icon, label, running, onClick }: DockIconProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <span className="absolute bottom-[calc(100%+10px)] whitespace-nowrap rounded-[5px] bg-tooltip px-2 py-[3px] font-ui text-body-xs text-on-tooltip">
          {label}
        </span>
      )}
      <button
        onClick={onClick}
        className="flex h-[46px] w-[46px] items-center justify-center border-none bg-transparent transition-transform duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:scale-110"
      >
        {icon}
      </button>
      <span
        className="mt-0.5 h-1 w-1 rounded-full bg-[var(--text-primary)] transition-opacity duration-200"
        style={{ opacity: running ? 1 : 0 }}
      />
    </div>
  )
}

interface DockProps {
  order: string[]
  openIds: string[]
  onOpen: (id: string) => void
}

export function Dock({ order, openIds, onOpen }: DockProps) {
  return (
    <div className="absolute bottom-2.5 left-1/2 z-[900] flex -translate-x-1/2 items-end gap-1.5 rounded-[18px] bg-dock px-2.5 py-1.5 shadow-[var(--shadow-dock),inset_0_1px_0_0_rgba(255,255,255,0.5)] backdrop-blur-[20px]">
      {order.map((id) => {
        const app = APPS[id]
        return (
          <DockIcon
            key={id}
            icon={<app.Icon size={34} />}
            label={app.label}
            running={openIds.some(
              (o) => o === id || (id === "projects" && o.startsWith("project:")),
            )}
            onClick={() => onOpen(id)}
          />
        )
      })}
      <div className="mx-1 self-stretch border-l border-black/15" />
      <DockIcon icon={<TrashIcon size={34} />} label="Trash" running={false} onClick={() => {}} />
    </div>
  )
}
