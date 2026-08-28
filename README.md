# arkomp-web

ԱՐԿՈՄՊ ՍՊԸ-ի կայքը՝ Next.js 16 (App Router) + TypeScript։ Գլխավոր էջը
կառուցված է հաստատված դիզայնի հիման վրա (`design/figma/1 - Homepage.html`)՝
որպես server component-ներ, այսինքն ամբողջ բովանդակությունը HTML-ում է։

## Ինչու է սա SEO-friendly

- **Ամբողջովին ստատիկ HTML** — բոլոր 48 էջերը prerender են լինում build-ի
  ժամանակ (`○ Static` / `● SSG`)։ Google-ը ստանում է ամբողջ տեքստը՝ առանց JavaScript-ի։
- **Metadata** — title/description/canonical/OpenGraph/Twitter՝
  [`src/app/layout.tsx`](src/app/layout.tsx), արժեքները՝ մեկ տեղից՝
  [`src/lib/site.ts`](src/lib/site.ts)։
- **JSON-LD** — `Organization` + `LocalBusiness` (հասցե, հեռախոս, կոորդինատներ,
  աշխատանքային ժամեր), `WebSite`, և ամբողջ տեսականին որպես `ItemList` (22
  ապրանք)՝ [`src/components/JsonLd.tsx`](src/components/JsonLd.tsx)։ Ապրանքի
  էջերում՝ `Product` և `BreadcrumbList`։
- **`/sitemap.xml`** և **`/robots.txt`** — [`sitemap.ts`](src/app/sitemap.ts),
  [`robots.ts`](src/app/robots.ts)։
- **OG նկար** — գեներացվում է [`opengraph-image.tsx`](src/app/opengraph-image.tsx)-ով։
- **Ֆոնտերը** self-hosted են (`next/font`)՝ առանց Google Fonts-ի արտաքին
  հարցման, ինչը լավացնում է LCP-ն։
- **Սեմանտիկ կառուցվածք** — մեկ `h1`, բաժինների `h2`, `skip-link`,
  focus-visible ուրվագիծ։

## Սկսել

### Նախապայմաններ

- **Node.js ≥ 20.9** (Next 16-ի պահանջը)։ Մշակումը և Docker image-ը գնում են
  Node 22-ի վրա — խորհուրդ ենք տալիս նույնը։
- **npm** (գալիս է Node-ի հետ)։ Lock ֆայլը `package-lock.json` է, ուստի
  yarn/pnpm-ի փոխարեն օգտագործիր npm։

### Տեղադրում

```bash
git clone https://github.com/SamGrig96/arkomp-web.git
cd arkomp-web
npm ci
```

`npm ci`-ն տեղադրում է ճիշտ այն վերսիաները, որոնք lock ֆայլում են։ Եթե
դիտավորյալ նոր փաթեթ ես ավելացնում, այդ դեպքում՝ `npm install`։

### Միջավայրի փոփոխականներ

```bash
cp .env.example .env.local
```

PowerShell-ում՝ `Copy-Item .env.example .env.local`։

Հետո բացիր `.env.local`-ը և լրացրու։ Լոկալ մշակման համար բավական է․

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`.env.local`-ը git-ում չի պահվում (`.gitignore`)։ Բոլոր փոփոխականների
նկարագրությունը՝ [Կարգավորումներ](#կարգավորումներ) բաժնում։

### Գործարկում

```bash
npm run dev
```

Բացիր http://localhost:3000 — կվերահղվի `/hy`։ Ֆայլերը պահելիս էջը
ինքնաբերաբար թարմացվում է։

### Հրամաններ

| Հրաման | Ինչ է անում |
| --- | --- |
| `npm run dev` | Dev սերվեր՝ http://localhost:3000, hot reload-ով |
| `npm run build` | Production build — բոլոր 48 էջը prerender է լինում |
| `npm start` | Գործարկում է build-ը (նախ պետք է `npm run build`) |
| `npm run lint` | ESLint (`eslint-config-next`) |

Փոփոխություն push անելուց առաջ գործարկիր `npm run build`-ը՝ բովանդակության
տիպերի սխալները (օր․՝ չլրացված ռուսերեն տող) դուրս են գալիս հենց build-ի ժամանակ։

## Էջեր

Կայքը երկլեզու է՝ **հայերեն (`/hy`)** և **ռուսերեն (`/ru`)**։ `/`-ը
վերահղվում է `/hy`։ Երկու լեզուն էլ prefix ունեն՝ ինչպես arkomp.am-ի
`/hy` և `/ru` URL-երը։

| Route | Ինչ է |
| --- | --- |
| `/[locale]` | Գլխավոր՝ hero, Մեր մասին, Տեսականի, Ինչու մենք, Գործընկերներ, Կապ + քարտեզ |
| `/[locale]/products` | Ամբողջ տեսականին՝ 5 ուղղություն, 22 ապրանքախումբ |
| `/[locale]/products/[slug]` | Ապրանքախմբի էջ՝ 22 հատ, breadcrumb-ով |
| `/api/contact` | Հարցման ձևի endpoint (լեզվից անկախ) |

Ընդամենը 48 էջ, բոլորն էլ ստատիկ prerender։ Սլագերը նույնն են երկու լեզվում
և համընկնում են arkomp.am-ի հետ (`poghpatya-chopanalarer` և այլն), որպեսզի
հին URL-երից 301 redirect անելը հեշտ լինի։

## Լեզուներ

Ամբողջ տեքստը բառարաններում է․

- [`src/lib/content/hy.ts`](src/lib/content/hy.ts) — հայերեն
- [`src/lib/content/ru.ts`](src/lib/content/ru.ts) — ռուսերեն
- [`src/lib/content/shared.ts`](src/lib/content/shared.ts) — լեզվից անկախը՝
  հեռախոս, էլ․ փոստ, կոորդինատներ, 22 սլագ և դրանց ուղղությունը
- [`src/lib/content/types.ts`](src/lib/content/types.ts) — բառարանի տիպը

Տիպը երաշխավորում է, որ նոր տող ավելացնելիս երկու լեզուն էլ պիտի լրացվեն —
այլապես build-ը չի անցնի։ Երրորդ լեզու ավելացնելու համար՝ նոր ֆայլ,
`locales` զանգվածին ավելացում [`src/lib/i18n.ts`](src/lib/i18n.ts)-ում, և
`getDictionary`-ի քարտեզում գրանցում։

Ամեն էջ ունի `hreflang` (hy-AM, ru-RU, x-default→hy), իր canonical-ը,
և թարգմանված JSON-LD։ Header-ի ՀԱՅ/РУС փոխարկիչը մնում է նույն էջում։

Ֆոնտերը՝ Noto Sans Armenian (հայերեն) + Noto Sans (կիրիլիցա)՝ մեկ stack-ում,
բրաուզերը գլիֆ առ գլիֆ ընտրում է ճիշտը։

## Կառուցվածք

```
src/
  app/
    layout.tsx            pass-through (html-ը [locale]-ի մեջ է)
    [locale]/layout.tsx   html lang, metadata, ֆոնտեր, JSON-LD
    [locale]/page.tsx     գլխավոր էջի բոլոր բաժինները
    [locale]/products/    տեսականի + ապրանքախմբի էջեր (SSG)
    globals.css           դիզայն-տոկեններ և ընդհանուր ոճեր
    catalog.css           տեսականու և ապրանքի էջերի ոճեր
    sitemap.ts robots.ts opengraph-image.tsx
    api/contact/route.ts  հարցման ձևի endpoint
  components/             Header, Footer, Breadcrumbs, ProductCta,
                          ContactForm, ImageSlot, JsonLd
  lib/
    content/              hy.ts, ru.ts, shared.ts, types.ts
    i18n.ts               locale-ներ և ուղիներ
    site.ts               դոմեն, canonical, hreflang
design/figma/             սկզբնական դիզայնի ֆայլերը (build-ի մեջ չեն մտնում)
```

Տեքստ փոխելու համար խմբագրիր `src/lib/content/hy.ts`-ը և `ru.ts`-ը, ոչ թե JSX-ը։

## Ինչ է դեռ բաց

- **Լուսանկարներ** — 8 `ImageSlot` կա (հերոս, «Մեր մասին», 6 ապրանքի քարտ)։
  Երբ նկարները լինեն, դիր `public/`-ում և փոխարինիր `next/image`-ով։
- **Գործընկերների լոգոները** — բլոկը պատրաստ է, ցանկը՝ ընկերությունից։
- **Սոցցանցերի հղումները** — `src/lib/content.ts` → `socials`։ Երբ լրացվեն,
  ավտոմատ մտնում են JSON-LD-ի `sameAs` դաշտը։
- **Հարցման ձևը** — `/api/contact`-ը փոխանցում է `CONTACT_WEBHOOK_URL`-ին։
  Առանց այդ փոփոխականի ձևը ազնվորեն սխալ է վերադարձնում և առաջարկում զանգել։
- **21 ապրանքախմբի տեքստը** — դիզայնը լրիվ բովանդակություն տալիս է միայն
  «Պողպատյա ճոպանալարեր»-ի համար։ Մնացածի էջերը կան, բայց նկարագրության և
  բնութագրերի փոխարեն «լրացվում է» նշիչն է։ Տեքստը ավելացվում է
  `src/lib/content.ts` → `products` զանգվածում (`lead`, `overview`,
  `features`, `specs`)։

## Կարգավորումներ

| Փոփոխական | Ինչի համար |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Դոմենը՝ canonical, og:image, sitemap, robots։ **Պարտադիր** hosting-ի վրա։ |
| `CONTACT_WEBHOOK_URL` | Ուր ուղարկվեն հարցումները (Apps Script / Make / CRM)։ |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console-ի հաստատման կոդը։ |

## Հոստինգ

### Vercel
1. `git push` GitHub-ի վրա։
2. Vercel → New Project → ընտրել ռեպոն։
3. Environment Variables → `NEXT_PUBLIC_SITE_URL=https://arkomp.am`։
4. Deploy → դոմեն կցել։

### Docker (ցանկացած VPS)
`output: "standalone"`-ի շնորհիվ image-ը փոքր է։

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://arkomp.am -t arkomp-web .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://arkomp.am arkomp-web
```

Nginx-ի հետևում՝ `proxy_pass http://127.0.0.1:3000;`։

## Deploy-ից հետո

- Google Search Console → ավելացնել դոմենը, ուղարկել `/sitemap.xml`։
- [Rich Results Test](https://search.google.com/test/rich-results)-ով ստուգել JSON-LD-ն։
- `curl -s https://arkomp.am | grep '<h1'` — բովանդակությունը պետք է լինի HTML-ում։
- Google Business Profile-ը կապել նույն հասցեի և հեռախոսի հետ (NAP consistency)։

## Ինչ է ստուգվել arkomp.am-ում

Բովանդակությունը վերցված է ուղիղ կայքից 2026-08-28-ին։ Ստուգված է նաև, թե ինչ
**չկա** այնտեղ, որպեսզի ոչինչ չհորինվի․

- **Ծառայությունների բաժին չկա** — կայքի նավիգացիան է Գլխավոր / Տեսականի /
  Մեր մասին / Գործընկերներ / Կապ։ Դրա համար «Services» բաժին չի ավելացվել։
- **Ծրագրեր / հաճախորդներ / փորձի տարիներ չկան** — այդ բաժինը նույնպես բաց է։
- **«Մեր մասին»-ը ձևանմուշի տեքստ է** («Welcome to ARKOMP!», «Lorem Ipsum»,
  «12.000+ Active users»)։ Այդ թվերը չեն տեղափոխվել։
- **«Գործընկերներ»-ը** «Double click to change this paragraph text…» է՝ առանց
  իրական անունների։
- **22 ապրանքախմբի էջերը դատարկ են** — միայն անուն և breadcrumb։ Միակ իրական
  տեխնիկական տվյալը՝ «Փոխանցման փոկեր» խմբի 7 պրոֆիլն է (Z(0), A, B(Б), C(В),
  D(Г), E(Д), ԱՅԼ), որոնք բերված են էջում որպես «Առկա տեսակներ»։
- **Սոցցանցերի հղումները** տանում են Facebook/Instagram/Pinterest-ի գլխավոր
  էջեր, ոչ թե ընկերության պրոֆիլ։

Ուստի ապրանքի էջերում, որտեղ իրական տեքստ չկա, դրված է «լրացվում է» նշիչը՝
դիզայնի պես, և ոչ թե հորինված նկարագրություն։
