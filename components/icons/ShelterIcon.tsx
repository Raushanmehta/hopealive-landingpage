import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function ShelterIcon({
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
      {/* Protective Overhanging Shelter Roof */}
      <path d="M3 10.5L12 3l9 7.5" />
      {/* Chimney of Warmth */}
      <path d="M18 5.5v3" />
      {/* Shelter home foundation walls */}
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      {/* Welcoming Arched Doorway */}
      <path d="M9.5 21v-5.5a2.5 2.5 0 0 1 5 0V21" />
      {/* Cozy Window of Hope */}
      <circle cx="12" cy="9" r="1.5" />
    </svg>
  );
}
