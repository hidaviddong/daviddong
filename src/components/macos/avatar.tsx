import React, { type ReactNode } from "react"

export interface AvatarProps {
  src?: string
  alt?: string
  size?: number
  fallback?: ReactNode
}

function Avatar({ src, alt = "", size = 32, fallback }: AvatarProps) {
  return (
    <span
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gray-200)",
        boxShadow: "var(--bevel-window)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        fontFamily: "var(--font-chrome)",
        fontSize: size * 0.5,
        color: "var(--text-primary)",
        flexShrink: 0,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        fallback || "?"
      )}
    </span>
  )
}

export { Avatar }
