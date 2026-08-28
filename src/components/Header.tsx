import Image from "next/image";
import Link from "next/link";
import { company, nav } from "@/lib/content";

/** `active` marks the current nav entry, e.g. "Տեսականի" on catalogue pages. */
export function Header({ active }: { active?: string } = {}) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" href="/" aria-label={`${company.name} — գլխավոր էջ`}>
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
        </Link>

        <nav className="site-nav" aria-label="Հիմնական">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.label === active ? "page" : undefined}
            >
              {item.label}
            </Link>
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
          <Link className="btn btn-primary btn-sm" href="/#contact">
            Հարցում ուղարկել
          </Link>
        </div>
      </div>
    </header>
  );
}
