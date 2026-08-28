import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ImageSlot } from "@/components/ImageSlot";
import {
  aboutParagraphs,
  company,
  contacts,
  facts,
  families,
  featured,
  heroLead,
  props4,
  socials,
  why,
} from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
};

const partnerSlots = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

export default function HomePage() {
  return (
    <>
      <span id="top" />
      <Header />

      <main id="main">
        {/* Hero ─────────────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="hero__kicker">
                {company.address.city} · {company.address.street}
              </p>
              <h1>
                Ամեն ինչ ձեր
                <br />
                արտադրության համար
              </h1>
              <p className="hero__lead">{heroLead}</p>
              <div className="hero__cta">
                <a className="btn btn-primary" href="#products">
                  Դիտել տեսականին
                </a>
                <a className="btn btn-ghost-dark" href="#contact">
                  Ստանալ խորհրդատվություն
                </a>
              </div>
            </div>
            <div className="hero__media">
              <ImageSlot dark label="Հերոս-լուսանկար՝ պահեստ / արտադրանք" />
            </div>
          </div>

          <div className="hero__strip">
            <div className="container hero__strip-grid">
              {props4.map((p) => (
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
              <ImageSlot label="Ընկերության / պահեստի լուսանկար" />
            </div>
            <div>
              <p className="eyebrow">Մեր մասին</p>
              <h2 className="section-title">
                Մեկ մատակարար՝ արտադրական հանգույցի ամբողջ սպառվող մասի համար
              </h2>
              {aboutParagraphs.map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
              <div className="facts">
                {facts.map((f) => (
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
                <p className="eyebrow">Տեսականի</p>
                <h2 className="section-title">22 ապրանքախումբ՝ հինգ ուղղությամբ</h2>
              </div>
              <p className="products__intro">
                Ամեն խումբ ունի առանձին տեղեկատվական էջ՝ նկարագրությամբ,
                կիրառության ոլորտներով և տեխնիկական բնութագրերով։
              </p>
            </div>

            <ul className="cards">
              {featured.map((p) => (
                <li className="card" key={p.slug}>
                  <div className="card__media">
                    <ImageSlot label={p.title} />
                  </div>
                  <div className="card__body">
                    <p className="card__family">{p.family}</p>
                    <h3>{p.title}</h3>
                    <p className="card__desc">{p.desc}</p>
                    <div className="card__foot">
                      <span className="card__benefit">{p.benefit}</span>
                      <span className="card__more">Մանրամասն →</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="catalog">
              <h3>Ամբողջ տեսականին</h3>
              <ul className="catalog__grid">
                {families.map((family) => (
                  <li key={family.label}>
                    <h4 className="catalog__label">{family.label}</h4>
                    <ul className="catalog__items">
                      {family.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why ──────────────────────────────────────────────────────────── */}
        <section className="why" id="why">
          <div className="container">
            <p className="eyebrow">Ինչու ԱՐԿՈՄՊ</p>
            <h2 className="section-title">
              Չորս խոստում, որ ընկերությունն արդեն տալիս է
            </h2>
            <ul className="why__grid">
              {why.map((w) => (
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
              <h2>Գործընկերներ և մատակարարներ</h2>
              <span className="pill-todo">լրացվում է</span>
            </div>
            <p>
              Ընթացիկ կայքի «Գործընկերներ» էջում իրական անուններ նշված չեն։
              Բլոկը պատրաստ է՝ ընկերությունը տրամադրում է լոգոները և ցանկը։
            </p>
            <div className="partners__grid">
              {partnerSlots.map((n) => (
                <div className="partners__cell" key={n}>
                  ԼՈԳՈ {n}
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
                <p className="eyebrow">Կապ</p>
                <h2 className="section-title">Ասեք՝ ինչ հանգույց է խափանվել</h2>

                <dl className="contact__list">
                  {contacts.map((c) => (
                    <div className="contact__row" key={c.k}>
                      <dt className="contact__k">{c.k}</dt>
                      <dd className="contact__v">
                        {c.k === "Հեռախոս" ? (
                          <a href={company.phoneHref}>{c.v}</a>
                        ) : c.k === "Էլ․ փոստ" ? (
                          <a href={`mailto:${company.email}`}>{c.v}</a>
                        ) : (
                          c.v
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
                        title="Էջի հղումը լրացվում է"
                      >
                        {s.label}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="form-card">
                <h3>Հարցում</h3>
                <p className="form-card__note">
                  Պատասխանում ենք աշխատանքային օրերին։
                </p>
                <ContactForm />
              </div>
            </div>

            <div className="locate">
              <div className="locate__panel">
                <p className="eyebrow">Գտնվելու վայրը</p>
                <p className="locate__address">
                  ք․ {company.address.city},
                  <br />
                  {company.address.street}
                </p>
                <p className="locate__hours">{company.hours}</p>
                <a
                  className="locate__cta"
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ինչպես հասնել →
                </a>
                <p className="locate__fineprint">
                  Քարտեզի կետը դրված է հասցեի մոտավոր կոորդինատներով։ Ճշգրիտ
                  կոորդինատները ամրագրվում են մշակման փուլում։
                </p>
              </div>
              <div className="locate__map">
                <iframe
                  title={`${company.legalName} — քարտեզ`}
                  src={company.mapEmbedUrl}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
