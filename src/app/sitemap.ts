import type { MetadataRoute } from "next";
import { productSlugs } from "@/lib/content";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl, alternateLanguages } from "@/lib/site";

/**
 * Served at /sitemap.xml — home, the catalogue and every product group, in
 * both languages, each row carrying its hreflang alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = ["", "products", ...productSlugs.map((s) => `products/${s}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "products" ? 0.9 : 0.8,
      alternates: { languages: alternateLanguages(path) },
    })),
  );
}
