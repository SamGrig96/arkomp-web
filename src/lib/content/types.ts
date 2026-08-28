import type { FamilySlug } from "./shared";

export type ProductCopy = {
  title: string;
  /** Card summary. Present only where the design wrote one. */
  short?: string;
  /** Card footer line — the single most useful selection hint. */
  benefit?: string;
  /** Product-page lead paragraph. */
  lead?: string;
  /** "What it solves / who it is for / how to choose" rows. */
  overview?: { t: string; d: string }[];
  /** Advantage cards. */
  features?: { n: string; t: string; d: string }[];
  /** Spec table row labels. Values come from the company, hence the marker. */
  specs?: string[];
  /** Concrete models the live site already lists for this group. */
  variants?: string[];
};

/** Section keys used for the nav; hrefs are built per locale from these. */
export type NavKey = "about" | "products" | "why" | "partners" | "contact";

export type Dictionary = {
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
  };
  company: {
    legalName: string;
    name: string;
    latinName: string;
    legalShort: string;
    tagline: string;
    address: { street: string; city: string; full: string; cityPrefix: string };
    hours: string;
    hoursClosed: string;
  };
  nav: { key: NavKey; label: string }[];
  ui: {
    skipLink: string;
    homeAria: string;
    langAria: string;
    menuOpen: string;
    menuClose: string;
    headerCta: string;
    navAria: string;
    socialsAria: string;
    breadcrumbAria: string;
    breadcrumbHome: string;
    more: string;
    fillingIn: string;
  };
  home: {
    heroLead: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    props4: { n: string; t: string }[];
    aboutEyebrow: string;
    aboutTitle: string;
    aboutParagraphs: string[];
    facts: { v: string; l: string }[];
    productsEyebrow: string;
    productsTitle: string;
    productsIntro: string;
    catalogTitle: string;
    catalogAll: string;
    whyEyebrow: string;
    whyTitle: string;
    why: { n: string; t: string; d: string }[];
    partnersTitle: string;
    partnersNote: string;
    partnersLogo: string;
    contactEyebrow: string;
    contactTitle: string;
    contactRows: { k: string; v: string }[];
    locateEyebrow: string;
    locateCta: string;
    locateFineprint: string;
    mapTitle: string;
  };
  catalog: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    lead: string;
    groupsCount: (n: number) => string;
    ctaHeading: (n: number) => string;
  };
  product: {
    checkAvailability: string;
    noDescription: [string, string];
    variantsTitle: string;
    featuresTitle: string;
    specsTitle: string;
    specsNote: string;
    specsEmpty: string;
    relatedTitle: string;
    ctaHeading: string;
    ctaSecondary: string;
    fallbackDescription: (title: string, family: string, phone: string) => string;
  };
  form: {
    title: string;
    note: string;
    name: string;
    namePlaceholder: string;
    contact: string;
    contactPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    ok: string;
    failed: (phone: string, email: string) => string;
    network: (phone: string, email: string) => string;
  };
  footer: {
    about: string;
    siteLabel: string;
    directionsLabel: string;
    contactLabel: string;
    /** Whole copyright line — the sentence punctuation differs per language. */
    rights: (year: number) => string;
  };
  imageSlots: {
    hero: string;
    about: string;
    productMain: string;
    detail: (n: number) => string;
  };
  familyLabels: Record<FamilySlug, string>;
  defaultSpecs: string[];
  products: Record<string, ProductCopy>;
};
