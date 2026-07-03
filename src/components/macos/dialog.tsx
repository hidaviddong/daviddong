import React, { type ReactNode, type CSSProperties } from "react"
import { WindowFrame } from "./window-frame"

export interface DialogProps {
  open?: boolean
  title?: string
  onClose?: () => void
  children?: ReactNode
  footer?: ReactNode
  width?: number
}

function Dialog({ open, title, onClose, children, footer, width = 340 }: DialogProps) {
  if (!open) return null
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <WindowFrame title={title} onClose={onClose} width={width} footer={footer}>
          {children}
        </WindowFrame>
      </div>
    </div>
  )
}

export { Dialog }
