"use client";

import { useState } from "react";

/**
 * Strings only: the dictionary holds formatting functions, which cannot be
 * passed from a server component to a client one.
 */
export type FormLabels = {
  name: string;
  namePlaceholder: string;
  contact: string;
  contactPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  ok: string;
  failed: string;
  network: string;
};

type Status = { kind: "idle" | "sending" | "ok" | "err"; message?: string };

/**
 * Posts to /api/contact. That route forwards to CONTACT_WEBHOOK_URL when the
 * variable is set and otherwise answers 501 — so the form always reports the
 * truth instead of faking a success the company would never receive.
 */
export function ContactForm({ t }: { t: FormLabels }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (res.ok) {
        form.reset();
        setStatus({ kind: "ok", message: t.ok });
      } else {
        setStatus({
          kind: "err",
          message: body.error ?? t.failed,
        });
      }
    } catch {
      setStatus({
        kind: "err",
        message: t.network,
      });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        <span>{t.name}</span>
        <input
          name="name"
          type="text"
          placeholder={t.namePlaceholder}
          required
          autoComplete="name"
        />
      </label>
      <label>
        <span>{t.contact}</span>
        <input
          name="contact"
          type="text"
          placeholder={t.contactPlaceholder}
          required
          autoComplete="tel"
        />
      </label>
      <label>
        <span>{t.message}</span>
        <textarea
          name="message"
          rows={4}
          placeholder={t.messagePlaceholder}
          required
        />
      </label>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={status.kind === "sending"}
      >
        {status.kind === "sending" ? t.sending : t.submit}
      </button>
      {status.message ? (
        <p
          className={`form__status form__status--${status.kind === "ok" ? "ok" : "err"}`}
          role="status"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
