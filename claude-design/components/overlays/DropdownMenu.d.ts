import React from "react";
export interface DropdownMenuItem {
  label?: React.ReactNode;
  onSelect?: () => void;
  danger?: boolean;
  separator?: boolean;
}
/**
 * @startingPoint section="Overlays" subtitle="Frosted-glass context menu, Aqua-blue row highlight" viewport="700x220"
 */
export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
}
export function DropdownMenu(props: DropdownMenuProps): JSX.Element;
