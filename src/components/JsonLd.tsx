import {
  contact,
  getProducts,
  socials,
  type Dictionary,
} from "@/lib/content";
import { localePath, localeTags, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

/**
 * Structured data for the whole site: the supplier as a LocalBusiness (so the
 * address, phone and opening hours can surface in local results), the WebSite
 * node, and the product catalogue as an ItemList.
 *
 * Rendered from the locale layout, so it ships inside the server HTML and
 * describes the language the visitor is actually on.
 */
export function JsonLd({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const sameAs = socials
    .map((s) => s.href)
    .filter((href): href is string => Boolean(href));
  const home = absoluteUrl(localePath(locale));
  const products = getProducts(dict);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": absoluteUrl("/#organization"),
        name: dict.company.legalName,
        alternateName: dict.company.latinName,
        description: dict.meta.description,
        slogan: dict.company.tagline,
        url: home,
        logo: absoluteUrl("/arkomp-logo.png"),
        image: absoluteUrl("/arkomp-logo.png"),
        telephone: contact.phone,
        email: contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: dict.company.address.street,
          addressLocality: dict.company.address.city,
          addressCountry: "AM",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: contact.geo.lat,
          longitude: contact.geo.lng,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${home}#website`,
        url: home,
        name: dict.company.legalName,
        description: dict.meta.description,
        inLanguage: localeTags[locale],
        publisher: { "@id": absoluteUrl("/#organization") },
      },
      {
        "@type": "ItemList",
        "@id": `${home}#catalog`,
        name: dict.home.catalogTitle,
        numberOfItems: products.length,
        itemListElement: products.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: product.title,
          category: product.familyLabel,
          url: absoluteUrl(localePath(locale, `products/${product.slug}`)),
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
