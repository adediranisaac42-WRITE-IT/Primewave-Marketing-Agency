import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow, title, intro, align = "left", dark = false, className, highlight,
}: {
  eyebrow?: string; title: string; intro?: string; align?: "left" | "center"; dark?: boolean; className?: string; highlight?: string[];
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>}
      <TextReveal
        text={title}
        highlight={highlight}
        className={cn("mt-5 text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[3.4rem]", dark ? "text-white" : "text-white")}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 text-lg leading-relaxed", dark ? "text-white/65" : "text-muted")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
