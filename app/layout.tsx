import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:5173";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Programa de IA para empresas | Digitalizados";
  const description = "Implementa dos procesos de IA en tu empresa con acompañamiento, medición y enfoque práctico para PyMEs de LATAM.";
  return {
    title,
    description,
    icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
    openGraph: { title, description, type: "website", images: [{ url: `${origin}/og.png`, width: 1792, height: 921, alt: "IA que sí llega a producción — Digitalizados" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><head><noscript><style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style></noscript></head><body>{children}</body></html>;
}
