/**
 * Site copy, taken from arkomp.am and from the approved design
 * (design/figma/1 - Homepage.html, 2 - Product page.html).
 *
 * Nothing here is invented. The live site has 22 product groups with names only
 * — no descriptions, no specs, no services page, no real partner names — so
 * pages carry the design's «լրացվում է» marker where the company still owes us
 * content, rather than plausible-sounding filler.
 */

export const company = {
  legalName: "ԱՐԿՈՄՊ ՍՊԸ",
  name: "ԱՐԿՈՄՊ",
  latinName: "ARKOMP",
  tagline: "Ամեն ինչ ձեր արտադրության համար",
  phone: "+374 91 40 58 62",
  phoneHref: "tel:+37491405862",
  email: "arkomp.am@gmail.com",
  address: {
    street: "Արտաշատի խճ․ 4/4",
    city: "Երևան",
    country: "AM",
    full: "ք․ Երևան, Արտաշատի խճ․ 4/4",
  },
  /** Approximate coordinates of the address — refine before launch. */
  geo: { lat: 40.156, lng: 44.5265 },
  hours: "Երկ–Ուրբ · 09:00–18:00",
  hoursClosed: "Շաբ–Կիր · փակ",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=%D4%B1%D6%80%D5%BF%D5%A1%D5%B7%D5%A1%D5%BF%D5%AB%20%D5%AD%D5%B3%D5%B8%D6%82%D5%B2%D5%AB%204%2F4%2C%20%D4%B5%D6%80%D6%87%D5%A1%D5%B6",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=44.5085%2C40.1470%2C44.5445%2C40.1650&layer=mapnik&marker=40.1560%2C44.5265",
} as const;

export const nav = [
  { href: "/#about", label: "Մեր մասին" },
  { href: "/products", label: "Տեսականի" },
  { href: "/#why", label: "Ինչու մենք" },
  { href: "/#partners", label: "Գործընկերներ" },
  { href: "/#contact", label: "Կապ" },
] as const;

export const heroLead =
  "ԱՐԿՈՄՊ ՍՊԸ-ն մատակարարում է ռետինե և ասբոտեխնիկական արտադրանք, պողպատյա ճոպանալարեր, բեռնափոխադրիչ ժապավեններ, բարձր ճնշման խողովակներ և պաշտպանիչ միջոցներ՝ 22 ապրանքախումբ մեկ հասցեով։";

export const props4 = [
  { n: "01", t: "Որակյալ ապրանքներ" },
  { n: "02", t: "Մրցունակ գներ" },
  { n: "03", t: "Բարձրակարգ սպասարկում" },
  { n: "04", t: "Խորհրդատվություն" },
] as const;

export const facts = [
  { v: "22", l: "ապրանքախումբ տեսականում" },
  { v: "5", l: "արտադրանքի ուղղություն" },
  { v: "Երևան", l: "Արտաշատի խճ․ 4/4" },
] as const;

export const aboutParagraphs = [
  "ԱՐԿՈՄՊ ՍՊԸ-ն Երևանում գործող մատակարար ընկերություն է։ Տեսականին ընդգրկում է արտադրական և վերանորոգման աշխատանքների համար անհրաժեշտ նյութեր՝ ռետինից և ասբոտեխնիկական խմբից մինչև պողպատյա ճոպանալարեր, ցանցեր և հիդրավլիկ կցամասեր։",
  "Հաճախորդը մեկ տեղում գտնում է թե՛ խափանված հանգույցի փոխարինող տարրը, թե՛ դրա ընտրության խորհրդատվությունը։",
] as const;

export const why = [
  {
    n: "01",
    t: "Որակյալ ապրանքներ",
    d: "Տեսականին հավաքված է արտադրական կիրառության համար, ոչ թե կենցաղային շուկայի։",
  },
  { n: "02", t: "Մրցունակ գներ", d: "Ուղիղ մատակարարում՝ առանց ավելորդ միջնորդի։" },
  {
    n: "03",
    t: "Բարձրակարգ սպասարկում",
    d: "Հարցումին պատասխան աշխատանքային օրերին՝ 09:00–18:00։",
  },
  {
    n: "04",
    t: "Խորհրդատվություն",
    d: "Օգնում ենք ընտրել ճիշտ նյութն ու չափսը՝ ըստ հանգույցի պայմանների։",
  },
] as const;

export const contacts = [
  { k: "Հասցե", v: company.address.full },
  { k: "Հեռախոս", v: company.phone },
  { k: "Էլ․ փոստ", v: company.email },
  { k: "Աշխատանքային ժամեր", v: `${company.hours}\n${company.hoursClosed}` },
] as const;

/**
 * Social profiles. The live site links to the networks' front pages rather than
 * company profiles (audit item 06) — fill these in with the real URLs and they
 * are also picked up by the Organization JSON-LD as sameAs.
 */
export const socials: { label: string; href: string | null }[] = [
  { label: "Facebook", href: null },
  { label: "Instagram", href: null },
  { label: "Pinterest", href: null },
];

/* ── Catalogue ──────────────────────────────────────────────────────────────
   The live site lists 22 product groups as one flat list (audit item 03). The
   redesign groups them into five directions; the group names and their slug
   stems are kept identical to arkomp.am so the old URLs can be redirected. */

export type FamilySlug =
  | "metaghya"
  | "rhetine"
  | "asbotexnikakan"
  | "pokhantsum-hidravlika"
  | "pashtpanich";

export const familyLabels: Record<FamilySlug, string> = {
  metaghya: "Մետաղյա արտադրանք",
  rhetine: "Ռետինե արտադրանք",
  asbotexnikakan: "Ասբոտեխնիկական նյութեր",
  "pokhantsum-hidravlika": "Փոխանցում և հիդրավլիկա",
  pashtpanich: "Պաշտպանիչ միջոցներ",
};

export type Product = {
  slug: string;
  title: string;
  family: FamilySlug;
  /** One-line summary shown on cards. Present only where the design wrote one. */
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

/** Spec rows repeated on product pages that have no product-specific table yet. */
export const defaultSpecs = [
  "Ստանդարտ / ԳՕՍՏ",
  "Չափսեր",
  "Նյութ / կառուցվածք",
  "Բեռնվածության դաս",
  "Ծածկույթ",
  "Փաթեթավորում",
];

export const products: Product[] = [
  {
    slug: "poghpatya-chopanalarer",
    title: "Պողպատյա ճոպանալարեր",
    family: "metaghya",
    short:
      "Բեռնման, կապման և ամրակապման աշխատանքների համար նախատեսված պողպատե ճոպաններ։",
    benefit: "Ընտրություն ըստ բեռնվածության",
    lead: "Բեռնման, կապման և ամրակապման աշխատանքների համար նախատեսված պողպատե ճոպաններ։ Ընտրվում են ըստ տրամագծի, ճոպանի կառուցվածքի և պահանջվող բեռնվածության։",
    overview: [
      {
        t: "Ի՞նչ է լուծում",
        d: "Բեռի բարձրացման, կապման և ամրակապման հանգույցներում մաշված ճոպանի փոխարինում՝ առանց ամբողջ մեխանիզմը փոխելու։",
      },
      {
        t: "Ո՞ւմ համար է",
        d: "Արտադրական ձեռնարկություններ, շինարարական և վերանորոգման կազմակերպություններ, ամբարձիչ տեխնիկայի սպասարկում։",
      },
      {
        t: "Ինչպե՞ս ընտրել",
        d: "Անհրաժեշտ է իմանալ տրամագիծը, աշխատանքային բեռնվածությունը և շահագործման միջավայրը։ Խորհրդատվությունը՝ հեռախոսով։",
      },
    ],
    features: [
      {
        n: "01",
        t: "Բեռնվածության պաշար",
        d: "Ճոպանն ընտրվում է աշխատանքային բեռի նկատմամբ պաշարով։",
      },
      {
        n: "02",
        t: "Ճկունություն",
        d: "Ճոպանի կառուցվածքը որոշում է ճկունությունը ճախարակների վրա։",
      },
      {
        n: "03",
        t: "Կոռոզիակայունություն",
        d: "Ցինկապատ տարբերակները՝ խոնավ և բացօթյա միջավայրի համար։",
      },
      {
        n: "04",
        t: "Համալրող դետալներ",
        d: "Առասանները, կցորդիչները և ամրակները՝ նույն տեղում։",
      },
    ],
    specs: [
      "Ստանդարտ / ԳՕՍՏ",
      "Տրամագիծ, մմ",
      "Ճոպանի կառուցվածք",
      "Ամրության դաս",
      "Ծածկույթ",
      "Փաթեթավորում / երկարություն",
    ],
  },
  { slug: "arhasanner-ew-detalner", title: "Առասաններ և դետալներ", family: "metaghya" },
  { slug: "metaghya-tsantser", title: "Մետաղյա ցանցեր", family: "metaghya" },
  { slug: "glanakner-ktsamaser", title: "Գլանակներ, կցամասեր", family: "metaghya" },

  {
    slug: "rhetine-khoghovakner",
    title: "Ռետինե խողովակներ",
    family: "rhetine",
    short: "Ջրի, օդի և տեխնիկական հեղուկների փոխանցման ճկափողեր։",
    benefit: "Տարբեր տրամագծեր",
  },
  { slug: "rhetine-terter", title: "Ռետինե թերթեր", family: "rhetine" },
  { slug: "rhetine-larer", title: "Ռետինե լարեր", family: "rhetine" },
  {
    slug: "rhetinatsvats-gortsvatskner",
    title: "Ռետինացված գործվածքներ",
    family: "rhetine",
  },
  { slug: "ayl-rhetine-aprankner", title: "Այլ ռետինե ապրանքներ", family: "rhetine" },

  {
    slug: "paronitner",
    title: "Պարոնիտներ",
    family: "asbotexnikakan",
    short:
      "Կցաշուրթային միացումների խտացման թերթեր՝ ջերմային և ճնշման բեռնվածության պայմաններում։",
    benefit: "Կտրվում է ըստ չափսի",
  },
  { slug: "khtsowtsner", title: "Խծուծներ", family: "asbotexnikakan" },
  { slug: "asbostvaratowght", title: "Ասբոստվարաթուղթ", family: "asbotexnikakan" },
  { slug: "asbogortsvatsk", title: "Ասբոգործվածք", family: "asbotexnikakan" },
  { slug: "asboshnowr", title: "Ասբոշնուր", family: "asbotexnikakan" },
  { slug: "friktsion-aprankner", title: "Ֆրիկցիոն ապրանքներ", family: "asbotexnikakan" },

  {
    slug: "berhnapokhadrich-zhapavenner",
    title: "Բեռնափոխադրիչ ժապավեններ",
    family: "pokhantsum-hidravlika",
    short:
      "Կոնվեյերային գծերի ռետինե ժապավեններ՝ սորուն և կտորային բեռների տեղափոխման համար։",
    benefit: "Ըստ լայնության և շերտերի",
  },
  {
    slug: "pokhantsman-poker",
    title: "Փոխանցման փոկեր",
    family: "pokhantsum-hidravlika",
    short:
      "Սեպաձև և հարթ փոկեր՝ շարժիչից աշխատանքային հանգույցին ուժ փոխանցելու համար։",
    benefit: "Ստանդարտ պրոֆիլներ",
    /** The seven profiles the live site already publishes under this group. */
    variants: [
      "ՓՈԽԱՆՑՄԱՆ ՓՈԿ - Z(0)",
      "ՓՈԽԱՆՑՄԱՆ ՓՈԿ - A",
      "ՓՈԽԱՆՑՄԱՆ ՓՈԿ - B(Б)",
      "ՓՈԽԱՆՑՄԱՆ ՓՈԿ - C(В)",
      "ՓՈԽԱՆՑՄԱՆ ՓՈԿ - D(Г)",
      "ՓՈԽԱՆՑՄԱՆ ՓՈԿ - E(Д)",
      "ՓՈԽԱՆՑՄԱՆ ՓՈԿ - ԱՅԼ",
    ],
  },
  {
    slug: "bardzr-chnshman-khoghovakner",
    title: "Բարձր ճնշման խողովակներ",
    family: "pokhantsum-hidravlika",
  },
  {
    slug: "bardzr-chnshman-ktsamaser",
    title: "Բարձր ճնշման կցամասեր",
    family: "pokhantsum-hidravlika",
  },

  {
    slug: "dielektrik-aprankner",
    title: "Դիէլեկտրիկ ապրանքներ",
    family: "pashtpanich",
    short:
      "Էլեկտրատեխնիկական աշխատանքների մեկուսիչ միջոցներ՝ գորգեր, ձեռնոցներ, բոտեր։",
    benefit: "Աշխատանքի անվտանգություն",
  },
  { slug: "hakahrdehayin-aprankner", title: "Հակահրդեհային ապրանքներ", family: "pashtpanich" },
  { slug: "ayl-aprankner", title: "Այլ ապրանքներ", family: "pashtpanich" },
];

export const familyOrder: FamilySlug[] = [
  "metaghya",
  "rhetine",
  "asbotexnikakan",
  "pokhantsum-hidravlika",
  "pashtpanich",
];

/** The five directions with their products, in the order the design shows them. */
export const families = familyOrder.map((slug) => ({
  slug,
  label: familyLabels[slug],
  items: products.filter((p) => p.family === slug),
}));

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const relatedProducts = (product: Product, limit = 3) =>
  products.filter((p) => p.family === product.family && p.slug !== product.slug).slice(0, limit);

/** The six groups the design puts on the homepage. */
export const featuredSlugs = [
  "poghpatya-chopanalarer",
  "berhnapokhadrich-zhapavenner",
  "rhetine-khoghovakner",
  "paronitner",
  "pokhantsman-poker",
  "dielektrik-aprankner",
] as const;

export const featured = featuredSlugs.map((slug) => {
  const product = getProduct(slug);
  if (!product) throw new Error(`featured slug has no product: ${slug}`);
  return product;
});
