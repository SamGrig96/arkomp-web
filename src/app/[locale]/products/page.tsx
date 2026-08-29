import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageSlot } from "@/components/ImageSlot";
import { ProductCta } from "@/components/ProductCta";
import { getCatalogFamilies } from "@/lib/api";
import { getDictionary, productSlugs } from "@/lib/content";
import { isLocale, localePath, locales } from "@/lib/i18n";
import { alternatesFor } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.catalog.metaTitle,
    description: dict.catalog.metaDescription,
    alternates: alternatesFor(locale, "products"),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const families = await getCatalogFamilies(locale, dict);
  const catalogLabel =
    dict.nav.find((item) => item.key === "products")?.label ?? "";

  return (
    <>
      <Header locale={locale} dict={dict} active="products" altPath="products" />
      <Breadcrumbs
        ariaLabel={dict.ui.breadcrumbAria}
        trail={[
          { label: dict.ui.breadcrumbHome, href: localePath(locale) },
          { label: catalogLabel },
        ]}
      />

      <main id="main">
        <section className="catalog-hero">
          <div className="container">
            <p className="eyebrow">{dict.home.productsEyebrow}</p>
            <h1>{dict.catalog.title}</h1>
            <p className="catalog-hero__lead">{dict.catalog.lead}</p>
          </div>
        </section>

        {families.map((family) => (
          <section className="family" id={family.slug} key={family.slug}>
            <div className="container">
              <div className="family__head">
                <h2 className="section-title">{family.label}</h2>
                <span className="family__count">
                  {dict.catalog.groupsCount(family.items.length)}
                </span>
              </div>
              <ul className="cards">
                {family.items.map((product) => (
                  <li className="card" key={product.slug}>
                    <Link
                      className="card__link"
                      href={localePath(locale, `products/${product.slug}`)}
                    >
                      <div className="card__media">
                        <ImageSlot
                          label={product.title}
                          src={product.images[0]?.url}
                          alt={product.images[0]?.alt}
                        />
                      </div>
                      <div className="card__body">
                        <h3>{product.title}</h3>
                        {product.short ? (
                          <p className="card__desc">{product.short}</p>
                        ) : null}
                        <div className="card__foot">
                          <span className="card__benefit">
                            {product.benefit ?? dict.product.checkAvailability}
                          </span>
                          <span className="card__more">{dict.ui.more}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <ProductCta
          locale={locale}
          dict={dict}
          heading={dict.catalog.ctaHeading(productSlugs.length)}
        />
      </main>

      <Footer locale={locale} dict={dict} />
    </>
  );
}
