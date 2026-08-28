import type { Locale } from "@/lib/i18n";
import { hy } from "./hy";
import { ru } from "./ru";
import type { FamilySlug } from "./shared";
import {
  familyOf,
  familyOrder,
  featuredSlugs,
  productIndex,
  slugsInFamily,
} from "./shared";
import type { Dictionary, ProductCopy } from "./types";

export * from "./shared";
export type { Dictionary, ProductCopy } from "./types";

const dictionaries: Record<Locale, Dictionary> = { hy, ru };

export const getDictionary = (locale: Locale) => dictionaries[locale];

/** A product with its slug, family and translated copy resolved together. */
export type ResolvedProduct = ProductCopy & {
  slug: string;
  family: FamilySlug;
  familyLabel: string;
};

export const getProduct = (
  dict: Dictionary,
  slug: string,
): ResolvedProduct | undefined => {
  const copy = dict.products[slug];
  if (!copy) return undefined;
  const family = familyOf(slug);
  return { ...copy, slug, family, familyLabel: dict.familyLabels[family] };
};

const resolve = (dict: Dictionary, slug: string) => {
  const product = getProduct(dict, slug);
  if (!product) throw new Error(`missing translation for product: ${slug}`);
  return product;
};

export const getProducts = (dict: Dictionary) =>
  productIndex.map((entry) => resolve(dict, entry.slug));

export const getFamilies = (dict: Dictionary) =>
  familyOrder.map((family) => ({
    slug: family,
    label: dict.familyLabels[family],
    items: slugsInFamily(family).map((slug) => resolve(dict, slug)),
  }));

export const getFeatured = (dict: Dictionary) =>
  featuredSlugs.map((slug) => resolve(dict, slug));

export const getRelated = (
  dict: Dictionary,
  product: ResolvedProduct,
  limit = 3,
) =>
  slugsInFamily(product.family)
    .filter((slug) => slug !== product.slug)
    .slice(0, limit)
    .map((slug) => resolve(dict, slug));
