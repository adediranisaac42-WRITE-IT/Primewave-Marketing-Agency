import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ExternalLink, Info } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug, getPublishedProjects } from "@/lib/portfolio";
import { pageMeta } from "@/lib/seo";
import { ctas } from "@/lib/site";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.summary, path: `/portfolio/${p.slug}` });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();

  return (
    <>
      <PageHero
        eyebrow={p.is_concept ? `${p.category} · Concept project` : p.category}
        title={p.title}
        intro={p.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }, { label: p.title }]}
      />

      <section className="section bg-deep pt-0">
        <div className="container grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {p.cover_image && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_70px_-30px_rgba(29,111,242,.55)]">
                <Image src={p.cover_image} alt={p.title} fill priority quality={90} sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
              </div>
            )}
            {p.is_concept && (
              <p className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-5 text-sm leading-relaxed text-white/85">
                <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                This is a concept project created to show our approach and design style. It is not a client engagement, and no client results are claimed.
              </p>
            )}
            {p.description && (
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-white/75">
                {p.description.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-surface p-7">
              {p.client_name && !p.is_concept && (
                <p className="text-sm text-muted">Client: <span className="font-semibold text-white">{p.client_name}</span></p>
              )}
              {p.deliverables.length > 0 && (
                <>
                  <h2 className="text-lg font-bold text-white">What this covers</h2>
                  <ul className="mt-4 grid gap-3">
                    {p.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-white/80"><CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{d}</li>
                    ))}
                  </ul>
                </>
              )}
              {p.technologies.length > 0 && (
                <>
                  <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-muted">Tools</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.technologies.map((t) => <li key={t} className="rounded-full bg-navy px-3 py-1 text-xs font-medium text-white/80">{t}</li>)}
                  </ul>
                </>
              )}
              {p.live_url && (
                <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-300 hover:text-white">
                  Visit live site <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <div className="mt-8 grid gap-3">
                <Button href={ctas.project.href} className="w-full">Start a Similar Project</Button>
                <Button href={ctas.call.href} variant="secondary" arrow={false} className="w-full">{ctas.call.label}</Button>
              </div>
            </div>
            <Link href="/portfolio" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to portfolio
            </Link>
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
