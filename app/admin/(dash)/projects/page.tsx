import { requireAdmin, projectStatuses, fmtDate } from "@/lib/admin";
import { createProject, updateProject } from "@/app/admin/actions";
import { services } from "@/lib/data/services";
import { PageTitle, NewPanel, Field, input, btn, Empty, Card } from "@/components/admin/ui";
import { AutoSubmitSelect } from "@/components/admin/AutoSubmitSelect";

export default async function ProjectsPage() {
  const { supabase } = await requireAdmin();
  const [{ data }, { data: clients }] = await Promise.all([
    supabase.from("projects").select("*, clients(name)").order("created_at", { ascending: false }),
    supabase.from("clients").select("id,name").order("name"),
  ]);
  return (
    <>
      <PageTitle title="Projects" sub="Track delivery for every client project." />
      <NewPanel label="New project">
        <form action={createProject} className="grid gap-4 md:grid-cols-3">
          <Field label="Project name *"><input name="name" required className={input} /></Field>
          <Field label="Client"><select name="client_id" className={input}><option value="">—</option>{clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
          <Field label="Service"><select name="service" className={input}>{services.map((s) => <option key={s.slug}>{s.title}</option>)}</select></Field>
          <Field label="Start"><input name="start_date" type="date" className={input} /></Field>
          <Field label="Due"><input name="due_date" type="date" className={input} /></Field>
          <Field label="Notes"><input name="notes" className={input} /></Field>
          <div><button className={btn}>Create project</button></div>
        </form>
      </NewPanel>
      {data?.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.map((p) => (
            <Card key={p.id}>
              <p className="text-xs text-muted">{p.service ?? "—"}</p>
              <h2 className="mt-1 text-lg font-semibold text-white">{p.name}</h2>
              <p className="text-sm text-muted">{(p.clients as { name: string } | null)?.name ?? "No client"} · Due {fmtDate(p.due_date)}</p>
              <div className="mt-4 h-2 rounded-full bg-navy"><div className="h-2 rounded-full bg-brand-gradient" style={{ width: `${p.progress}%` }} /></div>
              <form action={updateProject} className="mt-4 flex items-center gap-2">
                <input type="hidden" name="id" value={p.id} />
                <AutoSubmitSelect name="status" value={p.status} options={projectStatuses} ariaLabel="Project status" />
                <input name="progress" type="number" min={0} max={100} defaultValue={p.progress} aria-label="Progress %" className="w-20 rounded-lg border border-line px-2 py-1.5 text-xs" />
                <button className="text-xs font-semibold text-accent">Update %</button>
              </form>
            </Card>
          ))}
        </div>
      ) : <Empty>No projects yet.</Empty>}
    </>
  );
}
