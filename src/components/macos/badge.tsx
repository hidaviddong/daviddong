import React, { type ReactNode } from "react"

const TONES: Record<string, { bg: string; fg: string }> = {
  default: { bg: "var(--gray-200)", fg: "var(--text-primary)" },
  primary: { bg: "var(--accent-500)", fg: "var(--text-on-accent)" },
  success: { bg: "var(--state-success-bg)", fg: "var(--state-success)" },
  warning: { bg: "var(--state-warning-bg)", fg: "var(--state-warning)" },
  danger: { bg: "var(--state-danger-bg)", fg: "var(--state-danger)" },
  terminal: { bg: "var(--terminal-bg)", fg: "var(--terminal-green)" },
}

export interface BadgeProps {
  children?: ReactNode
  tone?: keyof typeof TONES
}

function Badge({ children, tone = "default" }: BadgeProps) {
  const t = TONES[tone] || TONES.default
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-chrome-sm)",
        fontWeight: 600,
        letterSpacing: "var(--tracking-normal)",
        background: t.bg,
        color: t.fg,
        border: tone === "terminal" ? "1px solid var(--terminal-green-dim)" : "none",
        borderRadius: "var(--radius-pill)",
      }}
    >
      {children}
    </span>
  )
}

export { Badge }
