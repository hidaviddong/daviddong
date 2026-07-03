import React from "react";
/**
 * @startingPoint section="Data display" subtitle="Rounded panel, soft shadow, optional header strip" viewport="700x220"
 */
export interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
