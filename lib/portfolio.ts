import "server-only";
import { createClient } from "@supabase/supabase-js";

export const portfolioCategories = [
  "Website Development",
  "Shopify & E-commerce",
  "Digital Marketing",
  "CRM & Automation",
] as const;
export type PortfolioCategoryName = (typeof portfolioCategories)[number];

export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategoryName;
  badge: string | null;
  summary: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  cover_image: string | null;
  images: string[];
  live_url: string | null;
  client_name: string | null;
  is_concept: boolean;
  is_featured: boolean;
};

const COLUMNS =
  "id,slug,title,category,badge,summary,description,deliverables,technologies,cover_image,images,live_url,client_name,is_concept,is_featured";

/** Public (anon) client: Row Level Security only returns published projects. */
function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function getPublishedProjects(): Promise<PortfolioItem[]> {
  const supabase = publicClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select(COLUMNS)
    .eq("is_published", true)
    .order("is_featured", { ascending: false })
    .order("sort", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[portfolio] list failed", error.message);
    return [];
  }
  return (data ?? []) as PortfolioItem[];
}

export async function getProjectBySlug(slug: string): Promise<PortfolioItem | null> {
  const supabase = publicClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select(COLUMNS)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) {
    console.error("[portfolio] get failed", error.message);
    return null;
  }
  return data as PortfolioItem | null;
}
