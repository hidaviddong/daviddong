import React from "react";

/**
 * @startingPoint section="Forms" subtitle="Glossy pill button, Aqua-blue primary" viewport="700x200"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. `primary` = solid Aqua gloss-blue action button. `link` looks like classic blue hypertext. */
  variant?: "default" | "primary" | "outline" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
