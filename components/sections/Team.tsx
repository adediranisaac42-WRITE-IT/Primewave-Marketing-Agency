import Image from "next/image";
import { MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { team } from "@/lib/data/team";

/** "Meet Our Team": four portrait cards with a soft blue glow, lift and image zoom on hover. */
export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="section relative isolate overflow-hidden bg-deep">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      </div>

      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-sky-300" />
            Meet Our Team
            <span aria-hidden className="h-px w-8 bg-gradient-to-l from-transparent to-sky-300" />
          </p>
          <h2 id="team-title" className="mt-5 text-4xl font-bold leading-[1.1] text-white md:text-5xl">
            The Creative Minds Behind Your{" "}
            <span className="bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent">Digital Growth.</span>
          </h2>
        </Reveal>

        <Stagger className="mx-auto mt-16 grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 xl:grid-cols-4">
          {team.map((m) => (
            <StaggerItem key={m.slug} className="h-full">
              <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-navy/70 to-deep p-3 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-blue-400/40 hover:shadow-[0_28px_60px_-24px_rgba(37,99,235,.55)] motion-reduce:hover:translate-y-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-navy">
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width: 1280px) 290px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-deep/85 via-deep/30 to-transparent" />
                  <p className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-deep/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <MapPin aria-hidden className="h-3.5 w-3.5 text-sky-300" />
                    {m.country}
                  </p>
                </div>
                <div className="flex flex-1 flex-col px-2 pb-3 pt-5">
                  <h3 className="text-xl font-bold text-white">{m.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-sky-300">{m.role}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.bio}</p>
                </div>
                <span aria-hidden className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-20 flex justify-center">
          <div className="relative">
            <div aria-hidden className="absolute inset-0 -z-10 rounded-full bg-blue-600/20 blur-3xl" />
            <Image
              src="/images/primewave-certified-badge.webp"
              alt="Primewave Agency badge: Digital Growth Partner"
              width={435}
              height={480}
              className="h-36 w-auto drop-shadow-[0_12px_30px_rgba(37,99,235,.35)] transition-transform duration-500 hover:scale-105 motion-reduce:hover:scale-100 md:h-44"
            />
          </div>
        </Reveal>

        <Reveal className="mt-8 flex items-center justify-center gap-5 text-center">
          <span aria-hidden className="hidden h-px w-16 bg-gradient-to-r from-transparent to-blue-400/60 sm:block" />
          <p className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
            Different Expertise. One Vision. <span className="text-sky-300">Your Growth.</span>
          </p>
          <span aria-hidden className="hidden h-px w-16 bg-gradient-to-l from-transparent to-blue-400/60 sm:block" />
        </Reveal>
      </div>
    </section>
  );
}
