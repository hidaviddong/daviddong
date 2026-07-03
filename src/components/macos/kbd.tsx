import React, { type ReactNode } from "react"

export interface KbdProps {
  children?: ReactNode
}

function Kbd({ children }: KbdProps) {
  return (
    <kbd
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
        height: 20,
        padding: "0 5px",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-chrome-sm)",
        fontWeight: 500,
        background: "var(--gray-50)",
        boxShadow: "var(--bevel-raised)",
        borderRadius: "5px",
        color: "var(--text-primary)",
      }}
    >
      {children}
    </kbd>
  )
}

export { Kbd }
