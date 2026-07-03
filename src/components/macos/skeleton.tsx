import React from "react"

export interface SkeletonProps {
  width?: string | number
  height?: string | number
}

function Skeleton({ width = "100%", height = 14 }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: "var(--radius-sm)",
        background: "var(--gray-200)",
        animation: "hdd-skeleton-pulse 1.1s ease-in-out infinite",
      }}
    />
  )
}

export { Skeleton }
