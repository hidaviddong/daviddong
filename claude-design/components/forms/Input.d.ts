import React from "react";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
