"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BlogPostItem } from "@/types";
import { animateBlogCardHover, animateBlogCardLeave } from "@/util/animations";
import { useAppModal } from "@/components/common/ContactModal";

interface BlogCardProps {
  post: BlogPostItem;
  className?: string;
}

export const BlogCard = forwardRef<HTMLDivElement, BlogCardProps>(
  ({ post, className = "" }, ref) => {
    const { openModal } = useAppModal();
    const internalCardRef = useRef<HTMLDivElement | null>(null);
    const arrowRef = useRef<SVGSVGElement | null>(null);

    const handleMouseEnter = () => {
      const targetEl = internalCardRef.current;
      animateBlogCardHover(targetEl, arrowRef.current);
    };

    const handleMouseLeave = () => {
      const targetEl = internalCardRef.current;
      animateBlogCardLeave(targetEl, arrowRef.current);
    };

    // Combine forwarded and internal refs
    const setRefs = (el: HTMLDivElement | null) => {
      internalCardRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }
    };

    return (
      <div
        onClick={() => openModal(post.title, "Read the complete story and learn how you can support this initiative.")}
        className={`group flex flex-col h-full cursor-pointer ${className}`}
      >
        <div
          ref={setRefs}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col flex-1 bg-[#331600] rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-xl transition-all duration-500 ease-out select-none cursor-pointer border border-white/5 hover:border-white/10"
        >
          {/* Top card image container */}
          <div className="relative w-full h-[220px] sm:h-[240px] md:h-[250px] overflow-hidden">
            <Image
              src={post.image}
              alt={post.alt}
              fill
              unoptimized
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Natural subtle ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#331600]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Card content and metadata */}
          <div className="p-6 sm:p-7 lg:p-8 flex flex-col justify-between flex-1">
            <div>
              {/* Blog post publication date */}
              <span className="font-poppins text-xs sm:text-[13px] text-[#a89488] font-normal tracking-wide block">
                {post.date}
              </span>

              {/* Blog article headline title */}
              <h3 className="mt-2.5 mb-6 sm:mb-8 font-poppins font-semibold text-lg sm:text-xl lg:text-[22px] text-white leading-snug tracking-normal group-hover:text-[#ea580c] transition-colors duration-300">
                {post.title}
              </h3>
            </div>

            {/* Read more action link */}
            <div className="inline-flex items-center gap-1.5 font-poppins text-xs sm:text-sm font-medium text-[#ea580c] mt-auto">
              <span>Read More</span>
              <ArrowUpRight
                ref={arrowRef}
                size={16}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#ea580c] shrink-0"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BlogCard.displayName = "BlogCard";

export default BlogCard;
