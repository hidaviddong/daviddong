import React from "react";

export function Label({ children, htmlFor, style, ...rest }) {
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
  );
}
