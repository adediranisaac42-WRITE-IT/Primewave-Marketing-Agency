// Keep in step with lib/data/catalog.ts (the 10 services) plus CRM and "not sure".
export const serviceOptions = [
  "Shopify Website Design & Development", "E-commerce Website Redesign", "Shopify Store Management",
  "Conversion Rate Optimization", "SEO & Organic Growth", "Klaviyo Email Marketing & Automation",
  "Social Media Marketing", "Paid Advertising", "Product Research & Product Listing",
  "E-commerce Growth Strategy", "CRM Solutions", "Not sure yet",
] as const;

export const budgetOptions = [
  "Under £1,000", "£1,000 – £3,000", "£3,000 – £7,500", "£7,500 – £15,000", "£15,000+", "Prefer to discuss",
] as const;

export type ContactInput = {
  full_name: string; email: string; business_name: string; website_url: string;
  service: string; budget: string; message: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared validation — runs in the browser for UX and again on the server for security. */
export function validateContact(d: Partial<Record<keyof ContactInput, unknown>>) {
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: ContactInput = {
    full_name: s(d.full_name), email: s(d.email).toLowerCase(), business_name: s(d.business_name),
    website_url: s(d.website_url), service: s(d.service), budget: s(d.budget), message: s(d.message),
  };
  const errors: Partial<Record<keyof ContactInput, string>> = {};
  if (data.full_name.length < 2 || data.full_name.length > 120) errors.full_name = "Please enter your full name.";
  if (!EMAIL.test(data.email) || data.email.length > 200) errors.email = "Please enter a valid email address.";
  if (data.business_name.length > 160) errors.business_name = "Business name is too long.";
  if (data.website_url) {
    const u = /^https?:\/\//i.test(data.website_url) ? data.website_url : `https://${data.website_url}`;
    try { new URL(u); data.website_url = u; } catch { errors.website_url = "Please enter a valid website URL."; }
    if (data.website_url.length > 300) errors.website_url = "URL is too long.";
  }
  if (!(serviceOptions as readonly string[]).includes(data.service)) errors.service = "Please choose a service.";
  if (!(budgetOptions as readonly string[]).includes(data.budget)) errors.budget = "Please choose a budget range.";
  if (data.message.length < 20) errors.message = "Please tell us a little more (at least 20 characters).";
  if (data.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";
  return { data, errors, ok: Object.keys(errors).length === 0 };
}
