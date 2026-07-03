import React from "react";
/**
 * @startingPoint section="Forms" subtitle="Rounded square, fills Aqua blue with a checkmark" viewport="700x120"
 */
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  id?: string;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
