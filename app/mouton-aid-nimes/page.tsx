import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import CityLanding, { CityFaqJsonLd, CityServiceJsonLd } from "@/components/sections/CityLanding";
import { CITIES } from "@/lib/cities";

const city = CITIES.nimes;

export const metadata: Metadata = {
  title: "Mouton Aïd al-Adha 2026 à Nîmes — Sacrifice + vidéo nominative",
  description:
    "Sacrifice du mouton de l'Aïd al-Adha 2026 (mercredi 27 mai) pour Nîmes et le Gard. Conforme à la Sounnah, vidéo nominative WhatsApp, 140€ tout inclus.",
  keywords: [
    "mouton aid nimes",
    "mouton aid 2026 nimes",
    "sacrifice aid nimes",
    "mouton aid gard",
    "qurbani nimes",
    "sacrifice mouton nimes",
  ],
  alternates: {
    canonical: "https://qurbaniya.fr/mouton-aid-nimes",
  },
  openGraph: {
    title: "Mouton Aïd al-Adha 2026 à Nîmes — 140€ tout inclus | Qurbaniya",
    description:
      "Pour Nîmes et le Gard : sacrifice de l'Aïd 2026 conforme à la Sounnah, vidéo nominative WhatsApp, sans contrainte logistique.",
    url: "https://qurbaniya.fr/mouton-aid-nimes",
  },
};

export default function MoutonAidNimes() {
  return (
    <>
      <CityFaqJsonLd city={city} />
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://qurbaniya.fr" },
          { name: "Mouton Aïd Nîmes", url: "https://qurbaniya.fr/mouton-aid-nimes" },
        ]}
      />
      <CityLanding city={city} />
    </>
  );
}
