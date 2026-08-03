import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const description = "Descubra o sistema de vinil adequado ao seu orçamento, espaço e maneira de ouvir música.";

  return {
    title: "Questionário | Setup de Vinil Inteligente",
    description,
    openGraph: { title: "Setup de Vinil Inteligente", description, images: [{ url: image, width: 1536, height: 1024 }] },
    twitter: { card: "summary_large_image", title: "Setup de Vinil Inteligente", description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
