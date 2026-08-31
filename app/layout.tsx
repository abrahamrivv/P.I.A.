import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:5173";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Implementación de IA para empresas en LATAM | Digitalizados";
  const description = "Agencia que implementa IA en tu empresa: identificamos dónde se pierde tiempo y dinero, y dejamos procesos funcionando y medidos. México y LATAM.";
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
