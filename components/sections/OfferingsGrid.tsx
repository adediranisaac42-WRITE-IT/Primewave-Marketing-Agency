import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferingCard } from "@/components/ui/OfferingCard";
import { Button } from "@/components/ui/Button";
import { offerings } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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
        {/* Services overview graphic supplied by Primewave (homepage and /services). */}
        <Link
          href="/services"
          aria-label="See all ten Primewave services"
          className={cn("mx-auto block max-w-[1100px] overflow-hidden rounded-3xl border border-white/10 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-lift", heading && "mt-14")}
        >
          <Image
            src="/images/services-overview.webp"
            alt="Primewave services: Shopify website design and development, e-commerce redesign, Shopify store management, conversion rate optimization, SEO, Klaviyo email marketing, social media marketing, paid advertising, product research and listing, and e-commerce growth strategy"
            width={505}
            height={248}
            unoptimized
            className="h-auto w-full"
          />
        </Link>
        {/* The service cards stay on the /services page so each service is still one click away. */}
        {!heading && (<>
        <h2 className="mt-16 text-2xl font-bold text-white md:text-3xl">Explore each service</h2>
        {/* Phones and tablets: one swipeable row (scroll left/right). Large screens: the 5-column grid. */}
        <Stagger
          className={cn(
            "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8 [&::-webkit-scrollbar]:hidden",
            "mt-8 xl:mx-0 xl:grid xl:snap-none xl:grid-cols-5 xl:gap-5 xl:overflow-visible xl:px-0 xl:pb-0"
          )}
        >
          {offerings.map((o, i) => (
            <StaggerItem key={o.slug} className="h-full w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-auto">
              <OfferingCard offering={o} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
        <p aria-hidden className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted xl:hidden">
          <span>←</span> Swipe to see all {offerings.length} services <span>→</span>
        </p>
        </>)}
      </div>
    </section>
  );
}
