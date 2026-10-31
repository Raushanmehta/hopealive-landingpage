import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function EducationIcon({
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
      {/* Open book spine pages */}
      <path d="M2 4.5C4.5 3.5 7.5 3.5 12 5c4.5-1.5 7.5-1.5 10-.5v14c-2.5-1-5.5-1-10 .5-4.5-1.5-7.5-1.5-10-.5v-14Z" />
      {/* Center Binding Line */}
      <path d="M12 5v14" />
      {/* Left Page Text/Knowledge Lines */}
      <path d="M5.5 8.5c1.6-.6 3.4-.6 6.5.3" />
      <path d="M5.5 12c1.6-.6 3.4-.6 6.5.3" />
      {/* Right Page Text/Knowledge Lines */}
      <path d="M18.5 8.5c-1.6-.6-3.4-.6-6.5.3" />
      <path d="M18.5 12c-1.6-.6-3.4-.6-6.5.3" />
    </svg>
  );
}
