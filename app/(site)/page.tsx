import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Founder } from "@/components/sections/Founder";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { homeFaqs } from "@/lib/data/faqs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Capabilities />
      <AboutIntro />
      <ServicesGrid />
      <WhyChoose />
      <Process />
      <ProjectsShowcase limit={4} />
      <Founder />
      <Testimonials />
      <Faq items={homeFaqs} />
      <FinalCta />
    </>
  );
}
