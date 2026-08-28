import Link from "next/link";
import { contact, type Dictionary } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

/** Closing call-to-action band that ends every catalogue and product page. */
export function ProductCta({
  locale,
  dict,
  heading,
}: {
  locale: Locale;
  dict: Dictionary;
  heading?: string;
}) {
  return (
    <section className="pcta" id="pcta">
      <div className="container pcta__inner">
        <div>
          <h2>{heading ?? dict.product.ctaHeading}</h2>
          <p>
            {dict.company.address.full} · {dict.company.hours}
          </p>
        </div>
        <div className="pcta__actions">
          <a className="btn btn-primary" href={contact.phoneHref}>
            {contact.phone}
          </a>
          <Link
            className="btn btn-ghost-dark"
            href={`${localePath(locale)}#contact`}
          >
            {dict.product.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
