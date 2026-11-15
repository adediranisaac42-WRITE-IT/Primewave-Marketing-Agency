"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ctas } from "@/lib/site";

const steps = [
  {
    label: "Discover",
    title: "We understand your business.",
    body: "Research your business, customers, challenges, market and growth opportunities.",
    image: "/images/services/product-research-listing.webp",
    alt: "Product and market research shown on a laptop",
  },
  {
    label: "Strategize",
    title: "We build your growth roadmap.",
    body: "Develop a clear strategy with the right channels, priorities and measurable objectives.",
    image: "/images/services/ecommerce-growth-strategy.webp",
    alt: "Growth plan being reviewed on a tablet",
  },
  {
    label: "Design",
    title: "We create experiences that convert.",
    body: "Build compelling websites, customer journeys and marketing experiences.",
    image: "/images/services/shopify-website-development.webp",
    alt: "Online store design shown on a laptop",
  },
  {
    label: "Implement",
    title: "We bring the strategy to life.",
    body: "Launch websites, marketing campaigns, automation and growth systems.",
    image: "/images/services/klaviyo-email-marketing.webp",
    alt: "Email automation flows set up on a laptop",
  },
  {
    label: "Optimize",
    title: "We improve and scale.",
    body: "Monitor performance, identify opportunities and continuously improve results.",
    image: "/images/services/seo-organic-growth.webp",
    alt: "Search performance being reviewed on a laptop",
  },
];

/** Five-step process: photo, step label, headline and summary, with a progress line that fills on scroll. */
export function ProcessSteps() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="section relative isolate overflow-hidden bg-deep">
      {/* Background photo, shown at full strength. Its own dark left side sits behind the heading. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src="/images/process-bg.webp" alt="" fill sizes="100vw" className="object-cover object-[70%_center]" />
        {/* Phones only: the photo's centre sits behind the heading, so add a light tint for legibility */}
        <div className="absolute inset-0 bg-deep/55 lg:hidden" />
      </div>

      <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Our Process"
            title="From first conversation to continuous growth."
            highlight={["continuous", "growth."]}
            intro="Five clear steps, so you always know what's happening, what comes next and why it matters for your business."
          />
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={ctas.project.href}>{ctas.project.label}</Button>
              <Button href={ctas.call.href} variant="secondary" arrow={false}>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays aria-hidden className="h-4 w-4" />
                  {ctas.call.label}
                </span>
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface/75 p-4 shadow-card backdrop-blur-md md:p-6">
          <div ref={listRef} className="relative">
            {/* Track + scroll progress, running through the centre of the photos */}
            <div aria-hidden className="absolute bottom-[68px] left-[48px] top-[68px] w-px bg-line md:bottom-[76px] md:left-[56px] md:top-[76px]" />
            <motion.div
              aria-hidden
              style={reduce ? undefined : { scaleY: progress }}
              className="absolute bottom-[68px] left-[48px] top-[68px] w-px origin-top bg-gradient-to-b from-accent to-cta md:bottom-[76px] md:left-[56px] md:top-[76px]"
            />

            <ol className="relative">
            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.label}
                delay={i * 0.06}
                className="group relative flex items-center gap-5 border-b border-white/[0.06] py-5 last:border-0 md:gap-6"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 transition-shadow duration-500 group-hover:ring-accent/60 md:h-28 md:w-28">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="112px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep/50 to-transparent" />
                </div>
                <div className="min-w-0">
                  <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-300 ring-1 ring-accent/25">
                    {String(i + 1).padStart(2, "0")} — {s.label}
                  </span>
                  <h3 className="mt-2.5 text-lg font-bold leading-snug text-white md:text-xl">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
