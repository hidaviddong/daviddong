import React from "react";
export interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}
/**
 * @startingPoint section="Navigation" subtitle="Finder-style rotating disclosure triangle" viewport="700x260"
 */
export interface AccordionProps {
  items: AccordionItem[];
}
export function Accordion(props: AccordionProps): JSX.Element;
