"use client";

import React, { forwardRef, useId } from "react";
import { TestimonialItem } from "@/types";

interface TestimonialCardProps {
  item?: TestimonialItem;
  data?: TestimonialItem;
  className?: string;
  cardBg?: string;
  initialIndex?: number;
  totalLength?: number;
  scrollPosition?: number;
  setScrollPosition?: (pos: number) => void;
}

// Avatar scalloped flower path
const SCALLOP_FLOWER_PATH =
  "M 85.00 50.00 A 18.08 18.08 0 0 1 74.75 74.75 A 18.08 18.08 0 0 1 50.00 85.00 A 18.08 18.08 0 0 1 25.25 74.75 A 18.08 18.08 0 0 1 15.00 50.00 A 18.08 18.08 0 0 1 25.25 25.25 A 18.08 18.08 0 0 1 50.00 15.00 A 18.08 18.08 0 0 1 74.75 25.25 A 18.08 18.08 0 0 1 85.00 50.00 Z";

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ item, data, className = "", cardBg = "bg-white" }, ref) => {
    const cardItem = item || data;
    const reactId = useId();

    if (!cardItem) return null;

    const clipId = `scallop-avatar-${cardItem.id}-${reactId.replace(/:/g, "")}`;

    return (
      <div
        ref={ref}
        className={`group relative flex flex-col justify-between h-full min-h-[230px] sm:min-h-[260px] ${cardBg} text-[#1b2715] rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl p-6 sm:p-7 lg:p-8 pt-5 sm:pt-6 shadow-xl border border-[#1b2715]/10 hover:border-[#feff02] transition-all duration-300 ease-out select-none ${className}`}
      >
        {/* Top avatar and metadata */}
        <div className="flex items-center gap-4 sm:gap-5 -mt-16 sm:-mt-20">
          {/* Scalloped organic flower silhouette */}
          <div className="relative shrink-0 filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20 sm:w-[120px] sm:h-[120px]"
              aria-label={`${cardItem.name} avatar`}
            >
              <defs>
                <clipPath id={clipId}>
                  <path d={SCALLOP_FLOWER_PATH} />
                </clipPath>
              </defs>

              {/* Clipped flower avatar image */}
              <image
                href={cardItem.avatar}
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
              />

              {/* Signature decorative border outline */}
              <path
                d={SCALLOP_FLOWER_PATH}
                fill="none"
                stroke="#feff02"
                strokeWidth="2.5"
                className="opacity-95"
              />
            </svg>
          </div>

          {/* Member name and role */}
          <div className="pt-10 sm:pt-14 flex flex-col justify-center">
            <h4 className="font-poppins font-bold text-xl sm:text-[22px] lg:text-2xl text-[#1b2715] leading-tight tracking-tight group-hover:text-[#121a0d] transition-colors">
              {cardItem.name}
            </h4>
            <p className="font-poppins text-xs sm:text-[13px] font-semibold uppercase tracking-[0.15em] text-[#556350] mt-0.5">
              {cardItem.role}
            </p>
          </div>
        </div>

        {/* Testimonial quote text narrative */}
        <div className="mt-2 sm:mt-3 flex-1 flex flex-col justify-center">
          <p className="font-poppins text-sm sm:text-[15px] text-[#2a3824] leading-relaxed tracking-normal">
            &ldquo;{cardItem.quote}&rdquo;
          </p>
        </div>
      </div>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;
