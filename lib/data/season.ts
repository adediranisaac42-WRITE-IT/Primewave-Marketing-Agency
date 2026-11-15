/**
 * Time-limited promotions for the homepage spotlight. The section shows the first entry whose end
 * date hasn't passed and hides itself when none are left, so the countdown always reflects a real deadline.
 */
export type SeasonEvent = {
  /** Shown in the small pill above the title. */
  eyebrow: string;
  /** Title is rendered as `${title} <accent>${titleAccent}</accent>`. */
  title: string;
  titleAccent: string;
  headline: string;
  body: string;
  tags: string[];
  /** Offer card */
  cardLabel: string;
  cardTitle: string;
  cardCta: { label: string; href: string };
  /** Countdown */
  countdownLabel: string;
  endsAt: string; // ISO date-time
  terms?: string;
};

export const seasonEvents: SeasonEvent[] = [
  {
    eyebrow: "Christmas offer · Ends 24 December",
    title: "10% off",
    titleAccent: "every service",
    headline: "Book before Christmas and save 10%.",
    body: "Start the new year with a stronger store. Book any Primewave service before 25 December and we'll take 10% off your project.",
    tags: ["All 10 services", "New projects", "Ends 24 Dec"],
    cardLabel: "Christmas offer",
    cardTitle: "10% off any new project",
    cardCta: { label: "Claim 10% Off", href: "/contact?intent=offer" },
    countdownLabel: "Offer ends in",
    endsAt: "2026-12-25T00:00:00Z", // midnight UK time, start of Christmas Day
    terms: "Valid on new projects booked before 25 December 2026 (UK time).",
  },
];
