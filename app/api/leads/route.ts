import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return NextResponse.json({ error: "Google Sheets no está configurado" }, { status: 503 });

  const lead = await request.json();
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, fecha: new Date().toISOString() }),
    redirect: "follow",
  });
  if (!response.ok) return NextResponse.json({ error: "No se pudo guardar la solicitud" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
