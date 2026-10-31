import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function MedicalIcon({
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
      {/* Medical first aid badge */}
      <path d="M12 2v5" />
      <path d="M9.5 4.5h5" />
      {/* Heartbeat EKG Pulse Line */}
      <path d="M3 14h3.5l2-4 3.5 8 2.5-5 1.5 2H21" />
      {/* Pediatric & Mobile Stethoscope Curve */}
      <circle cx="19" cy="18" r="2.5" />
      <path d="M16.5 18c0-3-2-5-5-5" opacity="0.5" />
    </svg>
  );
}
