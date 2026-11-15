import { notFound } from "next/navigation";
import { CheckCircle2, UserCheck, XCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { getService, services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { pageMeta } from "@/lib/seo";
import { ctas, site } from "@/lib/site";
import { OfferingCard } from "@/components/ui/OfferingCard";
import { offerings } from "@/lib/data/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ title: s.title, description: s.short, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = projects.filter((p) => p.category === s.portfolioCategory);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.intro,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["GB", "US", "Worldwide"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <PageHero
        eyebrow={s.title}
        title={s.headline}
        intro={s.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/contact?service=${s.slug}`}>Get Started</Button>
          <Button href={ctas.call.href} variant="secondary" arrow={false}>{ctas.call.label}</Button>
        </div>
      </PageHero>

      {/* What's included */}
      <section className="section bg-deep">
        <div className="container grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="What's Included" title="What you get." />
          <Stagger className="grid gap-3 sm:grid-cols-2">
            {s.items.map((it) => (
              <StaggerItem key={it} className="flex items-center gap-3 rounded-2xl border border-line p-5 font-medium text-white">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />{it}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section bg-surface">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading eyebrow="Who It's For" title="Is this the right fit?" />
          <ul className="grid gap-3">
            {s.idealFor.map((it, i) => (
              <Reveal as="li" key={it} delay={i * 0.06} className="flex items-start gap-4 rounded-2xl border border-line bg-deep p-5 text-white">
                <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{it}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Challenges */}
      <section className="dark-section section bg-deep">
        <div className="container grid gap-16 lg:grid-cols-2">
          <SectionHeading dark eyebrow="Challenges We Solve" title="Sound familiar?" />
          <ul className="space-y-3">
            {s.challenges.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 0.06} className="glass flex items-start gap-4 rounded-2xl p-5 text-white/80">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{c}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Solutions */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHeading eyebrow="Our Solutions" title="How we help." />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
            {s.solutions.map((sol, i) => (
              <StaggerItem key={sol.title} className="rounded-3xl border border-line bg-surface p-8 shadow-card">
                <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-bold text-white">{sol.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{sol.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Process steps={s.process} eyebrow="How We Deliver" title="From brief to results." />
      {related.length > 0 && <ProjectsShowcase items={related} initialCategory={s.portfolioCategory} heading={false} />}
      {s.faqs.length > 0 && <Faq items={s.faqs} title={`${s.title} FAQs.`} />}
      <section className="section bg-surface">
        <div className="container">
          <SectionHeading eyebrow="Related Services" title="Often combined with." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.related
              .map((slug) => offerings.find((o) => o.slug === slug))
              .filter((o): o is NonNullable<typeof o> => Boolean(o))
              .map((o) => <OfferingCard key={o.slug} offering={o} index={offerings.indexOf(o)} />)}
          </div>
        </div>
      </section>
      <FinalCta title={`Ready to talk about ${s.title}?`} />
    </>
  );
}
