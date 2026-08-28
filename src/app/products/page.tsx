import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageSlot } from "@/components/ImageSlot";
import { ProductCta } from "@/components/ProductCta";
import { families, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Տեսականի — 22 ապրանքախումբ հինգ ուղղությամբ",
  description:
    "ԱՐԿՈՄՊ ՍՊԸ-ի ամբողջ տեսականին՝ մետաղյա արտադրանք, ռետինե արտադրանք, ասբոտեխնիկական նյութեր, փոխանցում և հիդրավլիկա, պաշտպանիչ միջոցներ։ Ամեն ապրանքախումբ՝ առանձին էջով։",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <Header active="Տեսականի" />
      <Breadcrumbs
        trail={[{ label: "Գլխավոր", href: "/" }, { label: "Տեսականի" }]}
      />

      <main id="main">
        <section className="catalog-hero">
          <div className="container">
            <p className="eyebrow">Տեսականի</p>
            <h1>22 ապրանքախումբ՝ հինգ ուղղությամբ</h1>
            <p className="catalog-hero__lead">
              Տեսականին խմբավորված է ըստ արտադրանքի ուղղության, որպեսզի
              անհրաժեշտ նյութը գտնվի առանց ամբողջ ցանկը կարդալու։ Ամեն խումբ
              ունի առանձին էջ՝ նկարագրությամբ և տեխնիկական բնութագրերով։
            </p>
          </div>
        </section>

        {families.map((family) => (
          <section className="family" id={family.slug} key={family.slug}>
            <div className="container">
              <div className="family__head">
                <h2 className="section-title">{family.label}</h2>
                <span className="family__count">
                  {family.items.length} ապրանքախումբ
                </span>
              </div>
              <ul className="cards">
                {family.items.map((product) => (
                  <li className="card" key={product.slug}>
                    <Link
                      className="card__link"
                      href={`/products/${product.slug}`}
                    >
                      <div className="card__media">
                        <ImageSlot label={product.title} />
                      </div>
                      <div className="card__body">
                        <h3>{product.title}</h3>
                        {product.short ? (
                          <p className="card__desc">{product.short}</p>
                        ) : null}
                        <div className="card__foot">
                          <span className="card__benefit">
                            {product.benefit ?? "Ճշտել առկայությունը"}
                          </span>
                          <span className="card__more">Մանրամասն →</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <ProductCta heading={`${products.length} ապրանքախումբ մեկ հասցեով — ասեք ինչ է պետք`} />
      </main>

      <Footer />
    </>
  );
}
