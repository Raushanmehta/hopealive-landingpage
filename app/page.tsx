import { site } from "@/data";
import HeroSection from "@/sections/home/HeroSection";
import AboutSection from "@/sections/home/AboutSection";
import CausesSection from "@/sections/home/CausesSection";
import ProjectSection from "@/sections/home/ProjectSection";
import TestimonialSection from "@/sections/home/TestimonialSection";
import FaqSection from "@/sections/home/FaqSection";

export default function Home() {
  return (
    <main>
      <HeroSection data={site.hero} />
      <AboutSection data={site.about} />
      <CausesSection data={site.causes} />
      <ProjectSection data={site.projects} />
      <TestimonialSection data={site.testimonials} />
      <FaqSection data={site.faqs} />
    </main>
  );
}
