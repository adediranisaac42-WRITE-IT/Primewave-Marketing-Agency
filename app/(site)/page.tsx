import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { OfferingsGrid } from "@/components/sections/OfferingsGrid";
import { SeasonSpotlight } from "@/components/sections/SeasonSpotlight";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { ClientResults } from "@/components/sections/ClientResults";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Homepage, in the order of the spec. Case studies (8) and insights (11) are
 * added in Phase 4 when that content exists; testimonials hide themselves in
 * production until genuine reviews are added.
 */
// Portfolio content comes from Supabase; refresh at most once a minute (admin edits also revalidate).
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutIntro />
      <OfferingsGrid />
      <SeasonSpotlight />
      <ProcessSteps />
      <PortfolioShowcase limit={5} />
      <ClientResults />
      <WhyChoose />
      <Team />
      <Testimonials />
      <FinalCta />
    </>
  );
}
