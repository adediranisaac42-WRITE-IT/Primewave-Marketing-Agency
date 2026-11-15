import "server-only";
import { esc } from "./email";
import { site } from "@/lib/site";

export type LeadForEmail = {
  ref: string;
  full_name: string;
  email: string;
  business_name: string | null;
  website_url: string | null;
  service: string;
  budget: string;
  message: string;
};

const shell = (title: string, inner: string) => `<!doctype html><html><body style="margin:0;background:#f3f5f9;font-family:Arial,Helvetica,sans-serif;color:#17243A">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="background:#080D16;padding:22px 28px"><span style="color:#ffffff;font-size:18px;font-weight:bold">Primewave</span>
<span style="color:#2F86FF;font-size:11px;letter-spacing:3px;margin-left:6px">MARKETING AGENCY</span></td></tr>
<tr><td style="padding:28px"><h1 style="margin:0 0 16px;font-size:20px;color:#080D16">${title}</h1>${inner}</td></tr>
<tr><td style="padding:18px 28px;background:#f7f8fb;font-size:12px;color:#6b7686">${esc(site.name)} · ${esc(site.tagline)}</td></tr>
</table></td></tr></table></body></html>`;

const row = (k: string, v: string | null) =>
  v ? `<tr><td style="padding:6px 12px 6px 0;color:#6b7686;font-size:13px;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0;font-size:14px">${esc(v)}</td></tr>` : "";

/** Notification to the agency inbox. */
export function newLeadAdminEmail(l: LeadForEmail) {
  const subject = `New enquiry ${l.ref}: ${l.service} (${l.full_name})`;
  const html = shell(
    `New enquiry · ${esc(l.ref)}`,
    `<table role="presentation" cellpadding="0" cellspacing="0">
      ${row("Name", l.full_name)}${row("Email", l.email)}${row("Business", l.business_name)}
      ${row("Website", l.website_url)}${row("Service", l.service)}${row("Budget", l.budget)}
    </table>
    <p style="margin:18px 0 6px;color:#6b7686;font-size:13px">Message</p>
    <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(l.message)}</p>
    <p style="margin:22px 0 0;font-size:13px;color:#6b7686">Reply to this email to respond directly to ${esc(l.full_name)}. The lead is also in your admin dashboard.</p>`
  );
  const text = `New enquiry ${l.ref}\n\nName: ${l.full_name}\nEmail: ${l.email}\nBusiness: ${l.business_name ?? "-"}\nWebsite: ${l.website_url ?? "-"}\nService: ${l.service}\nBudget: ${l.budget}\n\n${l.message}`;
  return { subject, html, text };
}

/** Confirmation to the person who enquired. */
export function leadConfirmationEmail(l: LeadForEmail) {
  const first = l.full_name.split(" ")[0];
  const subject = `We've received your enquiry (${l.ref})`;
  const wa = site.contact.whatsapp;
  const html = shell(
    `Thanks, ${esc(first)}. We've got your enquiry.`,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.6">Thank you for contacting ${esc(site.name)} about <strong>${esc(l.service)}</strong>.
     We'll review your details and get back to you as soon as possible.</p>
     <p style="margin:0 0 14px;font-size:15px">Your reference number is <strong>${esc(l.ref)}</strong>.</p>
     ${wa ? `<p style="margin:0 0 14px;font-size:15px;line-height:1.6">Prefer to chat? Message us on <a href="${esc(wa)}" style="color:#1D6FF2">WhatsApp</a> and mention your reference.</p>` : ""}
     <p style="margin:18px 0 0;font-size:14px;color:#6b7686">${esc(site.name)}</p>`
  );
  const text = `Thanks, ${first}. We've received your enquiry about ${l.service}.\nYour reference number is ${l.ref}.\nWe'll get back to you as soon as possible.${wa ? `\nWhatsApp: ${wa}` : ""}\n\n${site.name}`;
  return { subject, html, text };
}
