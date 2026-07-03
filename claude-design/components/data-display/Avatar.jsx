import React from "react";

export function Avatar({ src, alt = "", size = 32, fallback }) {
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
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        fallback || "?"
      )}
    </span>
  );
}
