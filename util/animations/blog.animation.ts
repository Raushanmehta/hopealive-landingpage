import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface BlogAnimationElements {
  badge?: HTMLElement | null;
  headline?: HTMLElement | null;
  description?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
  cards?: (HTMLElement | null)[];
}

// Blog section entrance animation
export function animateBlogEntrance(
  container: HTMLElement | null,
  elements: BlogAnimationElements
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
    const lines = headline.querySelectorAll(".blog-headline-line");
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
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.35"
    );
  }

  // Blog cards staggered reveal
  if (cards && cards.length > 0) {
    const validCards = cards.filter(Boolean) as HTMLElement[];
    if (validCards.length > 0) {
      tl.fromTo(
        validCards,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
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

// Button hover diagonal arrow
export function animateBlogButtonHover(
  button: HTMLElement | null,
  arrow: SVGSVGElement | null
) {
  if (button) {
    gsap.to(button, {
      scale: 1.025,
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
export function animateBlogButtonLeave(
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
export function animateBlogCardHover(
  card: HTMLElement | null,
  arrow: SVGSVGElement | null
) {
  if (card) {
    gsap.to(card, {
      y: -6,
      duration: 0.35,
      ease: "power2.out",
    });
  }
  if (arrow) {
    gsap.to(arrow, {
      x: 3,
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

export function animateBlogCardLeave(
  card: HTMLElement | null,
  arrow: SVGSVGElement | null
) {
  if (card) {
    gsap.to(card, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }
  if (arrow) {
    gsap.to(arrow, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }
}

export const blogAnimations = {
  entrance: animateBlogEntrance,
  buttonHover: animateBlogButtonHover,
  buttonLeave: animateBlogButtonLeave,
  cardHover: animateBlogCardHover,
  cardLeave: animateBlogCardLeave,
};

export default blogAnimations;
