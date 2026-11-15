import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { savePortfolioProject } from "@/app/admin/portfolio-actions";
import { PageTitle, Card, Field, input, btn, btnGhost } from "@/components/admin/ui";

const CATEGORIES = ["Website Development", "Shopify & E-commerce", "Digital Marketing", "CRM & Automation"];
const ERRORS: Record<string, string> = {
  missing: "Please add a title and choose a category.",
  slug: "Please enter a valid web address (slug).",
  image: "Images must be JPG, PNG, WebP or AVIF and under 5 MB.",
  upload: "The image couldn't be uploaded. Please try again.",
  duplicate: "Another project already uses that web address (slug).",
  save: "Something went wrong while saving. Please try again.",
};

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export default async function PortfolioEditPage({ params, searchParams }: Props) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";

  let p: Record<string, unknown> | null = null;
  if (!isNew) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
    const { data } = await supabase.from("portfolio_projects").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    p = data;
  }
  const v = (k: string) => (p?.[k] as string | null | undefined) ?? "";
  const arr = (k: string) => ((p?.[k] as string[] | undefined) ?? []);
  const on = (k: string, fallback: boolean) => (p ? Boolean(p[k]) : fallback);

  return (
    <>
      <PageTitle title={isNew ? "New project" : "Edit project"} sub="Concept projects are labelled as concepts on the website.">
        <Link href="/admin/portfolio" className={btnGhost}>Back to portfolio</Link>
      </PageTitle>
      {error && ERRORS[error] && <p className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-red-800">{ERRORS[error]}</p>}

      <form action={savePortfolioProject} className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {!isNew && <input type="hidden" name="id" value={id} />}
        <Card className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Title *"><input name="title" required maxLength={160} defaultValue={v("title")} className={input} /></Field>
            <Field label="Web address (slug)"><input name="slug" maxLength={80} placeholder="made from the title if empty" defaultValue={v("slug")} className={input} /></Field>
            <Field label="Category *">
              <select name="category" required defaultValue={v("category") || CATEGORIES[0]} className={input}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Card label (optional)"><input name="badge" maxLength={40} placeholder="e.g. Shopify & CRO" defaultValue={v("badge")} className={input} /></Field>
          </div>
          <Field label="Short summary (shown on the card)"><textarea name="summary" maxLength={300} rows={2} defaultValue={v("summary")} className={input} /></Field>
          <Field label="Case study text (blank line between paragraphs)"><textarea name="description" maxLength={6000} rows={8} defaultValue={v("description")} className={input} /></Field>
          <Field label="What this covers (one per line)"><textarea name="deliverables" rows={5} defaultValue={arr("deliverables").join("\n")} className={input} /></Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Tools (comma separated)"><input name="technologies" defaultValue={arr("technologies").join(", ")} className={input} /></Field>
            <Field label="Client name (real projects only)"><input name="client_name" maxLength={120} defaultValue={v("client_name")} className={input} /></Field>
            <Field label="Live website (https://…)"><input name="live_url" type="url" defaultValue={v("live_url")} className={input} /></Field>
            <Field label="Display order (lower shows first)"><input name="sort" type="number" min={0} max={999} defaultValue={String(p?.sort ?? 10)} className={input} /></Field>
          </div>
        </Card>

        <div className="grid content-start gap-6">
          <Card className="grid gap-4">
            <p className="font-semibold text-white">Cover image</p>
            {v("cover_image") && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy">
                <Image src={v("cover_image")} alt="" fill sizes="400px" className="object-cover" />
              </div>
            )}
            <Field label="Upload a new image (JPG, PNG, WebP, max 5 MB)">
              <input name="cover_file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-cta file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white" />
            </Field>
            <Field label="…or image address (site path or Supabase Storage URL)"><input name="cover_image" defaultValue={v("cover_image")} className={input} /></Field>
          </Card>

          <Card className="grid gap-3">
            <label className="flex items-center gap-3 text-sm text-white"><input type="checkbox" name="is_published" defaultChecked={on("is_published", false)} className="h-4 w-4 accent-[#1D6FF2]" /> Published on the website</label>
            <label className="flex items-center gap-3 text-sm text-white"><input type="checkbox" name="is_featured" defaultChecked={on("is_featured", false)} className="h-4 w-4 accent-[#1D6FF2]" /> Featured (the large card)</label>
            <label className="flex items-center gap-3 text-sm text-white"><input type="checkbox" name="is_concept" defaultChecked={on("is_concept", true)} className="h-4 w-4 accent-[#1D6FF2]" /> Concept project (not a real client)</label>
            <p className="text-xs text-muted">Untick “Concept” only for genuine client work you have permission to show. Only add results you can verify.</p>
          </Card>

          <button className={`${btn} w-full py-3`}>{isNew ? "Create project" : "Save changes"}</button>
        </div>
      </form>
    </>
  );
}
