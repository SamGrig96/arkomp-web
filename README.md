# arkomp-web

ԱՐԿՈՄՊ ՍՊԸ-ի կայքը՝ Next.js 16 (App Router) + TypeScript։ Գլխավոր էջը
կառուցված է հաստատված դիզայնի հիման վրա (`design/figma/1 - Homepage.html`)՝
որպես server component-ներ, այսինքն ամբողջ բովանդակությունը HTML-ում է։

## Ինչու է սա SEO-friendly

- **Ամբողջովին ստատիկ HTML** — `/` էջը prerender է լինում build-ի ժամանակ
  (`○ Static`)։ Google-ը ստանում է ամբողջ տեքստը՝ առանց JavaScript-ի։
- **Metadata** — title/description/canonical/OpenGraph/Twitter՝
  [`src/app/layout.tsx`](src/app/layout.tsx), արժեքները՝ մեկ տեղից՝
  [`src/lib/site.ts`](src/lib/site.ts)։
- **JSON-LD** — `Organization` + `LocalBusiness` (հասցե, հեռախոս, կոորդինատներ,
  աշխատանքային ժամեր), `WebSite`, և ամբողջ տեսականին որպես `ItemList` (22
  ապրանք)՝ [`src/components/JsonLd.tsx`](src/components/JsonLd.tsx)։
- **`/sitemap.xml`** և **`/robots.txt`** — [`sitemap.ts`](src/app/sitemap.ts),
  [`robots.ts`](src/app/robots.ts)։
- **OG նկար** — գեներացվում է [`opengraph-image.tsx`](src/app/opengraph-image.tsx)-ով։
- **Ֆոնտերը** self-hosted են (`next/font`)՝ առանց Google Fonts-ի արտաքին
  հարցման, ինչը լավացնում է LCP-ն։
- **Սեմանտիկ կառուցվածք** — մեկ `h1`, բաժինների `h2`, `skip-link`,
  focus-visible ուրվագիծ։

## Սկսել

```bash
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Էջեր

| Route | Ինչ է |
| --- | --- |
| `/` | Գլխավոր՝ hero, Մեր մասին, Տեսականի, Ինչու մենք, Գործընկերներ, Կապ + քարտեզ |
| `/products` | Ամբողջ տեսականին՝ 5 ուղղություն, 22 ապրանքախումբ |
| `/products/[slug]` | Ապրանքախմբի էջ՝ 22 հատ, breadcrumb-ով |
| `/api/contact` | Հարցման ձևի endpoint |

Սլագերը նույնն են, ինչ arkomp.am-ում (`poghpatya-chopanalarer` և այլն), որպեսզի հին URL-երից 301 redirect անելը հեշտ լինի։

## Կառուցվածք

```
src/
  app/
    layout.tsx            metadata + ֆոնտեր + JSON-LD
    page.tsx              գլխավոր էջի բոլոր բաժինները
    globals.css           դիզայն-տոկեններ և բաղադրիչների ոճեր
    sitemap.ts robots.ts opengraph-image.tsx
    api/contact/route.ts  հարցման ձևի endpoint
  components/             Header, Footer, ContactForm, ImageSlot, JsonLd
  lib/
    content.ts            ԷՋԻ ԱՄԲՈՂՋ ՏԵՔՍՏԸ (arkomp.am-ից)
    site.ts               SEO արժեքներ
design/figma/             սկզբնական դիզայնի ֆայլերը (build-ի մեջ չեն մտնում)
```

Տեքստ փոխելու համար խմբագրիր `src/lib/content.ts`-ը, ոչ թե JSX-ը։

## Ինչ է դեռ բաց

- **Լուսանկարներ** — 8 `ImageSlot` կա (հերոս, «Մեր մասին», 6 ապրանքի քարտ)։
  Երբ նկարները լինեն, դիր `public/`-ում և փոխարինիր `next/image`-ով։
- **Գործընկերների լոգոները** — բլոկը պատրաստ է, ցանկը՝ ընկերությունից։
- **Սոցցանցերի հղումները** — `src/lib/content.ts` → `socials`։ Երբ լրացվեն,
  ավտոմատ մտնում են JSON-LD-ի `sameAs` դաշտը։
- **Հարցման ձևը** — `/api/contact`-ը փոխանցում է `CONTACT_WEBHOOK_URL`-ին։
  Առանց այդ փոփոխականի ձևը ազնվորեն սխալ է վերադարձնում և առաջարկում զանգել։
- **РУС տարբերակը** — header-ի փոխարկիչը դեռ դեկորատիվ է։
- **Ապրանքի էջը** դիզայնում կա (`design/figma/2 - Product page.html`), բայց
  դեռ իմպլեմենտացված չէ։

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
