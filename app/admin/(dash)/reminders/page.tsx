import Link from "next/link";
import { requireAdmin, fmtDate } from "@/lib/admin";
import { createReminder, toggleReminder } from "@/app/admin/actions";
import { PageTitle, NewPanel, Field, input, btn, Empty } from "@/components/admin/ui";
import { DateTimeField } from "@/components/admin/DateTimeField";

export default async function RemindersPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("reminders").select("*, leads(id,full_name), clients(name)").order("done").order("due_at");
  const now = new Date().toISOString();
  return (
    <>
      <PageTitle title="Follow-up Reminders" sub="Never let an opportunity go cold." />
      <NewPanel label="New reminder">
        <form action={createReminder} className="grid gap-4 md:grid-cols-3">
          <Field label="Reminder *"><input name="title" required className={input} /></Field>
          <Field label="Due *"><DateTimeField name="due_at" required /></Field>
          <div className="flex items-end"><button className={btn}>Add</button></div>
        </form>
      </NewPanel>
      {data?.length ? (
        <ul className="space-y-2">
          {data.map((r) => {
            const lead = r.leads as { id: string; full_name: string } | null;
            return (
              <li key={r.id} className={`flex items-center gap-4 rounded-xl border bg-surface p-4 ${!r.done && r.due_at < now ? "border-red-200" : "border-line"}`}>
                <form action={toggleReminder}><input type="hidden" name="id" value={r.id} /><input type="hidden" name="done" value={String(!r.done)} />
                  <button aria-label={r.done ? "Mark as not done" : "Mark as done"} className={`grid h-6 w-6 place-items-center rounded-md border ${r.done ? "border-accent bg-accent text-deep" : "border-line"}`}>{r.done ? "✓" : ""}</button></form>
                <div className={r.done ? "text-muted line-through" : ""}>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-xs text-muted">{fmtDate(r.due_at, true)}{lead && <> · <Link href={`/admin/leads/${lead.id}`} className="text-accent">{lead.full_name}</Link></>}</p>
                </div>
                {!r.done && r.due_at < now && <span className="ml-auto text-xs font-semibold text-red-600">Overdue</span>}
              </li>
            );
          })}
        </ul>
      ) : <Empty>No reminders.</Empty>}
    </>
  );
}
