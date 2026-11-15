import { PageHero } from "@/components/sections/PageHero";
import { OfferingsGrid } from "@/components/sections/OfferingsGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FinalCta } from "@/components/sections/FinalCta";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { ctas } from "@/lib/site";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Shopify website development, e-commerce redesign, store management, conversion rate optimization, Shopify SEO, Klaviyo email marketing, social media, paid advertising, product research and e-commerce growth strategy.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Ten services. One joined-up growth plan."
        intro="Choose a single service or combine several. Every engagement starts with understanding your business, your customers and what success looks like for you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={ctas.project.href}>{ctas.project.label}</Button>
          <Button href={ctas.call.href} variant="secondary" arrow={false}>{ctas.call.label}</Button>
        </div>
      </PageHero>
      <OfferingsGrid heading={false} />
      <ProcessSteps />
      <FinalCta />
    </>
  );
}
