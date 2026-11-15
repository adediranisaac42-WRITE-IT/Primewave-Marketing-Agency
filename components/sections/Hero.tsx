"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ctas, site } from "@/lib/site";

const TITLE = "Digital Experiences That Move Businesses Forward.";
const ACCENT = new Set(["Move", "Forward."]);

/** Photo-led hero: team photo on the right, fading into the dark background behind the copy. */
export function Hero() {
  const reduce = useReducedMotion();
  const words = TITLE.split(" ");

  return (
    <section className="dark-section relative isolate overflow-hidden bg-deep pb-20 pt-36 md:pb-28 md:pt-44 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-28">
      {/* Background photo + overlays */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-full lg:w-[64%]"
        >
          <Image
            src="/images/hero-team.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="object-cover object-[60%_center]"
          />
        </motion.div>
        {/* Mobile: even dark wash so text stays readable over the photo */}
        <div className="absolute inset-0 bg-deep/80 lg:hidden" />
        {/* Desktop: solid on the left, fading into the photo */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#080D16_0%,#080D16_36%,rgba(8,13,22,.75)_50%,rgba(8,13,22,.15)_70%,rgba(8,13,22,0)_100%)] lg:block" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-deep/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-deep to-transparent" />
        <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[150px]" />
      </div>

      <div className="container">
        <div className="max-w-2xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {site.tagline}
          </motion.p>

          <h1
            aria-label={TITLE}
            className="mt-8 font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-tightest text-white sm:text-6xl xl:text-[5.4rem]"
          >
            {words.map((w, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  className={`inline-block ${ACCENT.has(w) ? "text-accent" : ""}`}
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
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            We build high-performing websites and intelligent marketing systems that help ambitious brands attract
            customers, improve conversions and scale with confidence.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={ctas.project.href} className="!px-8 !py-4 text-base">{ctas.project.label}</Button>
            <Button href={ctas.call.href} variant="secondary" arrow={false} className="!px-8 !py-4 text-base">
              <span className="inline-flex items-center gap-2.5">
                <CalendarDays aria-hidden className="h-5 w-5" />
                {ctas.call.label}
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
