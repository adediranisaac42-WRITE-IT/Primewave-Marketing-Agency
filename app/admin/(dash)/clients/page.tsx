import { requireAdmin, fmtDate } from "@/lib/admin";
import { createClientRecord } from "@/app/admin/actions";
import { PageTitle, Table, td, Empty, NewPanel, Field, input, btn } from "@/components/admin/ui";

export default async function ClientsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
  return (
    <>
      <PageTitle title="Clients" sub="Contact records for your clients." />
      <NewPanel label="Add client">
        <form action={createClientRecord} className="grid gap-4 md:grid-cols-3">
          <Field label="Name *"><input name="name" required className={input} /></Field>
          <Field label="Company"><input name="company" className={input} /></Field>
          <Field label="Email"><input name="email" type="email" className={input} /></Field>
          <Field label="Phone"><input name="phone" className={input} /></Field>
          <Field label="Website"><input name="website" className={input} /></Field>
          <Field label="Country"><input name="country" className={input} /></Field>
          <Field label="Notes" className="md:col-span-3"><textarea name="notes" rows={2} className={input} /></Field>
          <div><button className={btn}>Save client</button></div>
        </form>
      </NewPanel>
      {data?.length ? (
        <Table head={["Name", "Company", "Email", "Phone", "Country", "Added"]}>
          {data.map((c) => (
            <tr key={c.id}>
              <td className={`${td} font-semibold text-white`}>{c.name}</td><td className={td}>{c.company ?? "—"}</td>
              <td className={td}>{c.email ? <a href={`mailto:${c.email}`} className="text-accent">{c.email}</a> : "—"}</td>
              <td className={td}>{c.phone ?? "—"}</td><td className={td}>{c.country ?? "—"}</td><td className={td}>{fmtDate(c.created_at)}</td>
            </tr>
          ))}
        </Table>
      ) : <Empty>No clients yet. Convert a lead or add one above.</Empty>}
    </>
  );
}
