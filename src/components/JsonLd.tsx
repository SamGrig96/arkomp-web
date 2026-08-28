import { company, families, socials } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Structured data for the whole site: the supplier as a LocalBusiness (so the
 * address, phone and opening hours can surface in local results), the WebSite
 * node, and the product catalogue as an ItemList.
 *
 * Rendered from the root layout, so it ships inside the server HTML.
 */
export function JsonLd() {
  const sameAs = socials
    .map((s) => s.href)
    .filter((href): href is string => Boolean(href));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": absoluteUrl("/#organization"),
        name: company.legalName,
        alternateName: company.latinName,
        description: site.description,
        slogan: company.tagline,
        url: site.url,
        logo: absoluteUrl("/arkomp-logo.png"),
        image: absoluteUrl("/arkomp-logo.png"),
        telephone: company.phone,
        email: company.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          addressLocality: company.address.city,
          addressCountry: company.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: company.geo.lat,
          longitude: company.geo.lng,
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
        "@id": absoluteUrl("/#website"),
        url: site.url,
        name: company.legalName,
        description: site.description,
        inLanguage: site.locale,
        publisher: { "@id": absoluteUrl("/#organization") },
      },
      {
        "@type": "ItemList",
        "@id": absoluteUrl("/#catalog"),
        name: "Տեսականի",
        numberOfItems: families.reduce((n, f) => n + f.items.length, 0),
        itemListElement: families
          .flatMap((family) =>
            family.items.map((item) => ({ item, category: family.label })),
          )
          .map((entry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: entry.item,
            category: entry.category,
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
