"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

export type MenuLink = { href: string; label: string };

/**
 * The ☰ menu from the mobile design. Shown below 1200px, where the inline nav
 * does not fit — without it those viewports would have no navigation at all.
 *
 * Takes plain strings rather than the dictionary: the dictionary holds
 * formatting functions, which cannot cross the server/client boundary.
 */
export function MobileMenu({
  links,
  phone,
  phoneHref,
  cta,
  navAria,
  openLabel,
  closeLabel,
}: {
  links: MenuLink[];
  phone: string;
  phoneHref: string;
  cta: MenuLink;
  navAria: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>

      {open ? (
        <>
          <div
            className="menu-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="menu-panel" id={panelId}>
            <nav aria-label={navAria}>
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a className="menu-panel__phone" href={phoneHref}>
              {phone}
            </a>
            <Link
              className="btn btn-primary"
              href={cta.href}
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
}
