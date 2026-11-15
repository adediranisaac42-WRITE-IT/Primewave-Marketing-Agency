import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { getPublishedProjects } from "@/lib/portfolio";

/** "Selected Projects": published portfolio items from Supabase, managed in /admin/portfolio. */
export async function PortfolioShowcase({ heading = true, limit }: { heading?: boolean; limit?: number }) {
  const projects = await getPublishedProjects();
  const hasConcepts = projects.some((p) => p.is_concept);

  return (
    <section id="work" className="section relative isolate overflow-hidden bg-deep">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-cta/15 blur-[160px]" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[150px]" />
      </div>
      <div className="container max-w-[1560px]">
        {heading && (
          <div className="mb-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Featured Work"
              title="Selected Projects."
              highlight={["Projects."]}
              intro="Websites, Shopify stores, marketing and CRM work for growing businesses."
            />
            <Button href="/portfolio" variant="secondary" className="shrink-0">View Full Portfolio</Button>
          </div>
        )}
        {projects.length > 0 ? (
          <PortfolioGrid items={projects} limit={limit} />
        ) : (
          <p className="rounded-3xl border border-dashed border-white/15 p-12 text-center text-muted">Projects are being prepared. Check back soon.</p>
        )}
        {hasConcepts && (
          <Reveal>
            <p className="mt-8 text-center text-sm text-muted">
              Projects marked <span className="font-semibold text-white">Concept</span> show our approach and design style. Client case studies are added with permission.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
