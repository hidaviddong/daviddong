const { Badge, Separator } = window.HidaviddongDesignSystem_9acf6c;

function AboutWindow() {
  return (
    <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-md)", color: "var(--text-primary)", display: "flex", flexDirection: "column", gap: 10, width: 340 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 48, height: 48, background: "var(--gray-200)", boxShadow: "var(--bevel-raised)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-chrome)", fontSize: 22 }}>D</div>
        <div>
          <div style={{ fontFamily: "var(--font-chrome)", fontSize: "var(--text-chrome-md)" }}>hidaviddong</div>
          <Badge tone="terminal">est. 1999</Badge>
        </div>
      </div>
      <Separator />
      <p style={{ margin: 0, lineHeight: "var(--leading-normal)" }}>
        Software engineer, born in '99. Building things that feel like the internet used to —
        beige boxes turned glossy blue, dial-up patience, and a desktop you actually decorate.
      </p>
      <p style={{ margin: 0, color: "var(--text-secondary)" }}>Double-click the icons to explore.</p>
    </div>
  );
}
window.AboutWindow = AboutWindow;
