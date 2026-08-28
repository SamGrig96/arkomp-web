import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Noto_Sans, Noto_Sans_Armenian } from "next/font/google";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/content";
import { isLocale, locales, localeTags, ogLocales } from "@/lib/i18n";
import { alternatesFor, siteUrl } from "@/lib/site";
import "../globals.css";

const notoArmenian = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto-armenian",
});

// Noto Sans Armenian has no Cyrillic glyphs, so Russian text would drop to a
// system font. Noto Sans covers Cyrillic and sits next to it in the stack —
// browsers resolve per glyph, and both faces are Noto, so they match.
const noto = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: dict.meta.titleTemplate },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: dict.company.legalName,
    alternates: alternatesFor(locale),
    openGraph: {
      type: "website",
      siteName: dict.company.legalName,
      title: dict.meta.title,
      description: dict.meta.description,
      url: alternatesFor(locale).canonical,
      locale: ogLocales[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: { icon: "/favicon.ico" },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1720",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${notoArmenian.variable} ${noto.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <JsonLd locale={locale} dict={dict} />
        <a className="skip-link" href="#main">
          {dict.ui.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
