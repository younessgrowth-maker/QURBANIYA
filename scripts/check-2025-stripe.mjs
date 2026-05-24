// One-shot : compte les paiements Stripe autour de l'Aïd 2025 pour savoir
// s'il y a de quoi alimenter la courbe YoY du dashboard /admin/analytics.
//
// Usage :
//   STRIPE_SECRET_KEY=sk_live_xxx node scripts/check-2025-stripe.mjs
//
// Affiche :
//   - nombre total de sessions/paiements en 2025
//   - répartition mois par mois (pour voir si pic Aïd 2025 visible)
//   - CA brut total
//   - dates premiers/derniers paiements 2025

import Stripe from "stripe";

const KEY = process.env.STRIPE_SECRET_KEY;
if (!KEY) {
  console.error("❌ STRIPE_SECRET_KEY manquant. Usage:");
  console.error(
    "   STRIPE_SECRET_KEY=sk_live_xxx node scripts/check-2025-stripe.mjs"
  );
  process.exit(1);
}

const stripe = new Stripe(KEY, { apiVersion: "2026-02-25.clover" });

// Fenêtre 2025 : 90j avant Aïd 2025 (6 juin) → 30j après = mars → juillet
const FROM = Math.floor(new Date("2025-01-01T00:00:00Z").getTime() / 1000);
const TO = Math.floor(new Date("2025-12-31T23:59:59Z").getTime() / 1000);

console.log("Recherche des paiements Stripe 2025…");
console.log(
  `Fenêtre : ${new Date(FROM * 1000).toISOString().slice(0, 10)} → ${new Date(TO * 1000).toISOString().slice(0, 10)}`
);
console.log("");

const sessions = [];
let pageCount = 0;
for await (const s of stripe.checkout.sessions.list({
  created: { gte: FROM, lte: TO },
  limit: 100,
})) {
  sessions.push(s);
  pageCount++;
  if (pageCount % 100 === 0) {
    process.stdout.write(`\r${sessions.length} sessions parcourues…`);
  }
  if (sessions.length >= 5000) break;
}
process.stdout.write("\r" + " ".repeat(50) + "\r");

const paid = sessions.filter(
  (s) => s.payment_status === "paid" && (s.amount_total ?? 0) > 0
);

console.log(`Total sessions Stripe 2025 : ${sessions.length}`);
console.log(`  dont payées : ${paid.length}`);

if (paid.length === 0) {
  console.log("");
  console.log("→ Aucun paiement Stripe en 2025 sur ce compte.");
  console.log(
    "  La courbe YoY (Aïd 2025) du dashboard /admin/analytics restera vide."
  );
  console.log(
    "  Ce n'est pas un bug : il n'y a tout simplement rien à afficher."
  );
  process.exit(0);
}

const totalEur = paid.reduce(
  (s, sess) => s + (sess.amount_total ?? 0) / 100,
  0
);
console.log(`  CA brut : ${totalEur.toFixed(2)} €`);
console.log("");

// Répartition par mois
const byMonth = new Map();
for (const s of paid) {
  const d = new Date(s.created * 1000);
  const ym = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  const cur = byMonth.get(ym) ?? { count: 0, eur: 0 };
  cur.count += 1;
  cur.eur += (s.amount_total ?? 0) / 100;
  byMonth.set(ym, cur);
}

console.log("Répartition mensuelle :");
const sorted = Array.from(byMonth.entries()).sort((a, b) =>
  a[0].localeCompare(b[0])
);
for (const [ym, v] of sorted) {
  const bar = "█".repeat(Math.min(40, Math.round(v.count / 2)));
  console.log(
    `  ${ym}  ${String(v.count).padStart(4)}  ${v.eur.toFixed(0).padStart(7)}€  ${bar}`
  );
}

console.log("");
const first = paid.sort((a, b) => a.created - b.created)[0];
const last = paid[paid.length - 1];
console.log(
  `Premier paiement 2025 : ${new Date(first.created * 1000).toISOString().slice(0, 10)} (${(first.amount_total / 100).toFixed(0)}€)`
);
console.log(
  `Dernier paiement 2025 : ${new Date(last.created * 1000).toISOString().slice(0, 10)} (${(last.amount_total / 100).toFixed(0)}€)`
);

console.log("");
// Fenêtre Aïd 2025 spécifiquement (mars 8 → juillet 13)
const aidWindow = paid.filter((s) => {
  const d = new Date(s.created * 1000);
  return d >= new Date("2025-03-08") && d <= new Date("2025-07-13");
});
console.log(
  `Dans la fenêtre Aïd 2025 (J-90 → J+37) : ${aidWindow.length} paiements`
);
if (aidWindow.length >= 20) {
  console.log(
    "→ ✅ Assez de data pour servir de prior dans le forecast 2026."
  );
} else if (aidWindow.length > 0) {
  console.log(
    "→ ⚠ Data présente mais < 20 → le forecast retombera sur la courbe Aïd empirique."
  );
} else {
  console.log("→ ❌ Aucune data Aïd 2025 → pas de comparaison YoY possible.");
}
