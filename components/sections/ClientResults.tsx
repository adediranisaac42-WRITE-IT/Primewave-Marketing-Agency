import { TrendingUp, Store } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ctas } from "@/lib/site";

/**
 * Client sales proof. Figures are copied exactly from the client's Shopify
 * analytics screenshot (Nov 8 – 23, 2026, all channels, vs. previous period).
 * The store name is kept private.
 */
const period = "Nov 8 – 23, 2026";

const stats = [
  { label: "Total sales", value: "$9,867", change: "+1,905%" },
  { label: "Orders", value: "124", change: "+2,380%" },
  { label: "Sessions", value: "5,428", change: "+164%" },
  { label: "Conversion rate", value: "2.28%", change: "+132%" },
];

export function ClientResults() {
  return (
    <section className="section relative isolate overflow-hidden bg-deep">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-cta/15 blur-[170px]" />
      </div>

      <div className="container">
        <SectionHeading
          eyebrow="Client Results"
          title="Real Sales. Real Growth."
          highlight={["Growth."]}
          intro="A snapshot from a client's Shopify store after working with Primewave: more visitors, a higher conversion rate and a big jump in orders."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface to-deep shadow-[0_30px_70px_-30px_rgba(29,111,242,.55)]">
            {/* Dashboard-style header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4 md:px-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cta/15 text-cta-400">
                  <Store className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Client Shopify store</p>
                  <p className="text-xs text-muted">{period} · All channels</p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Compared with the previous period
              </span>
            </div>

            <Stagger className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((s, i) => (
                <StaggerItem
                  key={s.label}
                  className={`border-white/10 p-6 md:p-8 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                >
                  <p className="text-sm text-muted">{s.label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">{s.value}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-sm font-semibold text-emerald-300">
                    <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                    {s.change}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-sm text-muted">
            Figures taken directly from the client&apos;s Shopify analytics. Store name kept private.
          </p>
          <Button href={ctas.project.href}>{ctas.project.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
