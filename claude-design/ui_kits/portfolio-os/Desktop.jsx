const ICONS = [
  { id: "about", label: "About Me.txt", glyph: "📄" },
  { id: "projects", label: "Projects", glyph: "📁" },
  { id: "blog", label: "Blog.app", glyph: "📰" },
  { id: "contact", label: "Contact.txt", glyph: "✉️" },
  { id: "resume", label: "Resume.pdf", glyph: "📋" },
  { id: "terminal", label: "Terminal", glyph: "⌨️" },
  { id: "trash", label: "Trash", glyph: "🗑️" },
];

function Desktop({ openWindows, onIconOpen, onIconDoubleClickReserved, children }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "var(--surface-desktop)",
        overflow: "hidden",
        fontFamily: "var(--font-chrome)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 44,
          right: 20,
          display: "grid",
          gridTemplateColumns: "repeat(1, 76px)",
          gap: 20,
        }}
      >
        {ICONS.map((icon) => (
          <button
            key={icon.id}
            onDoubleClick={() => onIconOpen(icon.id)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              cursor: "default",
              color: "#fff",
            }}
          >
            <span style={{ fontSize: 30, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}>{icon.glyph}</span>
            <span
              style={{
                fontSize: "var(--text-chrome-sm)",
                textShadow: "0 1px 2px rgba(0,0,0,0.7)",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {icon.label}
            </span>
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
window.Desktop = Desktop;
