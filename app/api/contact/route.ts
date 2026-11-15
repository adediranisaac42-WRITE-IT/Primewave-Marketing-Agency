import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-schema";
import { createServiceClient } from "@/lib/supabase/service";

// Best-effort in-memory rate limit (per server instance). For stricter limits use Upstash/Vercel KV.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  // Spam protection 1: honeypot field must be empty. Pretend success so bots learn nothing.
  if (typeof body.company_fax === "string" && body.company_fax.length > 0) return NextResponse.json({ ok: true });
  // Spam protection 2: humans take more than 3 seconds to fill the form.
  const started = Number(body.started_at);
  if (!started || Date.now() - started < 3000) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

  const { data, errors, ok } = validateContact(body);
  if (!ok) return NextResponse.json({ error: "Please check the highlighted fields.", fields: errors }, { status: 422 });

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("leads").insert({
      ...data,
      business_name: data.business_name || null,
      website_url: data.website_url || null,
      source: "website_contact_form",
      user_agent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] insert failed", e);
    return NextResponse.json({ error: "Something went wrong on our side. Please try again shortly." }, { status: 500 });
  }
}
