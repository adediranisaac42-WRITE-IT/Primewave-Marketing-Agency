import type { IconKey } from "./services";

export const crmPillars: { icon: IconKey; title: string; body: string; items: string[] }[] = [
  {
    icon: "layers",
    title: "Implementation & Configuration",
    body: "Choose, set up and tailor the right CRM so it fits how your business actually sells and serves.",
    items: ["CRM Implementation", "CRM Configuration", "CRM Integration and Optimization"],
  },
  {
    icon: "target",
    title: "Leads & Pipeline",
    body: "Capture every lead, qualify it consistently and move it through a clear, visible sales pipeline.",
    items: ["Lead Generation and Management", "Sales Pipeline Management", "Customer Database Management"],
  },
  {
    icon: "refresh",
    title: "Automation & Journeys",
    body: "Automate follow-up and map the customer journey so nobody slips through the cracks.",
    items: ["Marketing Automation", "Customer Journey Management", "Customer Segmentation"],
  },
  {
    icon: "heart",
    title: "Retention & Loyalty",
    body: "Support customers well, keep them coming back and reward the relationships that matter most.",
    items: ["Customer Support Management", "Customer Retention", "Customer Loyalty Systems"],
  },
  {
    icon: "chart",
    title: "Analytics & Reporting",
    body: "Dashboards and reports that show pipeline health, conversion and customer value at a glance.",
    items: ["CRM Analytics and Reporting"],
  },
];

export const crmChallenges = [
  "Leads scattered across inboxes, spreadsheets and DMs",
  "No consistent follow-up — opportunities go cold",
  "No visibility of the sales pipeline or forecast",
  "Customer data that is duplicated, outdated or incomplete",
  "Marketing that treats every customer the same",
  "Tools that don't talk to each other",
];

export const crmPlatforms = ["GoHighLevel", "Zoho CRM", "Klaviyo", "Shopify", "Custom CRM builds"];

export const crmProcess = [
  { title: "Audit & Discovery", body: "We map your current sales and customer process, data sources and tools." },
  { title: "Architecture", body: "We design pipelines, fields, segments and automations around your workflow." },
  { title: "Build & Migrate", body: "We configure the CRM, clean and import data and connect integrations." },
  { title: "Train & Launch", body: "Your team learns the system with clear documentation and a calm handover." },
  { title: "Measure & Optimise", body: "We review reporting and refine automations as your business grows." },
];

export const crmFaqs = [
  { q: "Which CRM platforms do you work with?", a: "We work with GoHighLevel, Zoho CRM and Klaviyo, connect them with Shopify, and can build custom CRM solutions where an off-the-shelf tool isn't the right fit." },
  { q: "Can you migrate data from spreadsheets or another CRM?", a: "Yes. We clean, de-duplicate and import your existing contacts and deals, then verify everything before launch." },
  { q: "Do you provide training?", a: "Yes. Every implementation includes a walkthrough for your team and written documentation." },
  { q: "Can the CRM connect to my Shopify store and email marketing?", a: "In most cases, yes — we integrate your CRM with Shopify, Klaviyo, forms and other tools so data flows automatically." },
];
