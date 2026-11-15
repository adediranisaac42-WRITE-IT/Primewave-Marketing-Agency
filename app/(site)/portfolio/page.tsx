import { PageHero } from "@/components/sections/PageHero";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Portfolio",
  description: "Website development, Shopify & e-commerce, digital marketing and CRM projects by Primewave Marketing Agency.",
  path: "/portfolio",
});

export const revalidate = 60;

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that moves businesses forward."
        intro="A selection of website, e-commerce, marketing and CRM projects."
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
      />
      <PortfolioShowcase heading={false} />
      <FinalCta />
    </>
  );
}
