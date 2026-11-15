import type { Metadata } from "next";
import { site } from "./site";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${site.shortName}`, description, url, siteName: site.name, type: "website", locale: "en_GB" },
    twitter: { card: "summary_large_image", title: `${title} | ${site.shortName}`, description },
  };
}
