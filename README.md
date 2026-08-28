# buy-am-landing

SEO-ի համար պատրաստ Next.js 16 (App Router) պրոյեկտ՝ դիզայնը սերվերում
ռենդերվող էջերի վերածելու համար։

## Ինչու է սա SEO-friendly

- **Server-rendered HTML** — էջերը prerender են լինում build-ի ժամանակ
  (`○ Static`), այսինքն Google-ը ստանում է ամբողջական HTML՝ առանց JS-ի։
- **Metadata API** — `title`/`description`/canonical/OpenGraph/Twitter՝
  [`src/app/layout.tsx`](src/app/layout.tsx)-ում, արժեքները՝ մեկ տեղից՝
  [`src/lib/site.ts`](src/lib/site.ts)։
- **`/sitemap.xml`** — [`src/app/sitemap.ts`](src/app/sitemap.ts)
- **`/robots.txt`** — [`src/app/robots.ts`](src/app/robots.ts)
- **JSON-LD** (Organization + WebSite + SearchAction) —
  [`src/components/JsonLd.tsx`](src/components/JsonLd.tsx)
- **OG նկար** ավտոմատ գեներացվում է՝ [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx)

## Սկսել

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # production server
```

## Կարգավորումներ

Բոլոր SEO արժեքները՝ `src/lib/site.ts` (անուն, title, description, keywords,
locale)։ Դոմենը՝ `NEXT_PUBLIC_SITE_URL` env փոփոխականով — այն օգտագործվում է
canonical URL-երի, og:image-ի, sitemap-ի և robots-ի համար, ուստի **պարտադիր է
սահմանել hosting-ի վրա**։ Առանց դրա canonical-ները կմնան localhost։

## Հոստինգ

### Vercel (ամենապարզը)
1. `git push` GitHub/GitLab-ի վրա։
2. Vercel → New Project → ընտրել ռեպոն։
3. Environment Variables → `NEXT_PUBLIC_SITE_URL=https://<domain>`։
4. Deploy → դոմեն կցել։

### Docker (ցանկացած VPS)
`output: "standalone"`-ի շնորհիվ image-ը փոքր է և չի պահանջում `node_modules`։

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://example.com -t buy-am-landing .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://example.com buy-am-landing
```

Nginx-ի հետևում՝ proxy_pass դեպի `http://127.0.0.1:3000`։

### Ստատիկ hosting
Եթե ամբողջ կայքը մնա ստատիկ, `next.config.ts`-ում կարելի է դնել
`output: "export"` և deploy անել ցանկացած ստատիկ hosting-ի (Netlify, S3, nginx)։
Այդ դեպքում `next/image`-ի optimization-ը պետք է անջատել։

## Deploy-ից հետո

- Google Search Console → ավելացնել domain, ուղարկել `/sitemap.xml`։
- Ստուգել [Rich Results Test](https://search.google.com/test/rich-results)-ով JSON-LD-ն։
- Ստուգել `curl -s https://<domain> | grep '<h1'` — բովանդակությունը պետք է լինի HTML-ում։

## Դիզայն

Դիզայնի սկզբնական ֆայլերը՝ [`design/`](design) ֆոլդերում (build-ի մեջ չեն մտնում)։
