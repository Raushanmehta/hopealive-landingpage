import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface MissionVisionAnimationElements {
  tagline?: HTMLElement | null;
  visionLines?: (HTMLElement | null)[];
  divider1?: HTMLElement | null;
  visionIcon?: HTMLElement | null;
  visionDesc?: HTMLElement | null;
  divider2?: HTMLElement | null;
  missionLines?: (HTMLElement | null)[];
  divider3?: HTMLElement | null;
  missionDesc?: HTMLElement | null;
  missionIcon?: HTMLElement | null;
  divider4?: HTMLElement | null;
}

// Mission vision entrance animation
export function animateMissionVisionEntrance(
  container: HTMLElement | null,
  elements: MissionVisionAnimationElements
) {
  if (!container) return;

  const {
    tagline,
    visionLines,
    divider1,
    visionIcon,
    visionDesc,
    divider2,
    missionLines,
    divider3,
    missionDesc,
    missionIcon,
    divider4,
  } = elements;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 75%",
      toggleActions: "play none none none",
    },
    defaults: { ease: "power3.out" },
  });

  // Section tagline fade in
  if (tagline) {
    tl.fromTo(
      tagline,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5, clearProps: "opacity,transform" }
    );
  }

  // Vision title lines reveal
  const validVisionLines = (visionLines || []).filter(Boolean);
  if (validVisionLines.length > 0) {
    tl.fromTo(
      validVisionLines,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "power4.out",
        clearProps: "opacity,transform",
      },
      "-=0.2"
    );
  }

  // First divider line expand
  if (divider1) {
    tl.fromTo(
      divider1,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.7, ease: "power2.out", clearProps: "transform" },
      "-=0.35"
    );
  }

  // Vision icon and description
  if (visionIcon) {
    tl.fromTo(
      visionIcon,
      { opacity: 0, scale: 0.5, rotate: -30 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.75,
        ease: "back.out(1.7)",
        clearProps: "opacity,transform",
      },
      "-=0.4"
    );
  }

  if (visionDesc) {
    tl.fromTo(
      visionDesc,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, clearProps: "opacity,transform" },
      "-=0.45"
    );
  }

  // Second divider line expand
  if (divider2) {
    tl.fromTo(
      divider2,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.65, ease: "power2.out", clearProps: "transform" },
      "-=0.3"
    );
  }

  // Mission title lines reveal
  const validMissionLines = (missionLines || []).filter(Boolean);
  if (validMissionLines.length > 0) {
    tl.fromTo(
      validMissionLines,
      { opacity: 0, y: 40, x: 20 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "power4.out",
        clearProps: "opacity,transform",
      },
      "-=0.2"
    );
  }

  // Third divider line expand
  if (divider3) {
    tl.fromTo(
      divider3,
      { scaleX: 0, transformOrigin: "right center" },
      { scaleX: 1, duration: 0.7, ease: "power2.out", clearProps: "transform" },
      "-=0.3"
    );
  }

  // Mission paragraph and icon
  if (missionDesc) {
    tl.fromTo(
      missionDesc,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, clearProps: "opacity,transform" },
      "-=0.4"
    );
  }

  if (missionIcon) {
    tl.fromTo(
      missionIcon,
      { opacity: 0, scale: 0.5, rotate: 30 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.75,
        ease: "back.out(1.7)",
        clearProps: "opacity,transform",
      },
      "-=0.45"
    );
  }

  // Fourth divider line expand
  if (divider4) {
    tl.fromTo(
      divider4,
      { scaleX: 0, transformOrigin: "center center" },
      { scaleX: 1, duration: 0.65, ease: "power2.out", clearProps: "transform" },
      "-=0.3"
    );
  }

  return tl;
}

export const missionVisionAnimations = {
  entrance: animateMissionVisionEntrance,
};

export default missionVisionAnimations;
