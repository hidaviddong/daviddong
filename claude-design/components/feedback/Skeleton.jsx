import React from "react";

export function Skeleton({ width = "100%", height = 14 }) {
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
  );
}
