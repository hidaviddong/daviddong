import React from "react";

export function Tabs({ tabs, value, onChange }) {
  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          gap: 2,
          padding: 2,
          background: "var(--gray-200)",
          borderRadius: "var(--radius-md)",
          marginBottom: 10,
        }}
      >
        {tabs.map((t) => {
          const active = t.value === value;
          return (
            <button
              key={t.value}
              onClick={() => onChange && onChange(t.value)}
              style={{
                padding: "3px 14px",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-chrome-md)",
                fontWeight: active ? 600 : 400,
                background: active ? "#ffffff" : "transparent",
                boxShadow: active ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
                border: "none",
                borderRadius: "calc(var(--radius-md) - 2px)",
                color: "var(--text-primary)",
                cursor: "pointer",
                transition: "background var(--duration-fast) var(--ease-standard)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        style={{
          background: "var(--surface-window)",
          boxShadow: "var(--bevel-window)",
          borderRadius: "var(--radius-md)",
          padding: 14,
        }}
      >
        {tabs.find((t) => t.value === value)?.content}
      </div>
    </div>
  );
}
