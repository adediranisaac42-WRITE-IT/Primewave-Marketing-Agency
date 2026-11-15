"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects, portfolioCategories, type Project } from "@/lib/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ProjectsShowcase({
  limit, heading = true, initialCategory = "All", items = projects,
}: { limit?: number; heading?: boolean; initialCategory?: string; items?: Project[] }) {
  const [cat, setCat] = useState<string>(initialCategory);
  const filtered = useMemo(() => {
    const list = cat === "All" ? items : items.filter((p) => p.category === cat);
    return limit ? list.slice(0, limit) : list;
  }, [cat, items, limit]);

  return (
    <section className="section bg-surface">
      <div className="container">
        {heading && (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Featured Work" title="Selected projects." intro="Websites, Shopify stores, marketing and CRM work for growing businesses." />
            {limit && <Button href="/portfolio" variant="ghost">View Full Portfolio</Button>}
          </div>
        )}

        <div role="tablist" aria-label="Filter projects" className="mt-12 flex flex-wrap gap-2">
          {["All", ...portfolioCategories].map((c) => (
            <button
              key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={cn("relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", cat === c ? "text-white" : "text-white hover:text-accent")}
            >
              {cat === c && <motion.span layoutId="pf-tab" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4 }}>
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-line bg-surface p-12 text-center">
            <p className="font-display text-xl font-semibold text-white">Case studies are being prepared.</p>
            <p className="mx-auto mt-2 max-w-md text-muted">We&apos;re documenting recent work with client permission. Want to see relevant examples now? Get in touch.</p>
            <Button href="/contact" className="mt-6">Ask for Examples</Button>
          </div>
        )}
      </div>
    </section>
  );
}
