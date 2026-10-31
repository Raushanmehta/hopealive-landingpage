"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site, SectionProps, CausesData, CauseItem } from "@/data";
import { animateCausesEntrance } from "@/util/animations";
import CausesCard from "@/components/cards/CausesCard";

export default function CausesSection({
  data: propData,
  className,
}: SectionProps<CausesData> = {}) {
  const data = propData || site.causes;
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeLineRef = useRef<SVGLineElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active card item on hover/select (default null: koi card pehle se active nahi rahega)
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateCausesEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        ctaButton: ctaButtonRef.current,
        cards: cardRefs.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="High-Impact NGO Programs and Causes"
      className="relative w-full bg-[#162211] text-white px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header content grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left badge column wrapper */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch">
            <div
              ref={badgeRef}
              className="inline-flex flex-col items-start w-fit select-none"
            >
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#feff02]">
                {data.badge.text}
              </span>
              <svg
                width="120"
                height="8"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-1 pointer-events-none w-full max-w-[110px] overflow-visible"
              >
                <line
                  ref={badgeLineRef}
                  x1="2"
                  y1="4"
                  x2="118"
                  y2="4"
                  stroke="#feff02"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Right headline and narrative */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Section main heading title */}
            <h2
              ref={headlineRef}
              className="font-poppins font-bold  text-3xl sm:text-5xl md:text-5xl text-white tracking-tight leading-[1.12] select-none"
            >
              <span className="causes-headline-line block">
                {data.headline.line1}
              </span>
              {data.headline.line2 && (
                <span className="causes-headline-line block">
                  {data.headline.line2}
                </span>
              )}
            </h2>

            {/* Description narrative paragraph text */}
            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#b0bfae] leading-relaxed select-none"
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* Feature cause cards grid */}
        <div
          className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch"
          onMouseLeave={() => setActiveCardId(null)}
        >
          {data.items.slice(0, 3).map((item: CauseItem, index: number) => (
            <CausesCard
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              item={item}
              isActive={activeCardId === item.id}
              onSelect={() => setActiveCardId(item.id)}
              onLeave={() => setActiveCardId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}