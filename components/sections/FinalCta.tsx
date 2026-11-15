import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";

export function FinalCta({
  title = "Ready to Build Something That Moves Your Business Forward?",
  body = "Let's discuss your goals and explore how the right digital strategy can help your business grow.",
  cta = "Start Your Project",
}: { title?: string; body?: string; cta?: string }) {
  return (
    <section className="bg-deep px-4 pb-24 md:px-8">
      <div className="dark-section relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-navy px-6 py-20 text-center md:px-16 md:py-28">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/30 blur-[120px]" />
          <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        </div>
        <TextReveal as="h2" text={title} className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl" highlight={["Forward?"]} />
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/65">{body}</p>
          <div className="mt-10 flex justify-center">
            <Button href="/contact" variant="light">{cta}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
