import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/** Served at /sitemap.xml. Add a row per public route as pages land. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
