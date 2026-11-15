import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Terms and Conditions", description: `Terms of use for the ${site.name} website.`, path: "/terms" });

export default function Page() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="November 2026"
      sections={[
        { h: "Use of this website", p: [`By using this website you agree to these terms. The content is provided for general information about ${site.name}'s services and may change without notice.`] },
        { h: "Services", p: ["Any services we provide are governed by a separate written proposal or agreement setting out scope, deliverables, timelines and fees."] },
        { h: "Intellectual property", p: ["The design, text, graphics and code of this website belong to Primewave Marketing Agency unless otherwise stated, and may not be reproduced without permission."] },
        { h: "Limitation of liability", p: ["We take care to keep information accurate but do not guarantee that the website will be error-free or uninterrupted. Nothing in these terms limits liability that cannot be limited by law."] },
        { h: "Governing law", p: ["These terms are governed by the laws of England and Wales."] },
      ]}
    />
  );
}
