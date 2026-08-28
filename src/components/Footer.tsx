import Image from "next/image";
import { company, families, nav, socials } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <Image
              src="/arkomp-logo-white.png"
              alt={company.latinName}
              width={335}
              height={111}
              style={{ height: 32, width: "auto" }}
            />
            <p className="site-footer__about">
              ԱՐԿՈՄՊ ՍՊԸ — ռետինե, ասբոտեխնիկական և մետաղյա արտադրանքի
              մատակարար։ {company.tagline}։
            </p>
          </div>

          <div>
            <h2 className="site-footer__label">Կայք</h2>
            <ul className="site-footer__links">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer__label">Ուղղություններ</h2>
            <ul className="site-footer__links">
              {families.map((family) => (
                <li key={family.label}>
                  <a href="#products">{family.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer__label">Կոնտակտ</h2>
            <ul className="site-footer__links">
              <li>{company.address.full}</li>
              <li>
                <a className="site-footer__strong" href={company.phoneHref}>
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  className="site-footer__strong"
                  href={`mailto:${company.email}`}
                >
                  {company.email}
                </a>
              </li>
              <li>{company.hours}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bar">
          <div>
            © {new Date().getFullYear()} {company.legalName}։ Բոլոր
            իրավունքները պաշտպանված են։
          </div>
          <nav aria-label="Սոցիալական ցանցեր">
            {socials.map((s) =>
              s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ) : (
                <span key={s.label}>{s.label}</span>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
