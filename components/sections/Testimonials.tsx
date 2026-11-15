"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (n < 2 || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 7000);
    return () => clearInterval(t);
  }, [n, paused]);

  if (n === 0) return null; // nothing genuine to show → section hidden
  const t = testimonials[i];

  return (
    <section className="dark-section section relative overflow-hidden bg-surface" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <SectionHeading dark eyebrow="Client Feedback" title="What clients say." align="center" />
        <div className="relative mx-auto mt-14 max-w-3xl text-center" aria-live="polite">
          {t.placeholder && (
            <p className="mx-auto mb-6 w-fit rounded-full bg-amber-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Development placeholder — hidden in production
            </p>
          )}
          <Quote aria-hidden className="mx-auto h-10 w-10 text-accent/60" />
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
              <blockquote className="mt-6 font-display text-2xl font-medium leading-relaxed text-white md:text-3xl">“{t.quote}”</blockquote>
              <figcaption className="mt-8">
                {t.rating && (
                  <div className="mb-3 flex justify-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-accent text-accent" />)}
                  </div>
                )}
                <p className="font-semibold text-white">{t.name}</p>
                {(t.role || t.source) && <p className="text-sm text-white/50">{[t.role, t.source].filter(Boolean).join(" · ")}</p>}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          {n > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button aria-label="Previous testimonial" onClick={() => setI((i - 1 + n) % n)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white hover:border-accent"><ChevronLeft className="h-5 w-5" /></button>
              <div className="flex gap-2">
                {testimonials.map((_, k) => (
                  <button key={k} aria-label={`Show testimonial ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-1.5 bg-white/30"}`} />
                ))}
              </div>
              <button aria-label="Next testimonial" onClick={() => setI((i + 1) % n)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white hover:border-accent"><ChevronRight className="h-5 w-5" /></button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
