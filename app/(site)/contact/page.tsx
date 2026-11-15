import { Mail, MessageCircle, Phone, Globe2, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact & Book a Consultation",
  description: "Tell us about your business and goals. Book a consultation with Primewave Marketing Agency.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your growth."
        intro="Share a few details about your business and what you'd like to achieve. We'll come back to you to arrange a consultation."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className="section bg-surface">
        <div className="container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal className="space-y-6">
            <div className="rounded-3xl bg-navy p-8 text-white">
              <CalendarCheck className="h-7 w-7 text-accent" />
              <h2 className="mt-5 text-2xl font-bold">What happens next?</h2>
              <ol className="mt-5 space-y-4 text-white/70">
                <li><span className="font-semibold text-white">1.</span> We review your enquiry and goals.</li>
                <li><span className="font-semibold text-white">2.</span> We contact you to arrange a consultation.</li>
                <li><span className="font-semibold text-white">3.</span> You receive tailored recommendations and next steps.</li>
              </ol>
            </div>
            <ul className="space-y-3">
              {site.contact.email && (
                <li><a href={`mailto:${site.contact.email}`} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 font-medium text-white hover:border-accent"><Mail className="h-5 w-5 text-accent" />{site.contact.email}</a></li>
              )}
              {site.contact.ukPhone && (
                <li><a href={`tel:${site.contact.ukPhone.replace(/\s/g, "")}`} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 font-medium text-white hover:border-accent"><Phone className="h-5 w-5 text-accent" />{site.contact.ukPhone}</a></li>
              )}
              {site.contact.whatsapp && (
                <li><a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 font-medium text-white hover:border-accent"><MessageCircle className="h-5 w-5 text-accent" />Chat on WhatsApp</a></li>
              )}
              <li className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 text-muted"><Globe2 className="h-5 w-5 text-accent" />Working with clients in the UK, US and internationally</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="relative"><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
