import { PageHero } from "@/components/sections/PageHero";
import { Founder } from "@/components/sections/Founder";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Team } from "@/components/sections/Team";
import { Process } from "@/components/sections/Process";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Us",
  description: "Primewave Marketing Agency helps ambitious businesses build powerful digital experiences, attract qualified customers and grow through strategic digital marketing, website development and e-commerce solutions.",
  path: "/about",
});

const audiences = [
  "Shopify entrepreneurs", "E-commerce business owners", "DTC brands", "Startups",
  "Small and medium-sized businesses", "Online retailers", "Established businesses seeking digital transformation",
  "Brands in the US, UK, Canada and beyond",
];

const values = [
  { title: "Professional", body: "Clear scope, honest timelines and work we're proud to put our name to." },
  { title: "Strategic", body: "Every recommendation starts from your goals, not from a package." },
  { title: "Innovative", body: "Modern tools and techniques, used where they genuinely help." },
  { title: "Results-Driven", body: "We measure what matters and say plainly what is and isn't working." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Primewave"
        title="More Than Marketing. A Strategic Partner for Business Growth."
        intro="Primewave helps ambitious businesses build powerful digital experiences, strengthen their online presence, attract qualified customers and improve performance through strategic digital marketing, website development and e-commerce solutions."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <section className="section bg-deep">
        <div className="container grid gap-16 lg:grid-cols-2">
          <SectionHeading eyebrow="Our Mission" title="Transforming businesses through strategic digital experiences." />
          <Reveal delay={0.15} className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Many businesses have the right product but the wrong digital foundations — a website that doesn&apos;t convert,
              marketing without direction, or customer data scattered across tools.
            </p>
            <p>
              Primewave exists to fix that. We bring strategy, marketing, web development, e-commerce and CRM together under one roof,
              so every part of your online presence pulls in the same direction.
            </p>
            <p>
              Our mission is to transform businesses through strategic digital experiences, intelligent marketing systems and
              conversion-focused solutions.
            </p>
            <p>We work with businesses in the United States, the United Kingdom, Canada and international markets.</p>
          </Reveal>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container">
          <SectionHeading eyebrow="Who We Help" title="Built for ambitious businesses." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 0.05} className="rounded-2xl border border-line bg-surface p-6 font-semibold text-white shadow-card">{a}</Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="section bg-deep">
        <div className="container">
          <SectionHeading eyebrow="How We Work" title="What you can expect from us." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06} className="rounded-2xl border border-line bg-surface p-7">
                <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold text-white">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <div id="founder"><Founder cta={false} /></div>
      <Team />
      <WhyChoose />
      <Process />
      <FinalCta />
    </>
  );
}
