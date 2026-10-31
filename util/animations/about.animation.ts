import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface AboutAnimationElements {
  badge?: HTMLElement | null;
  stats?: HTMLElement | null;
  headline?: HTMLElement | null;
  description?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
  imagePlanting?: HTMLElement | null;
  imageSeedling?: HTMLElement | null;
}

// About section entrance animation
export function animateAboutEntrance(
  container: HTMLElement | null,
  elements: AboutAnimationElements
) {
  if (!container) return;

  const {
    badge,
    stats,
    headline,
    description,
    ctaButton,
    imagePlanting,
    imageSeedling,
  } = elements;

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

  // Statistics block entrance animation
  if (stats) {
    tl.fromTo(
      stats,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: "back.out(1.4)",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
  }

  // Staggered headline lines reveal
  if (headline) {
    const lines = headline.querySelectorAll(".about-headline-line");
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
        "-=0.5"
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
        "-=0.5"
      );
    }
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
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.4"
    );
  }

  // Call to action button
  if (ctaButton) {
    tl.fromTo(
      ctaButton,
      { scale: 0.9, opacity: 0, y: 15 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
  }

  // Planting image scale reveal
  if (imagePlanting) {
    tl.fromTo(
      imagePlanting,
      { y: 45, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.5"
    );
  }

  // Seedling image slide reveal
  if (imageSeedling) {
    tl.fromTo(
      imageSeedling,
      { y: 60, opacity: 0, scale: 0.94 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.7"
    );
  }

  return tl;
}

// Button hover diagonal arrow
export function animateAboutButtonHover(
  button: HTMLElement | null,
  arrow: SVGSVGElement | null
) {
  if (button) {
    gsap.to(button, {
      scale: 1.02,
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
export function animateAboutButtonLeave(
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

export const aboutAnimations = {
  entrance: animateAboutEntrance,
  buttonHover: animateAboutButtonHover,
  buttonLeave: animateAboutButtonLeave,
};

export default aboutAnimations;
