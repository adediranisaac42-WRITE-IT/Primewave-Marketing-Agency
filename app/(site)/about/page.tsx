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
  description: "Primewave Marketing Agency combines digital marketing, website development, e-commerce growth and CRM to help ambitious businesses grow.",
  path: "/about",
});

const audiences = [
  "E-commerce business owners", "Shopify store owners", "Dropshipping businesses", "Startups and entrepreneurs",
  "Fashion and beauty brands", "Pet and lifestyle businesses", "Established businesses seeking digital growth",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Primewave"
        title="More Than Marketing. A Strategic Partner for Business Growth."
        intro="We help businesses strengthen their digital presence, attract qualified customers, improve website performance, increase conversions and build stronger customer relationships."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <section className="section bg-deep">
        <div className="container grid gap-16 lg:grid-cols-2">
          <SectionHeading eyebrow="Our Mission" title="Turning digital potential into business growth." />
          <Reveal delay={0.15} className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              Many businesses have the right product but the wrong digital foundations — a website that doesn&apos;t convert,
              marketing without direction, or customer data scattered across tools.
            </p>
            <p>
              Primewave exists to fix that. We bring strategy, marketing, web development, e-commerce and CRM together under one roof,
              so every part of your online presence pulls in the same direction.
            </p>
            <p>We work with businesses in the United Kingdom, the United States and international markets.</p>
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
      <div id="founder"><Founder cta={false} /></div>
      <Team />
      <WhyChoose />
      <Process />
      <FinalCta />
    </>
  );
}
