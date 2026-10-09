import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CosmicBackground } from "@/components/CosmicBackground";

export const metadata: Metadata = {
  title: "AstroConsu — Spiritualité, rêves et consultations",
  description: "Plateforme d'exploration spirituelle, symbolique et personnelle."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <CosmicBackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
