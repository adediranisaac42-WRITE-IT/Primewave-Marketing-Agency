import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { IconKey } from "@/lib/data/services";

const pillars: { icon: IconKey; title: string; body: string }[] = [
  { icon: "target", title: "Strategic Marketing", body: "Campaigns grounded in research, positioning and clear business goals." },
  { icon: "cart", title: "E-commerce Growth", body: "Shopify stores built and optimised to turn browsers into buyers." },
  { icon: "handshake", title: "Customer Relationships", body: "CRM and retention systems that keep customers coming back." },
  { icon: "lightbulb", title: "Digital Innovation", body: "Modern websites, automation and tools that give you an edge." },
];

const audiences = [
  "E-commerce brands", "Shopify stores", "Dropshipping businesses", "Startups & entrepreneurs",
  "Fashion & beauty", "Pet & lifestyle", "Established businesses",
];

export function Capabilities() {
  return (
    <section className="relative bg-surface pb-24">
      <div className="container">
        <Stagger className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <StaggerItem key={p.title} className="group bg-surface p-8 transition-colors duration-500 hover:bg-navy-800">
              <Icon name={p.icon} className="h-7 w-7 text-accent transition-transform duration-500 group-hover:-translate-y-1" />
              <h2 className="mt-6 text-lg font-semibold text-white">{p.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Who we help — marquee */}
      <div className="relative mt-20 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <p className="sr-only">Who we work with: {audiences.join(", ")}</p>
        <div aria-hidden className="flex w-max animate-marquee gap-12 motion-reduce:animate-none">
          {[...audiences, ...audiences].map((a, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-semibold text-white/25 md:text-3xl">
              {a}<span className="h-2 w-2 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
