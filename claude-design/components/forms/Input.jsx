import React from "react";

export function Input({ style, disabled, ...rest }) {
  return (
    <input
      disabled={disabled}
      style={{
        height: 26,
        padding: "0 6px",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body-md)",
        color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
        background: disabled ? "var(--gray-100)" : "var(--surface-inset)",
        boxShadow: "var(--bevel-field)",
        border: "none",
        borderRadius: "var(--radius-md)",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        transition: `box-shadow var(--duration-fast) var(--ease-standard)`,
        ...style,
      }}
      onFocus={(e) => (e.target.style.boxShadow = "var(--bevel-field), var(--focus-ring)")}
      onBlur={(e) => (e.target.style.boxShadow = "var(--bevel-field)")}
      {...rest}
    />
  );
}
