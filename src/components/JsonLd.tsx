import { absoluteUrl, site } from "@/lib/site";

/**
 * Organization + WebSite structured data. Rendered once in the root layout so it
 * ships in the server HTML that crawlers read.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: site.name,
        url: site.url,
        logo: absoluteUrl(site.ogImage),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: site.locale,
        publisher: { "@id": absoluteUrl("/#organization") },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: absoluteUrl("/search?q={search_term_string}"),
          },
          "query-input": "required name=search_term_string",
        },
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
