// Shared retro-OS style helpers used by every component in this design system.
// Not a component itself (no sibling .d.ts) — just a plain util module.

export const bevelRaised = "var(--bevel-raised)";
export const bevelSunken = "var(--bevel-sunken)";
export const bevelWindow = "var(--bevel-window)";
export const bevelField = "var(--bevel-field)";

export const fontChrome = "var(--font-chrome)";
export const fontBody = "var(--font-body)";
export const fontDisplay = "var(--font-display)";

// Standard "3D button" look: face color + raised bevel, sunken on press.
export function buttonFace({ pressed = false, disabled = false } = {}) {
  return {
    background: "var(--gray-200)",
    boxShadow: pressed ? bevelSunken : bevelRaised,
    border: "none",
    borderRadius: "var(--radius-md)",
    color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
    fontFamily: fontChrome,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };
}

export function fieldFace({ disabled = false } = {}) {
  return {
    background: disabled ? "var(--gray-100)" : "var(--surface-inset)",
    boxShadow: bevelField,
    border: "none",
    borderRadius: "var(--radius-sm)",
    color: "var(--text-primary)",
    fontFamily: fontBody,
  };
}

export function windowFace() {
  return {
    background: "var(--surface-window)",
    boxShadow: `var(--shadow-window), ${bevelWindow}`,
    borderRadius: "var(--radius-lg)",
  };
}
