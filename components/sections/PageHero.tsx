import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow, title, intro, crumbs, children,
}: { eyebrow: string; title: string; intro?: string; crumbs?: { label: string; href?: string }[]; children?: ReactNode }) {
  return (
    <section className="dark-section relative isolate overflow-hidden bg-deep pb-20 pt-40 md:pb-28 md:pt-48">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
        <div className="absolute -left-32 -top-32 h-[480px] w-[480px] animate-drift rounded-full bg-accent/25 blur-[140px]" />
      </div>
      <div className="container">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/45">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white/80">{c.label}</span>}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
        <TextReveal as="h1" text={title} className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tightest text-white md:text-7xl" />
        {intro && (
          <Reveal delay={0.3}><p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">{intro}</p></Reveal>
        )}
        {children && <Reveal delay={0.45}><div className="mt-10">{children}</div></Reveal>}
      </div>
    </section>
  );
}
