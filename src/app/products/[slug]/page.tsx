import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageSlot } from "@/components/ImageSlot";
import { ProductCta } from "@/components/ProductCta";
import {
  company,
  defaultSpecs,
  familyLabels,
  getProduct,
  products,
  relatedProducts,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

/** Factual fallback description for groups whose copy the company still owes us. */
const fallbackDescription = (title: string, family: string) =>
  `${title} — ԱՐԿՈՄՊ ՍՊԸ-ի տեսականու «${family}» ուղղության ապրանքախումբ։ Չափսերը և առկայությունը ճշտեք ${company.phone} հեռախոսով։`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const family = familyLabels[product.family];
  return {
    title: product.title,
    description: product.lead ?? product.short ?? fallbackDescription(product.title, family),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.title} | ${company.legalName}`,
      description:
        product.lead ?? product.short ?? fallbackDescription(product.title, family),
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const family = familyLabels[product.family];
  const related = relatedProducts(product);
  const specs = product.specs ?? defaultSpecs;
  const description =
    product.lead ?? product.short ?? fallbackDescription(product.title, family);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description,
    category: family,
    url: absoluteUrl(`/products/${product.slug}`),
    brand: { "@type": "Brand", name: company.latinName },
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
      <Header active="Տեսականի" />
      <Breadcrumbs
        trail={[
          { label: "Գլխավոր", href: "/" },
          { label: "Տեսականի", href: "/products" },
          { label: family, href: `/products#${product.family}` },
          { label: product.title },
        ]}
      />

      <main id="main">
        {/* Product hero ─────────────────────────────────────────────────── */}
        <section className="phero">
          <div className="container phero__grid">
            <div className="phero__gallery">
              <div className="phero__main">
                <ImageSlot label="Ապրանքի հիմնական լուսանկար" />
              </div>
              <div className="phero__thumbs">
                {["Դետալ 1", "Դետալ 2", "Դետալ 3"].map((label) => (
                  <div className="phero__thumb" key={label}>
                    <ImageSlot label={label} />
                  </div>
                ))}
              </div>
            </div>

            <div className="phero__copy">
              <p className="eyebrow">{family}</p>
              <h1>{product.title}</h1>
              <p className="phero__lead">{description}</p>

              <div className="phero__cta">
                <a className="btn btn-primary" href="#pcta">
                  Ճշտել առկայությունը
                </a>
                <a className="btn btn-outline" href={company.phoneHref}>
                  {company.phone}
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
                  Այս ապրանքախմբի մանրամասն նկարագրությունը{" "}
                  <span className="pill-todo">լրացվում է</span>։ Մինչ այդ՝
                  զանգահարեք, և կասենք ինչ չափսեր ու տեսակներ կան։
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Variants the live site already publishes ─────────────────────── */}
        {product.variants ? (
          <section className="variants">
            <div className="container">
              <h2 className="section-title">Առկա տեսակներ</h2>
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
              <h2 className="section-title">Առավելություններ</h2>
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
              <h2 className="section-title">Տեխնիկական տվյալներ</h2>
              <p className="pspecs__note">
                Աղյուսակի կառուցվածքը կրկնվում է բոլոր ապրանքային էջերում։
                Արժեքները լրացվում են ընկերության մատակարարման տվյալներից։
              </p>
              <span className="pill-todo">լրացվում է</span>
            </div>
            <table className="spec-table">
              <tbody>
                {specs.map((label) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>— — —</td>
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
              <h2 className="section-title">Հարակից ապրանքախմբեր</h2>
              <ul className="related__grid">
                {related.map((r) => (
                  <li className="related__card" key={r.slug}>
                    <Link href={`/products/${r.slug}`}>
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

        <ProductCta />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
