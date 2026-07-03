import React from "react";

export function DropdownMenu({ trigger, items }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            minWidth: 170,
            background: "rgba(250,250,252,0.9)",
            backdropFilter: "blur(20px)",
            boxShadow: "var(--shadow-menu)",
            borderRadius: "var(--radius-md)",
            padding: 5,
            zIndex: 30,
            fontFamily: "var(--font-ui)",
          }}
        >
          {items.map((item, i) =>
            item.separator ? (
              <div key={i} style={{ height: 1, background: "var(--gray-300)", margin: "4px 6px" }} />
            ) : (
              <div
                key={i}
                onClick={() => {
                  item.onSelect && item.onSelect();
                  setOpen(false);
                }}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  fontSize: "var(--text-body-md)",
                  color: item.danger ? "var(--signal-red)" : "var(--text-primary)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-500)", e.currentTarget.style.color = "var(--text-on-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent", e.currentTarget.style.color = item.danger ? "var(--signal-red)" : "var(--text-primary)")}
              >
                {item.label}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
