import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProjectAnimationElements {
  badge?: HTMLElement | null;
  headline?: HTMLElement | null;
  description?: HTMLElement | null;
  cards?: (HTMLElement | null)[];
}

// Project section entrance animation
export function animateProjectEntrance(
  container: HTMLElement | null,
  elements: ProjectAnimationElements
) {
  if (!container) return;

  const { badge, headline, description, cards } = elements;

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
    const lines = headline.querySelectorAll(".project-headline-line");
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

  // Staggered project cards reveal
  if (cards && cards.length > 0) {
    const validCards = cards.filter(Boolean) as HTMLElement[];
    if (validCards.length > 0) {
      tl.fromTo(
        validCards,
        { y: 45, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "opacity,transform",
        },
        "-=0.3"
      );
    }
  }

  return tl;
}

export const projectAnimations = {
  entrance: animateProjectEntrance,
};

export default projectAnimations;
