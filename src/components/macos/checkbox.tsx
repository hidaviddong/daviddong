import React, { type InputHTMLAttributes, type ReactNode } from "react"

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: ReactNode
  id?: string
}

function Checkbox({ checked, onChange, disabled, label, id }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-body-md)",
        color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
        cursor: disabled ? "default" : "pointer",
        userSelect: "none",
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          flexShrink: 0,
          borderRadius: "4.5px",
          background: checked
            ? "var(--accent-primary)"
            : disabled
              ? "var(--gray-100)"
              : "var(--surface-inset)",
          boxShadow: checked ? "none" : "var(--bevel-field)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background var(--duration-fast) var(--ease-standard)",
        }}
      >
        {checked && (
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, lineHeight: 1 }}>
            ✓
          </span>
        )}
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      {label}
    </label>
  )
}

export { Checkbox }
