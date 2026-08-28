import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb bar plus its BreadcrumbList JSON-LD, so the trail can show up in
 * search results instead of a bare URL.
 */
export function Breadcrumbs({
  trail,
  ariaLabel,
}: {
  trail: Crumb[];
  ariaLabel: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  };

  return (
    <div className="crumbs">
      <nav className="container crumbs__inner" aria-label={ariaLabel}>
        {trail.map((crumb, i) => (
          <span className="crumbs__item" key={crumb.label}>
            {crumb.href ? (
              <Link href={crumb.href}>{crumb.label}</Link>
            ) : (
              <span className="crumbs__current" aria-current="page">
                {crumb.label}
              </span>
            )}
            {i < trail.length - 1 ? (
              <span className="crumbs__sep" aria-hidden="true">
                /
              </span>
            ) : null}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
