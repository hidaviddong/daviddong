import React from "react";

// Real Mac modifier-key glyphs — ⌘ ⌥ ⇧ ⌃ ⏎ ⌫ — render as-is when passed as children,
// e.g. <Kbd>⌘</Kbd><Kbd>K</Kbd>.
export function Kbd({ children }) {
  return (
    <kbd
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
        height: 20,
        padding: "0 5px",
        fontFamily: "var(--font-ui)",
        fontSize: "var(--text-chrome-sm)",
        fontWeight: 500,
        background: "var(--gray-50)",
        boxShadow: "var(--bevel-raised)",
        borderRadius: "5px",
        color: "var(--text-primary)",
      }}
    >
      {children}
    </kbd>
  );
}
