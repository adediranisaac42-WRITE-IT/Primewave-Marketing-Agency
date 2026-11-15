import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { IconKey } from "@/lib/data/services";

const blocks: { icon: IconKey; label: string }[] = [
  { icon: "megaphone", label: "Digital Marketing" },
  { icon: "monitor", label: "Website Development" },
  { icon: "cart", label: "E-commerce Optimisation" },
  { icon: "users", label: "Customer Relationship Management" },
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
            <div className="grid grid-cols-2 gap-4">
              {blocks.map((b, i) => (
                <Reveal key={b.label} delay={i * 0.08}>
                  <div className={`flex aspect-square flex-col justify-between rounded-2xl p-6 ${i === 1 || i === 2 ? "bg-navy text-white" : "bg-surface text-white shadow-card"}`}>
                    <Icon name={b.icon} className={`h-7 w-7 ${i === 1 || i === 2 ? "text-accent" : "text-accent"}`} />
                    <p className="font-display text-lg font-semibold leading-snug">{b.label}</p>
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
