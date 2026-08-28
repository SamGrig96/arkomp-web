import type { MetadataRoute } from "next";
import { products } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

/** Served at /sitemap.xml — home, the catalogue index and every product group. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/products"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
