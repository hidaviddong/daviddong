import React from "react";
export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
