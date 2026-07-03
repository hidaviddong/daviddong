import React from "react";
/**
 * @startingPoint section="Forms" subtitle="Rounded pill track, gloss knob, Aqua blue when on" viewport="700x120"
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}
export function Switch(props: SwitchProps): JSX.Element;
