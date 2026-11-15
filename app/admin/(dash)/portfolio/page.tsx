import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { deletePortfolioProject, setPortfolioFeatured, togglePortfolioPublished } from "@/app/admin/portfolio-actions";
import { PageTitle, Table, td, btn, Empty } from "@/components/admin/ui";

type Search = { searchParams: Promise<{ saved?: string; deleted?: string; error?: string }> };

export default async function PortfolioAdminPage({ searchParams }: Search) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const { data } = await supabase
    .from("portfolio_projects")
    .select("id,slug,title,category,badge,cover_image,is_concept,is_published,is_featured,sort,updated_at")
    .order("is_featured", { ascending: false })
    .order("sort", { ascending: true });

  return (
    <>
      <PageTitle title="Portfolio" sub="Projects shown in Selected Projects and on the Portfolio page.">
        <Link href="/admin/portfolio/new" className={btn}>New project</Link>
      </PageTitle>

      {sp.saved && <p className="mb-6 rounded-lg bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">Saved. The website updates within a minute.</p>}
      {sp.deleted && <p className="mb-6 rounded-lg bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">Project deleted.</p>}
      {sp.error === "confirm" && <p className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-red-800">Type DELETE to confirm deleting a project.</p>}

      {data?.length ? (
        <Table head={["Project", "Category", "Status", "Order", "Actions"]}>
          {data.map((p) => (
            <tr key={p.id}>
              <td className={td}>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-navy">
                    {p.cover_image && <Image src={p.cover_image} alt="" fill sizes="80px" className="object-cover" />}
                  </div>
                  <div>
                    <Link href={`/admin/portfolio/${p.id}`} className="font-semibold text-white hover:text-accent">{p.title}</Link>
                    <p className="text-xs text-muted">/portfolio/{p.slug}</p>
                  </div>
                </div>
              </td>
              <td className={td}><span className="text-white/80">{p.badge ?? p.category}</span></td>
              <td className={td}>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.is_published ? "bg-emerald-100 text-emerald-800" : "bg-navy text-muted"}`}>{p.is_published ? "Published" : "Hidden"}</span>
                  {p.is_featured && <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">Featured</span>}
                  {p.is_concept && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Concept</span>}
                </div>
              </td>
              <td className={td}><span className="text-muted">{p.sort}</span></td>
              <td className={td}>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <Link href={`/admin/portfolio/${p.id}`} className="text-accent hover:underline">Edit</Link>
                  <form action={togglePortfolioPublished}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="publish" value={p.is_published ? "0" : "1"} />
                    <button className="text-white/80 hover:text-white">{p.is_published ? "Hide" : "Publish"}</button>
                  </form>
                  {!p.is_featured && (
                    <form action={setPortfolioFeatured}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className="text-white/80 hover:text-white">Make featured</button>
                    </form>
                  )}
                  {p.is_published && <Link href={`/portfolio/${p.slug}`} target="_blank" className="text-white/60 hover:text-white">View</Link>}
                  <details className="relative">
                    <summary className="cursor-pointer list-none text-red-400 hover:text-red-300">Delete</summary>
                    <form action={deletePortfolioProject} className="absolute right-0 z-10 mt-2 flex w-56 flex-col gap-2 rounded-lg border border-line bg-deep p-3 shadow-card">
                      <input type="hidden" name="id" value={p.id} />
                      <label className="text-[11px] font-normal text-muted">Type DELETE to confirm</label>
                      <input name="confirm" autoComplete="off" className="rounded-md border border-line bg-surface px-2 py-1 text-xs text-white" />
                      <button className="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white">Delete project</button>
                    </form>
                  </details>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <Empty>No projects yet. Add your first one.</Empty>
      )}
    </>
  );
}
