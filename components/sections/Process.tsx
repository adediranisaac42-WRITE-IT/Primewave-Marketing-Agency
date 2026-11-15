"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const defaultSteps = [
  { title: "Discover", body: "We learn your business, customers, goals and how your site performs today." },
  { title: "Strategize", body: "You get a prioritised plan with scope, timeline and how success will be measured." },
  { title: "Design", body: "Layouts, visuals and customer journeys shaped around how your buyers decide." },
  { title: "Implement", body: "We build, launch and connect everything, with regular progress updates." },
  { title: "Optimize", body: "We review the data and refine, so results keep improving after launch." },
];

/** Scroll-linked timeline: the connecting line draws as you scroll through the steps. */
export function Process({
  steps = defaultSteps, eyebrow = "Our Process", title = "Discover. Strategize. Design. Implement. Optimize.",
}: { steps?: { title: string; body: string }[]; eyebrow?: string; title?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="section bg-deep">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
        <ol ref={ref} className="relative mx-auto mt-20 max-w-3xl">
          <div aria-hidden className="absolute bottom-0 left-[27px] top-0 w-px bg-line md:left-1/2" />
          <motion.div aria-hidden style={{ scaleY: reduce ? 1 : scale }} className="absolute bottom-0 left-[27px] top-0 w-px origin-top bg-brand-gradient md:left-1/2" />
          {steps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <li key={s.title} className="relative grid grid-cols-[56px_1fr] gap-6 pb-16 last:pb-0 md:grid-cols-2 md:gap-16">
                <motion.span
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-deep bg-navy font-display text-sm font-bold text-white shadow-lift md:absolute md:left-1/2 md:-translate-x-1/2"
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: right ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-3xl border border-line bg-surface p-7 shadow-card md:col-span-1 ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
                >
                  <h3 className="text-2xl font-bold text-white">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
