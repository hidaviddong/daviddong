import React from "react";
export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  fallback?: React.ReactNode;
}
export function Avatar(props: AvatarProps): JSX.Element;
