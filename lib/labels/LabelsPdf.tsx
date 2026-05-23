import { Document, Page, Text, View, StyleSheet, Image as PdfImage, Font } from "@react-pdf/renderer";

// Plage Unicode couvrant l'arabe standard + presentation forms (formes
// contextuelles initiales/médianes/finales) + Arabic Supplement.
const ARABIC_REGEX = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
const hasArabic = (text: string) => ARABIC_REGEX.test(text);

// Deux étiquettes par page A4 (format A5 chacune, 148×210mm ~ format de celles
// utilisées en 2025). À imprimer puis couper en deux.
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 0,
  },
  label: {
    flex: 1,
    borderBottom: "1pt dashed #CCCCCC",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  labelLast: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D6A4F",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    color: "#888888",
    marginBottom: 32,
  },
  intentionBadge: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#B8860B",
    backgroundColor: "#FDF6E3",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  niyyahLabel: {
    fontSize: 10,
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  niyyah: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
    color: "#2D6A4F",
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    color: "#555555",
  },
  number: {
    fontSize: 48,
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
  if (intention === "famille") return "En famille";
  if (intention === "sadaqa") return "Sadaqa";
  return null; // pour_moi → pas de badge (cas par défaut)
}

interface LabelsPdfProps {
  orders: LabelOrder[];
  logoUrl: string;
  arabicFontUrl: string;
  year: number;
  hijriYear: number;
}

// On enregistre la police arabe une seule fois. URL passée depuis la route
// (cf. /api/admin/labels/route.ts) car @react-pdf charge depuis HTTPS au
// rendu serveur — accès au filesystem Vercel pas garanti.
let _arabicFontRegistered = false;
function ensureArabicFont(arabicFontUrl: string) {
  if (_arabicFontRegistered) return;
  Font.register({
    family: "NotoNaskhArabic",
    src: arabicFontUrl,
  });
  // Désactive l'algorithme de césure (pas pertinent pour l'arabe et
  // peut casser les ligatures).
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
  isLast,
}: LabelOrder & { logoUrl: string; hijriYear: number; isLast: boolean }) {
  const badge = intentionBadgeLabel(intention);
  return (
    <View style={isLast ? styles.labelLast : styles.label}>
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
  arabicFontUrl,
  hijriYear,
}: LabelsPdfProps) {
  ensureArabicFont(arabicFontUrl);

  const pages: LabelOrder[][] = [];
  for (let i = 0; i < orders.length; i += 2) {
    pages.push(orders.slice(i, i + 2));
  }

  return (
    <Document>
      {pages.map((pair, pageIdx) => (
        <Page key={pageIdx} size="A4" style={styles.page}>
          {pair.map((order, idx) => (
            <Label
              key={order.orderNumber}
              orderNumber={order.orderNumber}
              fullName={order.fullName}
              niyyah={order.niyyah}
              intention={order.intention}
              logoUrl={logoUrl}
              hijriYear={hijriYear}
              isLast={idx === pair.length - 1}
            />
          ))}
        </Page>
      ))}
    </Document>
  );
}
