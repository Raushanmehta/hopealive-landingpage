"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { site, SectionProps, ProjectsData, ProjectItem } from "@/data";
import ProjectCard from "@/components/cards/ProjectCard";
import { animateProjectEntrance } from "@/util/animations";

export default function ProjectSection({
  data: propData,
  className,
}: SectionProps<ProjectsData> = {}) {
  const data = propData || site.projects;
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeLineRef = useRef<SVGLineElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
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
      animateProjectEntrance(sectionRef.current, {
        badge: badgeRef.current,
        headline: headlineRef.current,
        description: descriptionRef.current,
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

  const projects = data.projectsList || (data as any).items || [];

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="HopeAlive Foundation Key Impact Projects"
      className="relative w-full bg-[#f8f6f0] text-[#273813] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
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
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#273813]">
                {data.badge.text}
              </span>
              <svg
                width="120"
                height="8"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-1 pointer-events-none w-full max-w-[120px] overflow-visible"
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
          </div>

          {/* Right headline and controls */}
          <div className="lg:col-span-8 flex flex-col">
            <h2
              ref={headlineRef}
              className="font-poppins font-bold text-3xl sm:text-5xl md:text-5xl  text-[#273813] tracking-tight leading-[1.12] select-none"
            >
              <span className="project-headline-line block">
                {data.headline.line1}
              </span>
              {data.headline.line2 && (
                <span className="project-headline-line block">
                  {data.headline.line2}
                </span>
              )}
            </h2>

            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none"
            >
              {data.description}
            </p>

            {/* Carousel navigation controls */}
            <div className="mt-3 sm:mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous projects"
                className="btn-leaf flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#365314] text-[#ea580c] border border-black/10 hover:bg-[#273813] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              >
                <ArrowLeft size={18} strokeWidth={2.4} />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next projects"
                className="btn-leaf flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#365314] text-[#ea580c] border border-black/10 hover:bg-[#273813] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              >
                <ArrowRight size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>

        {/* Feature project cards carousel */}
        <div className="w-full mt-6 sm:mt-8">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4 sm:-ml-5 pb-6">
              {projects.map((item: ProjectItem, index: number) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 sm:pl-5 basis-full md:basis-1/2 lg:basis-1/3 flex"
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="w-full h-full"
                  >
                    <ProjectCard item={item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}