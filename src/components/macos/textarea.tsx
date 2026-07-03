import React, { type TextareaHTMLAttributes, type CSSProperties } from "react"

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  style?: CSSProperties
}

function Textarea({ style, disabled, rows = 4, ...rest }: TextareaProps) {
  return (
    <textarea
      disabled={disabled}
      rows={rows}
      style={{
        padding: "6px",
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
        resize: "vertical",
        transition: "box-shadow var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = "var(--bevel-field), var(--focus-ring)"
        rest.onFocus?.(e)
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = "var(--bevel-field)"
        rest.onBlur?.(e)
      }}
      {...rest}
    />
  )
}

export { Textarea }
