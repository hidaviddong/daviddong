import React from "react";

const TONES = {
  info: { bg: "var(--gray-200)", fg: "var(--text-primary)", icon: "ℹ" },
  success: { bg: "var(--state-success-bg)", fg: "var(--state-success)", icon: "✓" },
  warning: { bg: "var(--state-warning-bg)", fg: "var(--state-warning)", icon: "!" },
  danger: { bg: "var(--state-danger-bg)", fg: "var(--state-danger)", icon: "✕" },
};

export function Alert({ tone = "info", title, children }) {
  const t = TONES[tone] || TONES.info;
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "10px 12px",
        background: t.bg,
        borderRadius: "var(--radius-md)",
        fontFamily: "var(--font-ui)",
        color: t.fg,
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1.2 }}>{t.icon}</span>
      <div>
        {title && <div style={{ fontSize: "var(--text-chrome-sm)", fontWeight: 600, marginBottom: 2 }}>{title}</div>}
        <div style={{ fontSize: "var(--text-body-sm)" }}>{children}</div>
      </div>
    </div>
  );
}
