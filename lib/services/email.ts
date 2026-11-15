import "server-only";
import nodemailer from "nodemailer";

/**
 * Server-side email sending over SMTP (Gmail by default, using a Google "app password").
 * If SMTP isn't configured yet, sending is skipped and logged instead of failing the request.
 *
 * Env: SMTP_USER, SMTP_PASS (required) · SMTP_HOST (default smtp.gmail.com) · SMTP_PORT (default 465)
 *      EMAIL_FROM (default "Primewave Marketing Agency <SMTP_USER>") · ADMIN_NOTIFY_EMAIL (default SMTP_USER)
 */
type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transporter;
}

export const adminEmail = () => process.env.ADMIN_NOTIFY_EMAIL ?? process.env.SMTP_USER ?? "";

export async function sendMail(mail: Mail): Promise<{ sent: boolean; reason?: string }> {
  const t = getTransporter();
  if (!t) {
    console.warn(`[email] SMTP not configured; skipped "${mail.subject}"`);
    return { sent: false, reason: "not_configured" };
  }
  try {
    await t.sendMail({
      from: process.env.EMAIL_FROM ?? `Primewave Marketing Agency <${process.env.SMTP_USER}>`,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
    return { sent: true };
  } catch (e) {
    console.error(`[email] failed to send "${mail.subject}"`, e);
    return { sent: false, reason: "send_failed" };
  }
}

/** Escape user-supplied text before it goes into an HTML email. */
export const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
