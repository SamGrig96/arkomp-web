import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/content";
import { isLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

// Auto-wired by Next into og:image / twitter:image for every route under this
// segment. Replace with real brand art once it exists.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "hy");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: 80,
          background: "#0f1720",
          color: "#fafafa",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#8894a1" }}>
          {siteUrl.replace(/^https?:\/\//, "").toUpperCase()}
        </div>
        {/* Latin only: ImageResponse ships no Armenian or Cyrillic font. */}
        <div>{dict.company.latinName}</div>
      </div>
    ),
    size,
  );
}
