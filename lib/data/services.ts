export type IconKey =
  | "megaphone" | "cart" | "users" | "mail" | "monitor" | "compass"
  | "target" | "chart" | "heart" | "layers" | "gauge" | "handshake"
  | "search" | "lightbulb" | "rocket" | "refresh";

export type Service = {
  slug: string;
  href: string;
  title: string;
  short: string;
  icon: IconKey;
  headline: string;
  intro: string;
  items: string[];
  challenges: string[];
  solutions: { title: string; body: string }[];
  process: { title: string; body: string }[];
  portfolioCategory: PortfolioCategory;
  faqs: { q: string; a: string }[];
};

export type PortfolioCategory =
  | "Website Development"
  | "Shopify & E-commerce"
  | "Digital Marketing"
  | "CRM & Automation";

const standardProcess = [
  { title: "Discover", body: "We review your business, audience, current performance and the goals that matter most." },
  { title: "Strategize", body: "You receive a clear, prioritised plan with scope, timelines and how success will be measured." },
  { title: "Implement", body: "We execute the agreed work with regular updates and full transparency." },
  { title: "Optimize", body: "We review performance, learn from the data and refine for continued improvement." },
];

export const services: Service[] = [
  {
    slug: "digital-marketing",
    href: "/services/digital-marketing",
    title: "Digital Marketing",
    short: "Reach the right audience with SEO, social, content and paid campaigns built around measurable goals.",
    icon: "megaphone",
    headline: "Marketing that attracts the customers you actually want.",
    intro:
      "We plan and run digital marketing that connects your brand with qualified audiences — combining organic visibility, social presence, content and paid media into one coherent strategy.",
    items: ["SEO", "Social Media Marketing", "Content Strategy", "Paid Advertising", "Influencer Marketing", "Marketing Research"],
    challenges: [
      "Traffic that doesn't turn into enquiries or sales",
      "Ad spend without clear return",
      "Inconsistent social media presence",
      "Low visibility in search results",
    ],
    solutions: [
      { title: "Search Engine Optimisation", body: "Technical, on-page and content SEO to grow sustainable organic traffic." },
      { title: "Paid Advertising", body: "Meta and Google campaigns structured around audience, creative testing and conversion tracking." },
      { title: "Social & Content", body: "Content calendars and creative direction that keep your brand consistent and engaging." },
      { title: "Influencer & Research", body: "Creator partnerships and market research that sharpen positioning and reach." },
    ],
    process: standardProcess,
    portfolioCategory: "Digital Marketing",
    faqs: [
      { q: "Which advertising platforms do you manage?", a: "We primarily work with Meta (Facebook & Instagram), Google and TikTok, chosen based on where your audience is." },
      { q: "How soon will I see results?", a: "Paid campaigns can generate data within weeks; SEO is a longer-term investment. We agree realistic milestones before starting." },
    ],
  },
  {
    slug: "ecommerce-growth",
    href: "/services/ecommerce-growth",
    title: "E-commerce Growth",
    short: "Shopify builds, redesigns, audits and conversion optimisation for stores ready to scale.",
    icon: "cart",
    headline: "Shopify stores engineered to convert.",
    intro:
      "From new store builds to detailed conversion audits, we help e-commerce brands, Shopify merchants and dropshipping businesses turn visitors into repeat customers.",
    items: [
      "Shopify Store Development", "Shopify Redesign", "Shopify Management", "Conversion Rate Optimization",
      "Product Research", "Product Listing", "E-commerce SEO", "Store Auditing",
    ],
    challenges: [
      "Visitors browse but don't buy",
      "Slow store speed and poor mobile experience",
      "Weak product pages and unclear trust signals",
      "Unfocused catalogue or product selection",
    ],
    solutions: [
      { title: "Store Development & Redesign", body: "Clean, fast, brand-led Shopify stores built for mobile shoppers." },
      { title: "Conversion Audits", body: "Page-by-page reviews of your funnel with prioritised, actionable recommendations." },
      { title: "Product Research & Listing", body: "Data-led product selection and persuasive, SEO-friendly product pages." },
      { title: "Ongoing Management", body: "Day-to-day store management so you can focus on growing the business." },
    ],
    process: standardProcess,
    portfolioCategory: "Shopify & E-commerce",
    faqs: [
      { q: "Do you specialise in Shopify?", a: "Yes. Shopify is our core e-commerce platform — builds, redesigns, audits, apps and ongoing management." },
      { q: "Do you work with dropshipping stores?", a: "Yes. We help dropshipping businesses with product research, store setup, listings and conversion improvements." },
    ],
  },
  {
    slug: "crm-solutions",
    href: "/crm-solutions",
    title: "CRM Solutions",
    short: "Implement and optimise CRM systems that organise leads, automate follow-up and grow retention.",
    icon: "users",
    headline: "Customer relationships, systemised.",
    intro: "See our dedicated CRM Solutions page for the full picture.",
    items: [
      "CRM Implementation", "CRM Configuration", "Customer Database Management", "Lead Generation and Management",
      "Sales Pipeline Management", "Customer Segmentation", "Marketing Automation", "Customer Journey Management",
      "Customer Support Management", "Customer Retention", "Customer Loyalty Systems", "CRM Analytics and Reporting",
      "CRM Integration and Optimization",
    ],
    challenges: [], solutions: [], process: standardProcess, portfolioCategory: "CRM & Automation", faqs: [],
  },
  {
    slug: "email-sms-marketing",
    href: "/services/email-sms-marketing",
    title: "Email & SMS Marketing",
    short: "Klaviyo flows and campaigns that recover revenue and turn first-time buyers into loyal customers.",
    icon: "mail",
    headline: "Retention marketing that works while you sleep.",
    intro:
      "We design and manage Klaviyo email and SMS programmes — automated flows and campaigns that welcome, recover, re-engage and retain your customers.",
    items: [
      "Klaviyo Setup", "Email Campaign Management", "Welcome Automation", "Abandoned Cart Flows",
      "Post-Purchase Automation", "Win-Back Campaigns", "Newsletter Design", "SMS Marketing", "Retention Marketing",
    ],
    challenges: [
      "Abandoned carts with no recovery sequence",
      "An email list that is rarely used",
      "Low repeat-purchase rate",
      "Generic newsletters that don't get opened",
    ],
    solutions: [
      { title: "Klaviyo Setup", body: "Account, list, signup form and integration setup done properly from day one." },
      { title: "Automated Flows", body: "Welcome, abandoned cart, browse abandonment, post-purchase and win-back flows." },
      { title: "Campaigns & Design", body: "On-brand newsletters and campaigns planned around your promotional calendar." },
      { title: "SMS & Retention", body: "Compliant SMS marketing and segmentation that rewards your best customers." },
    ],
    process: standardProcess,
    portfolioCategory: "CRM & Automation",
    faqs: [
      { q: "Do you work with platforms other than Klaviyo?", a: "Klaviyo is our primary platform for e-commerce, but we can advise on alternatives where they suit your business better." },
      { q: "Can you take over an existing Klaviyo account?", a: "Yes. We'll audit what's already in place, then improve or rebuild flows as needed." },
    ],
  },
  {
    slug: "website-development",
    href: "/services/website-development",
    title: "Website Design & Development",
    short: "Fast, responsive business and e-commerce websites designed to build trust and drive action.",
    icon: "monitor",
    headline: "Websites that look premium and perform even better.",
    intro:
      "We design and build business websites, e-commerce stores and landing pages that are fast, accessible, mobile-first and built around conversion.",
    items: [
      "Business Website Development", "E-commerce Website Development", "Shopify Website Design", "Website Redesign",
      "Landing Page Development", "Responsive Web Design", "Website Optimization", "Website Maintenance",
    ],
    challenges: [
      "An outdated website that undermines credibility",
      "Poor mobile experience",
      "Slow load times hurting SEO and conversions",
      "No clear path from visitor to enquiry",
    ],
    solutions: [
      { title: "Business Websites", body: "Professional websites that clearly communicate what you do and why it matters." },
      { title: "E-commerce & Shopify", body: "Online stores designed for smooth browsing and confident checkout." },
      { title: "Landing Pages", body: "Focused, high-converting pages for campaigns and launches." },
      { title: "Optimisation & Care", body: "Speed, SEO and accessibility improvements plus ongoing maintenance." },
    ],
    process: standardProcess,
    portfolioCategory: "Website Development",
    faqs: [
      { q: "Which platforms do you build on?", a: "Shopify for e-commerce, plus modern custom builds (Next.js) and Wix where they fit the project." },
      { q: "Will my website work on mobile?", a: "Every site we build is fully responsive and tested across phones, tablets and desktops." },
    ],
  },
  {
    slug: "growth-strategy",
    href: "/services/growth-strategy",
    title: "Business Growth Strategy",
    short: "Research-led strategy that clarifies your market, your competitors and your next move.",
    icon: "compass",
    headline: "Clarity on where to grow — and how.",
    intro:
      "We help founders and growing businesses make better decisions with competitor analysis, market research and practical digital growth strategies.",
    items: [
      "Competitor Analysis", "Marketing Research", "Customer Acquisition Strategy",
      "Digital Growth Strategy", "Conversion Optimization", "Business Consulting",
    ],
    challenges: [
      "Unclear positioning against competitors",
      "Growth that has plateaued",
      "Too many channels, not enough focus",
      "Decisions made without data",
    ],
    solutions: [
      { title: "Competitor Analysis", body: "A structured view of your competitors' positioning, offers and channels." },
      { title: "Acquisition Strategy", body: "The right channels and messages to reach your most valuable customers." },
      { title: "Growth Roadmaps", body: "A prioritised 90-day plan that connects activity to business outcomes." },
      { title: "Consulting", body: "Ongoing strategic support as your business evolves." },
    ],
    process: standardProcess,
    portfolioCategory: "Digital Marketing",
    faqs: [
      { q: "Can I request a custom strategy?", a: "Yes. Every strategy is built around your business, market and goals — nothing is off-the-shelf." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
