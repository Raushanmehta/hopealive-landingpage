import React from "react";

interface SunburstIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

export default function SunburstIcon({
  size = 32,
  className = "",
  color = "#feff02",
  ...props
}: SunburstIconProps) {
  // Radial rays angle array
  const rays = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {/* Central circular ring with hole */}
      <circle
        cx="18"
        cy="18"
        r="4.2"
        stroke={color}
        strokeWidth="3"
        fill="none"
      />

      {/* Radiating sunburst ray lines */}
      {rays.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = +(18 + 7.5 * Math.sin(rad)).toFixed(2);
        const y1 = +(18 - 7.5 * Math.cos(rad)).toFixed(2);
        const x2 = +(18 + 15.2 * Math.sin(rad)).toFixed(2);
        const y2 = +(18 - 15.2 * Math.cos(rad)).toFixed(2);

        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
