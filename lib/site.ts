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
    email: null as string | null, // e.g. "hello@primewaveagency.com"
    ukPhone: null as string | null, // add the UK business number when ready, e.g. "+44 ..."
    whatsapp: "https://wa.me/447882739370" as string | null,
  },
  social: {
    tiktok: "https://www.tiktok.com/@ecompaul01" as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
    fiverr: null as string | null,
  },
  markets: ["United Kingdom", "United States", "International"],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: true },
  { label: "CRM Solutions", href: "/crm-solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;
