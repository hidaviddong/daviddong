import React, { useState, type ButtonHTMLAttributes, type ReactNode } from "react"

const SIZES = {
  default: { height: 28, padding: "0 14px", font: "var(--text-chrome-md)" },
  sm: { height: 24, padding: "0 11px", font: "var(--text-chrome-sm)" },
  lg: { height: 34, padding: "0 18px", font: "var(--text-chrome-lg)" },
  icon: { height: 28, width: 28, padding: 0, font: "var(--text-chrome-md)" },
} as const

const VARIANTS: Record<string, { background: string; color: string; flat?: boolean; underline?: boolean }> = {
  default: { background: "var(--gray-50)", color: "var(--text-primary)" },
  primary: { background: "var(--accent-500)", color: "var(--text-on-accent)" },
  outline: { background: "var(--surface-inset)", color: "var(--text-primary)" },
  ghost: { background: "transparent", color: "var(--text-primary)", flat: true },
  destructive: { background: "var(--signal-red-bg)", color: "var(--signal-red)" },
  link: { background: "transparent", color: "var(--text-link)", flat: true, underline: true },
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
  children?: ReactNode
}

function Button({
  children,
  variant = "default",
  size = "default",
  disabled = false,
  onClick,
  style,
  ...rest
}: ButtonProps) {
  const [pressed, setPressed] = useState(false)
  const v = VARIANTS[variant] || VARIANTS.default
  const s = SIZES[size] || SIZES.default

  const box = v.flat ? "none" : "var(--bevel-raised)"

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        height: s.height,
        width: (s as typeof SIZES.icon).width,
        padding: s.padding,
        fontFamily: "var(--font-chrome)",
        fontSize: s.font,
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: "var(--tracking-normal)",
        background: v.background,
        color: v.color,
        boxShadow: box,
        border: "none",
        borderRadius: "var(--radius-pill)",
        textDecoration: v.underline ? "underline" : "none",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : pressed && !v.flat ? 0.85 : 1,
        overflow: "hidden",
        userSelect: "none",
        transition: `opacity var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)`,
        ...style,
      }}
      {...rest}
    >
      {!v.flat && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: "var(--gloss-overlay)",
            pointerEvents: "none",
          }}
        />
      )}
      <span style={{ position: "relative" }}>{children}</span>
    </button>
  )
}

export { Button }
