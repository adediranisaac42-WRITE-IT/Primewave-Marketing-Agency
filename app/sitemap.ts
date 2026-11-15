import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/about", "/services", "/crm-solutions", "/portfolio", "/contact", "/privacy-policy", "/terms"];
  const servicePaths = services.filter((s) => s.slug !== "crm-solutions").map((s) => `/services/${s.slug}`);
  return [...staticPaths, ...servicePaths].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p.startsWith("/services") || p === "/crm-solutions" ? 0.8 : 0.6,
  }));
}
