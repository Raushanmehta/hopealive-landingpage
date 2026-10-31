"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { site, SectionProps, HeroData } from "@/data";
import { useAppModal } from "@/components/common/ActionModal";
import {
  animateHeroEntrance,
  animateHeroButtonHover,
  animateHeroButtonLeave,
} from "@/util/animations";

export default function HeroSection({ data: propData, className }: SectionProps<HeroData> = {}) {
  const { openModal } = useAppModal();
  const data = propData || site.hero;
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  // GSAP Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateHeroEntrance({
        background: bgRef.current,
        headline: headlineRef.current,
        ctaButton: ctaButtonRef.current,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero Section"
      className={`relative min-h-[100svh] min-h-screen w-full overflow-hidden flex flex-col justify-end pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-10 sm:pb-14 lg:pb-20 bg-[#273813] px-4 md:px-12 ${className || ""}`}
    >
      {/* 1. Cinematic Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      >
        <Image
          src={data.backgroundImage}
          alt="HopeAlive Community Children in Rural Village"
          fill
          priority
          unoptimized
          className="object-cover object-center transform-gpu"
        />

        {/* Top navbar contrast vignette */}
        <div className="absolute inset-x-0 top-0 h-40 sm:h-56 lg:h-64 bg-gradient-to-b from-[#10190d]/90 via-[#10190d]/40 to-transparent pointer-events-none" />

        {/* Ambient dark vignette tint */}
        <div className="absolute inset-0 bg-[#0f170c]/30 pointer-events-none" />

        {/* Bottom blend dark gradient */}
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 lg:h-96 bg-gradient-to-t from-[#141f10] via-[#141f10]/60 to-transparent pointer-events-none" />
      </div>

      {/* Main hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end">
          {/* Left headline text column */}
          <div className="lg:col-span-8">
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[84px] font-poppins font-bold text-white tracking-tight leading-[1.08] select-none break-words"
            >
              <span className="hero-headline-line block">{data.headline.line1}</span>
              {data.headline.line2 && (
                <span className="hero-headline-line block">{data.headline.line2}</span>
              )}
              {data.headline.line3 && (
                <span className="hero-headline-line block">{data.headline.line3}</span>
              )}
            </h1>
          </div>

          {/* Right CTA action column */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end items-end w-full">
            <div className="pt-3 sm:pt-4 lg:pt-6 w-full sm:w-auto">
              <button
                ref={ctaButtonRef}
                type="button"
                onClick={() => openModal(data.cta.label || "Donate to HopeAlive", "Be part of lasting change. Your support funds vital education, nutrition, and relief.")}
                onMouseEnter={() =>
                  animateHeroButtonHover(ctaButtonRef.current, arrowRef.current)
                }
                onMouseLeave={() =>
                  animateHeroButtonLeave(ctaButtonRef.current, arrowRef.current)
                }
                className="btn-leaf group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#ea580c] text-[#ffffff] font-poppins font-semibold text-sm sm:text-[15px] tracking-wide shadow-xl hover:bg-[#c2410c] active:scale-[0.98] transition-all duration-200 cursor-pointer select-none shrink-0"
              >
                <span>{data.cta.label}</span>
                <ArrowUpRight
                  ref={arrowRef}
                  size={18}
                  strokeWidth={2.6}
                  className="transition-transform duration-200 shrink-0"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}