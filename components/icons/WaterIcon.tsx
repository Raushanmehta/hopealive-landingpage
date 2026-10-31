import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export default function WaterIcon({
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
      {/* Central Pure Water Droplet */}
      <path d="M12 2.5C12 2.5 5 11 5 16a7 7 0 0 0 14 0c0-5-7-13.5-7-13.5Z" />
      {/* Light Reflection / Glisten Curve */}
      <path d="M15.5 13.5a4 4 0 0 1-3.5 3.5" opacity="0.6" />
      {/* Fresh Water Surface Waves */}
      <path d="M3 21.5c2.5-.8 5 .8 7.5 0s5 .8 7.5 0 3-.5 3-.5" />
    </svg>
  );
}
