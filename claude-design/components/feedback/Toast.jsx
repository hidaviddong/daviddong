import React, { useEffect } from "react";

export function Toast({ title, description, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!onClose) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [onClose, duration]);

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        width: 280,
        padding: "12px 14px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(20px)",
        boxShadow: "var(--shadow-menu)",
        borderRadius: "var(--radius-lg)",
        fontFamily: "var(--font-ui)",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "var(--text-chrome-md)", fontWeight: 600, color: "var(--text-primary)" }}>{title}</div>
        {description && <div style={{ fontSize: "var(--text-body-sm)", color: "var(--text-secondary)", marginTop: 2 }}>{description}</div>}
      </div>
      <button
        onClick={onClose}
        aria-label="close"
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "var(--gray-200)",
          border: "none",
          color: "var(--text-secondary)",
          fontSize: 10,
          lineHeight: 1,
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}
