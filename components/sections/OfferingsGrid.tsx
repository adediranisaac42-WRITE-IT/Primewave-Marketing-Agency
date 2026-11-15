import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferingCard } from "@/components/ui/OfferingCard";
import { Button } from "@/components/ui/Button";
import { offerings } from "@/lib/data/catalog";

export function OfferingsGrid() {
  return (
    <section id="services" className="section bg-surface">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title="Everything your store needs to grow, under one roof."
            intro="Ten focused services across design, development, marketing and optimisation. Pick one, or combine them into a growth plan."
          />
          <Button href="/services" variant="secondary" className="shrink-0">View All Services</Button>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {offerings.map((o, i) => (
            <StaggerItem key={o.slug} className="h-full"><OfferingCard offering={o} index={i} /></StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
