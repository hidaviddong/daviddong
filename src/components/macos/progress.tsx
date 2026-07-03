import React from "react"

export interface ProgressProps {
  value?: number
  max?: number
}

function Progress({ value = 0, max = 100 }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 8,
        borderRadius: "var(--radius-pill)",
        background: "var(--gray-200)",
        boxShadow: "var(--bevel-sunken)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${pct}%`,
          borderRadius: "var(--radius-pill)",
          background: "linear-gradient(to bottom, var(--accent-300), var(--accent-500))",
          transition: "width var(--duration-normal) var(--ease-standard)",
        }}
      />
    </div>
  )
}

export { Progress }
