import React, { type InputHTMLAttributes } from "react"

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value" | "min" | "max" | "step"> {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  disabled?: boolean
}

function Slider({ value = 0, min = 0, max = 100, step = 1, onChange, disabled, ...rest }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 20,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 4,
          borderRadius: "var(--radius-pill)",
          background: "var(--gray-300)",
          boxShadow: "var(--bevel-sunken)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${pct}%`,
            background: "var(--accent-500)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: `calc(${pct}% - 8px)`,
          width: 16,
          height: 16,
          background: "#ffffff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
          borderRadius: "50%",
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(Number(e.target.value))}
        style={{
          position: "relative",
          width: "100%",
          opacity: 0,
          height: 20,
          cursor: disabled ? "default" : "pointer",
        }}
        {...rest}
      />
    </div>
  )
}

export { Slider }
