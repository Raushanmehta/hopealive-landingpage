import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface WhyChooseUsAnimationElements {
  badge?: HTMLElement | null;
  headline?: HTMLElement | null;
  stats?: HTMLElement | null;
  description?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
  imageContainer?: HTMLElement | null;
  ring?: HTMLElement | null;
  items?: (HTMLElement | null)[];
}

// Why choose us entrance animation
export function animateWhyChooseUsEntrance(
  container: HTMLElement | null,
  elements: WhyChooseUsAnimationElements
) {
  if (!container) return;

  const {
    badge,
    headline,
    stats,
    description,
    ctaButton,
    imageContainer,
    ring,
    items,
  } = elements;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 75%",
      toggleActions: "play none none none",
    },
    defaults: { ease: "power3.out" },
  });

  // Upper row badge animation
  if (badge) {
    tl.fromTo(
      badge,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, clearProps: "opacity,transform" }
    );
  }

  // Headline lines staggered reveal
  if (headline) {
    const lines = headline.querySelectorAll(
      ".whychooseus-headline-line, .about-headline-line"
    );
    tl.fromTo(
      lines.length > 0 ? lines : headline,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
  }

  // Stats block entrance animation
  if (stats) {
    tl.fromTo(
      stats,
      { scale: 0.9, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        clearProps: "opacity,transform",
      },
      "-=0.4"
    );
  }

  // Description paragraph smooth reveal
  if (description) {
    tl.fromTo(
      description,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        clearProps: "opacity,transform",
      },
      "-=0.4"
    );
  }

  // Call to action button
  if (ctaButton) {
    tl.fromTo(
      ctaButton,
      { scale: 0.92, opacity: 0, y: 15 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.3)",
        clearProps: "opacity,transform",
      },
      "-=0.35"
    );
  }

  // Left arched image entrance
  if (imageContainer) {
    tl.fromTo(
      imageContainer,
      { opacity: 0, x: -45, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "opacity,transform",
      },
      "-=0.2"
    );
  }

  // Circular outline ring animation
  if (ring) {
    tl.fromTo(
      ring,
      { opacity: 0, scale: 0.8, rotate: -45 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.1,
        ease: "power2.out",
        clearProps: "opacity,transform",
      },
      "-=0.7"
    );
  }

  // Staggered feature items entrance
  const validItems = (items || []).filter(Boolean);
  if (validItems.length > 0) {
    tl.fromTo(
      validItems,
      { opacity: 0, x: 35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.16,
        ease: "power3.out",
        clearProps: "opacity,transform",
      },
      "-=0.6"
    );
  }

  return tl;
}

// Button hover arrow expansion
export function animateWhyChooseUsButtonHover(
  button: HTMLElement | null,
  arrow: SVGSVGElement | null
) {
  if (button) {
    gsap.to(button, {
      scale: 1.04,
      duration: 0.25,
      ease: "power2.out",
    });
  }
  if (arrow) {
    gsap.to(arrow, {
      x: 3,
      y: -3,
      duration: 0.25,
      ease: "power2.out",
    });
  }
}

// Button mouse leave reset
export function animateWhyChooseUsButtonLeave(
  button: HTMLElement | null,
  arrow: SVGSVGElement | null
) {
  if (button) {
    gsap.to(button, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  }
  if (arrow) {
    gsap.to(arrow, {
      x: 0,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }
}

export const whyChooseUsAnimations = {
  entrance: animateWhyChooseUsEntrance,
  buttonHover: animateWhyChooseUsButtonHover,
  buttonLeave: animateWhyChooseUsButtonLeave,
};

export default whyChooseUsAnimations;
