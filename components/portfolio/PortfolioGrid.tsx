"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers, Megaphone, Monitor, ShoppingBag, LayoutGrid } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Mirrors lib/portfolio.ts (kept local so this client component has no server imports). */
export type GridItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  badge: string | null;
  summary: string;
  deliverables: string[];
  cover_image: string | null;
  is_concept: boolean;
  is_featured: boolean;
};

const CATEGORIES: { name: string; icon: LucideIcon }[] = [
  { name: "Website Development", icon: Monitor },
  { name: "Shopify & E-commerce", icon: ShoppingBag },
  { name: "Digital Marketing", icon: Megaphone },
  { name: "CRM & Automation", icon: Layers },
];
const iconFor = (category: string) => CATEGORIES.find((c) => c.name === category)?.icon ?? LayoutGrid;

function Chip({ item }: { item: GridItem }) {
  const Icon = iconFor(item.category);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-deep/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
      <Icon aria-hidden className="h-3.5 w-3.5 text-accent" />
      {item.badge || item.category}
    </span>
  );
}

function ConceptTag({ item }: { item: GridItem }) {
  if (!item.is_concept) return null;
  return (
    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-deep">Concept</span>
  );
}

function Cover({ item, sizes, className }: { item: GridItem; sizes: string; className: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-navy", className)}>
      {item.cover_image && (
        <Image
          src={item.cover_image}
          alt={`${item.title}${item.is_concept ? " (concept project)" : ""}`}
          fill
          sizes={sizes}
          quality={90}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-deep/30" />
      <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
        <Chip item={item} />
        <ConceptTag item={item} />
      </div>
    </div>
  );
}

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface to-deep shadow-card transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_28px_60px_-24px_rgba(29,111,242,.55)] motion-reduce:hover:translate-y-0";

function FeaturedCard({ item }: { item: GridItem }) {
  return (
    <article className={cardBase}>
      <Cover item={item} sizes="(min-width: 1560px) 780px, (min-width: 1024px) 50vw, 100vw" className="aspect-[16/9] lg:aspect-auto lg:flex-1" />
      <div className="relative px-6 pb-6 pt-5 md:px-8 md:pb-8">
        <h3 className="text-2xl font-bold text-white md:text-[1.7rem]">
          <Link href={`/portfolio/${item.slug}`} className="after:absolute after:inset-0 focus:outline-none">{item.title}</Link>
        </h3>
        <p className="mt-3 max-w-xl leading-relaxed text-white/70">{item.summary}</p>
        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <ul className="grid gap-2 text-sm text-white/80">
            {item.deliverables.slice(0, 3).map((d) => (
              <li key={d} className="flex items-center gap-2"><CheckCircle2 aria-hidden className="h-4 w-4 shrink-0 text-accent" />{d}</li>
            ))}
          </ul>
          <span aria-hidden className="pointer-events-none inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-gradient-to-r from-cta to-cta-400 px-6 py-3 text-[15px] font-semibold text-white shadow-[0_8px_28px_-8px_rgba(29,111,242,.7)] transition-colors group-hover:from-cta-600 group-hover:to-cta md:self-auto">
            View Case Study <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

function SmallCard({ item, sizes }: { item: GridItem; sizes: string }) {
  return (
    <article className={cardBase}>
      <Cover item={item} sizes={sizes} className="aspect-[16/9]" />
      <div className="flex flex-1 items-end gap-4 px-6 pb-6 pt-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold leading-snug text-white">
            <Link href={`/portfolio/${item.slug}`} className="after:absolute after:inset-0 focus:outline-none">{item.title}</Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{item.summary}</p>
        </div>
        <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/50 text-accent transition-colors duration-300 group-hover:border-cta group-hover:bg-cta group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

/** Filterable portfolio grid: featured + 2×2 layout for "All", even grid when a category is selected. */
export function PortfolioGrid({ items, limit }: { items: GridItem[]; limit?: number }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("All");

  const available = useMemo(() => CATEGORIES.filter((c) => items.some((i) => i.category === c.name)), [items]);
  const shown = useMemo(() => {
    const list = active === "All" ? items : items.filter((i) => i.category === active);
    return limit ? list.slice(0, limit) : list;
  }, [items, active, limit]);
  const featured = active === "All" ? shown.find((i) => i.is_featured) ?? null : null;
  const rest = featured ? shown.filter((i) => i.id !== featured.id) : shown;

  const anim = reduce
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2.5">
        {[{ name: "All", icon: LayoutGrid }, ...available].map(({ name, icon: Icon }) => {
          const on = active === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(name)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                on
                  ? "border-transparent bg-gradient-to-r from-cta to-cta-400 text-white shadow-[0_8px_24px_-8px_rgba(29,111,242,.7)]"
                  : "border-white/15 text-white/80 hover:border-accent/50 hover:text-white"
              )}
            >
              <Icon aria-hidden className="h-4 w-4" />
              {name === "All" ? "All Projects" : name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} {...anim} className="mt-10">
          {shown.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-white/15 p-12 text-center text-muted">No projects in this category yet.</p>
          ) : featured ? (
            <div className="grid gap-5 lg:grid-cols-4 lg:grid-rows-2">
              <div className="lg:col-span-2 lg:row-span-2"><FeaturedCard item={featured} /></div>
              {rest.map((i) => <div key={i.id}><SmallCard item={i} sizes="(min-width: 1560px) 390px, (min-width: 1024px) 25vw, 100vw" /></div>)}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((i) => <SmallCard key={i.id} item={i} sizes="(min-width: 1560px) 520px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />)}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
