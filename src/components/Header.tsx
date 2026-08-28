import Image from "next/image";
import { company, nav } from "@/lib/content";

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="#top" aria-label={`${company.name} — գլխավոր էջ`}>
          <Image
            className="brand__mark"
            src="/arkomp-logo.png"
            alt={company.latinName}
            width={335}
            height={111}
            priority
          />
          <span className="brand__legal">
            ԱՐԿՈՄՊ
            <br />
            ՍՊԸ
          </span>
        </a>

        <nav className="site-nav" aria-label="Հիմնական">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          {/* Language switcher is presentational until the RU locale exists. */}
          <div className="lang" aria-label="Լեզու">
            <span className="lang__active">ՀԱՅ</span>
            <span>РУС</span>
          </div>
          <a className="header-phone" href={company.phoneHref}>
            {company.phone}
          </a>
          <a className="btn btn-primary btn-sm" href="#contact">
            Հարցում ուղարկել
          </a>
        </div>
      </div>
    </header>
  );
}
