import { marqueeItems } from "@/lib/data/catalog";

/** Infinite horizontal band of service names. Pauses on hover; static and wrapped when reduced motion is on. */
export function Marquee({ items = marqueeItems }: { items?: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 motion-reduce:flex-wrap motion-reduce:justify-center">
      {items.map((it) => (
        <li key={it} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight text-white/85 md:text-4xl">
          {it}
          <span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-accent" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="What we do" className="group relative overflow-hidden border-y border-line bg-deep py-8 md:py-10">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-deep to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-deep to-transparent" />
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
        {row(false)}
        <div className="contents motion-reduce:hidden">{row(true)}</div>
      </div>
    </section>
  );
}
