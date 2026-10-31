"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowUpRight, HelpCircle, CheckCircle2 } from "lucide-react";
import { site, SectionProps, FaqsData, FaqItem } from "@/data";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FaqSection({
  data: propData,
  className,
}: SectionProps<FaqsData> = {}) {
  const data = propData || site.faqs;
  const faqsList: FaqItem[] = data?.faqsList || [];

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeLineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // Active accordion item state
  const [openId, setOpenId] = useState<string>(faqsList[0]?.id || "faq-1");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      ref={sectionRef}
      id="faqs"
      aria-label="HopeAlive Foundation Frequently Asked Questions"
      className="relative w-full bg-[#f8f6f0] text-[#273813] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header content grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left badge column wrapper */}
          <div className="lg:col-span-4 flex flex-col justify-start self-stretch">
            <div
              ref={badgeRef}
              className="inline-flex flex-col items-start w-fit select-none"
            >
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#273813]">
                {data.badge.text}
              </span>
              <svg
                width="120"
                height="8"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-1 pointer-events-none w-full max-w-[50px] overflow-visible"
              >
                <line
                  ref={badgeLineRef}
                  x1="2"
                  y1="4"
                  x2="118"
                  y2="4"
                  stroke="#ea580c"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Right headline and narrative */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Section main heading title */}
            <h2 className="font-poppins font-bold text-3xl sm:text-5xl md:text-5xl text-[#273813] tracking-tight leading-[1.12] select-none">
              <span className="block">{data.headline.line1}</span>
              {data.headline.line2 && (
                <span className="block">{data.headline.line2}</span>
              )}
            </h2>

            {/* Description narrative paragraph text */}
            <p className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none">
              {data.description}
            </p>
          </div>
        </div>

        {/* Accordion FAQ item list */}
        <div className="mt-4 sm:mt-6 lg:mt-8 space-y-4 ">
          {faqsList.map((item: FaqItem) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none bg-white transition-all duration-300 border ${isOpen
                  ? "border-[#331600] shadow-lg shadow-black/[0.04]"
                  : "border-[#273813]/10 shadow-sm hover:border-[#273813]/25"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-7 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                    <span
                      className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${isOpen
                        ? "bg-[#331600] text-[#ea580c]"
                        : "bg-[#f8f6f0] text-[#273813] group-hover:bg-[#331600] group-hover:text-[#ea580c]"
                        }`}
                    >
                      <HelpCircle size={18} strokeWidth={2.2} />
                    </span>
                    <h3 className="font-poppins font-bold text-base sm:text-lg lg:text-xl text-[#273813] leading-snug group-hover:text-[#2d5a27] transition-colors">
                      {item.question}
                    </h3>
                  </div>

                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen
                      ? "rotate-180 bg-[#331600] text-[#ea580c]"
                      : "bg-[#f8f6f0] text-[#273813] group-hover:bg-[#331600]/10"
                      }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.4} />
                  </span>
                </button>

                {/* Animated dropdown answer container */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-350 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 350ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-[#273813]/5">
                      <p className="font-poppins text-sm sm:text-[15px] text-[#556350] leading-relaxed">
                        {item.answer}
                      </p>
                      {item.category && (
                        <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-poppins font-semibold uppercase tracking-wider text-[#273813]/60 bg-[#f8f6f0] px-3 py-1 rounded-md">
                          <CheckCircle2 size={13} className="text-[#2d5a27]" />
                          <span>Topic: {item.category}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom help CTA banner */}
        {data.cta && (
          <div className="mt-8 sm:mt-10 lg:mt-12 bg-[#331600] text-white p-8 sm:p-10 lg:p-12 rounded-tl-[80px] rounded-br-[80px] rounded-tr-none rounded-bl-none shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 border border-white/10 select-none">
            <div className="flex-1 text-left">
              <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {data.cta.title}
              </h3>
              <p className="mt-2 font-poppins text-sm sm:text-base text-[#a8b3a4] max-w-xl leading-relaxed">
                {data.cta.description}
              </p>
            </div>

            <Link
              href={data.cta.buttonHref}
              className="btn-leaf inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#ea580c] text-[#ffffff] font-poppins font-semibold text-sm sm:text-[15px] tracking-wide rounded-xl shadow-lg hover:bg-white active:scale-[0.98] transition-all duration-200 cursor-pointer shrink-0 select-none"
            >
              <span>{data.cta.buttonText}</span>
              <ArrowUpRight size={18} strokeWidth={2.4} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}