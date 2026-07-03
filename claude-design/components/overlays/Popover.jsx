import React from "react";

export function Popover({ trigger, children, open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
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
      <span onClick={() => setOpen(!open)}>{trigger}</span>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            minWidth: 200,
            background: "rgba(250,250,252,0.9)",
            backdropFilter: "blur(20px)",
            boxShadow: "var(--shadow-menu)",
            borderRadius: "var(--radius-lg)",
            padding: 12,
            fontFamily: "var(--font-ui)",
            zIndex: 30,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
