// Floating glassy Dock — replaces a Windows-style taskbar entirely. Click to
// open/focus an app; a dot under the icon marks it as running.
function DockIcon({ glyph, label, running, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            background: "var(--surface-tooltip)",
            color: "var(--text-on-tooltip)",
            fontFamily: "var(--font-ui)",
            fontSize: "var(--text-body-xs)",
            padding: "3px 8px",
            borderRadius: 5,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
      <button
        onClick={onClick}
        style={{
          width: 46,
          height: 46,
          border: "none",
          background: "transparent",
          fontSize: 30,
          cursor: "pointer",
          transform: hover ? "translateY(-8px) scale(1.12)" : "translateY(0) scale(1)",
          transition: `transform var(--duration-fast) var(--ease-standard)`,
          filter: active ? "none" : "none",
        }}
      >
        {glyph}
      </button>
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: running ? "var(--text-primary)" : "transparent",
          marginTop: 2,
        }}
      />
    </div>
  );
}

const DOCK_APPS = [
  { id: "about", glyph: "📄", label: "About Me" },
  { id: "projects", glyph: "📁", label: "Projects" },
  { id: "blog", glyph: "📰", label: "Blog" },
  { id: "contact", glyph: "✉️", label: "Contact" },
  { id: "resume", glyph: "📋", label: "Resume" },
  { id: "terminal", glyph: "⌨️", label: "Terminal" },
];

function Dock({ openIds, current, onOpen }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        padding: "6px 10px",
        background: "var(--surface-dock)",
        backdropFilter: "blur(20px)",
        borderRadius: 18,
        boxShadow: "var(--shadow-dock), inset 0 1px 0 0 rgba(255,255,255,0.5)",
        zIndex: 900,
      }}
    >
      {DOCK_APPS.map((app) => (
        <DockIcon
          key={app.id}
          glyph={app.glyph}
          label={app.label}
          running={openIds.includes(app.id)}
          active={current === app.id}
          onClick={() => onOpen(app.id)}
        />
      ))}
      <div style={{ width: 1, alignSelf: "stretch", background: "rgba(0,0,0,0.15)", margin: "0 4px" }} />
      <DockIcon glyph="🗑️" label="Trash" running={false} onClick={() => {}} />
    </div>
  );
}
window.Dock = Dock;
