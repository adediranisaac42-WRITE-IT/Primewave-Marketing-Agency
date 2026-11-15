import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/data/services";

export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section id="services" className="section bg-surface">
      <div className="container">
        {heading && (
          <SectionHeading
            eyebrow="Core Services"
            title="Everything your business needs to grow online."
            intro="Six integrated capabilities. One strategic partner. Explore each service to see how we can help."
          />
        )}
        <Stagger className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug}><ServiceCard service={s} index={i} /></StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
