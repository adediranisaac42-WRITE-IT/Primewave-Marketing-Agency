import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdmin, fmtDate, leadStatuses, activityTypes, label } from "@/lib/admin";
import { addActivity, convertLeadToClient, createReminder, deleteLead, updateLeadStatus } from "@/app/admin/actions";
import { Card, Badge, Field, input, btn, btnGhost, Empty } from "@/components/admin/ui";
import { AutoSubmitSelect } from "@/components/admin/AutoSubmitSelect";
import { DateTimeField } from "@/components/admin/DateTimeField";

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
  if (!lead) notFound();
  const [{ data: acts }, { data: rems }] = await Promise.all([
    supabase.from("activities").select("*").eq("lead_id", id).order("created_at", { ascending: false }),
    supabase.from("reminders").select("*").eq("lead_id", id).order("due_at"),
  ]);

  return (
    <>
      <Link href="/admin/leads" className="text-sm text-accent">← All leads</Link>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-bold text-white">{lead.full_name}</h1><Badge value={lead.status} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <Card>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              {[["Email", <a key="e" href={`mailto:${lead.email}`} className="text-accent">{lead.email}</a>], ["Business", lead.business_name ?? "—"],
                ["Website", lead.website_url ? <a key="w" href={lead.website_url} target="_blank" rel="noopener noreferrer" className="text-accent">{lead.website_url}</a> : "—"],
                ["Service", lead.service], ["Budget", lead.budget], ["Received", fmtDate(lead.created_at, true)]].map(([k, v]) => (
                <div key={String(k)}><dt className="text-xs uppercase tracking-wider text-muted">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>
              ))}
            </dl>
            <h2 className="mt-6 text-xs uppercase tracking-wider text-muted">Project description</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{lead.message}</p>
          </Card>
          <Card>
            <h2 className="font-semibold text-white">Communication history</h2>
            <form action={addActivity} className="mt-4 space-y-3">
              <input type="hidden" name="lead_id" value={lead.id} />
              <div className="flex gap-2">
                <select name="type" className={`${input} !w-36`}>{activityTypes.map((t) => <option key={t} value={t}>{label(t)}</option>)}</select>
                <input name="body" required placeholder="Log a note, call, email…" className={input} />
                <button className={btn}>Add</button>
              </div>
            </form>
            <ol className="mt-6 space-y-4 border-l border-line pl-5">
              {(acts ?? []).map((a) => (
                <li key={a.id} className="relative text-sm"><span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  <p className="text-xs text-muted">{label(a.type)} · {fmtDate(a.created_at, true)}</p><p className="mt-1 whitespace-pre-wrap">{a.body}</p></li>
              ))}
              {!acts?.length && <li className="text-sm text-muted">No activity yet.</li>}
            </ol>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <h2 className="font-semibold text-white">Actions</h2>
            <form action={updateLeadStatus} className="mt-4 flex items-center gap-3"><input type="hidden" name="id" value={lead.id} /><span className="text-sm">Status</span><AutoSubmitSelect name="status" value={lead.status} options={leadStatuses} ariaLabel="Lead status" /></form>
            <div className="mt-4 flex flex-wrap gap-2">
              {lead.client_id ? <Link href="/admin/clients" className={btnGhost}>View client</Link> :
                <form action={convertLeadToClient}><input type="hidden" name="id" value={lead.id} /><button className={btn}>Convert to client</button></form>}
              <form action={deleteLead}><input type="hidden" name="id" value={lead.id} /><button className={`${btnGhost} hover:!border-red-400 hover:!text-red-600`}>Delete</button></form>
            </div>
          </Card>
          <Card>
            <h2 className="font-semibold text-white">Follow-up reminders</h2>
            <form action={createReminder} className="mt-4 space-y-3">
              <input type="hidden" name="lead_id" value={lead.id} />
              <Field label="Reminder"><input name="title" required defaultValue={`Follow up with ${lead.full_name}`} className={input} /></Field>
              <Field label="Due"><DateTimeField name="due_at" required /></Field>
              <button className={btn}>Add reminder</button>
            </form>
            <ul className="mt-5 space-y-2 text-sm">
              {(rems ?? []).map((r) => <li key={r.id} className={`rounded-lg px-3 py-2 ${r.done ? "bg-navy text-muted line-through" : "bg-accent/5"}`}>{r.title} · {fmtDate(r.due_at, true)}</li>)}
              {!rems?.length && <Empty>No reminders.</Empty>}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
