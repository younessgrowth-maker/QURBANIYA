// Informations légales de la société éditrice de qurbaniya.fr
// Source : Extrait Kbis du 27/05/2026 (RCS Evry 105 127 153) + Document de
// Synthèse INPI J00242342897.
//
// Y&Y est la dénomination sociale légale. "Qurbaniya" est le nom commercial
// / marque exploitée par cette société. Les mentions légales doivent
// clairement faire apparaître les deux.
//
// Centralisé ici pour réutilisation (mentions-legales, CGV, confidentialité,
// footer, factures, emails). Toute modif passe par une seule source.

export const LEGAL = {
  // Société éditrice
  raisonSociale: "Y&Y",
  nomCommercial: "Qurbaniya",
  formeJuridique: "Société par actions simplifiée à associé unique (SASU)",
  formeJuridiqueCourt: "SASU",
  capitalSocial: "1 €",
  siegeSocial: {
    voie: "47 Avenue du President Allende",
    codePostal: "91300",
    ville: "Massy",
    pays: "France",
    complet: "47 Avenue du President Allende, 91300 Massy, France",
  },

  // Immatriculation
  rcs: "Evry 105 127 153",
  rcsVille: "Evry",
  siren: "105127153",
  sirenFormatte: "105 127 153",
  siret: "10512715300010",
  euid: "FR7801.105127153",
  codeApe: "4791B", // Vente à distance sur catalogue spécialisé

  // TVA — régime réel simplifié, donc assujetti.
  // FR + clé(2) + SIREN(9). Clé = [12 + 3 × (SIREN mod 97)] mod 97.
  // 105127153 mod 97 = 8 → clé = (12 + 24) mod 97 = 36.
  tvaIntracom: "FR36105127153",
  tvaIntracomFormatte: "FR 36 105 127 153",

  // Direction
  president: "Youness Mohamed EL YACOUBI",
  presidentTitre: "Président",
  directeurPublication: "Youness Mohamed EL YACOUBI",

  // Dates clés
  dateImmatriculation: "27 mai 2026",
  dateDebutActivite: "15 mai 2026",
  duree: "99 ans",
  dureeJusquau: "27 mai 2125",
  clotureExercice: "31 décembre",
  premiereClôture: "31 décembre 2026",
  journalAnnonceLegale: "mesinfos.fr",
  dateAnnonceLegale: "12 juin 2026",

  // Activité
  activite:
    "La vente et le commerce en ligne de produits alimentaires et boissons non alcoolisées.",

  // Contact
  email: "support@qurbaniya.fr",
  emailMailto: "mailto:support@qurbaniya.fr",
  siteWeb: "qurbaniya.fr",

  // Hébergeur
  hebergeur: {
    nom: "Vercel Inc.",
    adresse: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
    siteWeb: "vercel.com",
  },

  // Médiation conso (e-commerce B2C — obligatoire art. L.612-1 Code conso).
  // CM2C choisi par défaut : agréé Commission d'évaluation, gratuit pour le
  // consommateur, e-commerce généraliste. Coordonnées : https://www.cm2c.net
  mediateur: {
    nom: "CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice",
    adresse: "14 rue Saint Jean, 75017 Paris",
    siteWeb: "https://www.cm2c.net",
    formulaire: "https://cm2c.net/declarer-un-litige.php",
  },

  // Plateforme ODR européenne
  odrEU: "https://ec.europa.eu/consumers/odr",
} as const;
