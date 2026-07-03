import React from "react";
export interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: React.ReactNode;
  disabled?: boolean;
}
export function Toggle(props: ToggleProps): JSX.Element;

export interface ToggleGroupOption {
  value: string;
  label: React.ReactNode;
}
export interface ToggleGroupProps {
  options: ToggleGroupOption[];
  value: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
}
export function ToggleGroup(props: ToggleGroupProps): JSX.Element;
