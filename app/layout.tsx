import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CosmicBackground } from "@/components/CosmicBackground";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://astroconsu.com"),
  title: {
    default: "AstroConsu — Observatoire des symboles et des cycles",
    template: "%s | AstroConsu",
  },
  description: "Explorez les rêves, le tarot, l’astrologie et les symboles du quotidien dans un espace de réflexion personnelle et de traditions spirituelles.",
  applicationName: "AstroConsu",
  keywords: ["rêves", "astrologie", "tarot", "symbolique", "spiritualité", "heures miroir"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "AstroConsu",
    title: "AstroConsu — Observatoire des symboles et des cycles",
    description: "Un espace pour explorer les rêves, les traditions et les cycles personnels.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <CosmicBackground />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
