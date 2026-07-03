import React from "react";

export function Toggle({ pressed, onPressedChange, children, disabled }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={() => onPressedChange && onPressedChange(!pressed)}
      style={{
        padding: "3px 10px",
        fontFamily: "var(--font-chrome)",
        fontSize: "var(--text-chrome-sm)",
        background: "var(--gray-200)",
        boxShadow: pressed ? "var(--bevel-sunken)" : "var(--bevel-raised)",
        border: "none",
        color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}

export function ToggleGroup({ options, value, onChange, multiple = false }) {
  const values = multiple ? value || [] : [value];
  function toggle(v) {
    if (!onChange) return;
    if (multiple) {
      onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
    } else {
      onChange(v);
    }
  }
  return (
    <div style={{ display: "inline-flex" }}>
      {options.map((opt) => (
        <Toggle key={opt.value} pressed={values.includes(opt.value)} onPressedChange={() => toggle(opt.value)}>
          {opt.label}
        </Toggle>
      ))}
    </div>
  );
}
