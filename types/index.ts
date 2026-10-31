export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavbarData {
  brand: {
    name: string;
    href: string;
    logo?: string;
  };
  links: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export interface HeroData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
    line3?: string;
  };
  description: string;
  cta: {
    label: string;
    href: string;
  };
  backgroundImage: string;
}

export interface AboutData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  stats: {
    value: string;
    label: string;
  };
  cta: {
    label: string;
    href: string;
  };
  images: {
    planting: {
      src: string;
      alt: string;
    };
    seedling: {
      src: string;
      alt: string;
    };
  };
}

export interface MissionVisionData {
  tagline?: string;
  vision: {
    title: {
      line1: string;
      line2: string;
    };
    description: string;
  };
  mission: {
    title: {
      line1: string;
      line2: string;
    };
    description: string;
  };
}

export interface WhyChooseUsItem {
  id: string;
  number: string;
  badgeColor: string;
  title?: string;
  description: string;
}

export interface WhyChooseUsData {
  badge?: {
    text: string;
    dot?: boolean;
  };
  stats?: {
    value: string;
    label: string;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  cta?: {
    label: string;
    href: string;
  };
  image: string;
  imageAlt?: string;
  items: WhyChooseUsItem[];
}

export interface CauseItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  image?: string;
  raised?: string;
  goal?: string;
  category?: string;
  href?: string;
}

export interface CausesData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  items: CauseItem[];
}

export interface BlogSidebarDonateCard {
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
}

export interface BlogSidebar {
  recentTitle?: string;
  donateCard?: BlogSidebarDonateCard;
}

export interface BlogCollageImage {
  src: string;
  alt?: string;
  label?: string;
}

export interface BlogCollage {
  title?: string;
  images: BlogCollageImage[];
}

export interface BlogKeyTakeaways {
  title?: string;
  items: string[];
}

export interface BlogDonationCallout {
  badge?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
}

export interface BlogPostItem {
  id: string;
  date: string;
  title: string;
  image: string;
  alt: string;
  href: string;
  category?: string;
  author?: {
    name: string;
    role?: string;
    avatar?: string;
  };
  excerpt?: string;
  content?: string[];
  quote?: string;
  quoteAuthor?: string;
  tags?: string[];
  collage?: BlogCollage;
  photoCollage?: BlogCollage;
  keyTakeaways?: BlogKeyTakeaways;
  takeaways?: BlogKeyTakeaways;
  donationCallout?: BlogDonationCallout;
  callout?: BlogDonationCallout;
  donateCard?: BlogSidebarDonateCard;
}

export interface BlogData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  blogPosts?: BlogPostItem[];
  posts?: BlogPostItem[];
  donationCta?: BlogDonationCallout;
  sidebar?: BlogSidebar;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating?: number;
}

export interface TestimonialData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  items: TestimonialItem[];
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectMilestone {
  phase: string;
  title: string;
  description: string;
  status: string;
}

export interface ProjectGalleryItem {
  image: string;
  alt: string;
  caption: string;
}

export interface ProjectDetailConfig {
  stats: ProjectStat[];
  challengeSolution: {
    title: string;
    paragraphs: string[];
  };
  quote: {
    text: string;
    author: string;
    role: string;
  };
  milestones: {
    title: string;
    items: ProjectMilestone[];
  };
  gallery: {
    title: string;
    items: ProjectGalleryItem[];
  };
  callout: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  sidebar: {
    relatedTitle: string;
    donateCard: {
      title: string;
      description: string;
      buttonText: string;
      buttonHref: string;
    };
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: string;
  ctaText: string;
  image: string;
  alt: string;
  href: string;
  stats?: ProjectStat[];
  challengeSolution?: {
    title: string;
    paragraphs: string[];
  };
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  milestones?: {
    title: string;
    items: ProjectMilestone[];
  };
  gallery?: {
    title: string;
    items: ProjectGalleryItem[];
  };
  callout?: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  donateCard?: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref?: string;
  };
}

export interface ProjectData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  projectsList?: ProjectItem[];
  items?: ProjectItem[];
  projects?: ProjectItem[];
}

export interface TeamSocial {
  platform: "twitter" | "facebook" | "linkedin" | "email";
  href: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
  alt?: string;
  experience?: string;
  socials?: TeamSocial[];
}

export interface TeamData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  membersList?: TeamMember[];
  members?: TeamMember[];
  ctaBanner?: {
    title: string;
    description: string;
    buttonText?: string;
    buttonHref?: string;
    primaryBtnText?: string;
    primaryBtnHref?: string;
    secondaryBtnText?: string;
    secondaryBtnHref?: string;
  };
  callout?: {
    title: string;
    description: string;
    buttonText?: string;
    buttonHref?: string;
    primaryBtnText?: string;
    primaryBtnHref?: string;
    secondaryBtnText?: string;
    secondaryBtnHref?: string;
  };
  cta?: {
    title: string;
    description: string;
    buttonText?: string;
    buttonHref?: string;
    primaryBtnText?: string;
    primaryBtnHref?: string;
    secondaryBtnText?: string;
    secondaryBtnHref?: string;
  };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FaqData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  faqsList?: FaqItem[];
  faqList?: FaqItem[];
  items?: FaqItem[];
  cta?: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

export interface ContactData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  info: {
    address: {
      title: string;
      lines: string[];
    };
    phone: {
      title: string;
      numbers: string[];
    };
    email: {
      title: string;
      address: string;
    };
    support?: {
      title: string;
      text: string;
      email?: string;
    };
    hours?: {
      title: string;
      text: string;
    };
  };
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  label: string;
}

export interface FooterData {
  logo?: string;
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  socials: SocialLink[];
  linksSection: {
    title: string;
    links: { label: string; href: string }[];
  };
  quickLinksSection?: {
    title: string;
    links: { label: string; href: string }[];
  };
  locationSection: {
    title: string;
    addressLines: string[];
    phones: string[];
    email?: string;
  };
  copyright: {
    line1: string;
  };
  watermark: string;
}
export interface PresetAmountItem {
  amount: number;
  label: string;
  impact: string;
}

export interface DonationCauseOption {
  id: string;
  name: string;
}

export interface TransparencyStat {
  percentage: string;
  label: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
}

export interface DonationData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  presetAmounts: PresetAmountItem[];
  causes: DonationCauseOption[];
  transparency: {
    stats: TransparencyStat[];
    guarantees: string[];
  };
  impactMetrics: ImpactMetric[];
}

export interface ThankYouData {
  headline: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export interface NotFoundData {
  code: string;
  headline: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

