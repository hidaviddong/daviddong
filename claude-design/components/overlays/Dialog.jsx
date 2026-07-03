import React from "react";
import { WindowFrame } from "./WindowFrame.jsx";

export function Dialog({ open, title, onClose, children, footer, width = 340 }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <WindowFrame title={title} onClose={onClose} width={width} footer={footer}>
          {children}
        </WindowFrame>
      </div>
    </div>
  );
}
