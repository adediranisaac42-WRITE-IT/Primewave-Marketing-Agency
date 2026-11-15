import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { OfferingsGrid } from "@/components/sections/OfferingsGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Homepage, in the order of the spec. Case studies (8) and insights (11) are
 * added in Phase 4 when that content exists; testimonials hide themselves in
 * production until genuine reviews are added.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutIntro />
      <OfferingsGrid />
      <ProcessSteps />
      <ProjectsShowcase limit={4} />
      <WhyChoose />
      <Team />
      <Testimonials />
      <FinalCta />
    </>
  );
}
