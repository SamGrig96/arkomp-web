import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { contact, type Dictionary } from "@/lib/content";
import { localeLabels, localePath, locales, type Locale } from "@/lib/i18n";

export const navHref = (locale: Locale, key: string) =>
  key === "products"
    ? localePath(locale, "products")
    : `${localePath(locale)}#${key}`;

/**
 * `active` marks the current nav entry (e.g. the catalogue key on product
 * pages). `altPath` is the current page's path without the locale prefix, so
 * the language switcher stays on the same page.
 */
export function Header({
  locale,
  dict,
  active,
  altPath = "",
}: {
  locale: Locale;
  dict: Dictionary;
  active?: string;
  altPath?: string;
}) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link
          className="brand"
          href={localePath(locale)}
          aria-label={dict.ui.homeAria}
        >
          <Image
            className="brand__mark"
            src="/arkomp-logo.png"
            alt={dict.company.latinName}
            width={335}
            height={111}
            priority
          />
          <span className="brand__legal">
            {dict.company.name}
            <br />
            {dict.company.legalShort}
          </span>
        </Link>

        <nav className="site-nav" aria-label={dict.ui.navAria}>
          {dict.nav.map((item) => (
            <Link
              key={item.key}
              href={navHref(locale, item.key)}
              aria-current={item.key === active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang" aria-label={dict.ui.langAria}>
            {locales.map((code) =>
              code === locale ? (
                <span key={code} className="lang__active" aria-current="true">
                  {localeLabels[code]}
                </span>
              ) : (
                <Link
                  key={code}
                  href={localePath(code, altPath)}
                  hrefLang={code}
                >
                  {localeLabels[code]}
                </Link>
              ),
            )}
          </div>
          <a className="header-phone" href={contact.phoneHref}>
            {contact.phone}
          </a>
          <Link
            className="btn btn-primary btn-sm header-cta"
            href={`${localePath(locale)}#contact`}
          >
            {dict.ui.headerCta}
          </Link>
          <MobileMenu
            links={dict.nav.map((item) => ({
              href: navHref(locale, item.key),
              label: item.label,
            }))}
            phone={contact.phone}
            phoneHref={contact.phoneHref}
            cta={{
              href: `${localePath(locale)}#contact`,
              label: dict.ui.headerCta,
            }}
            navAria={dict.ui.navAria}
            openLabel={dict.ui.menuOpen}
            closeLabel={dict.ui.menuClose}
          />
        </div>
      </div>
    </header>
  );
}
