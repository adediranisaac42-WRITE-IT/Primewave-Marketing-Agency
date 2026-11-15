import { CheckCircle2, XCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { crmChallenges, crmFaqs, crmPillars, crmPlatforms, crmProcess } from "@/lib/data/crm";
import { projects } from "@/lib/data/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "CRM Solutions",
  description: "CRM implementation, pipeline management, marketing automation, segmentation, retention and reporting — tailored to how your business sells.",
  path: "/crm-solutions",
});

const journey = ["Capture", "Qualify", "Nurture", "Convert", "Retain", "Grow"];

export default function CrmPage() {
  const related = projects.filter((p) => p.category === "CRM & Automation");
  return (
    <>
      <PageHero
        eyebrow="CRM Solutions"
        title="Customer relationships, systemised for growth."
        intro="We implement, configure and optimise CRM systems that organise your leads, automate follow-up, give you a clear view of your pipeline and keep customers coming back."
        crumbs={[{ label: "Home", href: "/" }, { label: "CRM Solutions" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Book a CRM Consultation</Button>
          <Button href="#crm-services" variant="secondary">Explore CRM Services</Button>
        </div>
      </PageHero>

      {/* Journey strip */}
      <section className="border-b border-line bg-deep py-10">
        <div className="container">
          <ol className="grid grid-cols-3 gap-y-6 md:grid-cols-6">
            {journey.map((j, i) => (
              <Reveal as="li" key={j} delay={i * 0.06} className="relative text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-sm font-bold text-accent">{i + 1}</span>
                <span className="mt-2 block text-sm font-semibold text-white">{j}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Why CRM */}
      <section className="section bg-deep">
        <div className="container grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why It Matters" title="Growth stalls when relationships aren't managed." />
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                A well-implemented CRM becomes the operating system for your customer relationships: every lead captured,
                every conversation recorded, every follow-up on time, and every decision backed by data.
              </p>
            </Reveal>
          </div>
          <ul className="space-y-3">
            {crmChallenges.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 0.05} className="flex items-start gap-4 rounded-2xl border border-line p-5 text-white">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{c}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Pillars */}
      <section id="crm-services" className="dark-section section bg-surface">
        <div className="container">
          <SectionHeading dark eyebrow="CRM Services" title="End-to-end CRM, from setup to optimisation." />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {crmPillars.map((p) => (
              <StaggerItem key={p.title} className="glass group rounded-3xl p-8 transition-colors duration-500 hover:border-accent/40">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-deep">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/55">{p.body}</p>
                <ul className="mt-6 space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-white/80"><CheckCircle2 className="h-4 w-4 text-accent" />{it}</li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Platforms */}
      <section className="section bg-surface">
        <div className="container text-center">
          <SectionHeading align="center" eyebrow="Platforms" title="Working with the tools that fit your business." />
          <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
            {crmPlatforms.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.05} className="rounded-full border border-line bg-surface px-6 py-3 font-semibold text-white shadow-card">{p}</Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Process steps={crmProcess} eyebrow="Implementation Process" title="A calm, structured CRM rollout." />
      {related.length > 0 && <ProjectsShowcase items={related} initialCategory="CRM & Automation" heading={false} />}
      <Faq items={crmFaqs} title="CRM questions, answered." />
      <FinalCta title="Ready to bring order to your customer relationships?" cta="Book a CRM Consultation" />
    </>
  );
}
