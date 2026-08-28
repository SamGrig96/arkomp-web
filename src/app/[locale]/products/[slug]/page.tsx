import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageSlot } from "@/components/ImageSlot";
import { ProductCta } from "@/components/ProductCta";
import {
  contact,
  getDictionary,
  getProduct,
  getRelated,
  productSlugs,
} from "@/lib/content";
import { isLocale, localePath, locales } from "@/lib/i18n";
import { absoluteUrl, alternatesFor } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    productSlugs.map((slug) => ({ locale, slug })),
  );
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const product = getProduct(dict, slug);
  if (!product) return {};

  const description =
    product.lead ??
    product.short ??
    dict.product.fallbackDescription(
      product.title,
      product.familyLabel,
      contact.phone,
    );

  return {
    title: product.title,
    description,
    alternates: alternatesFor(locale, `products/${product.slug}`),
    openGraph: {
      title: `${product.title} | ${dict.company.legalName}`,
      description,
      url: localePath(locale, `products/${product.slug}`),
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const product = getProduct(dict, slug);
  if (!product) notFound();

  const related = getRelated(dict, product);
  const specs = product.specs ?? dict.defaultSpecs;
  const description =
    product.lead ??
    product.short ??
    dict.product.fallbackDescription(
      product.title,
      product.familyLabel,
      contact.phone,
    );
  const catalogLabel =
    dict.nav.find((item) => item.key === "products")?.label ?? "";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description,
    category: product.familyLabel,
    url: absoluteUrl(localePath(locale, `products/${product.slug}`)),
    brand: { "@type": "Brand", name: dict.company.latinName },
    ...(product.variants
      ? {
          hasVariant: product.variants.map((v) => ({
            "@type": "Product",
            name: v,
          })),
        }
      : {}),
  };

  return (
    <>
      <Header
        locale={locale}
        dict={dict}
        active="products"
        altPath={`products/${product.slug}`}
      />
      <Breadcrumbs
        ariaLabel={dict.ui.breadcrumbAria}
        trail={[
          { label: dict.ui.breadcrumbHome, href: localePath(locale) },
          { label: catalogLabel, href: localePath(locale, "products") },
          {
            label: product.familyLabel,
            href: `${localePath(locale, "products")}#${product.family}`,
          },
          { label: product.title },
        ]}
      />

      <main id="main">
        {/* Product hero ─────────────────────────────────────────────────── */}
        <section className="phero">
          <div className="container phero__grid">
            <div className="phero__gallery">
              <div className="phero__main">
                <ImageSlot label={dict.imageSlots.productMain} />
              </div>
              <div className="phero__thumbs">
                {[1, 2, 3].map((n) => (
                  <div className="phero__thumb" key={n}>
                    <ImageSlot label={dict.imageSlots.detail(n)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="phero__copy">
              <p className="eyebrow">{product.familyLabel}</p>
              <h1>{product.title}</h1>
              <p className="phero__lead">{description}</p>

              <div className="phero__cta">
                <a className="btn btn-primary" href="#pcta">
                  {dict.product.checkAvailability}
                </a>
                <a className="btn btn-outline" href={contact.phoneHref}>
                  {contact.phone}
                </a>
              </div>

              {product.overview ? (
                <dl className="overview">
                  {product.overview.map((row) => (
                    <div className="overview__row" key={row.t}>
                      <dt>{row.t}</dt>
                      <dd>{row.d}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="note">
                  {dict.product.noDescription[0]}{" "}
                  <span className="pill-todo">{dict.ui.fillingIn}</span>
                  {dict.product.noDescription[1]}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Variants the live site already publishes ─────────────────────── */}
        {product.variants ? (
          <section className="variants">
            <div className="container">
              <h2 className="section-title">{dict.product.variantsTitle}</h2>
              <ul className="variants__list">
                {product.variants.map((variant) => (
                  <li key={variant}>{variant}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Features ─────────────────────────────────────────────────────── */}
        {product.features ? (
          <section className="pfeatures">
            <div className="container">
              <h2 className="section-title">{dict.product.featuresTitle}</h2>
              <ul className="pfeatures__grid">
                {product.features.map((f) => (
                  <li className="pfeature" key={f.n}>
                    <div className="pfeature__n">{f.n}</div>
                    <h3>{f.t}</h3>
                    <p>{f.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Technical data ───────────────────────────────────────────────── */}
        <section className="pspecs">
          <div className="container pspecs__grid">
            <div>
              <h2 className="section-title">{dict.product.specsTitle}</h2>
              <p className="pspecs__note">{dict.product.specsNote}</p>
              <span className="pill-todo">{dict.ui.fillingIn}</span>
            </div>
            <table className="spec-table">
              <tbody>
                {specs.map((label) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{dict.product.specsEmpty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related ──────────────────────────────────────────────────────── */}
        {related.length > 0 ? (
          <section className="related">
            <div className="container">
              <h2 className="section-title">{dict.product.relatedTitle}</h2>
              <ul className="related__grid">
                {related.map((r) => (
                  <li className="related__card" key={r.slug}>
                    <Link href={localePath(locale, `products/${r.slug}`)}>
                      <div className="related__media">
                        <ImageSlot label={r.title} />
                      </div>
                      <div className="related__body">
                        <h3>{r.title}</h3>
                        <span aria-hidden="true">→</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <ProductCta locale={locale} dict={dict} />
      </main>

      <Footer locale={locale} dict={dict} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
