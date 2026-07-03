import React from "react";

const DOT_GLYPH = { close: "✕", minimize: "−", zoom: "+" };

function TrafficLight({ kind, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  const colors = {
    close: { fill: "var(--traffic-red)", ring: "var(--traffic-red-ring)" },
    minimize: { fill: "var(--traffic-yellow)", ring: "var(--traffic-yellow-ring)" },
    zoom: { fill: "var(--traffic-green)", ring: "var(--traffic-green-ring)" },
  }[kind];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={kind}
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        border: "none",
        padding: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: active ? colors.fill : "var(--traffic-inactive)",
        boxShadow: active ? `inset 0 0 0 0.5px ${colors.ring}` : "inset 0 0 0 0.5px rgba(0,0,0,0.15)",
        cursor: "pointer",
        lineHeight: 1,
      }}
    >
      {hover && active && (
        <span style={{ fontSize: 8, color: "rgba(0,0,0,0.55)", fontFamily: "var(--font-ui)", fontWeight: 700 }}>
          {DOT_GLYPH[kind]}
        </span>
      )}
    </button>
  );
}

export function WindowFrame({ title, icon, children, width = 380, onClose, active = true, footer }) {
  return (
    <div
      style={{
        width,
        background: "var(--surface-window)",
        boxShadow: `var(--shadow-window), var(--bevel-window)`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        fontFamily: "var(--font-ui)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "var(--titlebar-height)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 10px",
          background: active
            ? `linear-gradient(to bottom, var(--surface-titlebar-from), var(--surface-titlebar-to))`
            : `linear-gradient(to bottom, var(--surface-titlebar-inactive-from), var(--surface-titlebar-inactive-to))`,
          borderBottom: "1px solid rgba(0,0,0,0.15)",
          color: "var(--text-on-titlebar)",
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          <TrafficLight kind="close" active={active} onClick={onClose} />
          <TrafficLight kind="minimize" active={active} onClick={() => {}} />
          <TrafficLight kind="zoom" active={active} onClick={() => {}} />
        </div>
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "var(--text-chrome-lg)",
            fontWeight: 600,
            marginRight: 54, /* balances the traffic-light cluster so title optically centers */
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
          {title}
        </span>
      </div>
      <div style={{ padding: 14, flex: 1 }}>{children}</div>
      {footer && (
        <div
          style={{
            height: "var(--statusbar-height)",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            borderTop: "1px solid var(--gray-300)",
            background: "var(--surface-window-alt)",
            fontSize: "var(--text-body-xs)",
            color: "var(--text-secondary)",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
