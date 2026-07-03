import React from "react";
export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  style?: React.CSSProperties;
}
export function Label(props: LabelProps): JSX.Element;
