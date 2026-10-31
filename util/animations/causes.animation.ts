import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CausesAnimationElements {
  badge?: HTMLElement | null;
  headline?: HTMLElement | null;
  description?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
  cards?: (HTMLElement | null)[];
}

/**
 * GSAP Entrance Animation for Causes Section
 * Animates upper text content and staggered card reveals on scroll
 */
export function animateCausesEntrance(
  container: HTMLElement | null,
  elements: CausesAnimationElements
) {
  if (!container) return;

  const { badge, headline, description, ctaButton, cards } = elements;

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
    const lines = headline.querySelectorAll(".causes-headline-line");
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

  // Button pop in entrance
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

  // Cause cards staggered reveal
  const validCards = cards?.filter(Boolean) as HTMLElement[];
  if (validCards && validCards.length > 0) {
    tl.fromTo(
      validCards,
      { y: 55, opacity: 0, scale: 0.95 },
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

  return tl;
}

// Button hover diagonal arrow
export function animateCausesButtonHover(
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
export function animateCausesButtonLeave(
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

// Card hover subtle lift
export function animateCausesCardHover(
  card: HTMLElement | null,
  icon: SVGSVGElement | null
) {
  if (card) {
    gsap.to(card, {
      y: -6,
      duration: 0.35,
      ease: "power2.out",
    });
  }
  if (icon) {
    gsap.to(icon, {
      rotate: 8,
      scale: 1.1,
      duration: 0.35,
      ease: "back.out(1.8)",
    });
  }
}

export function animateCausesCardLeave(
  card: HTMLElement | null,
  icon: SVGSVGElement | null
) {
  if (card) {
    gsap.to(card, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }
  if (icon) {
    gsap.to(icon, {
      rotate: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

export const causesAnimations = {
  entrance: animateCausesEntrance,
  buttonHover: animateCausesButtonHover,
  buttonLeave: animateCausesButtonLeave,
  cardHover: animateCausesCardHover,
  cardLeave: animateCausesCardLeave,
};

export default causesAnimations;
