"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { site, SectionProps, AboutData } from "@/data";
import { useAppModal } from "@/components/common/ActionModal";
import {
  animateAboutEntrance,
  animateAboutButtonHover,
  animateAboutButtonLeave,
} from "@/util/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutSectionProps extends SectionProps<AboutData> {
  showCta?: boolean;
}

export default function AboutSection({
  data: propData,
  className,
  showCta = true,
}: AboutSectionProps = {}) {
  const { openModal } = useAppModal();
  const data = propData || site.about;
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeLineRef = useRef<SVGLineElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const imagePlantingRef = useRef<HTMLDivElement>(null);
  const imageSeedlingRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateAboutEntrance(sectionRef.current, {
        badge: badgeRef.current,
        stats: statsRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        ctaButton: ctaButtonRef.current,
        imagePlanting: imagePlantingRef.current,
        imageSeedling: imageSeedlingRef.current,
      });

      // Animate straight line drawing under the badge
      if (badgeLineRef.current) {
        gsap.fromTo(
          badgeLineRef.current,
          {
            strokeDasharray: 120,
            strokeDashoffset: 120,
          },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: badgeRef.current || sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Smooth animated number counter
      const rawValue = data.stats.value || "250K+";
      const match = rawValue.match(/^(\d+)(.*)$/);
      const targetNum = match ? parseInt(match[1], 10) : 250;
      const suffix = match ? match[2] : "K+";

      let lastInt = -1;
      const counterObj = { value: 0 };

      gsap.to(counterObj, {
        value: targetNum,
        duration: 2.6,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: statsRef.current || sectionRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          const currentInt = Math.round(counterObj.value);
          if (currentInt !== lastInt) {
            lastInt = currentInt;
            if (counterRef.current) {
              counterRef.current.textContent = `${currentInt}${suffix}`;
            }
          }
        },
        onComplete: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${targetNum}${suffix}`;
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data.stats.value]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About HopeAlive Foundation"
      className="relative w-full bg-[#f8f6f0] text-[#240f00]  px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header content grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left badge stat column */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
            {/* Organic Capsule Badge */}
            <div
              ref={badgeRef}
              className="inline-flex flex-col items-start w-fit select-none"
            >
              <span className=" text-sm lg:text-lg font-poppins font-medium  text-[#240f00]">
                {data.badge.text}
              </span>
              <svg
                width="120"
                height="8"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-1 pointer-events-none w-full max-w-[90px] overflow-visible"
              >
                <line
                  ref={badgeLineRef}
                  x1="2"
                  y1="4"
                  x2="118"
                  y2="4"
                  stroke="#ea580c"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Statistics counter value block */}
            <div ref={statsRef} className="mt-12 sm:mt-16 lg:mt-auto pt-4">
              <div className="font-poppins font-bold text-6xl sm:text-7xl lg:text-[84px] xl:text-[92px] tracking-tight text-[#240f00] leading-none select-none tabular-nums">
                <span ref={counterRef}>0{data.stats.value.replace(/^\d+/, "") || "K+"}</span>
              </div>
              <div className="mt-2 font-poppins font-semibold text-xs sm:text-[13px] uppercase tracking-[0.16em] text-[#6b584c] select-none">
                {data.stats.label}
              </div>
            </div>
          </div>

          {/* Right headline narrative column */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Section main heading title */}
            <h2
              ref={headlineRef}
              className="font-poppins font-bold text-3xl sm:text-5xl md:text-5xl text-[#240f00] tracking-tight leading-[1.12] select-none"
            >
              <span className="about-headline-line block">{data.headline.line1}</span>
              {data.headline.line2 && (
                <span className="about-headline-line block">{data.headline.line2}</span>
              )}

            </h2>

            {/* Description narrative paragraph text */}
            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#6b584c] leading-relaxed select-none"
            >
              {data.description}
            </p>

            {/* Action link button element */}
            {showCta && data.cta && (
              <div className="mt-3 sm:mt-6">
                <button
                  ref={ctaButtonRef}
                  type="button"
                  onClick={() => openModal(data.cta.label || "Learn More About HopeAlive", "Discover how we work with local communities to bring hope, clean water, and education.")}
                  onMouseEnter={() =>
                    animateAboutButtonHover(ctaButtonRef.current, arrowRef.current)
                  }
                  onMouseLeave={() =>
                    animateAboutButtonLeave(ctaButtonRef.current, arrowRef.current)
                  }
                  className="btn-leaf inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#331600] text-[#ea580c] font-poppins font-semibold text-sm sm:text-[15px] tracking-wide rounded-xl shadow-lg hover:bg-[#240f00] active:scale-[0.98] transition-all duration-200 cursor-pointer select-none"
                >
                  <span>{data.cta.label}</span>
                  <ArrowUpRight
                    ref={arrowRef}
                    size={18}
                    strokeWidth={2.6}
                    className="transition-transform duration-200 shrink-0 text-[#ea580c]"
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Featured images row layout */}
        <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* Wide featured impact image */}
          <div
            ref={imagePlantingRef}
            className="lg:col-span-9 relative min-h-[400px] sm:min-h-[410px] md:min-h-[430px] lg:min-h-[450px] rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none overflow-hidden shadow-2xl group"
          >
            <Image
              src={data.images.planting.src}
              alt={data.images.planting.alt}
              fill
              unoptimized
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Natural sunlight image vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Vertical secondary impact image */}
          <div
            ref={imageSeedlingRef}
            className="lg:col-span-3 relative min-h-[400px] sm:min-h-[410px] md:min-h-[430px] lg:min-h-[450px] rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl group"
          >
            <Image
              src={data.images.seedling.src}
              alt={data.images.seedling.alt}
              fill
              unoptimized
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Warm glow image vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
