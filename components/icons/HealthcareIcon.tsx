import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function HealthcareIcon({
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
      {/* Protective Shelter Roof */}
      <path d="M2.5 10L12 2.5 21.5 10" />
      {/* Home / Shelter Walls */}
      <path d="M5 9.5V20a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V9.5" />
      {/* Medical healthcare cross icon */}
      <circle cx="12" cy="14.5" r="4" opacity="0.4" />
      <path d="M12 12v5" />
      <path d="M9.5 14.5h5" />
    </svg>
  );
}
