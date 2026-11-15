export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  source?: string; // e.g. "Fiverr", "Google"
  rating?: number;
  placeholder?: boolean;
};

/**
 * ADD GENUINE CLIENT TESTIMONIALS HERE (e.g. copied word-for-word from Fiverr reviews, with the client's name as shown).
 * While this is empty, a clearly marked placeholder appears in development only, and the section is hidden in production.
 */
const genuine: Testimonial[] = [];

const devPlaceholder: Testimonial[] = [
  {
    quote: "DEVELOPMENT PLACEHOLDER — add a real client review in lib/data/testimonials.ts. This text never appears in production.",
    name: "Placeholder Client",
    source: "Not published",
    placeholder: true,
  },
];

export const testimonials: Testimonial[] =
  genuine.length > 0 ? genuine : process.env.NODE_ENV === "production" ? [] : devPlaceholder;
