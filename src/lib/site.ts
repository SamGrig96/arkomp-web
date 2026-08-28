import { localePath, locales, localeTags, type Locale } from "./i18n";

/**
 * Production origin. Set NEXT_PUBLIC_SITE_URL on the host; the fallback is only
 * for local dev. Used for canonical URLs, og:image, sitemap.xml and robots.txt.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const absoluteUrl = (path = "/") =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * hreflang map for a page, keyed by BCP-47 tag, plus x-default pointing at the
 * Armenian version — the language the company's own site defaults to.
 */
export const alternateLanguages = (path = "") => {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeTags[locale]] = localePath(locale, path);
  }
  languages["x-default"] = localePath("hy", path);
  return languages;
};

/** Canonical + hreflang block shared by every page's metadata. */
export const alternatesFor = (locale: Locale, path = "") => ({
  canonical: localePath(locale, path),
  languages: alternateLanguages(path),
});
