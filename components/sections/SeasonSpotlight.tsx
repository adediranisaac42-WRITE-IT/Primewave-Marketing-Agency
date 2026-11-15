"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { seasonEvents } from "@/lib/data/season";
import { ctas } from "@/lib/site";

const BARS = 72;
// Deterministic bar lengths so server and client render the same ring.
const bars = Array.from({ length: BARS }, (_, i) => ({
  angle: (i * 360) / BARS,
  len: 12 + Math.round(((Math.sin(i * 1.7) + 1) / 2) * 16),
  opacity: 0.35 + ((Math.cos(i * 0.9) + 1) / 2) * 0.65,
}));

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

/** Seasonal spotlight: logo inside a rotating ring, with a live countdown to the next real retail date. */
export function SeasonSpotlight() {
  const now = useNow();
  // Before hydration, assume the first event; afterwards always the next upcoming one.
  const event = useMemo(
    () => (now === null ? seasonEvents[0] : seasonEvents.find((e) => Date.parse(e.at) > now)),
    [now]
  );
  if (!event) return null;

  const diff = now === null ? null : Math.max(0, Date.parse(event.at) - now);
  const parts =
    diff === null
      ? null
      : {
          days: Math.floor(diff / 864e5),
          hours: Math.floor((diff / 36e5) % 24),
          mins: Math.floor((diff / 6e4) % 60),
          secs: Math.floor((diff / 1e3) % 60),
        };
  const monthLabel = new Date(event.at).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "America/New_York" });

  return (
    <section aria-labelledby="season-title" className="section relative isolate overflow-hidden bg-deep">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cta/15 blur-[160px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      <div className="container grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,440px)_320px] lg:gap-10">
        {/* Copy */}
        <Reveal className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-accent/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-300">
            {monthLabel} · Peak season
          </span>
          <h2 id="season-title" className="mt-7 font-display text-5xl font-bold leading-[1.05] text-white md:text-6xl">
            Countdown to <span className="italic text-accent">{event.name}</span>
          </h2>
          <p className="mt-6 text-2xl font-semibold text-accent-300">{event.headline}</p>
          <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted lg:mx-0">{event.body}</p>
          <ul className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
            {event.tags.map((t) => (
              <li key={t} className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{t}</li>
            ))}
          </ul>
        </Reveal>

        {/* Rotating ring + logo */}
        <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[440px]">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_70s_linear_infinite]">
            <defs>
              <linearGradient id="bar-blue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8DBBFF" />
                <stop offset="1" stopColor="#1D6FF2" />
              </linearGradient>
            </defs>
            {bars.map((b, i) => (
              <line
                key={i}
                x1="200" y1={200 - 166} x2="200" y2={200 - 166 - b.len}
                stroke="url(#bar-blue)" strokeWidth="5" strokeLinecap="round" opacity={b.opacity}
                transform={`rotate(${b.angle} 200 200)`}
              />
            ))}
          </svg>
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_120s_linear_infinite_reverse]">
            <circle cx="200" cy="200" r="150" fill="none" stroke="#2F86FF" strokeOpacity=".45" strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" />
          </svg>

          <div className="absolute inset-[24%] grid place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#eef3fb_55%,#c9d6ea_100%)] shadow-[0_30px_80px_-20px_rgba(29,111,242,.55),inset_0_-10px_30px_rgba(23,36,58,.15)]">
            <Image
              src="/images/primewave-logo-mark.png"
              alt=""
              width={287}
              height={277}
              className="h-auto w-[56%] drop-shadow-[0_10px_18px_rgba(8,13,22,.35)] motion-safe:animate-[drift_9s_ease-in-out_infinite]"
            />
          </div>

          {/* Rotating seal */}
          <div className="absolute right-[2%] top-[4%] grid h-[27%] w-[27%] place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#8DBBFF,#1D6FF2_55%,#1559CC)] shadow-[0_14px_34px_-10px_rgba(29,111,242,.8)] ring-1 ring-white/30">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_24s_linear_infinite]">
              <defs>
                <path id="seal-path" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text fill="#ffffff" fontSize="8.2" fontWeight="700" letterSpacing="2.4">
                <textPath href="#seal-path">PRIMEWAVE · STRATEGY · INNOVATION · GROWTH ·</textPath>
              </text>
            </svg>
            <span className="font-display text-2xl font-extrabold text-white md:text-3xl">P</span>
          </div>
        </div>

        {/* Offer + countdown */}
        <div className="grid gap-5">
          <Reveal className="rounded-2xl border border-white/10 bg-surface/80 p-7 shadow-card backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">Get peak-season ready</p>
            <p className="mt-3 font-display text-2xl font-bold leading-snug text-white">Store conversion &amp; speed review</p>
            <Button href="/contact?service=conversion-rate-optimization" className="mt-6 w-full">Get Started</Button>
            <Link href="/services/conversion-rate-optimization" className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-accent-300 hover:text-white">
              Explore CRO <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-white/10 bg-surface/80 p-7 shadow-card backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">{event.name} starts in</p>
            <div role="timer" aria-live="off" className="mt-4 grid grid-cols-4 gap-2">
              {(["days", "hours", "mins", "secs"] as const).map((k) => (
                <div key={k} className="rounded-xl border border-white/10 bg-deep/70 px-1 py-3 text-center">
                  <p className={`font-display text-2xl font-bold tabular-nums ${k === "secs" ? "text-accent-300" : "text-white"}`}>
                    {parts ? (k === "days" ? parts.days : pad(parts[k])) : "--"}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">{k}</p>
                </div>
              ))}
            </div>
            <Link href={ctas.call.href} className="mt-5 flex items-center justify-center gap-1.5 text-sm font-semibold text-white/80 hover:text-accent-300">
              {ctas.call.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
