import type { Metadata } from "next";
import { headers } from "next/headers";
import { Josefin_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Josefin_Sans({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display", display: "swap" });
const sans = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:5173";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Marketing con IA para PyMEs y startups | Digitalizados";
  const description = "Armamos y operamos con IA tu contenido, tus anuncios, la atención a clientes, el UGC y tu presencia web, y medimos qué te trae clientes. Diagnóstico gratis de 20 minutos.";
  return {
    title,
    description,
    icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
    openGraph: { title, description, type: "website", locale: "es_MX", images: [{ url: `${origin}/og.png`, width: 1731, height: 909, alt: "Digitalizados — AI-powered Marketing para PyMEs y startups" }] },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /></head><body>{children}</body></html>;
}
