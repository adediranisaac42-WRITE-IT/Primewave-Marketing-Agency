import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function Faq({ items, title = "Questions, answered." }: { items: { q: string; a: string }[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="section bg-deep">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title={title} />
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted">Can&apos;t find what you&apos;re looking for?</p>
            <Button href="/contact" variant="ghost" className="mt-4">Ask Us Directly</Button>
          </Reveal>
        </div>
        <Reveal><Accordion items={items} /></Reveal>
      </div>
    </section>
  );
}
