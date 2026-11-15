import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        // Primewave design tokens (see Phase 1 proposal)
        deep: "#080D16", // page background
        surface: "#101827", // sections, cards, admin panels
        navy: { DEFAULT: "#17243A", 950: "#080D16", 900: "#101827", 800: "#1E2D47" }, // raised surfaces
        accent: { DEFAULT: "#FF7A30", 600: "#E8661D", 300: "#FFB088" }, // CTAs, active states, highlights
        cta: { DEFAULT: "#1D6FF2", 600: "#1559CC", 400: "#4C8DFF" }, // blue call-to-action buttons (matches logo)
        muted: "#9AA6B5", // supporting text
        line: "#1F2B3E", // borders and dividers
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.04em" },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,.3), 0 12px 32px -12px rgba(0,0,0,.5)",
        lift: "0 2px 4px rgba(0,0,0,.3), 0 24px 48px -16px rgba(255,122,48,.25)",
        glow: "0 0 0 1px rgba(255,122,48,.25), 0 10px 40px -10px rgba(255,122,48,.45)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg,#FF7A30 0%,#FFB088 100%)",
        "grid-faint":
          "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
      },
      keyframes: {
        drift: { "0%,100%": { transform: "translate3d(0,0,0)" }, "50%": { transform: "translate3d(2%,-3%,0)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { drift: "drift 18s ease-in-out infinite", marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
