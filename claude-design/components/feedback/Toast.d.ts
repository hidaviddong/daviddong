import React from "react";
/**
 * @startingPoint section="Feedback" subtitle="Frosted-glass notification banner" viewport="700x140"
 */
export interface ToastProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
}
export function Toast(props: ToastProps): JSX.Element;
