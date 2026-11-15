import { requireAdmin, dealStages, money, fmtDate, label } from "@/lib/admin";
import { createDeal, moveDeal } from "@/app/admin/actions";
import { PageTitle, NewPanel, Field, input, btn } from "@/components/admin/ui";
import { AutoSubmitSelect } from "@/components/admin/AutoSubmitSelect";

export default async function PipelinePage() {
  const { supabase } = await requireAdmin();
  const [{ data: deals }, { data: clients }] = await Promise.all([
    supabase.from("deals").select("*, clients(name)").order("updated_at", { ascending: false }),
    supabase.from("clients").select("id,name").order("name"),
  ]);
  return (
    <>
      <PageTitle title="Sales Pipeline" sub="Track every opportunity from first contact to close." />
      <NewPanel label="Add deal">
        <form action={createDeal} className="grid gap-4 md:grid-cols-3">
          <Field label="Title *"><input name="title" required className={input} placeholder="e.g. Shopify redesign" /></Field>
          <Field label="Client"><select name="client_id" className={input}><option value="">—</option>{clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
          <Field label="Stage"><select name="stage" className={input}>{dealStages.map((s) => <option key={s} value={s}>{label(s)}</option>)}</select></Field>
          <Field label="Value"><input name="value" type="number" min="0" step="1" className={input} /></Field>
          <Field label="Currency"><select name="currency" className={input}><option>GBP</option><option>USD</option><option>EUR</option></select></Field>
          <Field label="Expected close"><input name="expected_close" type="date" className={input} /></Field>
          <div><button className={btn}>Save deal</button></div>
        </form>
      </NewPanel>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {dealStages.map((stage) => {
          const col = (deals ?? []).filter((d) => d.stage === stage);
          const total = col.reduce((s, d) => s + Number(d.value ?? 0), 0);
          return (
            <section key={stage} className="w-72 shrink-0 rounded-2xl bg-deep/60 p-3">
              <header className="mb-3 flex items-center justify-between px-1"><h2 className="text-sm font-semibold text-white">{label(stage)} <span className="text-muted">({col.length})</span></h2><span className="text-xs text-muted">{money(total)}</span></header>
              <ul className="space-y-3">
                {col.map((d) => (
                  <li key={d.id} className="rounded-xl border border-line bg-surface p-4 shadow-card">
                    <p className="font-semibold text-white">{d.title}</p>
                    <p className="mt-1 text-xs text-muted">{(d.clients as { name: string } | null)?.name ?? "No client"} · {money(d.value, d.currency)}</p>
                    {d.expected_close && <p className="mt-1 text-xs text-muted">Close: {fmtDate(d.expected_close)}</p>}
                    <form action={moveDeal} className="mt-3"><input type="hidden" name="id" value={d.id} /><AutoSubmitSelect name="stage" value={d.stage} options={dealStages} ariaLabel={`Move ${d.title}`} /></form>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
