import React from "react";
export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
}
/**
 * @startingPoint section="Navigation" subtitle="Rounded segmented control (System Preferences style)" viewport="700x220"
 */
export interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange?: (value: string) => void;
}
export function Tabs(props: TabsProps): JSX.Element;
