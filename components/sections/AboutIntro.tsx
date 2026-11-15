import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { IconKey } from "@/lib/data/services";

const blocks: { icon: IconKey; label: string; image: string; alt: string }[] = [
  {
    icon: "megaphone", label: "Digital Marketing", image: "/images/about/digital-marketing.webp",
    alt: "Marketing strategist reviewing campaign performance charts with colleagues",
  },
  {
    icon: "monitor", label: "Website Development", image: "/images/about/website-development.webp",
    alt: "Web developer working across two monitors showing code and a website layout",
  },
  {
    icon: "cart", label: "E-commerce Optimisation", image: "/images/about/ecommerce-optimisation.webp",
    alt: "Laptop showing an online store next to a shopping cart and parcels",
  },
  {
    icon: "users", label: "Customer Relationship Management", image: "/images/about/customer-relationship-management.webp",
    alt: "Customer relationship manager with a headset at her workstation",
  },
];

export function AboutIntro() {
  return (
    <section className="section bg-deep">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="About Primewave"
            title="More Than Marketing. A Strategic Partner for Business Growth."
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Growth rarely comes from one channel alone. Primewave brings digital marketing, website development,
              e-commerce optimisation and customer relationship management together — so every part of your digital
              presence works towards the same goal.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              We start with your business, not a package. Then we build the strategy, systems and experiences that
              attract the right customers and keep them coming back.
            </p>
            <Button href="/about" variant="ghost" className="mt-10">More About Us</Button>
          </Reveal>
        </div>

        <Parallax offset={30}>
          <div className="relative rounded-[2rem] bg-navy p-6 md:p-10">
            <div aria-hidden className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-brand-gradient opacity-20 blur-2xl" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {blocks.map((b, i) => (
                <Reveal key={b.label} delay={i * 0.08}>
                  <div className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-card transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-lift">
                    <Image
                      src={b.image}
                      alt={b.alt}
                      fill
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep via-deep/45 to-deep/5 transition-opacity duration-500 group-hover:opacity-90" />
                    <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
                      <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-deep/60 text-accent backdrop-blur-md transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                        <Icon name={b.icon} className="h-5 w-5" />
                      </span>
                      <p className="font-display text-lg font-semibold leading-snug text-white">{b.label}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted">One integrated growth partner</p>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
