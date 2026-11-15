"use client";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { budgetOptions, serviceOptions, validateContact, type ContactInput } from "@/lib/contact-schema";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const v = validateContact(raw);
    setErrors(v.errors);
    if (!v.ok) {
      setStatus("error"); setMessage("Please check the highlighted fields.");
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, started_at: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.fields) setErrors(json.fields);
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const field = (name: keyof ContactInput) => ({
    id: name, name, "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
    className: cn("field", errors[name] && "border-red-400 focus:border-red-500 focus:ring-red-100"),
  });
  const Err = ({ name }: { name: keyof ContactInput }) =>
    errors[name] ? <p id={`${name}-err`} className="mt-1.5 text-sm text-red-600">{errors[name]}</p> : null;

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} role="status"
        className="flex flex-col items-center rounded-3xl border border-line bg-surface p-12 text-center shadow-card">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent"><CheckCircle2 className="h-8 w-8" /></span>
        <h2 className="mt-6 text-3xl font-bold text-white">Thank you — we&apos;ve received your enquiry.</h2>
        <p className="mt-3 max-w-md text-muted">We&apos;ll review your project details and get back to you to arrange a consultation.</p>
        <Button onClick={() => setStatus("idle")} variant="ghost" className="mt-8" arrow={false}>Send another enquiry</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-line bg-surface p-6 shadow-card md:p-10">
      {/* Honeypot — hidden from humans and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_fax">Leave this empty</label>
        <input id="company_fax" name="company_fax" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div><label htmlFor="full_name" className="label">Full name *</label><input {...field("full_name")} autoComplete="name" required /><Err name="full_name" /></div>
        <div><label htmlFor="email" className="label">Email address *</label><input {...field("email")} type="email" autoComplete="email" required /><Err name="email" /></div>
        <div><label htmlFor="business_name" className="label">Business name</label><input {...field("business_name")} autoComplete="organization" /><Err name="business_name" /></div>
        <div><label htmlFor="website_url" className="label">Website URL</label><input {...field("website_url")} inputMode="url" placeholder="yourstore.com" /><Err name="website_url" /></div>
        <div>
          <label htmlFor="service" className="label">Service required *</label>
          <select {...field("service")} defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((o) => <option key={o}>{o}</option>)}
          </select><Err name="service" />
        </div>
        <div>
          <label htmlFor="budget" className="label">Budget range *</label>
          <select {...field("budget")} defaultValue="" required>
            <option value="" disabled>Select a range</option>
            {budgetOptions.map((o) => <option key={o}>{o}</option>)}
          </select><Err name="budget" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="message" className="label">Project description *</label>
          <textarea {...field("message")} rows={6} placeholder="Tell us about your business, goals and what you'd like help with." required /><Err name="message" />
        </div>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />{message}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-muted">By submitting, you agree to our <a href="/privacy-policy" className="underline">Privacy Policy</a>.</p>
        <Button type="submit" disabled={status === "sending"} arrow={status !== "sending"}>
          {status === "sending" ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Sending…</span> : "Send Enquiry"}
        </Button>
      </div>
    </form>
  );
}
