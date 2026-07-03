import React from "react";
/**
 * @startingPoint section="Feedback" subtitle="Small pill-shaped status chip" viewport="700x100"
 */
export interface BadgeProps {
  children: React.ReactNode;
  tone?: "default" | "primary" | "success" | "warning" | "danger" | "terminal";
}
export function Badge(props: BadgeProps): JSX.Element;
