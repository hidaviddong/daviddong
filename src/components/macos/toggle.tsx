import React, { type ReactNode, type ButtonHTMLAttributes } from "react"

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onChange"> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  children?: ReactNode
  disabled?: boolean
}

function Toggle({ pressed, onPressedChange, children, disabled, ...rest }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={() => onPressedChange?.(!pressed)}
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
      {...rest}
    >
      {children}
    </button>
  )
}

export interface ToggleOption {
  value: string
  label: string
}

export interface ToggleGroupProps {
  options: ToggleOption[]
  value?: string | string[]
  onChange?: (value: any) => void
  multiple?: boolean
}

function ToggleGroup({ options, value, onChange, multiple = false }: ToggleGroupProps) {
  const values = multiple ? (value as string[]) || [] : [value as string]
  function toggle(v: string) {
    if (!onChange) return
    if (multiple) {
      onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v])
    } else {
      onChange(v)
    }
  }
  return (
    <div style={{ display: "inline-flex" }}>
      {options.map((opt) => (
        <Toggle
          key={opt.value}
          pressed={values.includes(opt.value)}
          onPressedChange={() => toggle(opt.value)}
        >
          {opt.label}
        </Toggle>
      ))}
    </div>
  )
}

export { Toggle, ToggleGroup }
