import React from "react";

export function Table({ columns, rows }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body-sm)",
        background: "var(--surface-inset)",
        boxShadow: "var(--bevel-window)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c.key}
              style={{
                textAlign: "left",
                padding: "6px 10px",
                background: "var(--surface-window-alt)",
                borderBottom: "1px solid var(--gray-300)",
                fontFamily: "var(--font-ui)",
                fontSize: "var(--text-chrome-sm)",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 ? "var(--gray-50)" : "transparent" }}>
            {columns.map((c) => (
              <td key={c.key} style={{ padding: "6px 10px", borderBottom: "1px solid var(--gray-200)", color: "var(--text-primary)" }}>
                {row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
