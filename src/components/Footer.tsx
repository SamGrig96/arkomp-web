import Image from "next/image";
import Link from "next/link";
import { contact, getFamilies, socials, type Dictionary } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";
import { navHref } from "./Header";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const families = getFamilies(dict);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Image
              src="/arkomp-logo-white.png"
              alt={dict.company.latinName}
              width={335}
              height={111}
              style={{ height: 32, width: "auto" }}
            />
            <p className="site-footer__about">{dict.footer.about}</p>
          </div>

          <div>
            <h2 className="site-footer__label">{dict.footer.siteLabel}</h2>
            <ul className="site-footer__links">
              {dict.nav.map((item) => (
                <li key={item.key}>
                  <Link href={navHref(locale, item.key)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer__label">
              {dict.footer.directionsLabel}
            </h2>
            <ul className="site-footer__links">
              {families.map((family) => (
                <li key={family.slug}>
                  <Link href={`${localePath(locale, "products")}#${family.slug}`}>
                    {family.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer__label">{dict.footer.contactLabel}</h2>
            <ul className="site-footer__links">
              <li>{dict.company.address.full}</li>
              <li>
                <a className="site-footer__strong" href={contact.phoneHref}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  className="site-footer__strong"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </li>
              <li>{dict.company.hours}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bar">
          <div>{dict.footer.rights(new Date().getFullYear())}</div>
          <nav aria-label={dict.ui.socialsAria}>
            {socials.map((s) =>
              s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ) : (
                <span key={s.label}>{s.label}</span>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
