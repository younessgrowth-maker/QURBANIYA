import { Document, Page, Text, View, StyleSheet, Image as PdfImage } from "@react-pdf/renderer";
// Font import temporairement retiré — voir ensureArabicFont() pour contexte.

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
  arabicFontUrl: string;
  year: number;
  hijriYear: number;
}

// TEMPORAIRE — le fix police arabe (PR #79) cause un crash interne de
// @react-pdf 4.5.1 ("Cannot read properties of undefined (reading 'id')")
// qui retourne un PDF vide en prod. On désactive le Font.register en
// attendant un fix propre post-Aïd. Conséquence : les ~2 niyyahs en
// arabe (5f0c, a576) seront rendues en "GDG# H RFNDHODR9#" sur leur
// étiquette. À corriger manuellement avant impression.
//
// Suspect : Font.register avec src HTTPS qui timeout pendant le cold
// start serverless Vercel, laissant la sourcesArray dans un état
// inconsistant que le rendering n'attend pas.
function ensureArabicFont(_arabicFontUrl: string) {
  // no-op temporaire — voir commentaire ci-dessus
  // À ré-activer une fois la cause root identifiée :
  //   Font.register({ family: "NotoNaskhArabic", src: arabicFontUrl });
  //   Font.registerHyphenationCallback((word) => [word]);
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
      {/* TEMPORAIRE — fontFamily NotoNaskhArabic désactivé suite au crash
          @react-pdf en prod. Les niyyahs arabes sont rendues en glyphs
          Helvetica par défaut (illisible). Voir ensureArabicFont(). */}
      <Text style={styles.niyyah}>{niyyah}</Text>
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

  return (
    <Document>
      {orders.map((order) => (
        <Page key={order.orderNumber} size="A4" style={styles.page}>
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
