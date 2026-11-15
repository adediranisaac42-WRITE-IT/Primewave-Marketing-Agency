import { services, type IconKey } from "./services";

/** Card data for the 10 services, derived from lib/data/services.ts (single source of truth). */
export type Offering = {
  slug: string;
  title: string;
  short: string;
  icon: IconKey;
  learnMore: string;
};

export const offerings: Offering[] = services.map((s) => ({
  slug: s.slug,
  title: s.title,
  short: s.short,
  icon: s.icon,
  learnMore: s.href,
}));

export const marqueeItems = [
  "Digital Marketing",
  "Shopify Solutions",
  "E-commerce Growth",
  "Website Development",
  "CRO",
  "Marketing Automation",
  "SEO",
];
