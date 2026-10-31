import gsap from "gsap";

export interface FooterAnimationElements {
  headline?: HTMLElement | null;
  description?: HTMLElement | null;
  socialsContainer?: HTMLElement | null;
  linksColumn?: HTMLElement | null;
  quickLinksColumn?: HTMLElement | null;
  locationColumn?: HTMLElement | null;
  copyright?: HTMLElement | null;
  watermark?: HTMLElement | null;
}

// Footer entrance animation timeline
export function animateFooterEntrance(
  elements: FooterAnimationElements,
  scope?: HTMLElement | null
) {
  const {
    headline,
    description,
    socialsContainer,
    linksColumn,
    quickLinksColumn,
    locationColumn,
    copyright,
    watermark,
  } = elements;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Main headline title reveal
  if (headline) {
    tl.fromTo(
      headline,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: "opacity,transform" }
    );
  }

  // Narrative paragraph description reveal
  if (description) {
    tl.fromTo(
      description,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, clearProps: "opacity,transform" },
      "-=0.4"
    );
  }

  // Social buttons stagger entrance
  if (socialsContainer) {
    const socialBtns = socialsContainer.querySelectorAll(".social-btn");
    if (socialBtns.length > 0) {
      tl.fromTo(
        socialBtns,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.8)",
          clearProps: "opacity,transform",
        },
        "-=0.3"
      );
    }
  }

  // Footer links navigation columns
  const cols = [linksColumn, quickLinksColumn, locationColumn].filter(Boolean);
  if (cols.length > 0) {
    tl.fromTo(
      cols,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        clearProps: "opacity,transform",
      },
      "-=0.4"
    );
  }

  // Bottom copyright text reveal
  if (copyright) {
    tl.fromTo(
      copyright,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, clearProps: "opacity,transform" },
      "-=0.3"
    );
  }

  // Large background watermark reveal
  if (watermark) {
    tl.fromTo(
      watermark,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        clearProps: "opacity,transform",
      },
      "-=0.6"
    );
  }

  return tl;
}

// Social button hover bounce
export function animateSocialHover(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    scale: 1.14,
    rotation: 6,
    duration: 0.25,
    ease: "back.out(2)",
  });
}

// Social button reset leave
export function animateSocialLeave(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    scale: 1,
    rotation: 0,
    duration: 0.25,
    ease: "power2.out",
  });
}

// Footer link hover slide
export function animateFooterLinkHover(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    x: 4,
    duration: 0.2,
    ease: "power1.out",
  });
}

// Footer link reset leave
export function animateFooterLinkLeave(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    x: 0,
    duration: 0.2,
    ease: "power1.out",
  });
}

export const footerAnimations = {
  entrance: animateFooterEntrance,
  socialHover: animateSocialHover,
  socialLeave: animateSocialLeave,
  linkHover: animateFooterLinkHover,
  linkLeave: animateFooterLinkLeave,
};

export default footerAnimations;
