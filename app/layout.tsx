import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qurbaniya.fr"),
  title: {
    default: "Sacrifice Aïd al-Adha 2026 en ligne | Mouton avec vidéo nominative | Qurbaniya",
    template: "%s | Qurbaniya",
  },
  description:
    "Déléguez votre sacrifice de l'Aïd al-Adha 2026 à Madagascar. Mouton sacrifié en votre nom, conforme à la Sunnah, avec preuve vidéo nominative. 140€ tout compris. +300 familles satisfaites.",
  keywords: [
    "sacrifice aid 2026",
    "mouton aid en ligne",
    "qurban france",
    "oudhiya en ligne",
    "sacrifice aid al adha",
    "aqiqa en ligne",
    "sacrifice mouton en ligne",
    "aid el kebir 2026 sacrifice",
    "sacrifice aid al adha pas cher",
    "déléguer sacrifice aid",
    "sacrifice conforme sounnah",
    "fête du mouton 2026",
    "qurban en ligne france",
  ],
  authors: [{ name: "Qurbaniya" }],
  creator: "Qurbaniya",
  publisher: "Qurbaniya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Sacrifice Aïd al-Adha 2026 — Mouton + Vidéo nominative | Qurbaniya",
    description:
      "Déléguez votre sacrifice en toute confiance. Mouton conforme à la Sounnah, vidéo nominative par WhatsApp, à partir de 140€.",
    url: "https://qurbaniya.fr",
    siteName: "Qurbaniya",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacrifice Aïd al-Adha 2026 — Mouton + Vidéo nominative",
    description:
      "Déléguez votre sacrifice en toute confiance. Vidéo nominative, conforme à la Sounnah, à partir de 140€.",
  },
  alternates: {
    canonical: "https://qurbaniya.fr",
    languages: {
      "fr-FR": "https://qurbaniya.fr",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",  // To be added later
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* DNS prefetch for non-critical origins */}
        <link rel="dns-prefetch" href="https://wa.me" />
        {/* Preload hero image for LCP optimization */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=1600&q=80"
          fetchPriority="high"
        />
        <meta name="theme-color" content="#1B4332" />
      </head>
      <body className="antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
