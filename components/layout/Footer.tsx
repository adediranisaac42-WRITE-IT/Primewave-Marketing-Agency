import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/data/services";
import { Logo } from "@/components/ui/Logo";

const socialLabels: Record<string, string> = {
  tiktok: "TikTok", instagram: "Instagram", linkedin: "LinkedIn", facebook: "Facebook", fiverr: "Fiverr",
};

export function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => !!url) as [string, string][];
  return (
    <footer className="dark-section relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="container grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo dark />
          <p className="mt-6 max-w-sm leading-relaxed text-white/60">
            Digital marketing, website development, e-commerce growth and CRM solutions for ambitious businesses in the UK, US and worldwide.
          </p>
          <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-accent">{site.tagline.toUpperCase()}</p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">Company</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="text-white/70 transition-colors hover:text-white">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((s) => <li key={s.slug}><Link href={s.href} className="text-white/70 transition-colors hover:text-white">{s.title}</Link></li>)}
            <li><Link href="/crm-solutions" className="text-white/70 transition-colors hover:text-white">CRM Solutions</Link></li>
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">Contact</h2>
          <ul className="mt-5 space-y-3 text-white/70">
            {site.contact.email && (
              <li><a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" />{site.contact.email}</a></li>
            )}
            {site.contact.ukPhone && (
              <li><a href={`tel:${site.contact.ukPhone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" />{site.contact.ukPhone}</a></li>
            )}
            {site.contact.whatsapp && (
              <li><a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4" />WhatsApp us</a></li>
            )}
            <li><Link href="/contact" className="hover:text-white">Send an enquiry →</Link></li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map(([k, url]) => (
                <li key={k}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/70 transition-colors hover:border-accent hover:text-white">
                    {socialLabels[k]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-4 py-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
