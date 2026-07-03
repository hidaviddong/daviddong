import React, { type LabelHTMLAttributes, type CSSProperties, type ReactNode } from "react"

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode
  style?: CSSProperties
}

function Label({ children, htmlFor, style, ...rest }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        fontFamily: "var(--font-chrome)",
        fontSize: "var(--text-chrome-sm)",
        color: "var(--text-primary)",
        display: "inline-block",
        marginBottom: 4,
        ...style,
      }}
      {...rest}
    >
      {children}
    </label>
  )
}

export { Label }
