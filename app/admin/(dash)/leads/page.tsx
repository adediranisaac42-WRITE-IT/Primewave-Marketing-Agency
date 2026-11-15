import Link from "next/link";
import { requireAdmin, fmtDate, leadStatuses } from "@/lib/admin";
import { updateLeadStatus } from "@/app/admin/actions";
import { PageTitle, Table, td, Empty } from "@/components/admin/ui";
import { AutoSubmitSelect } from "@/components/admin/AutoSubmitSelect";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { status, q } = await searchParams;
  const { supabase } = await requireAdmin();
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (status && (leadStatuses as readonly string[]).includes(status)) query = query.eq("status", status);
  if (q) query = query.or(`full_name.ilike.%${q.replace(/[%,()]/g, "")}%,email.ilike.%${q.replace(/[%,()]/g, "")}%,business_name.ilike.%${q.replace(/[%,()]/g, "")}%`);
  const { data } = await query;
  return (
    <>
      <PageTitle title="Leads" sub="Website enquiries and prospects.">
        <form className="flex gap-2">
          <input name="q" defaultValue={q} placeholder="Search name, email, business" className="rounded-lg border border-line px-3 py-2 text-sm" />
          <select name="status" defaultValue={status ?? ""} className="rounded-lg border border-line px-2 text-sm"><option value="">All statuses</option>{leadStatuses.map((s) => <option key={s}>{s}</option>)}</select>
          <button className="rounded-lg bg-navy px-4 text-sm font-semibold text-white">Filter</button>
        </form>
      </PageTitle>
      {data?.length ? (
        <Table head={["Name", "Business", "Service", "Budget", "Received", "Status"]}>
          {data.map((l) => (
            <tr key={l.id} className="hover:bg-navy/60">
              <td className={td}><Link href={`/admin/leads/${l.id}`} className="font-semibold text-white hover:text-accent">{l.full_name}</Link><span className="block text-xs text-muted">{l.email}</span></td>
              <td className={td}>{l.business_name ?? "—"}</td>
              <td className={td}>{l.service}</td>
              <td className={td}>{l.budget}</td>
              <td className={td}>{fmtDate(l.created_at)}</td>
              <td className={td}><form action={updateLeadStatus}><input type="hidden" name="id" value={l.id} /><AutoSubmitSelect name="status" value={l.status} options={leadStatuses} ariaLabel={`Status for ${l.full_name}`} /></form></td>
            </tr>
          ))}
        </Table>
      ) : <Empty>No leads found.</Empty>}
    </>
  );
}
