import type { IconKey } from "./services";

/**
 * The 10 services shown on the homepage and in the services marketplace.
 * `learnMore` points to the closest existing service page until each service
 * gets its own landing page in Phase 3 (then it becomes `/services/${slug}`).
 */
export type Offering = {
  slug: string;
  title: string;
  short: string;
  icon: IconKey;
  learnMore: string;
};

export const offerings: Offering[] = [
  {
    slug: "shopify-website-development",
    title: "Shopify Website Design & Development",
    short: "Fast, brand-led Shopify stores built for mobile shoppers and designed to turn visits into orders.",
    icon: "monitor",
    learnMore: "/services/website-development",
  },
  {
    slug: "ecommerce-website-redesign",
    title: "E-commerce Website Redesign",
    short: "Rebuild an underperforming store around clearer navigation, stronger product pages and a smoother checkout.",
    icon: "refresh",
    learnMore: "/services/website-development",
  },
  {
    slug: "shopify-store-management",
    title: "Shopify Store Management",
    short: "Day-to-day store upkeep, product updates, apps and fixes, so you can focus on running the business.",
    icon: "cart",
    learnMore: "/services/ecommerce-growth",
  },
  {
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization",
    short: "Page-by-page reviews of your funnel and prioritised changes that remove friction for buyers.",
    icon: "gauge",
    learnMore: "/services/ecommerce-growth",
  },
  {
    slug: "seo-organic-growth",
    title: "SEO & Organic Growth",
    short: "Technical, on-page and content SEO that builds steady search visibility for the terms your buyers use.",
    icon: "search",
    learnMore: "/services/digital-marketing",
  },
  {
    slug: "klaviyo-email-marketing",
    title: "Klaviyo Email Marketing & Automation",
    short: "Welcome, abandoned-cart and post-purchase flows plus campaigns that keep customers coming back.",
    icon: "mail",
    learnMore: "/services/email-sms-marketing",
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    short: "Content plans and creative direction that keep your brand consistent and visible where customers scroll.",
    icon: "megaphone",
    learnMore: "/services/digital-marketing",
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising",
    short: "Meta and Google campaigns structured around clear audiences, creative testing and conversion tracking.",
    icon: "target",
    learnMore: "/services/digital-marketing",
  },
  {
    slug: "product-research-listing",
    title: "Product Research & Product Listing",
    short: "Data-led product selection and persuasive, search-friendly listings that answer buyers' questions.",
    icon: "lightbulb",
    learnMore: "/services/ecommerce-growth",
  },
  {
    slug: "ecommerce-growth-strategy",
    title: "E-commerce Growth Strategy",
    short: "A prioritised roadmap across store, marketing and retention, tied to the goals that matter to you.",
    icon: "rocket",
    learnMore: "/services/growth-strategy",
  },
];

export const marqueeItems = [
  "Digital Marketing",
  "Shopify Solutions",
  "E-commerce Growth",
  "Website Development",
  "CRO",
  "Marketing Automation",
  "SEO",
];
