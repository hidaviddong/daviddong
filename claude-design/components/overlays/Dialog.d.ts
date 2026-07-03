import React from "react";
/**
 * @startingPoint section="Overlays" subtitle="Modal window over a dimmed scrim" viewport="700x300"
 */
export interface DialogProps {
  open: boolean;
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}
export function Dialog(props: DialogProps): JSX.Element;
