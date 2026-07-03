import React from "react";
export interface RadioOption {
  value: string;
  label: React.ReactNode;
}
export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}
export function RadioGroup(props: RadioGroupProps): JSX.Element;
