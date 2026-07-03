import React from "react";
export interface SelectOption {
  value: string;
  label: React.ReactNode;
}
/**
 * @startingPoint section="Forms" subtitle="Rounded field, frosted flyout menu" viewport="700x220"
 */
export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}
export function Select(props: SelectProps): JSX.Element;
