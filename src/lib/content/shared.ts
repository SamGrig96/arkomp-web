/**
 * Locale-independent facts and structure: contact details, the product slugs
 * and which direction each group belongs to. Translated strings live in
 * ./hy.ts and ./ru.ts, keyed by these slugs.
 */

export const contact = {
  phone: "+374 91 40 58 62",
  phoneHref: "tel:+37491405862",
  email: "arkomp.am@gmail.com",
  /** Approximate coordinates of the address — refine before launch. */
  geo: { lat: 40.156, lng: 44.5265 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=%D4%B1%D6%80%D5%BF%D5%A1%D5%B7%D5%A1%D5%BF%D5%AB%20%D5%AD%D5%B3%D5%B8%D6%82%D5%B2%D5%AB%204%2F4%2C%20%D4%B5%D6%80%D6%87%D5%A1%D5%B6",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=44.5085%2C40.1470%2C44.5445%2C40.1650&layer=mapnik&marker=40.1560%2C44.5265",
} as const;

/**
 * Social profiles. The live site links to the networks' front pages rather than
 * company profiles — fill these in with the real URLs and they are also picked
 * up by the Organization JSON-LD as sameAs.
 */
export const socials: { label: string; href: string | null }[] = [
  { label: "Facebook", href: null },
  { label: "Instagram", href: null },
  { label: "Pinterest", href: null },
];

export type FamilySlug =
  | "metaghya"
  | "rhetine"
  | "asbotexnikakan"
  | "pokhantsum-hidravlika"
  | "pashtpanich";

export const familyOrder: FamilySlug[] = [
  "metaghya",
  "rhetine",
  "asbotexnikakan",
  "pokhantsum-hidravlika",
  "pashtpanich",
];

/**
 * The 22 groups arkomp.am publishes, with the slug stems the live site uses so
 * the old URLs can be redirected. Order follows the five directions.
 */
export const productIndex: { slug: string; family: FamilySlug }[] = [
  { slug: "poghpatya-chopanalarer", family: "metaghya" },
  { slug: "arhasanner-ew-detalner", family: "metaghya" },
  { slug: "metaghya-tsantser", family: "metaghya" },
  { slug: "glanakner-ktsamaser", family: "metaghya" },

  { slug: "rhetine-khoghovakner", family: "rhetine" },
  { slug: "rhetine-terter", family: "rhetine" },
  { slug: "rhetine-larer", family: "rhetine" },
  { slug: "rhetinatsvats-gortsvatskner", family: "rhetine" },
  { slug: "ayl-rhetine-aprankner", family: "rhetine" },

  { slug: "paronitner", family: "asbotexnikakan" },
  { slug: "khtsowtsner", family: "asbotexnikakan" },
  { slug: "asbostvaratowght", family: "asbotexnikakan" },
  { slug: "asbogortsvatsk", family: "asbotexnikakan" },
  { slug: "asboshnowr", family: "asbotexnikakan" },
  { slug: "friktsion-aprankner", family: "asbotexnikakan" },

  { slug: "berhnapokhadrich-zhapavenner", family: "pokhantsum-hidravlika" },
  { slug: "pokhantsman-poker", family: "pokhantsum-hidravlika" },
  { slug: "bardzr-chnshman-khoghovakner", family: "pokhantsum-hidravlika" },
  { slug: "bardzr-chnshman-ktsamaser", family: "pokhantsum-hidravlika" },

  { slug: "dielektrik-aprankner", family: "pashtpanich" },
  { slug: "hakahrdehayin-aprankner", family: "pashtpanich" },
  { slug: "ayl-aprankner", family: "pashtpanich" },
];

/** The six groups the design puts on the homepage. */
export const featuredSlugs = [
  "poghpatya-chopanalarer",
  "berhnapokhadrich-zhapavenner",
  "rhetine-khoghovakner",
  "paronitner",
  "pokhantsman-poker",
  "dielektrik-aprankner",
];

export const productSlugs = productIndex.map((p) => p.slug);

export const familyOf = (slug: string): FamilySlug => {
  const entry = productIndex.find((p) => p.slug === slug);
  if (!entry) throw new Error(`unknown product slug: ${slug}`);
  return entry.family;
};

export const slugsInFamily = (family: FamilySlug) =>
  productIndex.filter((p) => p.family === family).map((p) => p.slug);
