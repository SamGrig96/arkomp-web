export const locales = ["hy", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "hy";

/** Label shown in the header switcher. */
export const localeLabels: Record<Locale, string> = {
  hy: "ՀԱՅ",
  ru: "РУС",
};

/** BCP-47 tags for <html lang>, og:locale and hreflang. */
export const localeTags: Record<Locale, string> = {
  hy: "hy-AM",
  ru: "ru-RU",
};

export const ogLocales: Record<Locale, string> = {
  hy: "hy_AM",
  ru: "ru_RU",
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Both locales are prefixed, matching arkomp.am's own /hy and /ru URLs. */
export const localePath = (locale: Locale, path = "") => {
  const rest = path.replace(/^\//, "");
  return rest ? `/${locale}/${rest}` : `/${locale}`;
};

export const otherLocale = (locale: Locale): Locale =>
  locale === "hy" ? "ru" : "hy";
