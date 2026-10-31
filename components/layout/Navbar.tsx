"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  animateNavbarEntrance,
  animateLogoHover,
  animateButtonArrowHover,
  animateButtonArrowLeave,
  animateMobileMenuOpen,
  animateNavbarScroll,
} from "@/util/animations";
import { ArrowUpRight, Menu, X } from "lucide-react";
import SunburstIcon from "@/components/icons/SunburstIcon";
import BrandLogoIcon from "@/components/icons/BrandLogoIcon";
import { site, SectionProps, NavbarData, NavItem } from "@/data";
import { useAppModal } from "@/components/common/ContactModal";

interface NavbarProps {
  data?: NavbarData;
}

function NavbarContent({ data = site.navbar }: NavbarProps) {
  const { openModal } = useAppModal();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const isFirstRender = useRef(true);

  // Scroll position and active section spy
  useEffect(() => {
    const sectionIds = ["hero", "about", "causes", "projects", "testimonials", "faqs"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Component animation element references
  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const logoIconRef = useRef<HTMLSpanElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // GSAP Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      animateNavbarEntrance({
        container: navContainerRef.current,
        logoIcon: logoIconRef.current,
        logoText: logoTextRef.current,
        linksContainer: linksContainerRef.current,
        ctaButton: ctaButtonRef.current,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // GSAP Fluid Scroll Transition
  useEffect(() => {
    if (!navContainerRef.current) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (window.scrollY > 20) {
        animateNavbarScroll(
          navContainerRef.current,
          innerContainerRef.current,
          true,
          true
        );
      }
      return;
    }
    animateNavbarScroll(
      navContainerRef.current,
      innerContainerRef.current,
      isScrolled,
      false
    );
  }, [isScrolled]);

  // GSAP Mobile Menu Slide Transition
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      animateMobileMenuOpen(mobileMenuRef.current);
    }
  }, [mobileMenuOpen]);

  // Component interactive hover handlers
  const handleLogoMouseEnter = () => {
    animateLogoHover(logoIconRef.current);
  };

  const handleButtonMouseEnter = () => {
    animateButtonArrowHover(arrowRef.current);
  };

  const handleButtonMouseLeave = () => {
    animateButtonArrowLeave(arrowRef.current);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex flex-col items-center w-full "
    >
      <nav
        ref={navContainerRef}
        aria-label="Main Navigation"
        className="pointer-events-auto relative w-[calc(100%-24px)] max-w-6xl px-4 mt-3 rounded-xl border border-white/10 bg-[#331600] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      >
        <div
          ref={innerContainerRef}
          className="w-full max-w-7xl mx-auto flex items-center justify-between  py-2.5 sm:py-2"
        >
          {/* Left brand logo component */}
          <Link
            href={data.brand.href}
            onMouseEnter={handleLogoMouseEnter}
            className="flex items-center gap-2.5 group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] rounded-lg shrink-0"
          >
            <span
              ref={logoIconRef}
              className="inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0"
            >
              <BrandLogoIcon
                size={34}
                color="#ea580c"
                className="drop-shadow-[0_0_10px_rgba(234,88,12,0.6)]"
              />
            </span>
            <span
              ref={logoTextRef}
              className="inline-flex items-center select-none"
            >
              <Image
                src={data.brand.logo || "/logo/logo.webp"}
                alt={data.brand.name || "HopeAlive"}
                width={240}
                height={75}
                priority
                className="h-10  sm:h-14 w-auto object-contain select-none"
              />
            </span>
          </Link>

          {/* Desktop nav links list */}
          <div
            ref={linksContainerRef}
            className="hidden md:flex items-center gap-7 lg:gap-10"
          >
            {data.links.map((link: NavItem) => {
              const linkHash = link.href.replace("#", "");
              const isActive = activeSection === linkHash;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`nav-link-item relative py-1 text-xs lg:text-[13px] font-poppins font-semibold tracking-[0.08em] uppercase transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ea580c] rounded-sm ${isActive
                    ? "text-[#ea580c] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ea580c] after:rounded-full"
                    : "text-[#fdf8f5]/85 hover:text-[#ea580c]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right action button area */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Primary CTA action button */}
            <button
              ref={ctaButtonRef as any}
              type="button"
              onClick={() => openModal("Donate to HopeAlive", "Your donation directly helps vulnerable children, nutrition programs, and safe housing.")}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              className="btn-leaf relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-3 bg-[#ea580c] text-white font-poppins font-medium sm:font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:bg-[#c2410c] active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ea580c] cursor-pointer shrink-0 select-none"
            >
              <span>{data.cta.label}</span>
              <ArrowUpRight
                ref={arrowRef}
                size={16}
                strokeWidth={2.6}
                className="transition-transform duration-200 shrink-0"
              />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-[#ea580c] hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="pointer-events-auto md:hidden w-[calc(100%-24px)] max-w-6xl mt-2 p-5 rounded-2xl bg-[#331600]/95 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4"
        >
          <div className="flex flex-col space-y-3">
            {data.links.map((link: NavItem) => {
              const linkHash = link.href.replace("#", "");
              const isActive = activeSection === linkHash;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-item py-2 px-3 rounded-lg text-sm font-poppins font-medium tracking-wider uppercase transition-colors ${isActive
                    ? "bg-[#ea580c]/15 text-[#ea580c] font-semibold border-l-2 border-[#ea580c]"
                    : "text-[#fdf8f5]/90 hover:bg-white/5 hover:text-[#ea580c]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal("Donate to HopeAlive", "Your donation directly helps vulnerable children, nutrition programs, and safe housing.");
              }}
              className="btn-leaf w-full flex items-center justify-center gap-2 py-3 bg-[#ea580c] text-white font-poppins font-semibold text-sm tracking-wide shadow-md hover:bg-[#c2410c] cursor-pointer"
            >
              <span>{data.cta.label}</span>
              <ArrowUpRight size={16} strokeWidth={2.6} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function NavbarFallback({ data = site.navbar }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex flex-col items-center w-full">
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto relative w-[calc(100%-24px)] max-w-6xl px-4 mt-3 rounded-xl border border-white/10 bg-[#331600] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-2.5 sm:py-2.5">
          {/* Brand logo navigation link */}
          <Link
            href={data.brand.href}
            className="flex items-center gap-2.5 group select-none focus:outline-none rounded-lg shrink-0"
          >
            <span className="inline-flex items-center justify-center shrink-0">
              <BrandLogoIcon
                size={34}
                color="#ea580c"
                className="drop-shadow-[0_0_10px_rgba(234,88,12,0.6)]"
              />
            </span>
            <span className="inline-flex items-center select-none">
              <Image
                src={data.brand.logo || "/logo/logo.webp"}
                alt={data.brand.name || "HopeAlive"}
                width={130}
                height={42}
                priority
                className="h-7 sm:h-8 w-auto object-contain select-none"
              />
            </span>
          </Link>

          {/* Desktop navigation links container */}
          <div className="hidden md:flex items-center gap-7 lg:gap-10">
            {data.links.map((link: NavItem) => (
              <Link
                key={link.id}
                href={link.href}
                className="nav-link-item relative py-1 text-xs lg:text-[13px] font-poppins font-medium tracking-[0.08em] uppercase text-[#fdf8f5]/90 hover:text-white transition-colors duration-200 rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Call to action button */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="btn-leaf relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-3 bg-[#ea580c] text-white font-poppins font-medium sm:font-semibold text-xs sm:text-sm tracking-wide shadow-sm hover:bg-[#c2410c] transition-all duration-200 shrink-0 select-none cursor-pointer">
              <span>{data.cta.label}</span>
              <ArrowUpRight
                size={16}
                strokeWidth={2.6}
                className="shrink-0"
              />
            </div>

            <button
              type="button"
              aria-label="Open menu"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-[#ea580c]"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default function Navbar(props: NavbarProps) {
  return (
    <Suspense fallback={<NavbarFallback data={props.data} />}>
      <NavbarContent {...props} />
    </Suspense>
  );
}