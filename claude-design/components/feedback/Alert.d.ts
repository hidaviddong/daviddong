import React from "react";
/**
 * @startingPoint section="Feedback" subtitle="Boxed system message, era icon glyph" viewport="700x140"
 */
export interface AlertProps {
  tone?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  children: React.ReactNode;
}
export function Alert(props: AlertProps): JSX.Element;
