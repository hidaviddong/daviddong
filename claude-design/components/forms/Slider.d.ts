import React from "react";
export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}
export function Slider(props: SliderProps): JSX.Element;
