import React from "react";

export function Breadcrumb({ items }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)" }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: "var(--text-secondary)" }}>▸</span>}
          {item.href ? (
            <a href={item.href} style={{ color: "var(--text-link)", textDecoration: "underline" }}>
              {item.label}
            </a>
          ) : (
            <span style={{ color: "var(--text-primary)" }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
