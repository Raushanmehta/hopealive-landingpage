"use client";

import React, { forwardRef } from "react";
import { CauseItem } from "@/types";
import { useAppModal } from "@/components/common/ActionModal";
import {
  NutritionIcon,
  EducationIcon,
  HealthcareIcon,
  ShelterIcon,
  WaterIcon,
  MedicalIcon,
  EmergencyAidIcon,
} from "@/components/icons";

interface CausesCardProps {
  item?: CauseItem;
  cause?: CauseItem;
  isActive?: boolean;
  onSelect?: () => void;
  onLeave?: () => void;
  className?: string;
}

export const CausesCard = forwardRef<HTMLDivElement, CausesCardProps>(
  ({ item, cause, isActive = false, onSelect, onLeave, className = "" }, ref) => {
    const { openModal } = useAppModal();
    const cardData = cause || item;
    if (!cardData) return null;

    // Choose appropriate cause icon
    const renderIcon = (title: string, iconName: string = "", active: boolean) => {
      const t = (title || "").toLowerCase();
      const icon = (iconName || "").toLowerCase();

      const iconProps = {
        size: 42,
        strokeWidth: 1.8,
        className: `transition-transform duration-300 transform group-hover:scale-110 ${active ? "text-[#ffffff]" : "text-white"
          }`,
      };

      // Shelter humanitarian cause icon
      if (
        t.includes("shelter") ||
        t.includes("homeless") ||
        t.includes("home") ||
        icon === "shelter"
      ) {
        return <ShelterIcon {...iconProps} />;
      }

      // Clean drinking water icon
      if (
        t.includes("water") ||
        t.includes("drinking") ||
        t.includes("well") ||
        icon === "water"
      ) {
        return <WaterIcon {...iconProps} />;
      }

      // Education and school icon
      if (
        t.includes("education") ||
        t.includes("school") ||
        t.includes("book") ||
        t.includes("literacy") ||
        icon === "education"
      ) {
        return <EducationIcon {...iconProps} />;
      }

      // Emergency relief aid icon
      if (
        t.includes("emergency") ||
        t.includes("relief") ||
        (t.includes("aid") && !t.includes("medical")) ||
        icon === "emergency"
      ) {
        return <EmergencyAidIcon {...iconProps} />;
      }

      // Nutrition and meals icon
      if (
        t.includes("meal") ||
        t.includes("food") ||
        t.includes("nutrition") ||
        icon === "nutrition"
      ) {
        return <NutritionIcon {...iconProps} />;
      }

      // Mobile healthcare medical icon
      if (
        t.includes("health") ||
        t.includes("medical") ||
        t.includes("medicine") ||
        t.includes("doctor") ||
        icon === "healthcare"
      ) {
        return <MedicalIcon {...iconProps} />;
      }

      // Default healthcare fallback icon
      return <HealthcareIcon {...iconProps} />;
    };

    return (
      <div
        ref={ref}
        onClick={() => {
          onSelect?.();
          openModal(cardData.title, cardData.description);
        }}
        onMouseEnter={onSelect}
        onMouseLeave={onLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelect?.();
            openModal(cardData.title, cardData.description);
          }
        }}
        className={`group relative flex flex-col justify-between min-h-[390px] sm:min-h-[420px] p-8 sm:p-9 lg:p-10 rounded-tl-[54px] sm:rounded-tl-[64px] rounded-br-[54px] sm:rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl shadow-xl transition-all duration-500 ease-out cursor-pointer select-none ${isActive
            ? "bg-[#ea580c] text-[#ffffff] scale-[1.01] shadow-2xl shadow-[#ea580c]/15"
            : "bg-[#331600] text-white border border-white/10 hover:border-white/25 hover:bg-[#401c00]"
          } ${className}`}
      >
        {/* Card header title icon */}
        <div className="flex items-start justify-between gap-4 w-full">
          <h3
            className={`font-poppins font-bold text-2xl sm:text-[28px] lg:text-[32px] tracking-tight leading-[1.15] max-w-[210px] ${isActive ? "text-[#ffffff]" : "text-white"
              }`}
          >
            {cardData.title}
          </h3>

          <div className="shrink-0 p-1">
            {renderIcon(cardData.title, cardData.icon, isActive)}
          </div>
        </div>

        {/* Cause narrative description paragraph */}
        <div className="mt-12 sm:mt-16">
          <p
            className={`font-poppins text-sm sm:text-[15px] leading-relaxed transition-colors duration-300 ${isActive
                ? "text-[#ffffff]/90 font-medium"
                : "text-[#c4b1a6] font-normal"
              }`}
          >
            {cardData.description}
          </p>
        </div>
      </div>
    );
  }
);

CausesCard.displayName = "CausesCard";

export default CausesCard;
