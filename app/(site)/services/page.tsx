import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process } from "@/components/sections/Process";
import { FinalCta } from "@/components/sections/FinalCta";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description: "Digital marketing, Shopify & e-commerce growth, CRM solutions, Klaviyo email & SMS, website development and growth strategy.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Integrated services for measurable growth."
        intro="Choose a single service or combine them into one joined-up growth plan. Every engagement starts with understanding your business."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <Button href="/contact">Book a Consultation</Button>
      </PageHero>
      <ServicesGrid heading={false} />
      <Process />
      <FinalCta />
    </>
  );
}
