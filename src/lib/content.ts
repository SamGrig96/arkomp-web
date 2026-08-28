/**
 * Homepage copy, taken verbatim from the approved design
 * (design/figma/1 - Homepage.html). Every value here comes from arkomp.am —
 * nothing is invented. Where the company has not supplied data yet, the design
 * shows a «լրացվում է» marker instead of a made-up number.
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
  { href: "#about", label: "Մեր մասին" },
  { href: "#products", label: "Տեսականի" },
  { href: "#why", label: "Ինչու մենք" },
  { href: "#partners", label: "Գործընկերներ" },
  { href: "#contact", label: "Կապ" },
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

export const featured = [
  {
    slug: "polpatya-tchopanalarer",
    family: "Մետաղյա արտադրանք",
    title: "Պողպատյա ճոպանալարեր",
    desc: "Բեռնման, կապման և ամրակապման աշխատանքների համար նախատեսված պողպատե ճոպաններ։",
    benefit: "Ընտրություն ըստ բեռնվածության",
  },
  {
    slug: "bernapoxadrich-zhapavenner",
    family: "Փոխանցում և հիդրավլիկա",
    title: "Բեռնափոխադրիչ ժապավեններ",
    desc: "Կոնվեյերային գծերի ռետինե ժապավեններ՝ սորուն և կտորային բեռների տեղափոխման համար։",
    benefit: "Ըստ լայնության և շերտերի",
  },
  {
    slug: "retine-xoghovakner",
    family: "Ռետինե արտադրանք",
    title: "Ռետինե խողովակներ",
    desc: "Ջրի, օդի և տեխնիկական հեղուկների փոխանցման ճկափողեր։",
    benefit: "Տարբեր տրամագծեր",
  },
  {
    slug: "paronitner",
    family: "Ասբոտեխնիկական նյութեր",
    title: "Պարոնիտներ",
    desc: "Կցաշուրթային միացումների խտացման թերթեր՝ ջերմային և ճնշման բեռնվածության պայմաններում։",
    benefit: "Կտրվում է ըստ չափսի",
  },
  {
    slug: "poxancman-poker",
    family: "Փոխանցում և հիդրավլիկա",
    title: "Փոխանցման փոկեր",
    desc: "Սեպաձև և հարթ փոկեր՝ շարժիչից աշխատանքային հանգույցին ուժ փոխանցելու համար։",
    benefit: "Ստանդարտ պրոֆիլներ",
  },
  {
    slug: "dielektrik-aprankner",
    family: "Պաշտպանիչ միջոցներ",
    title: "Դիէլեկտրիկ ապրանքներ",
    desc: "Էլեկտրատեխնիկական աշխատանքների մեկուսիչ միջոցներ՝ գորգեր, ձեռնոցներ, բոտեր։",
    benefit: "Աշխատանքի անվտանգություն",
  },
] as const;

export const families = [
  {
    label: "Մետաղյա արտադրանք",
    items: [
      "Պողպատյա ճոպանալարեր",
      "Առասաններ և դետալներ",
      "Մետաղյա ցանցեր",
      "Գլանակներ, կցամասեր",
    ],
  },
  {
    label: "Ռետինե արտադրանք",
    items: [
      "Ռետինե խողովակներ",
      "Ռետինե թերթեր",
      "Ռետինե լարեր",
      "Ռետինացված գործվածքներ",
      "Այլ ռետինե ապրանքներ",
    ],
  },
  {
    label: "Ասբոտեխնիկական նյութեր",
    items: [
      "Պարոնիտներ",
      "Խծուծներ",
      "Ասբոստվարաթուղթ",
      "Ասբոգործվածք",
      "Ասբոշնուր",
      "Ֆրիկցիոն ապրանքներ",
    ],
  },
  {
    label: "Փոխանցում և հիդրավլիկա",
    items: [
      "Բեռնափոխադրիչ ժապավեններ",
      "Փոխանցման փոկեր",
      "Բարձր ճնշման խողովակներ",
      "Բարձր ճնշման կցամասեր",
    ],
  },
  {
    label: "Պաշտպանիչ միջոցներ",
    items: ["Դիէլեկտրիկ ապրանքներ", "Հակահրդեհային ապրանքներ", "Այլ ապրանքներ"],
  },
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
 * Social profiles. The current site links to the networks' front pages rather
 * than company profiles (audit item 06) — fill these in with the real URLs and
 * they will also be picked up by the Organization JSON-LD as sameAs.
 */
export const socials: { label: string; href: string | null }[] = [
  { label: "Facebook", href: null },
  { label: "Instagram", href: null },
  { label: "Pinterest", href: null },
];
