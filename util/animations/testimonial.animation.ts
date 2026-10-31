import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TestimonialAnimationElements {
  badge?: HTMLElement | null;
  headline?: HTMLElement | null;
  description?: HTMLElement | null;
  carousel?: HTMLElement | null;
}

// Testimonial section entrance animation
export function animateTestimonialEntrance(
  container: HTMLElement | null,
  elements: TestimonialAnimationElements
) {
  if (!container) return;

  const { badge, headline, description, carousel } = elements;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 78%",
      toggleActions: "play none none none",
    },
    defaults: { ease: "power3.out" },
  });

  // Badge slide down animation
  if (badge) {
    tl.fromTo(
      badge,
      { y: -16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        immediateRender: false,
        clearProps: "opacity,transform",
      }
    );
  }

  // Headline lines staggered reveal
  if (headline) {
    const lines = headline.querySelectorAll(".testimonial-headline-line");
    if (lines.length > 0) {
      tl.fromTo(
        lines,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "opacity,transform",
        },
        "-=0.3"
      );
    } else {
      tl.fromTo(
        headline,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          immediateRender: false,
          clearProps: "opacity,transform",
        },
        "-=0.3"
      );
    }
  }

  // Description smooth reveal animation
  if (description) {
    tl.fromTo(
      description,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.4"
    );
  }

  // Carousel container entrance animation
  if (carousel) {
    tl.fromTo(
      carousel,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
  }

  return tl;
}

export const testimonialAnimations = {
  entrance: animateTestimonialEntrance,
};

export default testimonialAnimations;
