import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function NutritionIcon({
  size = 40,
  className = "",
  strokeWidth = 1.8,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Nourishing food bowl body */}
      <path d="M2.5 11h19c0 5.2-4.1 9.5-9.5 9.5s-9.5-4.3-9.5-9.5Z" />
      {/* Bowl Stand / Base */}
      <path d="M8 20.5h8" />
      {/* Central Care Heart */}
      <path d="M12 13.8l-1.9-1.9a1.3 1.3 0 0 1 1.9-1.8 1.3 1.3 0 0 1 1.9 1.8L12 13.8Z" />
      {/* Rising nutrition steam lines */}
      <path d="M7.5 4c0 1.8 1.5 2.8 1.5 4" />
      <path d="M12 2.5c0 2 1.8 3.2 1.8 5" />
      <path d="M16.5 4c0 1.8-1.5 2.8-1.5 4" />
    </svg>
  );
}
