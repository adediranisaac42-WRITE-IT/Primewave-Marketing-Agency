import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferingCard } from "@/components/ui/OfferingCard";
import { Button } from "@/components/ui/Button";
import { offerings } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";

export function OfferingsGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section id="services" className="section bg-surface">
      <div className="container max-w-[1560px]">
        {heading && (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our Services"
              title="Everything your store needs to grow, under one roof."
              highlight={["one", "roof."]}
              intro="Ten focused services across design, development, marketing and optimisation. Pick one, or combine them into a growth plan."
            />
            <Button href="/services" variant="secondary" className="shrink-0">View All Services</Button>
          </div>
        )}
        {/* Phones: one swipeable row (scroll left/right). Tablet and up: the normal grid. */}
        <Stagger
          className={cn(
            "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-5 xl:gap-5",
            heading && "mt-14"
          )}
        >
          {offerings.map((o, i) => (
            <StaggerItem key={o.slug} className="h-full w-[82%] shrink-0 snap-start sm:w-auto">
              <OfferingCard offering={o} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
        <p aria-hidden className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:hidden">
          <span>←</span> Swipe to see all {offerings.length} services <span>→</span>
        </p>
      </div>
    </section>
  );
}
