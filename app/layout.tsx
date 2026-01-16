import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OfertasRD - Comunidad de Ofertas",
  description: "Descubre y comparte las mejores ofertas de supermercados en República Dominicana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-slate-950 text-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
