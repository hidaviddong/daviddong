export function TerminalWindow() {
  const lines = [
    { prompt: true, text: "david@hidaviddong ~ % whoami" },
    { text: "david — software engineer, est. 1999" },
    { prompt: true, text: "david@hidaviddong ~ % cat about.txt" },
    { text: "building things that feel like the internet used to." },
    { prompt: true, text: "david@hidaviddong ~ % ls projects/" },
    { text: "autopdf   next-media   98.ui   comments   watchbus" },
    { prompt: true, text: "david@hidaviddong ~ % _" },
  ]

  return (
    <div className="box-border h-[220px] w-full overflow-hidden rounded-md bg-[var(--terminal-bg)] p-3 font-mono2 text-[13px] leading-[1.6]">
      {lines.map((l, i) => (
        <div key={i} className={l.prompt ? "text-terminal-green" : "text-white/75"}>
          {l.text}
        </div>
      ))}
    </div>
  )
}
