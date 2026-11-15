export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  country: string;
  bio: string;
  photo: string; // 800×1000 portrait in /public/images/team
};

/** Only list people who work with Primewave and have agreed to appear on the site. */
export const team: TeamMember[] = [
  {
    slug: "isaac-adediran",
    name: "Isaac Adediran",
    role: "Founder & Digital Marketing Strategist",
    country: "Nigeria",
    bio: "Leads the agency's vision, digital marketing strategy and business growth initiatives.",
    photo: "/images/team/isaac-adediran.webp",
  },
  {
    slug: "paul-shadrack",
    name: "Paul Shadrack",
    role: "Co-Founder & Marketing Specialist",
    country: "Nigeria",
    bio: "Focuses on marketing strategy, client relationships and developing effective growth solutions.",
    photo: "/images/team/paul-shadrack.webp",
  },
  {
    slug: "oliver-bennett",
    name: "Oliver Bennett",
    role: "SEO & Growth Specialist",
    country: "United Kingdom",
    bio: "Specialises in search engine optimisation, organic visibility and sustainable website growth.",
    photo: "/images/team/oliver-bennett.webp",
  },
  {
    slug: "chloe-mitchell",
    name: "Chloe Mitchell",
    role: "Social Media & Brand Strategist",
    country: "Canada",
    bio: "Focuses on brand positioning, social media strategy, audience engagement and digital brand awareness.",
    photo: "/images/team/chloe-mitchell.webp",
  },
];
