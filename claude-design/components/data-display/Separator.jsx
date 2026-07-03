import React from "react";

export function Separator({ orientation = "horizontal" }) {
  const horizontal = orientation === "horizontal";
  return (
    <div
      style={{
        width: horizontal ? "100%" : 1,
        height: horizontal ? 1 : "100%",
        background: "var(--gray-300)",
      }}
    />
  );
}
