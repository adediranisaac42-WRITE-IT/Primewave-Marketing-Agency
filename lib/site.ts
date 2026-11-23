/**
 * Single source of truth for brand + contact details.
 * Anything set to null is hidden on the site automatically — fill it in when ready.
 */
export const site = {
  name: "Primewave Marketing Agency",
  shortName: "Primewave",
  tagline: "Strategy. Innovation. Growth.",
  message: "Turning Digital Potential Into Business Growth.",
  description:
    "Primewave Marketing Agency helps e-commerce brands, Shopify stores and growing businesses in the UK, US and worldwide attract qualified customers, improve website performance, increase conversions and build stronger customer relationships.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  founder: { name: "Isaac Adediran", role: "Founder & CEO" },
  contact: {
    email: "paul@primewavemarketing.agency" as string | null,
    ukPhone: "+44 7882 739370" as string | null,
    whatsapp: "https://wa.me/447882739370" as string | null,
  },
  social: {
    tiktok: "https://www.tiktok.com/@ecompaul01" as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
    fiverr: "https://www.fiverr.com/s/2pG3VqV" as string | null,
  },
  markets: ["United States", "United Kingdom", "Canada", "International markets"],
} as const;

/**
 * Main navigation. "Case Studies" and "Insights" are added here once their pages
 * exist (Phase 4), so the menu never links to a missing page.
 */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

export const ctas = {
  project: { label: "Start a Project", href: "/contact?intent=project" },
  call: { label: "Book a Strategy Call", href: "/contact?intent=call" },
} as const;
