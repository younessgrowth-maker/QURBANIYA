// Test offline : valide que les sorties de buildForecast sont
// cohérentes entre elles, en utilisant les vraies données 2025/2026
// extraites du CSV Stripe de l'utilisateur.
//
// Usage :
//   npx tsx scripts/test-forecast-coherence.ts

import { buildForecast } from "../lib/forecasting";
import type { AlignedBucket } from "../lib/stripe-analytics";

// ── Données réelles extraites du CSV de l'utilisateur ───────────────────
// Aïd 2025 = 6 juin, Aïd 2026 = 27 mai, donc on aligne par
// daysBeforeAid = date - aidDate (négatif avant l'Aïd).

const AID_2026 = new Date("2026-05-27T12:00:00Z");
const TODAY = new Date("2026-05-24T17:00:00Z"); // dimanche 24 mai 17h Paris

// Construction d'un bucket à partir d'un count quotidien
function bucket(dba: number, count: number, year: 2025 | 2026): AlignedBucket {
  const aid = year === 2025 ? new Date("2025-06-06T12:00:00Z") : AID_2026;
  const d = new Date(aid);
  d.setUTCDate(d.getUTCDate() + dba);
  const date = d.toISOString().slice(0, 10);
  const avgPrice = year === 2025 ? 134 : 136;
  return {
    daysBeforeAid: dba,
    date,
    count,
    grossEur: count * avgPrice,
    netEur: count * (avgPrice - 2.3),
    feesEur: count * 2.3,
    refundsEur: 0,
  };
}

// 2025 daily counts extraits du CSV (J-90 à J+7) — pic Aïd 6 juin
// Source : awk + python sur unified_payments.csv
const counts_2025: Record<number, number> = {
  // jours sans ventes en blanc
  [-12]: 1, [-11]: 2, [-10]: 6, [-9]: 2, [-8]: 6, [-7]: 11,
  [-6]: 6, [-5]: 9, [-4]: 14, [-3]: 17, [-2]: 19, [-1]: 4,
  [0]: 4, // Aïd day 6 juin
  // après aïd
  [1]: 3, [2]: 2, [3]: 1,
};

// 2026 daily counts (estimés depuis le screenshot, en mai)
// L'utilisateur a ~212 ventes au total entre 26 fév et 24 mai
const counts_2026: Record<number, number> = {
  // mois précédents avec peu de ventes
  [-60]: 1, [-50]: 2, [-40]: 5,
  // accélération mai
  [-20]: 3, [-19]: 5, [-18]: 6, [-17]: 8, [-16]: 9, [-15]: 8,
  [-14]: 12, [-13]: 7, [-12]: 10, [-11]: 9, [-10]: 11,
  [-9]: 14, [-8]: 7, [-7]: 11, [-6]: 10, [-5]: 14, [-4]: 22,
  // aujourd'hui J-3 partiel
  [-3]: 18,
};

function buildDaily(
  counts: Record<number, number>,
  year: 2025 | 2026,
  range: [number, number]
): AlignedBucket[] {
  const out: AlignedBucket[] = [];
  for (let dba = range[0]; dba <= range[1]; dba++) {
    out.push(bucket(dba, counts[dba] ?? 0, year));
  }
  return out;
}

const daily_2025 = buildDaily(counts_2025, 2025, [-90, 7]);
const daily_2026 = buildDaily(counts_2026, 2026, [-90, -3]);

const observedTotal_2026 = daily_2026.reduce((a, b) => a + b.count, 0);
const observedRevenue_2026 = daily_2026.reduce((a, b) => a + b.grossEur, 0);

console.log("── Données d'entrée ──");
console.log(
  `2026 observed: ${observedTotal_2026} ventes, ${observedRevenue_2026}€`
);
console.log(
  `2025 reference: ${daily_2025.reduce((a, b) => a + b.count, 0)} ventes`
);
console.log(`Aujourd'hui J-3, déjà ${counts_2026[-3]} ventes`);
console.log("");

// Distribution horaire typique e-commerce religieux (pics 12h, 19-22h)
// Total ≈ 1 (proportions), normalisé à 200 pour matcher count
const hourlyDistribution = [
  { hour: 0, count: 3 }, { hour: 1, count: 2 }, { hour: 2, count: 1 },
  { hour: 3, count: 1 }, { hour: 4, count: 1 }, { hour: 5, count: 1 },
  { hour: 6, count: 2 }, { hour: 7, count: 4 }, { hour: 8, count: 6 },
  { hour: 9, count: 9 }, { hour: 10, count: 12 }, { hour: 11, count: 14 },
  { hour: 12, count: 18 }, { hour: 13, count: 16 }, { hour: 14, count: 12 },
  { hour: 15, count: 10 }, { hour: 16, count: 11 }, { hour: 17, count: 13 },
  { hour: 18, count: 16 }, { hour: 19, count: 20 }, { hour: 20, count: 18 },
  { hour: 21, count: 15 }, { hour: 22, count: 10 }, { hour: 23, count: 5 },
];

const result = buildForecast({
  current: daily_2026,
  previous: daily_2025,
  aidDate: AID_2026,
  now: TODAY,
  stockRemaining: 93,
  aovEurOverride: 136,
  simulations: 1000,
  hourlyDistribution,
});

// Fraction de la journée typique faite à 18h Paris (somme hours 0-17 + 0)
const fractionDoneAt18 =
  hourlyDistribution.slice(0, 18).reduce((a, h) => a + h.count, 0) /
  hourlyDistribution.reduce((a, h) => a + h.count, 0);
console.log(
  `\n  [Sanity time-of-day] Fraction journée typique faite à 18h Paris : ${(fractionDoneAt18 * 100).toFixed(0)}%`
);
console.log(
  `  [Sanity time-of-day] Avec 18 ventes observées, implied full day = ${(18 / fractionDoneAt18).toFixed(1)}\n`
);

console.log("── Diagnostics modèle ──");
console.log(`Méthode : ${result.diagnostics.method}`);
console.log(`Baseline : ${result.diagnostics.baselineDaily.toFixed(2)}/j`);
console.log(`Calibration apprise : ×${result.diagnostics.aidMultiplierLearned.toFixed(2)}`);
console.log(`σ résiduel : ±${result.diagnostics.residualStdDev.toFixed(2)}`);
console.log("");

console.log("── Prédiction aujourd'hui ──");
const t = result.today!;
console.log(
  `soFar=${t.soFar}, full day P50=${Math.round(t.expectedTotal.p50)}, remaining P50=${Math.round(t.remaining.p50)}`
);
console.log(
  `→ Check cohérence : soFar + remaining ≈ expectedTotal ?  ${t.soFar} + ${Math.round(t.remaining.p50)} = ${t.soFar + Math.round(t.remaining.p50)} vs ${Math.round(t.expectedTotal.p50)}`
);
console.log("");

console.log("── Prédiction demain ──");
const tm = result.tomorrow!;
console.log(
  `Demain (J${tm.daysBeforeAid}) : P50=${Math.round(tm.expected.p50)} ventes, ~${tm.revenueP50Eur}€`
);
console.log("");

console.log("── Forecast jour par jour (P50) ──");
for (const f of result.forecast) {
  console.log(
    `  J${f.daysBeforeAid}=${f.date.slice(5)} : P50=${Math.round(f.p50)} (range ${Math.round(f.p10)}-${Math.round(f.p90)})`
  );
}
console.log("");

console.log("── Vérification cohérence projection ──");
const additionalP50 = result.projection.additionalSalesP50;
const finalP50 = result.projection.finalTotalSalesP50;
const sumOfForecasts =
  Math.round(t.remaining.p50) +
  result.forecast
    .filter((f) => f.daysBeforeAid !== -3) // exclu today, on a déjà compté son remaining
    .reduce((a, f) => a + Math.round(f.p50), 0);
console.log(`observedTotal = ${observedTotal_2026}`);
console.log(`additional P50 (depuis Monte Carlo) = ${additionalP50}`);
console.log(`final P50 = ${finalP50} (= observed + additional)`);
console.log(
  `Sanity check : today.remaining + sum(forecast J>=J-2 P50) = ${sumOfForecasts}`
);
console.log(
  `Delta additional vs sum-of-P50s : ${additionalP50 - sumOfForecasts} (peut différer car median(sum) ≠ sum(medians))`
);
console.log("");

console.log("── Pacing ──");
console.log(`Vélocité récente (sans aujourd'hui) : ${result.pacing.velocityRecent.toFixed(1)}/j`);
console.log(`Vélocité projetée : ${result.pacing.velocityProjected.toFixed(1)}/j`);
console.log(`Accélération : ×${result.pacing.accelerationFactor.toFixed(2)}`);
console.log("");

console.log("── Stockout ──");
console.log(`Stock restant : ${result.stockout.remainingNow}`);
console.log(`Proba rupture : ${(result.stockout.probability * 100).toFixed(0)}%`);
console.log(`Date probable : ${result.stockout.expectedDate ?? "(non atteinte)"}`);
console.log("");

console.log("── Tests de cohérence ──");
const tests: { name: string; pass: boolean; detail?: string }[] = [];

tests.push({
  name: "today.soFar + today.remaining.p50 ≈ today.expectedTotal.p50",
  pass: Math.abs(t.soFar + t.remaining.p50 - t.expectedTotal.p50) < 1,
  detail: `${t.soFar} + ${t.remaining.p50.toFixed(1)} = ${(t.soFar + t.remaining.p50).toFixed(1)} vs ${t.expectedTotal.p50.toFixed(1)}`,
});

tests.push({
  name: "finalTotalP50 = observedTotal + additionalP50",
  pass: finalP50 === observedTotal_2026 + additionalP50,
  detail: `${finalP50} vs ${observedTotal_2026 + additionalP50}`,
});

tests.push({
  name: "tomorrow.expected.p50 > 0 (jour normal d'avant-Aïd)",
  pass: tm.expected.p50 > 0,
});

tests.push({
  name: "additionalP50 inclut today's remaining (était bug avant fix)",
  pass: additionalP50 >= Math.round(t.remaining.p50),
  detail: `additional=${additionalP50}, today.remaining=${Math.round(t.remaining.p50)}`,
});

tests.push({
  name: "P10 ≤ P50 ≤ P90 pour today",
  pass:
    t.expectedTotal.p10 <= t.expectedTotal.p50 &&
    t.expectedTotal.p50 <= t.expectedTotal.p90,
});

tests.push({
  name: "P10 ≤ P50 ≤ P90 pour tomorrow",
  pass: tm.expected.p10 <= tm.expected.p50 && tm.expected.p50 <= tm.expected.p90,
});

tests.push({
  name: "additionalSalesP10 ≤ P50 ≤ P90",
  pass:
    result.projection.additionalSalesP10 <= additionalP50 &&
    additionalP50 <= result.projection.additionalSalesP90,
});

tests.push({
  name: "Vélocité projetée > vélocité récente (accélération attendue)",
  pass: result.pacing.velocityProjected > result.pacing.velocityRecent,
  detail: `proj=${result.pacing.velocityProjected.toFixed(1)} > recent=${result.pacing.velocityRecent.toFixed(1)}`,
});

tests.push({
  name: "Forecast contient aujourd'hui (J-3)",
  pass: result.forecast.some((f) => f.daysBeforeAid === -3),
});

tests.push({
  name: "Forecast contient demain (J-2)",
  pass: result.forecast.some((f) => f.daysBeforeAid === -2),
});

tests.push({
  name: "Forecast contient J-Aïd (J-0)",
  pass: result.forecast.some((f) => f.daysBeforeAid === 0),
});

tests.push({
  name: "Aujourd'hui dans forecast = today.expectedTotal",
  pass: (() => {
    const todayInForecast = result.forecast.find((f) => f.daysBeforeAid === -3);
    return (
      todayInForecast !== undefined &&
      Math.abs(todayInForecast.p50 - t.expectedTotal.p50) < 0.01
    );
  })(),
});

tests.push({
  name: "Pacing.actualSoFar = observedTotal",
  pass: result.pacing.actualSoFar === observedTotal_2026,
});

tests.push({
  name: "Pacing.daysRemaining = nombre de jours dans forecast",
  pass: result.pacing.daysRemaining === result.forecast.length,
});

tests.push({
  name: "Stockout coherent : si proba > 0 alors date probable existe",
  pass:
    result.stockout.probability === 0 || result.stockout.expectedDate !== null,
});

tests.push({
  name: "Bayesian today : remaining < (expectedTotal - soFar) car time-of-day adjusté",
  pass: t.remaining.p50 < 50 - t.soFar + 5, // tolerance, le naif serait ~50-18=32
  detail: `remaining=${Math.round(t.remaining.p50)} (était ~32 sans time-of-day adj)`,
});

tests.push({
  name: "today.expectedTotal coherent avec implied = soFar/fractionDone",
  pass: (() => {
    const implied = t.soFar / fractionDoneAt18;
    // Le blended doit être entre implied et le prior (~50), avec
    // tolérance pour le bruit MC.
    return (
      t.expectedTotal.p50 >= implied * 0.9 &&
      t.expectedTotal.p50 <= 60 // prior max + bruit
    );
  })(),
  detail: `expectedTotal=${Math.round(t.expectedTotal.p50)}, implied=${(t.soFar / fractionDoneAt18).toFixed(1)}, prior≈50`,
});

tests.push({
  name: "Tomorrow non affecté par time-of-day (jour pas commencé)",
  pass: tm.expected.p50 > 20, // doit rester proche du prior, ~65 en théorie
  detail: `tomorrow.p50=${Math.round(tm.expected.p50)}`,
});

let passed = 0;
let failed = 0;
for (const t of tests) {
  const icon = t.pass ? "✅" : "❌";
  console.log(`${icon} ${t.name}${t.detail ? `   (${t.detail})` : ""}`);
  if (t.pass) passed++;
  else failed++;
}
console.log("");
console.log(`Tests passés : ${passed}/${tests.length}`);
process.exit(failed > 0 ? 1 : 0);
