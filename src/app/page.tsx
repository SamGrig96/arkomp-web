import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-neutral-500">
        {site.name}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        SEO-ready Next.js skeleton
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Դիզայնի HTML-ը դրեք <code className="rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">design/homepage.html</code>{" "}
        ֆայլում, և այս էջը կփոխարինվի դիզայնով՝ որպես սերվերում ռենդերվող
        բաղադրիչներ։
      </p>
      <ul className="list-disc space-y-1 pl-5 text-neutral-600 dark:text-neutral-400">
        <li>Server-rendered HTML — crawler-ը տեսնում է ամբողջ բովանդակությունը</li>
        <li>
          <a className="underline" href="/sitemap.xml">/sitemap.xml</a> և{" "}
          <a className="underline" href="/robots.txt">/robots.txt</a>
        </li>
        <li>Open Graph, Twitter card, canonical, JSON-LD</li>
      </ul>
    </main>
  );
}
