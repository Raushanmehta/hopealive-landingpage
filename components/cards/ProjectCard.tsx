"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/types";
import { useAppModal } from "@/components/common/ActionModal";

interface ProjectCardProps {
  item?: ProjectItem;
  project?: ProjectItem;
  className?: string;
  sectionRef?: any;
  imageAnimRef?: any;
  contentAnimRef?: any;
  linkAnimRef?: any;
}

// Project card component display
export default function ProjectCard({
  item,
  project,
  className = "",
}: ProjectCardProps) {
  const { openModal } = useAppModal();
  const currentItem = item || project;
  const arrowRef = useRef<SVGSVGElement>(null);

  if (!currentItem) return null;

  return (
    <div
      onClick={() => openModal(currentItem.title || currentItem.ctaText || "Support Project", currentItem.description || "Get involved in this community impact project today.")}
      className="block group h-full cursor-pointer"
    >
      <div
        className={`relative flex flex-col justify-between min-h-[490px] sm:min-h-[530px] pt-9 sm:pt-11 pb-6 sm:pb-7 lg:pb-8 select-none transition-all duration-500 ease-out group-hover:-translate-y-2 drop-shadow-2xl ${className}`}
      >
        {/* Card background shape container */}
        <svg
          viewBox="0 0 340 500"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full -z-10 text-[#273813] overflow-visible"
        >
          {/* Silhouette leaf curve path */}
          <path
            d="M 0 64 A 36 36 0 0 1 36 28 L 150 28 C 162 28 162 0 174 0 L 304 0 A 36 36 0 0 1 340 36 L 340 420 A 80 80 0 0 1 260 500 L 40 500 A 40 40 0 0 1 0 460 Z"
            fill="currentColor"
          />

          {/* Faceted decorative angled stripes */}
          <path
            d="M 0 85 L 340 55 L 340 145 L 0 175 Z"
            fill="#ffffff"
            opacity="0.05"
          />
          <path
            d="M 0 210 L 340 185 L 340 265 L 0 290 Z"
            fill="#ea580c"
            opacity="0.08"
          />
          <path
            d="M 0 330 L 340 350 L 340 415 L 0 405 Z"
            fill="#000000"
            opacity="0.25"
          />
        </svg>

        {/* Project title and subtitle */}
        <div className="text-center pt-2 sm:pt-3 px-6 sm:px-7 lg:px-8">
          <h3 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-[34px] tracking-tight text-white group-hover:text-[#ea580c] transition-colors duration-300 leading-tight">
            {currentItem.title}
          </h3>
          {currentItem.subtitle && (
            <p className="font-poppins font-medium text-xs sm:text-[13px] text-[#ea580c] mt-1.5 tracking-wide">
              {currentItem.subtitle}
            </p>
          )}
        </div>

        {/* Center project preview image */}
        <div className="relative w-full h-[200px] sm:h-[220px] my-auto flex items-center justify-center overflow-hidden">
          <Image
            src={currentItem.image}
            alt={currentItem.alt}
            fill
            unoptimized
            className="object-cover object-center w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.5)]"
          />
          {/* Ambient image gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#273813]/50 via-transparent to-[#273813]/25 pointer-events-none" />
        </div>

        {/* Project short description text */}
        {currentItem.description && (
          <p className="font-poppins text-xs sm:text-[13px] text-[#b0bfae] leading-relaxed line-clamp-2 px-6 sm:px-7 lg:px-8 text-center my-2 select-none">
            {currentItem.description}
          </p>
        )}

        {/* Bottom action button container */}
        <div className="w-full px-6 sm:px-7 lg:px-8">
          <div className="w-full bg-[#ea580c] rounded-full p-2 sm:p-2.5 pl-5 sm:pl-6 flex items-center justify-between gap-3 shadow-lg border border-black/10 transition-colors duration-300 group-hover:bg-[#c2410c]">
            <span className="font-poppins text-xs sm:text-[16px] text-[#ffffff] font-semibold tracking-normal">
              {currentItem.ctaText}
            </span>

            {/* Action link arrow icon */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#273813] flex items-center justify-center shrink-0 shadow-md group-hover:bg-black transition-all duration-300">
              <ArrowUpRight
                ref={arrowRef}
                size={20}
                strokeWidth={2.8}
                className="text-[#ea580c] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
