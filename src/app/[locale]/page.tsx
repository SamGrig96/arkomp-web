import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageSlot } from "@/components/ImageSlot";
import { getCatalogFamilies, getCatalogFeatured } from "@/lib/api";
import { contact, getDictionary, socials } from "@/lib/content";
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
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: alternatesFor(locale),
  };
}

const partnerSlots = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const t = dict.home;
  const [featured, families] = await Promise.all([
    getCatalogFeatured(locale, dict),
    getCatalogFamilies(locale, dict),
  ]);
  const catalogHref = localePath(locale, "products");

  return (
    <>
      <Header locale={locale} dict={dict} />

      <main id="main">
        {/* Hero ─────────────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="hero__kicker">
                {dict.company.address.city} · {dict.company.address.street}
              </p>
              <h1>{dict.company.tagline}</h1>
              <p className="hero__lead">{t.heroLead}</p>
              <div className="hero__cta">
                <Link className="btn btn-primary" href={catalogHref}>
                  {t.heroCtaPrimary}
                </Link>
                <a className="btn btn-ghost-dark" href="#contact">
                  {t.heroCtaSecondary}
                </a>
              </div>
            </div>
            <div className="hero__media">
              <ImageSlot dark label={dict.imageSlots.hero} />
            </div>
          </div>

          <div className="hero__strip">
            <div className="container hero__strip-grid">
              {t.props4.map((p) => (
                <div className="hero__prop" key={p.n}>
                  <div className="hero__prop-n">{p.n}</div>
                  <div className="hero__prop-t">{p.t}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About ────────────────────────────────────────────────────────── */}
        <section className="about" id="about">
          <div className="container about__grid">
            <div className="about__media">
              <ImageSlot label={dict.imageSlots.about} />
            </div>
            <div>
              <p className="eyebrow">{t.aboutEyebrow}</p>
              <h2 className="section-title">{t.aboutTitle}</h2>
              {t.aboutParagraphs.map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
              <div className="facts">
                {t.facts.map((f) => (
                  <div className="facts__item" key={f.l}>
                    <div className="facts__v">{f.v}</div>
                    <div className="facts__l">{f.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products ─────────────────────────────────────────────────────── */}
        <section className="products" id="products">
          <div className="container">
            <div className="products__head">
              <div>
                <p className="eyebrow">{t.productsEyebrow}</p>
                <h2 className="section-title">{t.productsTitle}</h2>
              </div>
              <p className="products__intro">{t.productsIntro}</p>
            </div>

            <ul className="cards">
              {featured.map((p) => (
                <li className="card" key={p.slug}>
                  <Link
                    className="card__link"
                    href={localePath(locale, `products/${p.slug}`)}
                  >
                    <div className="card__media">
                      <ImageSlot
                        label={p.title}
                        src={p.images[0]?.url}
                        alt={p.images[0]?.alt}
                      />
                    </div>
                    <div className="card__body">
                      <p className="card__family">{p.familyLabel}</p>
                      <h3>{p.title}</h3>
                      <p className="card__desc">{p.short}</p>
                      <div className="card__foot">
                        <span className="card__benefit">{p.benefit}</span>
                        <span className="card__more">{dict.ui.more}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="catalog">
              <h3>{t.catalogTitle}</h3>
              <ul className="catalog__grid">
                {families.map((family) => (
                  <li key={family.slug}>
                    <h4 className="catalog__label">{family.label}</h4>
                    <ul className="catalog__items">
                      {family.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={localePath(locale, `products/${item.slug}`)}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <Link className="catalog__all" href={catalogHref}>
                {t.catalogAll}
              </Link>
            </div>
          </div>
        </section>

        {/* Why ──────────────────────────────────────────────────────────── */}
        <section className="why" id="why">
          <div className="container">
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2 className="section-title">{t.whyTitle}</h2>
            <ul className="why__grid">
              {t.why.map((w) => (
                <li className="why__item" key={w.n}>
                  <div className="why__n">{w.n}</div>
                  <h3>{w.t}</h3>
                  <p>{w.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Partners ─────────────────────────────────────────────────────── */}
        <section className="partners" id="partners">
          <div className="container">
            <div className="partners__head">
              <h2>{t.partnersTitle}</h2>
              <span className="pill-todo">{dict.ui.fillingIn}</span>
            </div>
            <p>{t.partnersNote}</p>
            <div className="partners__grid">
              {partnerSlots.map((n) => (
                <div className="partners__cell" key={n}>
                  {t.partnersLogo} {n}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact ──────────────────────────────────────────────────────── */}
        <section className="contact" id="contact">
          <div className="container">
            <div className="contact__grid">
              <div>
                <p className="eyebrow">{t.contactEyebrow}</p>
                <h2 className="section-title">{t.contactTitle}</h2>

                <dl className="contact__list">
                  {t.contactRows.map((row) => (
                    <div className="contact__row" key={row.k}>
                      <dt className="contact__k">{row.k}</dt>
                      <dd className="contact__v">
                        {row.v === contact.phone ? (
                          <a href={contact.phoneHref}>{row.v}</a>
                        ) : row.v === contact.email ? (
                          <a href={`mailto:${contact.email}`}>{row.v}</a>
                        ) : (
                          row.v
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="contact__socials">
                  {socials.map((s) =>
                    s.href ? (
                      <a
                        className="contact__social"
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.label}
                      </a>
                    ) : (
                      <span
                        className="contact__social contact__social--todo"
                        key={s.label}
                      >
                        {s.label}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="form-card">
                <h3>{dict.form.title}</h3>
                <p className="form-card__note">{dict.form.note}</p>
                <ContactForm
                  t={{
                    name: dict.form.name,
                    namePlaceholder: dict.form.namePlaceholder,
                    contact: dict.form.contact,
                    contactPlaceholder: dict.form.contactPlaceholder,
                    message: dict.form.message,
                    messagePlaceholder: dict.form.messagePlaceholder,
                    submit: dict.form.submit,
                    sending: dict.form.sending,
                    ok: dict.form.ok,
                    failed: dict.form.failed(contact.phone, contact.email),
                    network: dict.form.network(contact.phone, contact.email),
                  }}
                />
              </div>
            </div>

            <div className="locate">
              <div className="locate__panel">
                <p className="eyebrow">{t.locateEyebrow}</p>
                <p className="locate__address">
                  {dict.company.address.cityPrefix} {dict.company.address.city},
                  <br />
                  {dict.company.address.street}
                </p>
                <p className="locate__hours">{dict.company.hours}</p>
                <a
                  className="locate__cta"
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.locateCta}
                </a>
                <p className="locate__fineprint">{t.locateFineprint}</p>
              </div>
              <div className="locate__map">
                <iframe
                  title={t.mapTitle}
                  src={contact.mapEmbedUrl}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} dict={dict} />
    </>
  );
}
