import React, { useState } from "react";

export function Accordion({ items }) {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "var(--surface-window)", borderRadius: "var(--radius-md)", boxShadow: "var(--bevel-window)", overflow: "hidden" }}>
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i} style={{ borderTop: i > 0 ? "1px solid var(--gray-300)" : "none" }}>
            <button
              onClick={() => setOpenIdx(open ? -1 : i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "9px 14px",
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-chrome-md)",
                fontWeight: 500,
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: open ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform var(--duration-fast) var(--ease-standard)",
                  fontSize: 10,
                  color: "var(--text-secondary)",
                }}
              >
                ▶
              </span>
              {item.title}
            </button>
            {open && (
              <div style={{ padding: "0 14px 12px 34px", fontFamily: "var(--font-ui)", fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
