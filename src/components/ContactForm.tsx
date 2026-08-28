"use client";

import { useState } from "react";

import { company } from "@/lib/content";

type Status = { kind: "idle" | "sending" | "ok" | "err"; message?: string };

/**
 * Posts to /api/contact. That route forwards to CONTACT_WEBHOOK_URL when the
 * variable is set and otherwise answers 501 — so the form always reports the
 * truth instead of faking a success the company would never receive.
 */
export function ContactForm() {
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
        setStatus({
          kind: "ok",
          message: "Հարցումն ուղարկված է։ Կպատասխանենք աշխատանքային օրերին։",
        });
      } else {
        setStatus({
          kind: "err",
          message:
            body.error ??
            `Ուղարկել չհաջողվեց։ Զանգահարեք ${company.phone} կամ գրեք ${company.email}։`,
        });
      }
    } catch {
      setStatus({
        kind: "err",
        message:
          `Կապի սխալ։ Զանգահարեք ${company.phone} կամ գրեք ${company.email}։`,
      });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <label>
        <span>Անուն</span>
        <input name="name" type="text" placeholder="Ձեր անունը" required autoComplete="name" />
      </label>
      <label>
        <span>Հեռախոս կամ էլ․ փոստ</span>
        <input name="contact" type="text" placeholder="+374 …" required autoComplete="tel" />
      </label>
      <label>
        <span>Հաղորդագրություն</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Ի՞նչ ապրանք է հետաքրքրում, ի՞նչ չափսի"
          required
        />
      </label>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={status.kind === "sending"}
      >
        {status.kind === "sending" ? "Ուղարկվում է…" : "Ուղարկել հարցումը"}
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
