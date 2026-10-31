import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function EmergencyAidIcon({
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
      {/* Central Heart of Humanitarian Compassion */}
      <path d="M12 7.5c-1.5-2.5-4.5-2.5-6 0-1.8 3 1.5 5.5 6 9.5 4.5-4 7.8-6.5 6-9.5-1.5-2.5-4.5-2.5-6 0Z" />
      {/* Emergency First-Aid Cross on Heart */}
      <path d="M12 8.5v3" />
      <path d="M10.5 10h3" />
      {/* Supporting Hands Cradle underneath */}
      <path d="M4 16.5c2 2.5 5 4.5 8 4.5s6-2 8-4.5" />
      <path d="M2 13.5l2 3" />
      <path d="M22 13.5l-2 3" />
    </svg>
  );
}
