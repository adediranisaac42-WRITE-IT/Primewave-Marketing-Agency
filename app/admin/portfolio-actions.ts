"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

const CATEGORIES = ["Website Development", "Shopify & E-commerce", "Digital Marketing", "CRM & Automation"] as const;
const IMAGE_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/avif": "avif" };
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const str = (f: FormData, k: string, max = 500) => {
  const v = String(f.get(k) ?? "").trim().slice(0, max);
  return v.length ? v : null;
};
const lines = (v: string | null, max = 12) =>
  (v ?? "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean).slice(0, max).map((s) => s.slice(0, 160));
const list = (v: string | null, max = 12) =>
  (v ?? "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, max).map((s) => s.slice(0, 60));
const uuid = (v: string | null) => (v && /^[0-9a-f-]{36}$/i.test(v) ? v : null);
const slugify = (v: string) => v.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
const safeUrl = (v: string | null) => {
  if (!v) return null;
  if (v.startsWith("/")) return v.slice(0, 300); // local /public path
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.toString().slice(0, 500) : null;
  } catch {
    return null;
  }
};

/** Cover images must be a local /public path or a Supabase Storage URL (allowed by next.config images). */
const safeImage = (v: string | null) => {
  const u = safeUrl(v);
  if (!u || u.startsWith("/")) return u;
  return new URL(u).hostname.endsWith(".supabase.co") ? u : null;
};

function refresh(slug?: string) {
  ["/", "/portfolio", "/admin/portfolio"].forEach((p) => revalidatePath(p));
  if (slug) revalidatePath(`/portfolio/${slug}`);
}

/** Create or update a portfolio project (id = "new" to create). Optional cover upload to Supabase Storage. */
export async function savePortfolioProject(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id"));
  const title = str(f, "title", 160);
  const category = str(f, "category");
  if (!title || !category || !(CATEGORIES as readonly string[]).includes(category)) {
    redirect(`/admin/portfolio/${id ?? "new"}?error=missing`);
  }
  const slug = slugify(str(f, "slug", 80) ?? title!);
  if (slug.length < 2) redirect(`/admin/portfolio/${id ?? "new"}?error=slug`);

  // Optional image upload (admin-only by Storage RLS).
  let cover = safeImage(str(f, "cover_image", 500));
  const file = f.get("cover_file");
  if (file instanceof File && file.size > 0) {
    const ext = IMAGE_TYPES[file.type];
    if (!ext || file.size > MAX_IMAGE_BYTES) redirect(`/admin/portfolio/${id ?? "new"}?error=image`);
    const path = `portfolio/${slug}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("public-media").upload(path, file, { contentType: file.type, upsert: false });
    if (upErr) redirect(`/admin/portfolio/${id ?? "new"}?error=upload`);
    cover = supabase.storage.from("public-media").getPublicUrl(path).data.publicUrl;
  }

  const isFeatured = f.get("is_featured") === "on";
  const row = {
    title: title!,
    slug,
    category: category!,
    badge: str(f, "badge", 40),
    summary: str(f, "summary", 300) ?? "",
    description: str(f, "description", 6000) ?? "",
    deliverables: lines(str(f, "deliverables", 3000)),
    technologies: list(str(f, "technologies", 600)),
    client_name: str(f, "client_name", 120),
    live_url: safeUrl(str(f, "live_url", 500)),
    cover_image: cover,
    is_concept: f.get("is_concept") === "on",
    is_published: f.get("is_published") === "on",
    is_featured: isFeatured,
    sort: Number.isFinite(Number(str(f, "sort"))) ? Math.max(0, Math.min(999, Number(str(f, "sort")))) : 0,
  };

  // Only one project can be featured at a time.
  if (isFeatured) await supabase.from("portfolio_projects").update({ is_featured: false }).eq("is_featured", true);

  const { error } = id
    ? await supabase.from("portfolio_projects").update(row).eq("id", id)
    : await supabase.from("portfolio_projects").insert(row);
  if (error) redirect(`/admin/portfolio/${id ?? "new"}?error=${error.code === "23505" ? "duplicate" : "save"}`);

  refresh(slug);
  redirect("/admin/portfolio?saved=1");
}

export async function togglePortfolioPublished(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); if (!id) return;
  const publish = f.get("publish") === "1";
  const { data } = await supabase.from("portfolio_projects").update({ is_published: publish }).eq("id", id).select("slug").single();
  refresh(data?.slug);
}

export async function setPortfolioFeatured(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); if (!id) return;
  await supabase.from("portfolio_projects").update({ is_featured: false }).eq("is_featured", true);
  await supabase.from("portfolio_projects").update({ is_featured: true }).eq("id", id);
  refresh();
}

export async function deletePortfolioProject(f: FormData) {
  const { supabase } = await requireAdmin();
  const id = uuid(str(f, "id")); if (!id) return;
  if (f.get("confirm") !== "DELETE") redirect("/admin/portfolio?error=confirm");
  const { data } = await supabase.from("portfolio_projects").delete().eq("id", id).select("slug").single();
  refresh(data?.slug);
  redirect("/admin/portfolio?deleted=1");
}
