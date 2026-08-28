import { NextResponse } from "next/server";

/**
 * Contact-form endpoint.
 *
 * There is no mail provider wired up yet, so this route forwards the enquiry to
 * whatever CONTACT_WEBHOOK_URL points at (a Google Apps Script, a Make/Zapier
 * hook, a CRM endpoint — anything that accepts JSON). Without that variable it
 * answers 501 rather than pretending the message was delivered.
 */

const MAX = { name: 120, contact: 160, message: 4000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Սխալ հարցում։" }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const name = clean(body.name, MAX.name);
  const contact = clean(body.contact, MAX.contact);
  const message = clean(body.message, MAX.message);

  if (!name || !contact || !message) {
    return NextResponse.json(
      { error: "Լրացրեք բոլոր դաշտերը։" },
      { status: 422 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[contact] CONTACT_WEBHOOK_URL is not set — enquiry dropped.");
    return NextResponse.json(
      {
        error:
          "Ձևի ուղարկումը դեռ միացված չէ։ Զանգահարեք +374 91 40 58 62 կամ գրեք arkomp.am@gmail.com։",
      },
      { status: 501 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        contact,
        message,
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (error) {
    console.error("[contact] forwarding failed:", error);
    return NextResponse.json(
      { error: "Ուղարկել չհաջողվեց։ Փորձեք կրկին կամ զանգահարեք։" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
