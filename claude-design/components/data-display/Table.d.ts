import React from "react";
export interface TableColumn {
  key: string;
  label: React.ReactNode;
}
/**
 * @startingPoint section="Data display" subtitle="Soft rounded frame, subtle header row, zebra rows" viewport="700x260"
 */
export interface TableProps {
  columns: TableColumn[];
  rows: Record<string, React.ReactNode>[];
}
export function Table(props: TableProps): JSX.Element;
