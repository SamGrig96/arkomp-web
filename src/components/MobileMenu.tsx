"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { company, nav } from "@/lib/content";

/**
 * The ☰ menu from the mobile design. Shown below 1200px, where the inline nav
 * does not fit — without it those viewports would have no navigation at all.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

  // Close when a link lands on a new route.
  useEffect(() => setOpen(false), [pathname]);

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
        aria-label={open ? "Փակել մենյուն" : "Բացել մենյուն"}
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
            <nav aria-label="Հիմնական">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a className="menu-panel__phone" href={company.phoneHref}>
              {company.phone}
            </a>
            <Link
              className="btn btn-primary"
              href="/#contact"
              onClick={() => setOpen(false)}
            >
              Հարցում ուղարկել
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
}
