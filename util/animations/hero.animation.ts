import gsap from "gsap";

export interface HeroAnimationElements {
  badge?: HTMLElement | null;
  headline?: HTMLElement | null;
  description?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
  background?: HTMLElement | null;
}

// Hero entrance animation timeline
export function animateHeroEntrance(
  elements: HeroAnimationElements,
  scope?: HTMLElement | null
) {
  const { badge, headline, description, ctaButton, background } = elements;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Background image slow zoom
  if (background) {
    tl.fromTo(
      background,
      { scale: 1.08, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        immediateRender: false,
        clearProps: "transform",
      }
    );
  }

  // Badge pill entrance animation
  if (badge) {
    tl.fromTo(
      badge,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.7"
    );
  }

  // Staggered headline lines reveal
  if (headline) {
    const lines = headline.querySelectorAll(".hero-headline-line");
    if (lines.length > 0) {
      tl.fromTo(
        lines,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "opacity,transform",
        },
        "-=0.4"
      );
    } else {
      tl.fromTo(
        headline,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          immediateRender: false,
          clearProps: "opacity,transform",
        },
        "-=0.4"
      );
    }
  }

  // Description paragraph text reveal
  if (description) {
    tl.fromTo(
      description,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.4"
    );
  }

  // Action button bounce entrance
  if (ctaButton) {
    tl.fromTo(
      ctaButton,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
  }

  return tl;
}

// Button hover diagonal arrow
export function animateHeroButtonHover(
  button: HTMLElement | null,
  arrow: SVGSVGElement | null
) {
  if (button) {
    gsap.to(button, {
      scale: 1.03,
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

// Button hover reset leave
export function animateHeroButtonLeave(
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

export const heroAnimations = {
  entrance: animateHeroEntrance,
  buttonHover: animateHeroButtonHover,
  buttonLeave: animateHeroButtonLeave,
};

export default heroAnimations;
