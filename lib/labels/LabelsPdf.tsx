import { Document, Page, Text, View, StyleSheet, Image as PdfImage } from "@react-pdf/renderer";

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
  name: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#111111",
  },
  number: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#B8860B",
  },
});

interface LabelOrder {
  orderNumber: number;
  fullName: string;
}

interface LabelsPdfProps {
  orders: LabelOrder[];
  logoUrl: string;
  year: number;
  hijriYear: number;
}

function Label({
  orderNumber,
  fullName,
  logoUrl,
  hijriYear,
  isLast,
}: LabelOrder & { logoUrl: string; hijriYear: number; isLast: boolean }) {
  return (
    <View style={isLast ? styles.labelLast : styles.label}>
      <PdfImage src={logoUrl} style={styles.logo} />
      <Text style={styles.brand}>Qurbaniya.fr</Text>
      <Text style={styles.subtitle}>Aïd al-Adha {hijriYear}</Text>
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.number}>N°{orderNumber}</Text>
    </View>
  );
}

export default function LabelsPdf({
  orders,
  logoUrl,
  hijriYear,
}: LabelsPdfProps) {
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
