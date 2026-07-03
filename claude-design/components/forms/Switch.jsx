import React from "react";

export function Switch({ checked, onChange, disabled, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      style={{
        width: 40,
        height: 20,
        padding: 2,
        background: checked ? "var(--accent-500)" : "var(--gray-300)",
        boxShadow: "var(--bevel-sunken)",
        border: "none",
        borderRadius: "var(--radius-pill)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: `background var(--duration-fast) var(--ease-standard)`,
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          background: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          borderRadius: "50%",
          transition: `transform var(--duration-fast) var(--ease-standard)`,
        }}
      />
    </button>
  );
}
