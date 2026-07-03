const { Separator } = window.HidaviddongDesignSystem_9acf6c;

const POSTS = [
  { date: "1999.03.12", title: "why i still miss the modem sound" },
  { date: "2004.11.02", title: "building my first geocities page" },
  { date: "2026.06.30", title: "bringing Aqua gloss back for the web" },
];

function BlogWindow() {
  return (
    <div style={{ width: 340, fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--text-primary)" }}>
      {POSTS.map((p, i) => (
        <React.Fragment key={i}>
          <div style={{ padding: "8px 0" }}>
            <div style={{ fontFamily: "var(--font-chrome)", fontSize: "var(--text-chrome-sm)", color: "var(--text-link)", textDecoration: "underline", cursor: "pointer" }}>
              {p.title}
            </div>
            <div style={{ fontSize: "var(--text-body-xs)", color: "var(--text-secondary)" }}>{p.date}</div>
          </div>
          {i < POSTS.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
}
window.BlogWindow = BlogWindow;
