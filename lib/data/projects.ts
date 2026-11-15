import type { PortfolioCategory } from "./services";

export type Project = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  technologies: string[];
  images: string[]; // paths in /public, e.g. "/images/projects/store-1.jpg"
  url?: string; // live project link (optional)
  /** Placeholders render only in development so nothing fabricated reaches production. */
  placeholder?: boolean;
};

export const portfolioCategories: PortfolioCategory[] = [
  "Website Development",
  "Shopify & E-commerce",
  "Digital Marketing",
  "CRM & Automation",
];

/**
 * ADD REAL PROJECTS HERE.
 * Only publish work you have permission to show. Remove `placeholder: true` items once real ones exist.
 */
const realProjects: Project[] = [];

const devPlaceholders: Project[] = portfolioCategories.map((category, i) => ({
  slug: `placeholder-${i + 1}`,
  title: `[Placeholder] ${category} project`,
  category,
  description: "Development placeholder — replace with a genuine project, screenshots and an approved description.",
  technologies: ["Replace", "With", "Real stack"],
  images: [],
  placeholder: true,
}));

export const projects: Project[] =
  realProjects.length > 0 || process.env.NODE_ENV === "production" ? realProjects : devPlaceholders;
