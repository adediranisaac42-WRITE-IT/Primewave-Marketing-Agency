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
  /** Deliverables shown under "What's included". */
  items: string[];
  /** Who the service suits best. */
  idealFor: string[];
  challenges: string[];
  solutions: { title: string; body: string }[];
  process: { title: string; body: string }[];
  portfolioCategory: PortfolioCategory;
  /** Slugs of closely related services, for internal linking. */
  related: string[];
  faqs: { q: string; a: string }[];
};

export type PortfolioCategory =
  | "Website Development"
  | "Shopify & E-commerce"
  | "Digital Marketing"
  | "CRM & Automation";

/**
 * The 10 Primewave services. Each one gets its own landing page at /services/[slug].
 * Copy describes what we do; it makes no claims about specific results.
 */
export const services: Service[] = [
  {
    slug: "shopify-website-development",
    href: "/services/shopify-website-development",
    title: "Shopify Website Design & Development",
    short: "Fast, brand-led Shopify stores built for mobile shoppers and designed to turn visits into orders.",
    icon: "monitor",
    headline: "A Shopify store built to sell from day one.",
    intro:
      "We design and build Shopify stores around your brand, your products and how your customers buy, with clean navigation, persuasive product pages and a checkout that works properly on mobile.",
    items: [
      "Store setup and configuration", "Custom theme design", "Homepage and collection layouts", "Product page design",
      "Mobile-first build", "Apps and integrations", "Payments, shipping and tax setup", "Launch checklist and handover",
    ],
    idealFor: ["New brands launching their first store", "Businesses moving to Shopify from another platform", "Sellers who have outgrown a template store"],
    challenges: [
      "You need a store but don't know where to start",
      "Free themes make your brand look like everyone else's",
      "Product pages don't answer buyers' questions",
      "The mobile experience feels like an afterthought",
    ],
    solutions: [
      { title: "Brand-Led Design", body: "A store that looks and feels like your brand, built on a structure shoppers already understand." },
      { title: "Conversion-Ready Pages", body: "Product, collection and cart pages laid out to answer questions and reduce hesitation." },
      { title: "Clean Technical Setup", body: "Payments, shipping, taxes, apps and tracking configured correctly before launch." },
      { title: "Handover You Can Use", body: "A walkthrough of how to add products, run discounts and update content yourself." },
    ],
    process: [
      { title: "Discover", body: "We learn your products, customers, competitors and goals for the store." },
      { title: "Design", body: "Wireframes and visual designs for the key pages, reviewed with you before building." },
      { title: "Build", body: "We build, configure and test the store across devices and browsers." },
      { title: "Launch", body: "Final checks, go-live and a handover session so you're confident running it." },
    ],
    portfolioCategory: "Shopify & E-commerce",
    related: ["ecommerce-website-redesign", "conversion-rate-optimization", "shopify-store-management"],
    faqs: [
      { q: "How long does a Shopify build take?", a: "It depends on the number of pages, products and integrations. We agree a timeline after the discovery call, before any work starts." },
      { q: "Can you migrate my existing store?", a: "Yes. We can move products, customers and content from another platform and set up redirects so you keep your search visibility." },
      { q: "Will I be able to update the store myself?", a: "Yes. Every build ends with a handover so you can manage products, pages and discounts without us." },
    ],
  },
  {
    slug: "ecommerce-website-redesign",
    href: "/services/ecommerce-website-redesign",
    title: "E-commerce Website Redesign",
    short: "Rebuild an underperforming store around clearer navigation, stronger product pages and a smoother checkout.",
    icon: "refresh",
    headline: "Redesign your store around how customers actually buy.",
    intro:
      "If your store gets visitors but not enough orders, a redesign can fix the structure, not just the look. We review what's holding buyers back, then rebuild the pages that matter most.",
    items: [
      "Current store review", "Navigation and information architecture", "Homepage redesign", "Collection and product page redesign",
      "Cart and checkout improvements", "Speed and mobile improvements", "Trust and brand elements", "Redirects and SEO protection",
    ],
    idealFor: ["Established stores with dated design", "Brands that have rebranded or changed direction", "Stores with traffic but low sales"],
    challenges: [
      "The store looks dated next to competitors",
      "Customers struggle to find the right product",
      "High drop-off between product page and checkout",
      "Pages are slow, especially on mobile",
    ],
    solutions: [
      { title: "Evidence-Based Review", body: "We look at your pages, analytics and customer journey before changing anything." },
      { title: "Clearer Structure", body: "Navigation, collections and filters reorganised so shoppers reach the right product faster." },
      { title: "Stronger Product Pages", body: "Better imagery layouts, benefits, reviews and answers to common objections." },
      { title: "Safe Migration", body: "URLs, redirects and SEO settings handled so the redesign doesn't cost you search visibility." },
    ],
    process: [
      { title: "Review", body: "A page-by-page review of the current store and where customers drop off." },
      { title: "Plan", body: "A prioritised redesign plan covering structure, pages and content." },
      { title: "Redesign", body: "New designs for the key pages, approved by you, then built and tested." },
      { title: "Relaunch", body: "Go-live with redirects in place, followed by a post-launch check." },
    ],
    portfolioCategory: "Shopify & E-commerce",
    related: ["shopify-website-development", "conversion-rate-optimization", "seo-organic-growth"],
    faqs: [
      { q: "Do I need a full redesign or just fixes?", a: "Not always a full redesign. Our review tells you which pages need rebuilding and which only need targeted changes." },
      { q: "Will my store go offline during the redesign?", a: "No. We work on an unpublished copy of your theme and only switch over once you've approved it." },
      { q: "Will I lose my Google rankings?", a: "We keep URLs where possible and set up redirects where they change, which protects the visibility you already have." },
    ],
  },
  {
    slug: "shopify-store-management",
    href: "/services/shopify-store-management",
    title: "Shopify Store Management",
    short: "Day-to-day store upkeep, product updates, apps and fixes, so you can focus on running the business.",
    icon: "cart",
    headline: "Your store, looked after every week.",
    intro:
      "We take care of the routine work that keeps a Shopify store healthy, from product uploads and content updates to app management and fixes, so you can spend your time on suppliers, customers and growth.",
    items: [
      "Product uploads and updates", "Collection and menu management", "Homepage and banner updates", "Discount and promotion setup",
      "App installation and management", "Theme fixes and small improvements", "Store health checks", "Monthly activity summary",
    ],
    idealFor: ["Busy founders without time for store admin", "Stores with frequent product or promotion changes", "Teams without in-house Shopify skills"],
    challenges: [
      "Store updates keep slipping down the to-do list",
      "Broken links, apps or layouts go unnoticed",
      "Seasonal promotions are set up at the last minute",
      "Too many apps slowing the store down",
    ],
    solutions: [
      { title: "Reliable Upkeep", body: "Regular product, content and promotion updates handled on a schedule you agree." },
      { title: "Proactive Checks", body: "We check for broken pages, app conflicts and speed issues before customers notice." },
      { title: "Campaign Support", body: "Banners, collections and discounts ready ahead of sales and seasonal events." },
      { title: "Clear Reporting", body: "A short monthly summary of what was done and what we recommend next." },
    ],
    process: [
      { title: "Onboard", body: "We review the store, agree priorities and set up access securely." },
      { title: "Plan", body: "A monthly task list built around your products, promotions and calendar." },
      { title: "Manage", body: "Ongoing updates and fixes, with a clear way to send us requests." },
      { title: "Review", body: "A monthly summary and recommendations for the month ahead." },
    ],
    portfolioCategory: "Shopify & E-commerce",
    related: ["conversion-rate-optimization", "product-research-listing", "klaviyo-email-marketing"],
    faqs: [
      { q: "How do I send requests?", a: "We agree a simple channel during onboarding, such as email or WhatsApp, and confirm each request when it's done." },
      { q: "Do you need my Shopify login?", a: "No. We ask you to add us as a staff or collaborator account, so you stay in control of access." },
      { q: "Is there a minimum term?", a: "Terms are agreed per client. We'll explain the options during the strategy call." },
    ],
  },
  {
    slug: "conversion-rate-optimization",
    href: "/services/conversion-rate-optimization",
    title: "Conversion Rate Optimization",
    short: "Page-by-page reviews of your funnel and prioritised changes that remove friction for buyers.",
    icon: "gauge",
    headline: "Turn more of your existing visitors into customers.",
    intro:
      "Before spending more on traffic, make sure your store converts the visitors it already has. We audit your funnel, find where buyers hesitate or leave, and help you fix it in order of impact.",
    items: [
      "Full conversion audit", "Homepage and navigation review", "Product page review", "Cart and checkout review",
      "Mobile experience review", "Speed and performance review", "Trust signal review", "Prioritised action plan",
    ],
    idealFor: ["Stores with steady traffic but low sales", "Brands about to scale paid advertising", "Owners who want a clear list of fixes"],
    challenges: [
      "Visitors browse but don't add to cart",
      "Carts are abandoned at checkout",
      "You're not sure which changes would matter most",
      "Ad spend rises but orders don't",
    ],
    solutions: [
      { title: "Detailed Audit", body: "A page-by-page review of your store with screenshots and plain-English findings." },
      { title: "Prioritised Plan", body: "Recommendations ranked by likely impact and effort, so you know what to do first." },
      { title: "Implementation", body: "We can make the changes for you, or hand the plan to your own team." },
      { title: "Measure and Refine", body: "Track the effect of changes and keep improving the pages that matter." },
    ],
    process: [
      { title: "Audit", body: "We review your store, analytics and checkout flow from a buyer's point of view." },
      { title: "Prioritise", body: "Findings ranked by impact and effort in a clear action plan." },
      { title: "Implement", body: "Changes made by us or your team, starting with the highest-impact items." },
      { title: "Measure", body: "We compare before and after, and plan the next round of improvements." },
    ],
    portfolioCategory: "Shopify & E-commerce",
    related: ["ecommerce-website-redesign", "paid-advertising", "ecommerce-growth-strategy"],
    faqs: [
      { q: "What do I get from an audit?", a: "A written report with screenshots, the issues we found, and a prioritised list of recommended changes." },
      { q: "Do you guarantee a higher conversion rate?", a: "No honest agency can guarantee a number. We focus on fixing the issues that most often stop people buying, and measure the effect." },
      { q: "Can you implement the recommendations?", a: "Yes. We can make the changes ourselves or work alongside your developer." },
    ],
  },
  {
    slug: "seo-organic-growth",
    href: "/services/seo-organic-growth",
    title: "SEO & Organic Growth",
    short: "Technical, on-page and content SEO that builds steady search visibility for the terms your buyers use.",
    icon: "search",
    headline: "Get found by customers who are already searching.",
    intro:
      "We improve the technical health, structure and content of your site so search engines understand it and customers can find it, building visibility that keeps working without paying for every click.",
    items: [
      "Technical SEO audit", "Keyword and competitor research", "On-page optimisation", "Collection and product page SEO",
      "Site structure and internal linking", "Content planning", "Image and speed optimisation", "Search Console setup and monitoring",
    ],
    idealFor: ["Stores relying too heavily on paid ads", "New sites that need a solid SEO foundation", "Brands in competitive niches"],
    challenges: [
      "Your store doesn't show up for your product searches",
      "Product and collection pages have thin or duplicate content",
      "Technical issues you can't see are holding the site back",
      "Paid ads are your only source of traffic",
    ],
    solutions: [
      { title: "Technical Foundations", body: "Fix crawl, indexing, speed and structured-data issues that hold pages back." },
      { title: "Keyword Strategy", body: "Target the terms your buyers actually use, mapped to the right pages." },
      { title: "On-Page Optimisation", body: "Titles, descriptions, headings and copy improved for people and search engines." },
      { title: "Content That Ranks", body: "Guides and collection content that answer real questions and earn visibility." },
    ],
    process: [
      { title: "Audit", body: "A technical and content audit plus keyword and competitor research." },
      { title: "Strategy", body: "A keyword map and prioritised plan for the next three months." },
      { title: "Optimise", body: "On-page, technical and content work carried out in order of priority." },
      { title: "Report", body: "Regular reporting on visibility and traffic, with next steps." },
    ],
    portfolioCategory: "Digital Marketing",
    related: ["ecommerce-website-redesign", "product-research-listing", "ecommerce-growth-strategy"],
    faqs: [
      { q: "How long does SEO take to work?", a: "SEO builds over months rather than weeks. We agree realistic milestones at the start and report progress along the way." },
      { q: "Can you guarantee first-page rankings?", a: "No. Nobody controls search rankings, and anyone who guarantees them should be avoided. We focus on the work that improves your chances." },
      { q: "Do you do Shopify SEO specifically?", a: "Yes. Shopify has its own quirks, such as duplicate collection URLs, and we handle them as part of the work." },
    ],
  },
  {
    slug: "klaviyo-email-marketing",
    href: "/services/klaviyo-email-marketing",
    title: "Klaviyo Email Marketing & Automation",
    short: "Welcome, abandoned-cart and post-purchase flows plus campaigns that keep customers coming back.",
    icon: "mail",
    headline: "Emails that sell while you sleep.",
    intro:
      "We set up Klaviyo properly and build the automated flows every store needs, then plan campaigns that keep your brand in front of customers and bring them back to buy again.",
    items: [
      "Klaviyo account setup and integration", "Signup forms and pop-ups", "Welcome series", "Abandoned cart and browse flows",
      "Post-purchase flows", "Win-back flows", "Campaign planning and design", "List segmentation",
    ],
    idealFor: ["Stores not yet using email automation", "Brands with a list they rarely email", "Stores moving to Klaviyo from another platform"],
    challenges: [
      "Abandoned carts are never followed up",
      "New subscribers don't hear from you",
      "Campaigns go out irregularly or not at all",
      "Everyone on the list gets the same message",
    ],
    solutions: [
      { title: "Core Flows", body: "Welcome, abandoned cart, browse abandonment and post-purchase flows set up and tested." },
      { title: "List Growth", body: "Signup forms and offers designed to grow your list without hurting the shopping experience." },
      { title: "Segmentation", body: "Send the right message to new subscribers, first-time buyers and loyal customers." },
      { title: "Campaign Calendar", body: "A planned calendar of campaigns around launches, seasons and promotions." },
    ],
    process: [
      { title: "Audit", body: "We review your current email setup, list and store integration." },
      { title: "Set Up", body: "Klaviyo integration, forms and segments configured correctly." },
      { title: "Build", body: "Flows written, designed and tested before they go live." },
      { title: "Grow", body: "Ongoing campaigns and improvements based on what performs." },
    ],
    portfolioCategory: "Digital Marketing",
    related: ["shopify-store-management", "social-media-marketing", "ecommerce-growth-strategy"],
    faqs: [
      { q: "Do I need a Klaviyo account already?", a: "No. We can set one up for you, or work with your existing account." },
      { q: "Will you write the emails?", a: "Yes. We write and design the emails in your brand voice, and you approve them before they go live." },
      { q: "Do you handle SMS as well?", a: "We can set up Klaviyo SMS where it suits your market and audience, with the consent rules that apply." },
    ],
  },
  {
    slug: "social-media-marketing",
    href: "/services/social-media-marketing",
    title: "Social Media Marketing",
    short: "Content plans and creative direction that keep your brand consistent and visible where customers scroll.",
    icon: "megaphone",
    headline: "A social presence that builds your brand.",
    intro:
      "We plan, create and schedule social content that reflects your brand, speaks to your audience and supports your sales goals, so your channels stay active and consistent.",
    items: [
      "Social media audit", "Content strategy", "Monthly content calendar", "Post design and captions",
      "Short-form video direction", "Scheduling and publishing", "Community management guidance", "Monthly performance summary",
    ],
    idealFor: ["Brands posting inconsistently", "New brands building an audience", "Stores wanting social to support sales"],
    challenges: [
      "Posting is irregular and unplanned",
      "Content doesn't match your brand",
      "Followers don't turn into customers",
      "You don't know which platforms to focus on",
    ],
    solutions: [
      { title: "Clear Strategy", body: "The right platforms, content pillars and posting rhythm for your audience." },
      { title: "Consistent Content", body: "A monthly calendar of designed posts and captions in your brand voice." },
      { title: "Video Direction", body: "Ideas and scripts for short-form video that fits each platform." },
      { title: "Learning Loop", body: "Monthly review of what's working, used to shape the next month's content." },
    ],
    process: [
      { title: "Audit", body: "A review of your current channels, audience and competitors." },
      { title: "Strategy", body: "Platforms, content pillars, tone and posting schedule agreed." },
      { title: "Create", body: "Monthly content produced and approved by you before publishing." },
      { title: "Review", body: "Performance summary and adjustments for the following month." },
    ],
    portfolioCategory: "Digital Marketing",
    related: ["paid-advertising", "klaviyo-email-marketing", "ecommerce-growth-strategy"],
    faqs: [
      { q: "Which platforms do you work with?", a: "Mainly Instagram, Facebook, TikTok and LinkedIn. We recommend the ones that fit your audience." },
      { q: "Do you reply to comments and messages?", a: "We can provide guidance and templates, or discuss managed community support during the strategy call." },
      { q: "Do I approve content before it's posted?", a: "Yes. You approve each month's calendar before anything is published." },
    ],
  },
  {
    slug: "paid-advertising",
    href: "/services/paid-advertising",
    title: "Paid Advertising",
    short: "Meta and Google campaigns structured around clear audiences, creative testing and conversion tracking.",
    icon: "target",
    headline: "Ad campaigns built on tracking, testing and clear goals.",
    intro:
      "We plan and manage paid campaigns on Meta and Google with proper conversion tracking, structured audiences and ongoing creative testing, so your budget goes where it does the most good.",
    items: [
      "Account and tracking audit", "Pixel and conversion tracking setup", "Audience research", "Campaign structure and setup",
      "Ad copy and creative direction", "Creative testing", "Budget management", "Regular performance reports",
    ],
    idealFor: ["Stores ready to scale with paid traffic", "Brands whose current ads aren't profitable", "Businesses launching new products"],
    challenges: [
      "Ad spend without clear returns",
      "Tracking is missing or unreliable",
      "Creative goes stale and performance drops",
      "Campaigns are hard to understand or report on",
    ],
    solutions: [
      { title: "Reliable Tracking", body: "Pixels, conversions and events set up so you can trust the numbers." },
      { title: "Structured Campaigns", body: "Campaigns organised around audiences and goals, not guesswork." },
      { title: "Creative Testing", body: "A steady rhythm of new ads tested against each other." },
      { title: "Transparent Reporting", body: "Clear reports on spend, results and what we're changing next." },
    ],
    process: [
      { title: "Audit", body: "Review of accounts, tracking, past campaigns and your store's readiness." },
      { title: "Set Up", body: "Tracking fixed, audiences built and campaigns structured." },
      { title: "Launch and Test", body: "Campaigns launched with a creative testing plan." },
      { title: "Optimise", body: "Budgets and creative adjusted based on results, with regular reports." },
    ],
    portfolioCategory: "Digital Marketing",
    related: ["conversion-rate-optimization", "social-media-marketing", "ecommerce-growth-strategy"],
    faqs: [
      { q: "Which platforms do you manage?", a: "Mainly Meta (Facebook and Instagram) and Google. We can discuss TikTok where it suits your audience." },
      { q: "Is ad spend included in your fee?", a: "No. Ad spend is paid directly to the platform from your account. Our fee covers management." },
      { q: "Should I fix my store before running ads?", a: "Often, yes. If the store doesn't convert, ads cost more per sale. We'll tell you honestly if that's the case." },
    ],
  },
  {
    slug: "product-research-listing",
    href: "/services/product-research-listing",
    title: "Product Research & Product Listing",
    short: "Data-led product selection and persuasive, search-friendly listings that answer buyers' questions.",
    icon: "lightbulb",
    headline: "Better products, better listings, more confident buyers.",
    intro:
      "We help you choose products with real demand and present them properly, with clear titles, benefit-led descriptions, organised variants and images that answer buyers' questions.",
    items: [
      "Niche and competitor research", "Product demand research", "Supplier shortlisting guidance", "Product titles and descriptions",
      "Variant and option setup", "Image and media organisation", "SEO-friendly listings", "Collection organisation",
    ],
    idealFor: ["New stores choosing their first products", "Dropshipping and print-on-demand stores", "Stores with weak or copied product descriptions"],
    challenges: [
      "Not sure which products are worth selling",
      "Descriptions are copied from the supplier",
      "Listings are messy, with confusing variants",
      "Products don't appear in search results",
    ],
    solutions: [
      { title: "Research-Led Selection", body: "Products shortlisted on demand, competition and fit with your brand." },
      { title: "Persuasive Copy", body: "Titles and descriptions that lead with benefits and answer common questions." },
      { title: "Clean Listings", body: "Variants, images and collections organised so products are easy to browse." },
      { title: "Search-Friendly", body: "Listings written with the terms customers actually search for." },
    ],
    process: [
      { title: "Research", body: "Market, competitor and demand research for your niche." },
      { title: "Shortlist", body: "A product shortlist with the reasoning behind each pick." },
      { title: "List", body: "Product pages written, organised and uploaded to your store." },
      { title: "Review", body: "A final check of every listing on desktop and mobile." },
    ],
    portfolioCategory: "Shopify & E-commerce",
    related: ["shopify-store-management", "seo-organic-growth", "shopify-website-development"],
    faqs: [
      { q: "Do you find suppliers?", a: "We can shortlist suppliers and explain the trade-offs. The final supplier choice and agreement stay with you." },
      { q: "How many products can you list?", a: "Any number. We agree the scope and timeline based on how many products and variants you have." },
      { q: "Do you write unique descriptions?", a: "Yes. Every description is written for your store, not copied from the supplier." },
    ],
  },
  {
    slug: "ecommerce-growth-strategy",
    href: "/services/ecommerce-growth-strategy",
    title: "E-commerce Growth Strategy",
    short: "A prioritised roadmap across store, marketing and retention, tied to the goals that matter to you.",
    icon: "rocket",
    headline: "A clear plan for growing your online business.",
    intro:
      "We look at your whole business online, including store, traffic, conversion, email and retention, and turn it into a prioritised roadmap, so you know what to do next and why.",
    items: [
      "Business and goals workshop", "Store and funnel review", "Channel and marketing review", "Competitor analysis",
      "Customer journey mapping", "Prioritised 90-day roadmap", "KPI and tracking plan", "Monthly strategy check-ins",
    ],
    idealFor: ["Founders unsure where to focus next", "Stores that have plateaued", "Businesses planning a new market or launch"],
    challenges: [
      "Too many ideas and no clear priorities",
      "Growth has stalled and you're not sure why",
      "Marketing activity isn't joined up",
      "No clear way to measure what's working",
    ],
    solutions: [
      { title: "Whole-Business View", body: "Store, marketing and retention reviewed together, not in silos." },
      { title: "Prioritised Roadmap", body: "A 90-day plan ranked by impact, effort and your resources." },
      { title: "Clear Measures", body: "The few numbers that matter, and how to track them." },
      { title: "Ongoing Guidance", body: "Regular check-ins to review progress and adjust the plan." },
    ],
    process: [
      { title: "Discover", body: "A workshop on your business, goals, customers and constraints." },
      { title: "Analyse", body: "Review of your store, channels, competitors and data." },
      { title: "Plan", body: "A prioritised roadmap with owners, timelines and measures." },
      { title: "Guide", body: "Regular check-ins to track progress and refine the plan." },
    ],
    portfolioCategory: "Digital Marketing",
    related: ["conversion-rate-optimization", "paid-advertising", "klaviyo-email-marketing"],
    faqs: [
      { q: "Is this just advice, or do you do the work?", a: "Both are possible. Some clients use the roadmap with their own team; others ask us to deliver parts of it." },
      { q: "What do you need from me?", a: "Access to your store and analytics, and time for a workshop at the start so we understand the business." },
      { q: "How is this different from an audit?", a: "An audit looks at one area in depth. Strategy looks across the whole business and decides what to tackle first." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
