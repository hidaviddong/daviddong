// Terminal.app easter egg — a real feature Mac OS X shipped from day one,
// so a static shell transcript here is period-accurate (not just decorative
// pixel nostalgia). Purely cosmetic — no code actually executes.
function TerminalWindow() {
  const lines = [
    { prompt: true, text: "david@hidaviddong ~ % whoami" },
    { text: "david — software engineer, est. 1999" },
    { prompt: true, text: "david@hidaviddong ~ % cat about.txt" },
    { text: "building things that feel like the internet used to." },
    { prompt: true, text: "david@hidaviddong ~ % ls projects/" },
    { text: "retro-shell   aqua-ui-kit   dial-up.fm" },
    { prompt: true, text: "david@hidaviddong ~ % _" },
  ];
  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        height: 220,
        background: "var(--terminal-bg)",
        borderRadius: 6,
        padding: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        lineHeight: 1.6,
        overflow: "hidden",
      }}
    >
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.prompt ? "var(--terminal-green)" : "rgba(255,255,255,0.75)" }}>
          {l.text}
        </div>
      ))}
    </div>
  );
}
window.TerminalWindow = TerminalWindow;
