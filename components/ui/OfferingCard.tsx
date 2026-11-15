import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Offering } from "@/lib/data/catalog";

/** Service card: photo header with number badge, title, summary, Learn More + Get Started. */
export function OfferingCard({ offering, index }: { offering: Offering; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-surface to-deep shadow-card transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_28px_60px_-24px_rgba(29,111,242,.55)] focus-within:border-accent/60 motion-reduce:hover:translate-y-0">
      {/* Photo header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        <Image
          src={offering.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 92vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:group-hover:scale-100"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
        <span className="absolute bottom-3 left-4 rounded-full bg-cta px-3 py-1 font-display text-sm font-bold text-white shadow-[0_6px_18px_-6px_rgba(29,111,242,.8)]">
          {num}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <h3 className="text-xl font-bold leading-snug text-white">{offering.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{offering.short}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <Link href={offering.learnMore} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-accent">
            Learn More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="sr-only"> about {offering.title}</span>
          </Link>
          <Link
            href={`/contact?service=${offering.slug}`}
            className="rounded-full border border-cta-400/60 px-5 py-2 text-sm font-semibold text-cta-400 transition-colors hover:border-cta hover:bg-cta hover:text-white"
          >
            Get Started<span className="sr-only"> with {offering.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
