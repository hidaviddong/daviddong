import React from "react";
/**
 * @startingPoint section="Overlays" subtitle="Platinum titlebar, traffic-light window controls" viewport="700x260"
 */
export interface WindowFrameProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  width?: number;
  onClose?: () => void;
  active?: boolean;
  footer?: React.ReactNode;
}
export function WindowFrame(props: WindowFrameProps): JSX.Element;
