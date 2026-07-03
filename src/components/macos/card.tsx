import React, { type CSSProperties, type ReactNode } from "react"

export interface CardProps {
  title?: string
  children?: ReactNode
  footer?: ReactNode
  style?: CSSProperties
}

function Card({ title, children, footer, style }: CardProps) {
  return (
    <div
      style={{
        background: "var(--surface-window)",
        boxShadow: "var(--bevel-window)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        fontFamily: "var(--font-ui)",
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            padding: "8px 14px",
            background: "var(--surface-window-alt)",
            borderBottom: "1px solid var(--gray-300)",
            fontSize: "var(--text-chrome-md)",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </div>
      )}
      <div style={{ padding: 14 }}>{children}</div>
      {footer && (
        <div
          style={{
            padding: "8px 14px",
            borderTop: "1px solid var(--gray-300)",
            fontSize: "var(--text-body-sm)",
            color: "var(--text-secondary)",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}

export { Card }
