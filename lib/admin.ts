import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Every admin page and server action calls this. RLS enforces the same rule in the database. */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?error=not_authorised");
  return { supabase, user };
}

export const leadStatuses = ["new", "contacted", "qualified", "proposal", "won", "lost"] as const;
export const dealStages = ["lead", "qualified", "proposal", "negotiation", "won", "lost"] as const;
export const consultationStatuses = ["scheduled", "completed", "cancelled", "no_show"] as const;
export const projectStatuses = ["planning", "in_progress", "review", "completed", "on_hold"] as const;
export const activityTypes = ["note", "email", "call", "meeting", "whatsapp"] as const;

export { label } from "./admin-labels";
export const fmtDate = (d: string | null, time = false) =>
  d ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", ...(time ? { timeStyle: "short" } : {}) }).format(new Date(d)) : "—";
export const money = (v: number | null, cur = "GBP") =>
  v == null ? "—" : new Intl.NumberFormat("en-GB", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(v);
