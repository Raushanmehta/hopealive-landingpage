import siteData from "@/data/site.json";

// Root schema types definition
export type RawSiteData = typeof siteData;
export type HopeAliveSchema = typeof siteData.HopeAlive;
export type HopeAliveSections = HopeAliveSchema["sections"];
export type HopeAliveTemplateComponents = HopeAliveSchema["templateComponents"];

// Aliases matching reference schema conventions
export type ServicesSchema = HopeAliveSchema;
export type ServicesSections = HopeAliveSections;
export type ServicesTemplateComponents = HopeAliveTemplateComponents;

// Universal section props interface
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// Section variant data models
export type HopeAliveNavbarData = HopeAliveSections["navbar"]["variants"]["HopeAliveNavbar1"];
export type HopeAliveHeroData = HopeAliveSections["hero"]["variants"]["HopeAliveHero1"];
export type HopeAliveAboutData = HopeAliveSections["about"]["variants"]["HopeAliveAbout1"];
export type HopeAliveCausesData = HopeAliveSections["causes"]["variants"]["HopeAliveCauses1"];
export type HopeAliveProjectsData = HopeAliveSections["projects"]["variants"]["HopeAliveProjects1"];
export type HopeAliveTestimonialsData = HopeAliveSections["testimonials"]["variants"]["HopeAliveTestimonials1"];
export type HopeAliveFaqsData = HopeAliveSections["faqs"]["variants"]["HopeAliveFaqs1"];
export type HopeAliveFooterData = HopeAliveSections["footer"]["variants"]["HopeAliveFooter1"];

// Inferred subitem data models
export type CauseItem = HopeAliveCausesData["items"][number];
export type ProjectItem = HopeAliveProjectsData["projectsList"][number];
export type TestimonialItem = HopeAliveTestimonialsData["items"][number];
export type FaqItem = HopeAliveFaqsData["faqsList"][number];
export type NavItem = HopeAliveNavbarData["links"][number];

// Convenience types and aliases
export type NavbarData = HopeAliveNavbarData;
export type HeroData = HopeAliveHeroData;
export type AboutData = HopeAliveAboutData;
export type CausesData = HopeAliveCausesData;
export type ProjectsData = HopeAliveProjectsData;
export type TestimonialsData = HopeAliveTestimonialsData;
export type FaqsData = HopeAliveFaqsData;
export type FooterData = HopeAliveFooterData;

// Default unified site data
const sec = siteData.HopeAlive.sections;

export const site = {
  navbar: sec.navbar.variants.HopeAliveNavbar1,
  hero: sec.hero.variants.HopeAliveHero1,
  about: sec.about.variants.HopeAliveAbout1,
  causes: sec.causes.variants.HopeAliveCauses1,
  projects: sec.projects.variants.HopeAliveProjects1,
  testimonials: sec.testimonials.variants.HopeAliveTestimonials1,
  faqs: sec.faqs.variants.HopeAliveFaqs1,
  footer: sec.footer.variants.HopeAliveFooter1,

  // Root schema structure references
  HopeAlive: siteData.HopeAlive,
  Services: siteData.HopeAlive,
};

export type SiteData = typeof site;
export default siteData;
