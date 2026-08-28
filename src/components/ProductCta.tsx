import Link from "next/link";
import { company } from "@/lib/content";

/** Closing call-to-action band that ends every product page. */
export function ProductCta({
  heading = "Ասեք չափսը և բեռնվածությունը՝ կառաջարկենք տարբերակը",
}: {
  heading?: string;
}) {
  return (
    <section className="pcta" id="pcta">
      <div className="container pcta__inner">
        <div>
          <h2>{heading}</h2>
          <p>
            {company.address.full} · {company.hours}
          </p>
        </div>
        <div className="pcta__actions">
          <a className="btn btn-primary" href={company.phoneHref}>
            {company.phone}
          </a>
          <Link className="btn btn-ghost-dark" href="/#contact">
            Գրել հարցում
          </Link>
        </div>
      </div>
    </section>
  );
}
