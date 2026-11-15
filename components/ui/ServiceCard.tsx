"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/data/services";
import { Icon } from "./Icon";

/** Interactive card: gentle 3D tilt + spotlight that follows the pointer. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 200, damping: 20 });
  const bg = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(420px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(47,134,255,.10), transparent 60%)`
  );

  return (
    <motion.article
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-card transition-shadow duration-500 hover:shadow-lift"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: bg }} />
      <div className="relative flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        <span className="font-display text-sm font-semibold text-muted/60">0{index + 1}</span>
      </div>
      <h3 className="relative mt-8 text-2xl font-bold text-white">{service.title}</h3>
      <p className="relative mt-3 leading-relaxed text-muted">{service.short}</p>
      <ul className="relative mt-6 flex flex-wrap gap-2">
        {service.items.slice(0, 4).map((it) => (
          <li key={it} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-white/80">{it}</li>
        ))}
        {service.items.length > 4 && (
          <li className="rounded-full px-1 py-1 text-xs font-medium text-muted">+{service.items.length - 4} more</li>
        )}
      </ul>
      <Link href={service.href} className="relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent after:absolute after:inset-0">
        Learn More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        <span className="sr-only"> about {service.title}</span>
      </Link>
    </motion.article>
  );
}
