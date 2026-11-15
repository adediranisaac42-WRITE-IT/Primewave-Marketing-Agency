"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";
import { site } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();
  const headline = ["Turning", "Digital", "Potential", "Into", "Business", "Growth."];
  return (
    <section className="dark-section relative isolate overflow-hidden bg-deep pb-20 pt-36 md:pb-28 md:pt-44">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -left-40 top-0 h-[560px] w-[560px] animate-drift rounded-full bg-accent/25 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 h-[460px] w-[460px] animate-drift rounded-full bg-accent/15 blur-[140px] [animation-delay:-9s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy" />
      </div>

      <div className="container grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {site.tagline}
          </motion.p>

          <h1 aria-label={site.message} className="mt-8 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tightest text-white sm:text-6xl xl:text-[5.2rem]">
            {headline.map((w, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className={`inline-block ${w === "Growth." || w === "Business" ? "text-gradient" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
          >
            We help ambitious businesses attract the right audience, build powerful digital experiences and turn opportunities into measurable business growth.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/services">Explore Our Services</Button>
            <Button href="/contact" variant="secondary">Book a Consultation</Button>
          </motion.div>

          <motion.ul
            initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/45"
          >
            {["Serving the UK", "United States", "International markets"].map((m) => (
              <li key={m} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" />{m}</li>
            ))}
          </motion.ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
