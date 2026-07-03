import React from "react";
/**
 * @startingPoint section="Overlays" subtitle="Frosted-glass flyout panel" viewport="700x220"
 */
export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export function Popover(props: PopoverProps): JSX.Element;
