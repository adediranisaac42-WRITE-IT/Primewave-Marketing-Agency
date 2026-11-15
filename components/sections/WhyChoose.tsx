import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import type { IconKey } from "@/lib/data/services";

const reasons: { icon: IconKey; title: string; body: string }[] = [
  { icon: "compass", title: "Strategic Approach", body: "Every recommendation is tied to a business objective — not activity for its own sake." },
  { icon: "chart", title: "Data-Informed Decisions", body: "We measure what matters and let evidence guide the next step." },
  { icon: "heart", title: "Customer-Centric Solutions", body: "We design around your customers' needs, behaviour and journey." },
  { icon: "layers", title: "Integrated Digital Services", body: "Marketing, web, e-commerce and CRM working together, not in silos." },
  { icon: "gauge", title: "Performance Optimization", body: "Continuous testing and refinement to improve results over time." },
  { icon: "handshake", title: "Long-Term Relationships", body: "We aim to be the partner you keep as your business grows." },
];

export function WhyChoose() {
  return (
    <section className="dark-section section relative overflow-hidden bg-surface">
      <div aria-hidden className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[160px]" />
      <div className="container relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            dark
            eyebrow="Why Primewave"
            title="Built Around Strategy. Driven by Growth."
            highlight={["Growth"]}
            intro="We combine strategic thinking with hands-on execution, so you get a partner who understands both the big picture and the details."
          />
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r) => (
            <StaggerItem key={r.title} className="glass group rounded-3xl p-7 transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.07]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-deep">
                <Icon name={r.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{r.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
