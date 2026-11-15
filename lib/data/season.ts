/**
 * Real retail dates for the homepage countdown. The section always counts down to the next
 * upcoming date in this list, so it never invents urgency. Add future years as they come.
 * Times are midnight US Eastern (when US Black Friday sales begin).
 */
export type SeasonEvent = {
  name: string;
  at: string; // ISO date-time
  headline: string;
  body: string;
  tags: string[];
};

export const seasonEvents: SeasonEvent[] = [
  {
    name: "Black Friday",
    at: "2026-11-27T00:00:00-05:00",
    headline: "Is your store ready for Black Friday?",
    body: "The busiest shopping weekend of the year. Make sure your store loads fast, converts well and your email flows are ready before the traffic arrives.",
    tags: ["Conversion", "Speed", "Email flows"],
  },
  {
    name: "Cyber Monday",
    at: "2026-11-30T00:00:00-05:00",
    headline: "Cyber Monday is next.",
    body: "Keep the momentum going after Black Friday with sharp offers, clear product pages and follow-up emails to everyone who browsed but didn't buy.",
    tags: ["Offers", "Retargeting", "Email"],
  },
  {
    name: "Christmas",
    at: "2026-12-25T00:00:00-05:00",
    headline: "Make the most of the Christmas rush.",
    body: "Gift guides, delivery cut-off messaging and festive campaigns that turn seasonal browsers into customers.",
    tags: ["Gift guides", "Campaigns", "Delivery messaging"],
  },
  {
    name: "Black Friday 2027",
    at: "2027-11-26T00:00:00-05:00",
    headline: "Plan next Black Friday early.",
    body: "The stores that win peak season start preparing months ahead. Build the store, content and email list now.",
    tags: ["Strategy", "SEO", "List growth"],
  },
];
