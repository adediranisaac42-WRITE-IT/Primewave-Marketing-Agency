import Image from "next/image";
import { Layers, BarChart3, Megaphone, Users, MessagesSquare, RefreshCw } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const featured = [
  {
    icon: Layers,
    title: "Strategy-Led Execution",
    body: "We turn insights into clear, practical strategies tied to your business goals.",
    image: "/images/why/strategy.webp",
    alt: "Strategist leading a planning meeting in front of a project board",
  },
  {
    icon: BarChart3,
    title: "Conversion-Focused Solutions",
    body: "We design and optimise digital experiences that turn visitors into loyal customers.",
    image: "/images/why/conversion.webp",
    alt: "Designer reviewing an online store product page on a large monitor",
  },
  {
    icon: Megaphone,
    title: "Integrated Marketing",
    body: "We connect the right channels, campaigns and tools to attract, engage and grow your audience.",
    image: "/images/about/customer-relationship-management.webp",
    alt: "Marketing specialist managing customer engagement at her workstation",
  },
];

const values = [
  { icon: Users, title: "Customer Journey Optimization", body: "We map and refine every touchpoint so it's easier for people to engage and buy." },
  { icon: MessagesSquare, title: "Transparent Communication", body: "Clear updates, honest feedback and full visibility of your project." },
  { icon: RefreshCw, title: "Continuous Improvement", body: "We review performance, find new opportunities and keep optimising for long-term growth." },
];

export function WhyChoose() {
  return (
    <section className="dark-section section relative isolate overflow-hidden bg-deep">
      {/* Subtle light effects */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-48 -top-40 h-[520px] w-[520px] rounded-full bg-cta/20 blur-[160px]" />
        <div className="absolute -bottom-40 right-0 h-[460px] w-[620px] rounded-full bg-accent/10 blur-[170px]" />
      </div>

      <div className="container grid gap-12 lg:grid-cols-[0.95fr_1.6fr] lg:gap-10 xl:gap-14">
        {/* Left: heading, copy, team photo */}
        <div className="flex flex-col">
          <SectionHeading
            dark
            eyebrow="Why Primewave"
            title="Built Around Strategy. Driven by Growth."
            highlight={["Growth."]}
            intro="We combine strategic thinking with hands-on execution, so you get a partner who understands both the big picture and the details."
          />
          <Reveal delay={0.15} className="relative mt-10 flex-1">
            <div className="group relative h-full min-h-[300px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_70px_-30px_rgba(29,111,242,.55)]">
              <Image
                src="/images/about/digital-marketing.webp"
                alt="Strategist talking colleagues through campaign analytics on a large screen"
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep/70 to-transparent" />
              <span aria-hidden className="absolute bottom-0 left-8 h-1 w-20 rounded-t-full bg-accent" />
            </div>
          </Reveal>
        </div>

        {/* Right: three image cards + values strip */}
        <div className="flex flex-col gap-5">
          <Stagger className="grid gap-5 sm:grid-cols-3">
            {featured.map(({ icon: Icon, ...c }) => (
              <StaggerItem key={c.title} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface to-deep p-3 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_28px_60px_-24px_rgba(29,111,242,.6)] motion-reduce:hover:translate-y-0">
                  <div className="relative aspect-[6/5] overflow-hidden rounded-2xl">
                    <Image
                      src={c.image}
                      alt={c.alt}
                      fill
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 31vw, 92vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08] motion-reduce:group-hover:scale-100"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
                  </div>
                  <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-cta/20 text-accent ring-1 ring-accent/30 transition-colors duration-500 group-hover:bg-cta group-hover:text-white">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold leading-snug text-white">{c.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/65">{c.body}</p>
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <ul className="grid divide-y divide-white/10 rounded-3xl border border-white/10 bg-surface/70 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {values.map(({ icon: Icon, title, body }) => (
                <li key={title} className="group flex gap-4 p-6">
                  <Icon aria-hidden className="mt-0.5 h-7 w-7 shrink-0 text-accent transition-transform duration-500 group-hover:rotate-6" />
                  <div>
                    <h3 className="font-semibold leading-snug text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
