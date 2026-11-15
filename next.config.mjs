/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    const moved = {
      "digital-marketing": "social-media-marketing",
      "ecommerce-growth": "shopify-website-development",
      "email-sms-marketing": "klaviyo-email-marketing",
      "website-development": "shopify-website-development",
      "growth-strategy": "ecommerce-growth-strategy",
    };
    return Object.entries(moved).map(([from, to]) => ({
      source: `/services/${from}`, destination: `/services/${to}`, permanent: true,
    }));
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
