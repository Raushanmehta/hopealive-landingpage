"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { site, SectionProps, BlogData } from "@/data";
import { BlogPostItem } from "@/types";
import { animateBlogEntrance } from "@/util/animations";
import BlogCard from "@/components/cards/BlogCard";

export default function BlogSection({
  data: propData,
  className,
}: SectionProps<BlogData> = {}) {
  const data = propData || site.blog;
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeLineRef = useRef<SVGLineElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Entrance Animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateBlogEntrance(sectionRef.current, {
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

  return (
    <section
      ref={sectionRef}
      id="blog"
      aria-label="HopeAlive Foundation Inspiring Stories and Impact"
      className="relative w-full bg-[#f8f6f0] text-[#1a2614] px-4 md:px-12 py-8 md:py-10 lg:py-20 overflow-hidden"
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
              <span className="text-sm lg:text-lg font-poppins font-medium text-[#1b2715]">
                {data.badge.text}
              </span>
              <svg
                width="120"
                height="8"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-1 pointer-events-none w-full max-w-[100px] overflow-visible"
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
              className="font-poppins font-bold  text-3xl sm:text-5xl md:text-5xl text-[#1b2715] tracking-tight leading-[1.12] select-none"
            >
              <span className="blog-headline-line block">{data.headline.line1}</span>
              {(data.headline as { line1: string; line2?: string }).line2 && (
                <span className="blog-headline-line block">{(data.headline as { line1: string; line2?: string }).line2}</span>
              )}
            </h2>

            {/* Description narrative paragraph text */}
            <p
              ref={descriptionRef}
              className="mt-3 sm:mt-4 max-w-3xl font-poppins text-sm sm:text-base text-[#556350] leading-relaxed select-none"
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* Feature blog cards grid */}
        <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {(data.blogPosts || []).slice(0, 3).map((post: BlogPostItem, index: number) => (
            <BlogCard
              key={post.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
