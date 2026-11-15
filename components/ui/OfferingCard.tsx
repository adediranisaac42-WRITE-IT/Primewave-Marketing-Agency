"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Offering } from "@/lib/data/catalog";
import { Icon } from "./Icon";

/** Service card: subtle tilt + pointer spotlight, with Learn More and Get Started actions. */
export function OfferingCard({ offering, index }: { offering: Offering; index: number }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-3, 3]), { stiffness: 200, damping: 20 });
  const bg = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(380px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,122,48,.12), transparent 60%)`
  );
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-lift focus-within:border-accent/60"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: bg }} />
      <div className="relative flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-deep">
          <Icon name={offering.icon} className="h-5 w-5" />
        </span>
        <span className="font-display text-sm font-semibold text-muted/60">{num}</span>
      </div>
      <h3 className="relative mt-6 text-lg font-bold leading-snug text-white">{offering.title}</h3>
      <p className="relative mt-2 text-[15px] leading-relaxed text-muted">{offering.short}</p>
      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
        <Link href={offering.learnMore} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-accent">
          Learn More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="sr-only"> about {offering.title}</span>
        </Link>
        <Link
          href={`/contact?service=${offering.slug}`}
          className="rounded-full border border-cta-400/50 px-4 py-2 text-sm font-semibold text-cta-400 transition-colors hover:border-cta hover:bg-cta hover:text-white"
        >
          Get Started<span className="sr-only"> with {offering.title}</span>
        </Link>
      </div>
    </motion.article>
  );
}
