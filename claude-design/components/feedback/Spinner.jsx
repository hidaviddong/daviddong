import React from "react";

const TICKS = 8;

// The classic macOS indeterminate spinner: 8 radial ticks fading in sequence
// around a circle — not a spinning ring, and not a DOS/ASCII spinner.
export function Spinner({ size = 20 }) {
  const [frame, setFrame] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % TICKS), 100);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      role="img"
      aria-label="loading"
      style={{ position: "relative", display: "inline-block", width: size, height: size }}
    >
      {Array.from({ length: TICKS }).map((_, i) => {
        const angle = (360 / TICKS) * i;
        const distance = (i - frame + TICKS) % TICKS;
        const opacity = 1 - distance / TICKS;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: size * 0.09,
              height: size * 0.28,
              borderRadius: size * 0.045,
              background: "var(--text-secondary)",
              opacity: Math.max(0.15, opacity),
              transform: `translate(-50%, -${size * 0.42}px) rotate(${angle}deg)`,
              transformOrigin: `50% ${size * 0.42}px`,
            }}
          />
        );
      })}
    </span>
  );
}
