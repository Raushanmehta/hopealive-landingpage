"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { site, SectionProps, TestimonialsData } from "@/data";
import { animateTestimonialEntrance } from "@/util/animations";

export default function TestimonialSection({
  data: propData,
  className,
}: SectionProps<TestimonialsData> = {}) {
  const data = propData || site.testimonials;
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeLineRef = useRef<SVGLineElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
    };
  }, [api]);

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateTestimonialEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
        carousel: carouselContainerRef.current,
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
      aria-label="HopeAlive Foundation Community Testimonials"
      className="relative w-full bg-[#162211] text-white px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden border-t border-white/5"
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

          {/* Right headline and controls */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Section main heading title */}
            <h2
              ref={headlineRef}
              className="font-poppins font-bold  text-3xl sm:text-5xl md:text-5xl text-white tracking-tight leading-[1.12] select-none"
            >
              <span className="testimonial-headline-line block">
                {data.headline.line1}
              </span>
              {data.headline.line2 && (
                <span className="testimonial-headline-line block">
                  {data.headline.line2}
                </span>
              )}
            </h2>

            {/* Section description narrative text */}
            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#b0bfae] leading-relaxed select-none"
            >
              {data.description}
            </p>

            {/* Carousel navigation button controls */}
            <div className="mt-2 sm:mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous testimonial"
                className="btn-leaf flex items-center justify-center w-12 h-12 rounded-xl bg-[#1f2c16] text-[#feff02] border border-white/10 hover:bg-[#feff02] hover:text-[#121a0d] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              >
                <ArrowLeft size={18} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next testimonial"
                className="btn-leaf flex items-center justify-center w-12 h-12 rounded-xl bg-[#1f2c16] text-[#feff02] border border-white/10 hover:bg-[#feff02] hover:text-[#121a0d] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              >
                <ArrowRight size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials carousel container */}
        <div ref={carouselContainerRef} className="w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            {/* Card container padding offset */}
            <CarouselContent className="-ml-4 sm:-ml-5 pt-12 pb-6">
              {data.items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 sm:pl-5 basis-full md:basis-1/2 lg:basis-1/3 flex"
                >
                  <TestimonialCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
