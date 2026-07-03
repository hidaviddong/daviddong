const { Separator } = window.HidaviddongDesignSystem_9acf6c;

// Global menu bar — fixed to the top of the screen (not per-window). The
// left-most glyph is intentionally a generic filled square, NOT an apple —
// this system never reproduces Apple's actual logo. See readme.md.
function MenuBar() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 26,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 14px",
        background: "var(--surface-menubar)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        fontFamily: "var(--font-chrome)",
        fontSize: "var(--text-chrome-md)",
        color: "var(--text-primary)",
        zIndex: 1000,
      }}
    >
      <span style={{ fontSize: 14 }} aria-hidden="true">◆</span>
      <span style={{ fontWeight: 700 }}>hidaviddong</span>
      {["File", "Edit", "View", "Window", "Help"].map((m) => (
        <span key={m} style={{ color: "var(--text-secondary)" }}>{m}</span>
      ))}
      <span style={{ flex: 1 }} />
      <span style={{ color: "var(--text-secondary)" }}>
        {time.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
      </span>
      <span>{time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
    </div>
  );
}
window.MenuBar = MenuBar;
