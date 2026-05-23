import { Document, Page, Text, View, StyleSheet, Image as PdfImage, Font } from "@react-pdf/renderer";

// Plage Unicode couvrant l'arabe standard + presentation forms (formes
// contextuelles initiales/médianes/finales) + Arabic Supplement.
const ARABIC_REGEX = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
const hasArabic = (text: string) => ARABIC_REGEX.test(text);

// Une étiquette pleine page A4 (210×297mm) par commande.
// Avant : 2 étiquettes / A4 en A5 chacune (à couper). On passe à 1 / page
// pour plus de lisibilité au moment du sacrifice + moins d'erreurs de
// manipulation côté équipe.
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 0,
  },
  label: {
    flex: 1,
    padding: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  brand: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 48,
  },
  intentionBadge: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B8860B",
    backgroundColor: "#FDF6E3",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 6,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  niyyahLabel: {
    fontSize: 14,
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  niyyah: {
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 36,
    color: "#2D6A4F",
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 48,
    color: "#555555",
  },
  number: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#B8860B",
  },
});

type Intention = "pour_moi" | "famille" | "sadaqa";

interface LabelOrder {
  orderNumber: number;
  fullName: string;
  niyyah: string;
  intention: Intention;
}

function intentionBadgeLabel(intention: Intention): string | null {
  if (intention === "famille") return "Famille";
  if (intention === "sadaqa") return "Sadaqa";
  return null; // pour_moi → pas de badge (cas par défaut)
}

interface LabelsPdfProps {
  orders: LabelOrder[];
  logoUrl: string;
  arabicFontDataUrl: string | null;
  year: number;
  hijriYear: number;
}

// On enregistre la police arabe via un data URL base64 pré-construit
// côté route (cf. /api/admin/labels/route.ts).
//
// Historique des essais :
// - PR #79 : src: URL HTTPS → crash "Cannot read properties of undefined
//   (reading 'id')" pendant cold start serverless (fetch async pendant
//   le render).
// - PR #83 : src: Buffer Node → crash "dataUrl.substring is not a
//   function" (Font.register exige une string).
// - Maintenant : src: data URL base64 (string, mais sans fetch réseau).
//   La police est inline dans le src → pas d'I/O pendant le render.
let _arabicFontRegistered = false;
function ensureArabicFont(arabicFontDataUrl: string | null) {
  if (_arabicFontRegistered || !arabicFontDataUrl) return;
  Font.register({
    family: "NotoNaskhArabic",
    src: arabicFontDataUrl,
  });
  // Désactive l'algorithme de césure (pas pertinent pour l'arabe).
  Font.registerHyphenationCallback((word) => [word]);
  _arabicFontRegistered = true;
}

function Label({
  orderNumber,
  fullName,
  niyyah,
  intention,
  logoUrl,
  hijriYear,
}: LabelOrder & { logoUrl: string; hijriYear: number }) {
  const badge = intentionBadgeLabel(intention);
  return (
    <View style={styles.label}>
      <PdfImage src={logoUrl} style={styles.logo} />
      <Text style={styles.brand}>Qurbaniya.fr</Text>
      <Text style={styles.subtitle}>Aïd al-Adha {hijriYear}</Text>
      {badge && <Text style={styles.intentionBadge}>{badge}</Text>}
      <Text style={styles.niyyahLabel}>Niyyah</Text>
      <Text
        style={
          hasArabic(niyyah)
            ? [styles.niyyah, { fontFamily: "NotoNaskhArabic" }]
            : styles.niyyah
        }
      >
        {niyyah}
      </Text>
      <Text style={styles.name}>Commande : {fullName}</Text>
      <Text style={styles.number}>N°{orderNumber}</Text>
    </View>
  );
}

export default function LabelsPdf({
  orders,
  logoUrl,
  arabicFontDataUrl,
  hijriYear,
}: LabelsPdfProps) {
  ensureArabicFont(arabicFontDataUrl);

  return (
    <Document>
      {orders.map((order) => (
        <Page key={order.orderNumber} size="A4" orientation="landscape" style={styles.page}>
          <Label
            orderNumber={order.orderNumber}
            fullName={order.fullName}
            niyyah={order.niyyah}
            intention={order.intention}
            logoUrl={logoUrl}
            hijriYear={hijriYear}
          />
        </Page>
      ))}
    </Document>
  );
}
