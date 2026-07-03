import React, { type ReactNode } from "react"

export interface TooltipProps {
  children?: ReactNode
  label: string
}

function Tooltip({ children, label }: TooltipProps) {
  const [show, setShow] = React.useState(false)
  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--surface-tooltip)",
            color: "var(--text-on-tooltip)",
            borderRadius: "5px",
            padding: "4px 8px",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-body-xs)",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            zIndex: 20,
          }}
        >
          {label}
        </span>
      )}
    </span>
  )
}

export { Tooltip }
