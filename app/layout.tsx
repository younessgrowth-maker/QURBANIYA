import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "Qurbaniya \u2014 Votre sacrifice conforme \u00e0 la Sunnah",
  description:
    "Commandez votre mouton pour l\u2019A\u00efd el-K\u00e9bir ou l\u2019Aqiqa. Sacrifice conforme, preuve vid\u00e9o WhatsApp, cheikh dipl\u00f4m\u00e9. 140\u20ac tout inclus.",
  openGraph: {
    title: "Qurbaniya \u2014 Sacrifice conforme \u00e0 la Sunnah",
    description: "Mouton 140\u20ac \u2014 Sacrifice film\u00e9, conforme, preuve vid\u00e9o par WhatsApp.",
    url: "https://qurbaniya.fr",
    siteName: "Qurbaniya",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
