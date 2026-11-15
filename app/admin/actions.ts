"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, leadStatuses, dealStages, consultationStatuses, projectStatuses, activityTypes } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

const str = (f: FormData, k: string, max = 500) => {
  const v = String(f.get(k) ?? "").trim().slice(0, max);
  return v.length ? v : null;
};
const oneOf = <T extends readonly string[]>(list: T, v: string | null): T[number] | null =>
  v && (list as readonly string[]).includes(v) ? (v as T[number]) : null;
const uuid = (v: string | null) => (v && /^[0-9a-f-]{36}$/i.test(v) ? v : null);

function done(paths: string[]) { paths.forEach((p) => revalidatePath(p)); }

// ---------- Auth ----------
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- Leads ----------
export async function updateLeadStatus(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); const status = oneOf(leadStatuses, str(f, "status"));
  if (!id || !status) return;
  await supabase.from("leads").update({ status }).eq("id", id);
  await supabase.from("activities").insert({ lead_id: id, type: "status_change", body: `Status changed to ${status}` });
  done(["/admin/leads", `/admin/leads/${id}`, "/admin"]);
}

export async function convertLeadToClient(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); if (!id) return;
  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).single();
  if (!lead || lead.client_id) return;
  const { data: client } = await supabase.from("clients")
    .insert({ name: lead.full_name, company: lead.business_name, email: lead.email, website: lead.website_url })
    .select("id").single();
  if (client) {
    await supabase.from("leads").update({ client_id: client.id, status: "won" }).eq("id", id);
    await supabase.from("activities").insert({ lead_id: id, client_id: client.id, type: "note", body: "Converted to client" });
  }
  done(["/admin/leads", `/admin/leads/${id}`, "/admin/clients", "/admin"]);
}

export async function deleteLead(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); if (!id) return;
  await supabase.from("leads").delete().eq("id", id);
  done(["/admin/leads", "/admin"]);
  redirect("/admin/leads");
}

// ---------- Activities (communication history) ----------
export async function addActivity(f: FormData) {
  const { supabase } = await requireAdmin();
  const body = str(f, "body", 5000); const type = oneOf(activityTypes, str(f, "type")) ?? "note";
  const lead_id = uuid(str(f, "lead_id")); const client_id = uuid(str(f, "client_id"));
  if (!body || (!lead_id && !client_id)) return;
  await supabase.from("activities").insert({ body, type, lead_id, client_id });
  done([lead_id ? `/admin/leads/${lead_id}` : "/admin/clients"]);
}

// ---------- Clients ----------
export async function createClientRecord(f: FormData) {
  const { supabase } = await requireAdmin();
  const name = str(f, "name", 160); if (!name) return;
  await supabase.from("clients").insert({
    name, company: str(f, "company", 160), email: str(f, "email", 200), phone: str(f, "phone", 40),
    website: str(f, "website", 300), country: str(f, "country", 80), notes: str(f, "notes", 3000),
  });
  done(["/admin/clients", "/admin"]);
}

// ---------- Pipeline ----------
export async function createDeal(f: FormData) {
  const { supabase } = await requireAdmin();
  const title = str(f, "title", 200); if (!title) return;
  const value = Number(str(f, "value")); 
  await supabase.from("deals").insert({
    title, stage: oneOf(dealStages, str(f, "stage")) ?? "lead",
    value: Number.isFinite(value) && value >= 0 ? value : null,
    currency: oneOf(["GBP", "USD", "EUR"] as const, str(f, "currency")) ?? "GBP",
    expected_close: str(f, "expected_close"), client_id: uuid(str(f, "client_id")),
  });
  done(["/admin/pipeline", "/admin"]);
}

export async function moveDeal(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); const stage = oneOf(dealStages, str(f, "stage"));
  if (!id || !stage) return;
  await supabase.from("deals").update({ stage }).eq("id", id);
  done(["/admin/pipeline", "/admin"]);
}

// ---------- Consultations ----------
export async function createConsultation(f: FormData) {
  const { supabase } = await requireAdmin();
  const when = str(f, "scheduled_at"); if (!when) return;
  await supabase.from("consultations").insert({
    scheduled_at: new Date(when).toISOString(),
    duration_minutes: Math.min(480, Math.max(5, Number(str(f, "duration_minutes")) || 30)),
    meeting_link: str(f, "meeting_link", 500), notes: str(f, "notes", 3000),
    lead_id: uuid(str(f, "lead_id")), client_id: uuid(str(f, "client_id")),
  });
  done(["/admin/consultations", "/admin"]);
}

export async function updateConsultationStatus(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); const status = oneOf(consultationStatuses, str(f, "status"));
  if (!id || !status) return;
  await supabase.from("consultations").update({ status }).eq("id", id);
  done(["/admin/consultations", "/admin"]);
}

// ---------- Projects ----------
export async function createProject(f: FormData) {
  const { supabase } = await requireAdmin();
  const name = str(f, "name", 200); if (!name) return;
  await supabase.from("projects").insert({
    name, service: str(f, "service", 120), client_id: uuid(str(f, "client_id")),
    start_date: str(f, "start_date"), due_date: str(f, "due_date"), notes: str(f, "notes", 3000),
  });
  done(["/admin/projects", "/admin"]);
}

export async function updateProject(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); if (!id) return;
  const status = oneOf(projectStatuses, str(f, "status"));
  const progress = Number(str(f, "progress"));
  await supabase.from("projects").update({
    ...(status ? { status } : {}),
    ...(Number.isFinite(progress) ? { progress: Math.min(100, Math.max(0, Math.round(progress))) } : {}),
  }).eq("id", id);
  done(["/admin/projects", "/admin"]);
}

// ---------- Reminders ----------
export async function createReminder(f: FormData) {
  const { supabase } = await requireAdmin();
  const title = str(f, "title", 200); const due = str(f, "due_at");
  if (!title || !due) return;
  const lead_id = uuid(str(f, "lead_id"));
  await supabase.from("reminders").insert({ title, due_at: new Date(due).toISOString(), lead_id, client_id: uuid(str(f, "client_id")) });
  done(["/admin/reminders", "/admin", ...(lead_id ? [`/admin/leads/${lead_id}`] : [])]);
}

export async function toggleReminder(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); if (!id) return;
  await supabase.from("reminders").update({ done: str(f, "done") === "true" }).eq("id", id);
  done(["/admin/reminders", "/admin"]);
}
