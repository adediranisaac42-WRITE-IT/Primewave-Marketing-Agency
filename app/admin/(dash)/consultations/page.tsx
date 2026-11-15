import { requireAdmin, consultationStatuses, fmtDate } from "@/lib/admin";
import { createConsultation, updateConsultationStatus } from "@/app/admin/actions";
import { PageTitle, NewPanel, Field, input, btn, Table, td, Empty } from "@/components/admin/ui";
import { AutoSubmitSelect } from "@/components/admin/AutoSubmitSelect";
import { DateTimeField } from "@/components/admin/DateTimeField";

export default async function ConsultationsPage() {
  const { supabase } = await requireAdmin();
  const [{ data }, { data: leads }, { data: clients }] = await Promise.all([
    supabase.from("consultations").select("*, leads(full_name), clients(name)").order("scheduled_at", { ascending: false }),
    supabase.from("leads").select("id,full_name").order("created_at", { ascending: false }).limit(200),
    supabase.from("clients").select("id,name").order("name"),
  ]);
  return (
    <>
      <PageTitle title="Consultations" sub="Schedule and track discovery calls." />
      <NewPanel label="Schedule consultation">
        <form action={createConsultation} className="grid gap-4 md:grid-cols-3">
          <Field label="Date & time *"><DateTimeField name="scheduled_at" required /></Field>
          <Field label="Duration (min)"><input name="duration_minutes" type="number" defaultValue={30} className={input} /></Field>
          <Field label="Meeting link"><input name="meeting_link" type="url" className={input} /></Field>
          <Field label="Lead"><select name="lead_id" className={input}><option value="">—</option>{leads?.map((l) => <option key={l.id} value={l.id}>{l.full_name}</option>)}</select></Field>
          <Field label="Client"><select name="client_id" className={input}><option value="">—</option>{clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
          <Field label="Notes"><input name="notes" className={input} /></Field>
          <div><button className={btn}>Schedule</button></div>
        </form>
      </NewPanel>
      {data?.length ? (
        <Table head={["When", "With", "Duration", "Link", "Status"]}>
          {data.map((c) => (
            <tr key={c.id}>
              <td className={`${td} font-semibold`}>{fmtDate(c.scheduled_at, true)}</td>
              <td className={td}>{(c.leads as { full_name: string } | null)?.full_name ?? (c.clients as { name: string } | null)?.name ?? "—"}</td>
              <td className={td}>{c.duration_minutes} min</td>
              <td className={td}>{c.meeting_link ? <a href={c.meeting_link} target="_blank" rel="noopener noreferrer" className="text-accent">Join</a> : "—"}</td>
              <td className={td}><form action={updateConsultationStatus}><input type="hidden" name="id" value={c.id} /><AutoSubmitSelect name="status" value={c.status} options={consultationStatuses} ariaLabel="Consultation status" /></form></td>
            </tr>
          ))}
        </Table>
      ) : <Empty>No consultations scheduled.</Empty>}
    </>
  );
}
