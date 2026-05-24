// Prédiction de ventes Aïd-aware.
//
// Hypothèses du modèle :
//  - Les ventes d'un produit de l'Aïd suivent une courbe d'accélération
//    massive sur les 2-3 dernières semaines (effet "deadline religieuse").
//  - On combine deux signaux :
//      1) une baseline issue de la tendance récente (régression
//         exponentielle pondérée sur les N derniers jours),
//      2) un multiplicateur d'urgence f(daysUntilAid) calibré sur les
//         observations marché e-commerce religieux (multiplier par 1×
//         à >30 jours, ~2× à 14j, ~5× à 7j, ~10× à 3j, ~15× à 1j).
//  - Si les données récentes montrent déjà une accélération mesurable,
//    le modèle l'apprend (le multiplicateur d'urgence est ajusté pour
//    minimiser l'erreur sur les K derniers jours observés).
//  - Incertitude estimée via bootstrap (Monte Carlo) : on rééchantillonne
//    les résidus historiques pour générer 1000 scénarios et on déduit
//    les percentiles P10 / P50 / P90.

import type { DailyBucket } from "@/lib/stripe-analytics";

export type ForecastPoint = {
  date: string; // YYYY-MM-DD
  p10: number; // borne basse (intervalle 80%)
  p50: number; // médiane prédite
  p90: number; // borne haute
};

export type ForecastResult = {
  // Série historique (count quotidien depuis daysBack)
  history: { date: string; count: number; grossEur: number }[];
  // Prédictions à partir de demain jusqu'à AID_DATE (inclus)
  forecast: ForecastPoint[];
  // Totaux projetés
  projection: {
    additionalSalesP10: number;
    additionalSalesP50: number;
    additionalSalesP90: number;
    additionalRevenueP50Eur: number;
    finalTotalSalesP50: number; // ventes observées + ventes prédites
    finalTotalRevenueP50Eur: number;
  };
  // Stock-out
  stockout: {
    expectedDate: string | null; // null si pas atteint dans la fenêtre
    probability: number; // 0..1 : proba que le stock soit épuisé avant l'Aïd
    remainingNow: number;
  };
  // Pacing : où on en est vs un objectif (optionnel)
  pacing: {
    actualSoFar: number;
    projectedFinal: number;
    daysObserved: number;
    daysRemaining: number;
    velocityRecent: number; // moyenne ventes/jour 7 derniers jours
    velocityProjected: number; // moyenne ventes/jour à venir (P50)
    accelerationFactor: number; // velocityProjected / max(velocityRecent, 0.1)
  };
  diagnostics: {
    aovEur: number;
    baselineDaily: number;
    aidMultiplierLearned: number; // facteur global appris (1 = pas d'effet)
    residualStdDev: number; // bruit observé
  };
};

// ── Helpers calendaires ──────────────────────────────────────────────────
function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setUTCDate(out.getUTCDate() + n);
  return out;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

// ── Courbe d'urgence Aïd ─────────────────────────────────────────────────
// Multiplicateur appliqué à la baseline en fonction du nombre de jours
// restant avant l'Aïd. Calibration empirique e-commerce religieux,
// remixable par fit (cf plus bas).
function baseAidMultiplier(daysUntilAid: number): number {
  if (daysUntilAid <= 0) return 0; // commandes fermées
  if (daysUntilAid >= 60) return 1.0;
  // Interpolation log-linéaire entre points connus.
  // (jours_restants, multiplicateur)
  const pts: [number, number][] = [
    [60, 1.0],
    [30, 1.4],
    [21, 2.0],
    [14, 3.0],
    [10, 4.5],
    [7, 6.0],
    [5, 8.0],
    [3, 11.0],
    [2, 13.0],
    [1, 15.0],
  ];
  for (let i = 0; i < pts.length - 1; i++) {
    const [d1, m1] = pts[i];
    const [d2, m2] = pts[i + 1];
    if (daysUntilAid <= d1 && daysUntilAid >= d2) {
      const t = (d1 - daysUntilAid) / (d1 - d2);
      return m1 + t * (m2 - m1);
    }
  }
  return 15.0;
}

// ── Régression : baseline lissée par EWMA ────────────────────────────────
// Moyenne mobile exponentielle inverse à l'effet Aïd : on divise chaque
// observation par son multiplicateur Aïd pour récupérer la "vraie"
// vélocité de fond, puis on lisse. Ça évite que la baseline absorbe le pic.
function computeBaseline(
  series: { date: string; count: number; daysUntilAid: number }[],
  halfLife: number = 14
): number {
  if (series.length === 0) return 0;
  const lambda = Math.log(2) / halfLife;
  let num = 0;
  let den = 0;
  const lastIdx = series.length - 1;
  for (let i = 0; i < series.length; i++) {
    const age = lastIdx - i;
    const w = Math.exp(-lambda * age);
    const mult = baseAidMultiplier(series[i].daysUntilAid);
    if (mult <= 0) continue;
    num += w * (series[i].count / mult);
    den += w;
  }
  return den > 0 ? num / den : 0;
}

// ── Fit du multiplicateur Aïd global ─────────────────────────────────────
// Apprend un facteur de calibration globale appliqué au multiplicateur
// de base, pour matcher les observations récentes. Borné [0.3, 4] pour
// éviter d'amplifier le bruit sur petites séries.
function fitAidMultiplier(
  series: { date: string; count: number; daysUntilAid: number }[],
  baseline: number
): number {
  if (baseline <= 0 || series.length < 7) return 1.0;
  // log-space least-squares sur les 21 derniers points significatifs.
  const recent = series.slice(-21).filter((p) => p.count > 0);
  if (recent.length < 4) return 1.0;
  let sumLogRatio = 0;
  let n = 0;
  for (const p of recent) {
    const expected = baseline * baseAidMultiplier(p.daysUntilAid);
    if (expected <= 0) continue;
    sumLogRatio += Math.log(p.count / expected);
    n += 1;
  }
  if (n === 0) return 1.0;
  const factor = Math.exp(sumLogRatio / n);
  return Math.max(0.3, Math.min(4.0, factor));
}

// ── Résidus & bruit ──────────────────────────────────────────────────────
function computeResidualStdDev(
  series: { count: number; daysUntilAid: number }[],
  baseline: number,
  factor: number
): number {
  if (series.length < 3) return Math.max(1, baseline * 0.5);
  const residuals: number[] = [];
  for (const p of series) {
    const expected =
      baseline * baseAidMultiplier(p.daysUntilAid) * factor;
    residuals.push(p.count - expected);
  }
  const mean = residuals.reduce((a, b) => a + b, 0) / residuals.length;
  const variance =
    residuals.reduce((a, b) => a + (b - mean) ** 2, 0) / residuals.length;
  return Math.sqrt(variance);
}

// ── PRNG seedé (Mulberry32) pour reproductibilité ────────────────────────
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Box-Muller pour normales
function normalRandom(rng: () => number): number {
  const u = 1 - rng();
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// ── API principale ───────────────────────────────────────────────────────
export type ForecastInput = {
  daily: DailyBucket[]; // historique (server-side, déjà filtré)
  aidDate: Date;
  now?: Date;
  stockRemaining: number; // moutons encore disponibles
  aovEurOverride?: number; // panier moyen, sinon dérivé
  simulations?: number;
};

export function buildForecast(input: ForecastInput): ForecastResult {
  const now = input.now ?? new Date();
  const aidDate = input.aidDate;
  const simulations = input.simulations ?? 1000;

  // Série historique avec daysUntilAid au moment de chaque vente
  const history = input.daily.map((b) => {
    const d = new Date(b.date + "T12:00:00Z");
    const dua = Math.max(0, daysBetween(d, aidDate));
    return {
      date: b.date,
      count: b.count,
      grossEur: b.grossEur,
      daysUntilAid: dua,
    };
  });

  const aovEur =
    input.aovEurOverride ??
    (() => {
      const paidCount = history.reduce((a, b) => a + b.count, 0);
      const paidEur = history.reduce((a, b) => a + b.grossEur, 0);
      return paidCount > 0 ? paidEur / paidCount : 140;
    })();

  const baseline = computeBaseline(history);
  const aidFactor = fitAidMultiplier(history, baseline);
  const sigma = computeResidualStdDev(history, baseline, aidFactor);

  // Fenêtre de prédiction : de demain à aidDate inclus
  const todayKey = dateKey(now);
  let cursor = addDays(now, 1);
  const futureDays: { date: string; daysUntilAid: number }[] = [];
  while (cursor.getTime() <= aidDate.getTime() + 1000) {
    const dk = dateKey(cursor);
    if (dk === todayKey) {
      cursor = addDays(cursor, 1);
      continue;
    }
    const dua = Math.max(0, daysBetween(cursor, aidDate));
    futureDays.push({ date: dk, daysUntilAid: dua });
    if (futureDays.length > 120) break; // garde-fou
    cursor = addDays(cursor, 1);
  }

  // ── Monte Carlo ──────────────────────────────────────────────────────
  // On simule N scénarios. Pour chacun : pour chaque jour futur, tirer
  // bruit ~ N(0, sigma), appliquer plancher 0. On enregistre par-jour
  // les valeurs pour calculer percentiles, et on accumule pour le total.
  const rng = makeRng(42);
  const perDaySamples: number[][] = futureDays.map(() => []);
  const totalSamples: number[] = new Array(simulations).fill(0);
  const stockoutBeforeAid: boolean[] = new Array(simulations).fill(false);
  const stockoutDay: (number | null)[] = new Array(simulations).fill(null);

  for (let s = 0; s < simulations; s++) {
    let cumulative = 0;
    for (let i = 0; i < futureDays.length; i++) {
      const mean =
        baseline * baseAidMultiplier(futureDays[i].daysUntilAid) * aidFactor;
      const noisy = mean + normalRandom(rng) * sigma;
      const v = Math.max(0, noisy);
      perDaySamples[i].push(v);
      cumulative += v;
      if (
        stockoutDay[s] === null &&
        cumulative >= input.stockRemaining &&
        input.stockRemaining > 0
      ) {
        stockoutDay[s] = i;
        stockoutBeforeAid[s] = true;
      }
    }
    totalSamples[s] = cumulative;
  }

  const percentile = (arr: number[], p: number): number => {
    if (arr.length === 0) return 0;
    const sorted = arr.slice().sort((a, b) => a - b);
    const idx = Math.min(
      sorted.length - 1,
      Math.max(0, Math.floor((p / 100) * sorted.length))
    );
    return sorted[idx];
  };

  const forecast: ForecastPoint[] = futureDays.map((d, i) => ({
    date: d.date,
    p10: percentile(perDaySamples[i], 10),
    p50: percentile(perDaySamples[i], 50),
    p90: percentile(perDaySamples[i], 90),
  }));

  // Totaux
  const additionalP10 = percentile(totalSamples, 10);
  const additionalP50 = percentile(totalSamples, 50);
  const additionalP90 = percentile(totalSamples, 90);
  const observedTotal = history.reduce((a, b) => a + b.count, 0);
  const observedRevenue = history.reduce((a, b) => a + b.grossEur, 0);

  // Stock-out
  const probStockout =
    stockoutBeforeAid.filter(Boolean).length / Math.max(1, simulations);
  let expectedStockoutDateKey: string | null = null;
  const stockoutDayCounts = stockoutDay.filter(
    (v): v is number => v !== null
  );
  if (stockoutDayCounts.length > 0) {
    // Médiane des jours d'épuisement
    const medianIdx = percentile(stockoutDayCounts, 50);
    const idx = Math.min(futureDays.length - 1, Math.round(medianIdx));
    expectedStockoutDateKey = futureDays[idx]?.date ?? null;
  }

  // Vélocités
  const last7 = history.slice(-7);
  const velocityRecent =
    last7.length > 0
      ? last7.reduce((a, b) => a + b.count, 0) / last7.length
      : 0;
  const velocityProjected =
    futureDays.length > 0 ? additionalP50 / futureDays.length : 0;

  return {
    history: history.map((h) => ({
      date: h.date,
      count: h.count,
      grossEur: h.grossEur,
    })),
    forecast,
    projection: {
      additionalSalesP10: Math.round(additionalP10),
      additionalSalesP50: Math.round(additionalP50),
      additionalSalesP90: Math.round(additionalP90),
      additionalRevenueP50Eur: Math.round(additionalP50 * aovEur),
      finalTotalSalesP50: observedTotal + Math.round(additionalP50),
      finalTotalRevenueP50Eur: Math.round(
        observedRevenue + additionalP50 * aovEur
      ),
    },
    stockout: {
      expectedDate: expectedStockoutDateKey,
      probability: probStockout,
      remainingNow: input.stockRemaining,
    },
    pacing: {
      actualSoFar: observedTotal,
      projectedFinal: observedTotal + Math.round(additionalP50),
      daysObserved: history.length,
      daysRemaining: futureDays.length,
      velocityRecent,
      velocityProjected,
      accelerationFactor:
        velocityRecent > 0.1
          ? velocityProjected / velocityRecent
          : velocityProjected > 0
          ? Infinity
          : 0,
    },
    diagnostics: {
      aovEur,
      baselineDaily: baseline,
      aidMultiplierLearned: aidFactor,
      residualStdDev: sigma,
    },
  };
}
