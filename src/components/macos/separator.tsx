import React from "react"

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical"
}

function Separator({ orientation = "horizontal" }: SeparatorProps) {
  const horizontal = orientation === "horizontal"
  return (
    <div
      style={{
        width: horizontal ? "100%" : 1,
        height: horizontal ? 1 : "100%",
        background: "var(--gray-300)",
      }}
    />
  )
}

export { Separator }
