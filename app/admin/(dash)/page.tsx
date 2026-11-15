import Link from "next/link";
import { requireAdmin, fmtDate, money, leadStatuses, dealStages } from "@/lib/admin";
import { Card, PageTitle, Badge, Empty } from "@/components/admin/ui";

export default async function Overview() {
  const { supabase } = await requireAdmin();
  const since = new Date(Date.now() - 30 * 864e5).toISOString();
  const now = new Date().toISOString();
  const [leads, deals, consults, reminders, projects] = await Promise.all([
    supabase.from("leads").select("id,full_name,service,status,created_at").order("created_at", { ascending: false }),
    supabase.from("deals").select("stage,value"),
    supabase.from("consultations").select("id,scheduled_at,status").gte("scheduled_at", now).eq("status", "scheduled").order("scheduled_at").limit(5),
    supabase.from("reminders").select("id,title,due_at").eq("done", false).order("due_at").limit(6),
    supabase.from("projects").select("status"),
  ]);
  const L = leads.data ?? [];
  const D = deals.data ?? [];
  const openValue = D.filter((d) => d.stage !== "won" && d.stage !== "lost").reduce((s, d) => s + Number(d.value ?? 0), 0);
  const wonValue = D.filter((d) => d.stage === "won").reduce((s, d) => s + Number(d.value ?? 0), 0);
  const won = L.filter((l) => l.status === "won").length;
  const kpis = [
    { label: "Total leads", value: L.length },
    { label: "Leads (30 days)", value: L.filter((l) => l.created_at >= since).length },
    { label: "Lead → client rate", value: L.length ? `${Math.round((won / L.length) * 100)}%` : "—" },
    { label: "Open pipeline", value: money(openValue) },
    { label: "Won value", value: money(wonValue) },
    { label: "Active projects", value: (projects.data ?? []).filter((p) => p.status !== "completed").length },
  ];
  const byService = Object.entries(L.reduce<Record<string, number>>((a, l) => ((a[l.service] = (a[l.service] ?? 0) + 1), a), {})).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...byService.map(([, n]) => n));

  return (
    <>
      <PageTitle title="Overview" sub="Your business at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <Card key={k.label} className="!p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted">{k.label}</p><p className="mt-2 font-display text-2xl font-bold text-white">{k.value}</p></Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold text-white">Leads by service</h2>
          {byService.length ? (
            <ul className="mt-5 space-y-3">
              {byService.map(([s, n]) => (
                <li key={s}><div className="flex justify-between text-sm"><span>{s}</span><span className="font-semibold">{n}</span></div>
                  <div className="mt-1 h-2 rounded-full bg-navy"><div className="h-2 rounded-full bg-accent" style={{ width: `${(n / max) * 100}%` }} /></div></li>
              ))}
            </ul>
          ) : <div className="mt-4"><Empty>No leads yet.</Empty></div>}
        </Card>
        <Card>
          <h2 className="font-semibold text-white">Funnel</h2>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center sm:grid-cols-6">
            {leadStatuses.map((s) => (<div key={s} className="rounded-xl bg-navy p-3"><p className="font-display text-xl font-bold text-white">{L.filter((l) => l.status === s).length}</p><Badge value={s} /></div>))}
          </div>
          <h3 className="mt-6 text-sm font-semibold text-white">Pipeline stages</h3>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center sm:grid-cols-6">
            {dealStages.map((s) => (<div key={s} className="rounded-xl bg-navy p-3"><p className="font-display text-xl font-bold text-white">{D.filter((d) => d.stage === s).length}</p><Badge value={s} /></div>))}
          </div>
        </Card>
        <Card>
          <div className="flex justify-between"><h2 className="font-semibold text-white">Latest leads</h2><Link href="/admin/leads" className="text-sm text-accent">View all</Link></div>
          <ul className="mt-4 divide-y divide-line">
            {L.slice(0, 6).map((l) => (<li key={l.id} className="flex items-center justify-between py-3 text-sm"><Link href={`/admin/leads/${l.id}`} className="font-medium hover:text-accent">{l.full_name}<span className="block text-xs text-muted">{l.service} · {fmtDate(l.created_at)}</span></Link><Badge value={l.status} /></li>))}
            {!L.length && <li><Empty>Enquiries from the website appear here.</Empty></li>}
          </ul>
        </Card>
        <Card>
          <h2 className="font-semibold text-white">Upcoming</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(consults.data ?? []).map((c) => <li key={c.id} className="rounded-lg bg-navy px-3 py-2">📅 Consultation · {fmtDate(c.scheduled_at, true)}</li>)}
            {(reminders.data ?? []).map((r) => <li key={r.id} className={`rounded-lg px-3 py-2 ${r.due_at < now ? "bg-red-50 text-red-700" : "bg-navy"}`}>🔔 {r.title} · {fmtDate(r.due_at, true)}</li>)}
            {!consults.data?.length && !reminders.data?.length && <li><Empty>Nothing scheduled.</Empty></li>}
          </ul>
        </Card>
      </div>
    </>
  );
}
