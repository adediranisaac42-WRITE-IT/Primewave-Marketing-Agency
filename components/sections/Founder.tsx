import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function Founder({ cta = true }: { cta?: boolean }) {
  return (
    <section className="section overflow-hidden bg-deep">
      <div className="container grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-brand-gradient opacity-15 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-navy shadow-lift">
            <Parallax offset={24} className="relative aspect-[4/5]">
              <Image
                src="/images/team/isaac-adediran.webp"
                alt="Isaac Adediran, Founder and CEO of Primewave Marketing Agency"
                fill
                sizes="(min-width:1024px) 420px, 90vw"
                className="scale-110 object-cover object-top"
              />
            </Parallax>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent p-6 pt-20">
              <p className="font-display text-xl font-bold text-white">{site.founder.name}</p>
              <p className="text-sm text-accent">{site.founder.role}, Primewave Marketing Agency</p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="Meet the Founder" title="Building an agency around your growth." />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Isaac Adediran is the founder of Primewave Marketing Agency, driven by a vision to help businesses build
              stronger digital experiences and achieve sustainable growth. Through strategic thinking, digital innovation
              and customer-focused solutions, he is building an agency committed to helping businesses unlock their online potential.
            </p>
            {cta && (
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/about#founder">Meet the Founder</Button>
                <Button href="/contact" variant="ghost">Speak with Isaac</Button>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
