"use client";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { services } from "@/lib/data/services";

/** Floating WhatsApp button with a pre-filled message that matches the page the visitor is on. */
export function WhatsAppButton() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const base = site.contact.whatsapp;
  if (!base) return null;

  const slug = pathname.startsWith("/services/") ? pathname.split("/")[2] : null;
  const service = slug ? services.find((s) => s.slug === slug) : null;
  const text = service
    ? `Hi Primewave, I'm interested in ${service.title}. Could you tell me more?`
    : "Hi Primewave, I'd like to talk about growing my business online.";
  const href = `${base}?text=${encodeURIComponent(text)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={service ? `Chat on WhatsApp about ${service.title}` : "Chat with us on WhatsApp"}
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 md:bottom-7 md:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full border border-white/10 bg-surface/90 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-card backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,.6)] transition-transform duration-300 group-hover:scale-105">
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.6s] motion-reduce:hidden" />
        <MessageCircle aria-hidden className="relative h-7 w-7" strokeWidth={2.2} />
      </span>
    </motion.a>
  );
}
