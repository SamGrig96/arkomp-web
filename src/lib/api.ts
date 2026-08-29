/**
 * Catalogue source.
 *
 * The pages call the functions here instead of reading src/lib/content
 * directly. Each one asks the .NET API first (github.com/SamGrig96/arkomp-api)
 * and falls back to the bundled dictionaries when it is unreachable — so the
 * site still builds and renders with the backend stopped, and picks up whatever
 * the backend serves once it is running.
 *
 * A 404 from a running API is treated as authoritative: a product deleted
 * through the admin endpoints disappears from the site rather than reappearing
 * from the fallback copy.
 */
import {
  familyOrder,
  featuredSlugs,
  getDictionary,
  getFamilies,
  getFeatured,
  getProduct,
  getRelated,
  type Dictionary,
  type FamilySlug,
  type ResolvedProduct,
} from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/** Trailing slash trimmed so paths can be concatenated blindly. */
export const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL ?? ""
).replace(/\/+$/, "");

/**
 * Seconds a fetched response is reused for. The catalogue changes rarely, so
 * the pages stay statically rendered and refresh in the background.
 */
const REVALIDATE_SECONDS = 300;

/**
 * Development is where the catalogue is edited, and a five-minute window there
 * only makes it look like the admin endpoints did nothing. Skip the cache while
 * developing so a refresh shows the edit; production keeps the ISR window.
 * The two options are mutually exclusive — sending both makes Next ignore each.
 */
const cacheOptions: RequestInit =
  process.env.NODE_ENV === "production"
    ? { next: { revalidate: REVALIDATE_SECONDS } }
    : { cache: "no-store" };

// ── Wire types (mirror the API's Arkomp.Api/Contracts/Dtos.cs) ──────────────

export type ApiImage = {
  id: number;
  url: string;
  alt: string;
  byteSize: number;
  sortOrder: number;
};

type ApiFamilyRef = { slug: string; label: string };

type ApiProductSummary = {
  slug: string;
  family: ApiFamilyRef;
  title: string;
  short: string | null;
  benefit: string | null;
  featured: boolean;
  image: ApiImage | null;
};

type ApiProductDetail = ApiProductSummary & {
  lead: string | null;
  overview: { title: string; text: string }[];
  features: { number: string; title: string; text: string }[];
  specs: string[];
  variants: string[];
  images: ApiImage[];
  updatedAt: string;
};

type ApiFamily = { slug: string; label: string; items: ApiProductSummary[] };

// ── Page-facing types ────────────────────────────────────────────────────────

/** A product in the shape the pages already render, plus its photos. */
export type CatalogProduct = ResolvedProduct & { images: ApiImage[] };

export type CatalogFamily = {
  slug: FamilySlug;
  label: string;
  items: CatalogProduct[];
};

// ── Transport ────────────────────────────────────────────────────────────────

type Fetched<T> =
  | { ok: true; data: T }
  /** The API answered, and there is no such record. */
  | { ok: false; reason: "not-found" }
  /** No API configured, or it could not be reached. */
  | { ok: false; reason: "unavailable" };

/** One line per failing path per process — enough to notice, not enough to drown. */
const warned = new Set<string>();

function warnOnce(path: string, detail: string) {
  if (warned.has(path)) return;
  warned.add(path);
  console.warn(
    `[catalog] ${detail} — falling back to the bundled copy for ${path}.`,
  );
}

async function apiGet<T>(path: string): Promise<Fetched<T>> {
  if (!apiBaseUrl) return { ok: false, reason: "unavailable" };

  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...cacheOptions,
      headers: { Accept: "application/json" },
    });

    if (response.status === 404) return { ok: false, reason: "not-found" };
    if (!response.ok) {
      warnOnce(path, `the API answered ${response.status}`);
      return { ok: false, reason: "unavailable" };
    }

    return { ok: true, data: (await response.json()) as T };
  } catch (error) {
    warnOnce(path, `the API at ${apiBaseUrl} is unreachable (${error})`);
    return { ok: false, reason: "unavailable" };
  }
}

// ── Wire → page shapes ───────────────────────────────────────────────────────

const summaryToProduct = (p: ApiProductSummary): CatalogProduct => ({
  slug: p.slug,
  family: p.family.slug as FamilySlug,
  familyLabel: p.family.label,
  title: p.title,
  short: p.short ?? undefined,
  benefit: p.benefit ?? undefined,
  images: p.image ? [p.image] : [],
});

const detailToProduct = (p: ApiProductDetail): CatalogProduct => ({
  ...summaryToProduct(p),
  lead: p.lead ?? undefined,
  // The API names these fields in full; the components read the design's t/d/n.
  overview: p.overview.map((row) => ({ t: row.title, d: row.text })),
  features: p.features.map((f) => ({ n: f.number, t: f.title, d: f.text })),
  specs: p.specs.length ? p.specs : undefined,
  variants: p.variants.length ? p.variants : undefined,
  images: p.images,
});

/** Products from the bundled dictionaries carry no photos. */
const withoutImages = (product: ResolvedProduct): CatalogProduct => ({
  ...product,
  images: [],
});

// ── The catalogue ────────────────────────────────────────────────────────────

export async function getCatalogFamilies(
  locale: Locale,
  dict: Dictionary = getDictionary(locale),
): Promise<CatalogFamily[]> {
  const result = await apiGet<ApiFamily[]>(`/api/families?locale=${locale}`);

  if (result.ok) {
    // Keep the site's own order even if the API ever returns the directions in
    // a different one.
    const byOrder = (a: CatalogFamily, b: CatalogFamily) =>
      familyOrder.indexOf(a.slug) - familyOrder.indexOf(b.slug);

    return result.data
      .map((family) => ({
        slug: family.slug as FamilySlug,
        label: family.label,
        items: family.items.map(summaryToProduct),
      }))
      .sort(byOrder);
  }

  return getFamilies(dict).map((family) => ({
    ...family,
    items: family.items.map(withoutImages),
  }));
}

export async function getCatalogFeatured(
  locale: Locale,
  dict: Dictionary = getDictionary(locale),
): Promise<CatalogProduct[]> {
  const result = await apiGet<ApiProductSummary[]>(
    `/api/products?locale=${locale}&featured=true`,
  );

  if (result.ok && result.data.length > 0) {
    const order = (slug: string) => {
      const at = featuredSlugs.indexOf(slug);
      return at === -1 ? featuredSlugs.length : at;
    };
    return result.data
      .map(summaryToProduct)
      .sort((a, b) => order(a.slug) - order(b.slug));
  }

  return getFeatured(dict).map(withoutImages);
}

export async function getCatalogProduct(
  locale: Locale,
  slug: string,
  dict: Dictionary = getDictionary(locale),
): Promise<CatalogProduct | undefined> {
  const result = await apiGet<ApiProductDetail>(
    `/api/products/${encodeURIComponent(slug)}?locale=${locale}`,
  );

  if (result.ok) return detailToProduct(result.data);
  if (result.reason === "not-found") return undefined;

  const fallback = getProduct(dict, slug);
  return fallback && withoutImages(fallback);
}

export async function getCatalogRelated(
  locale: Locale,
  product: CatalogProduct,
  limit = 3,
  dict: Dictionary = getDictionary(locale),
): Promise<CatalogProduct[]> {
  const result = await apiGet<ApiProductSummary[]>(
    `/api/products/${encodeURIComponent(product.slug)}/related` +
      `?locale=${locale}&limit=${limit}`,
  );

  if (result.ok) return result.data.map(summaryToProduct);
  if (result.reason === "not-found") return [];

  return getRelated(dict, product, limit).map(withoutImages);
}
