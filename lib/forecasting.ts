// Prédiction de ventes Aïd-aware avec prior optionnel issu de l'année
// précédente.
//
// Hypothèses :
//  - Les ventes d'un produit de l'Aïd suivent une courbe d'accélération
//    massive sur les 2-3 dernières semaines.
//  - Si on dispose d'un historique de l'an dernier aligné par jours avant
//    l'Aïd, on l'utilise comme prior empirique (chaque "shape day" du
//    forecast est ancré sur la trajectoire réelle observée l'an dernier).
//  - À défaut, on retombe sur une courbe d'urgence calibrée empiriquement.
//  - On apprend par moindres carrés un facteur global de calibration
//    courant_année / an_dernier (ou facteur Aïd) sur les K derniers jours
//    observés.
//  - Incertitude par bootstrap Monte Carlo (1000 simulations, bruit gaussien
//    sur résidus).

import type { AlignedBucket } from "@/lib/stripe-analytics";

export type ForecastPoint = {
  date: string;
  daysBeforeAid: number; // négatif = avant Aïd
  p10: number;
  p50: number;
  p90: number;
};

export type ForecastResult = {
  history: { date: string; daysBeforeAid: number; count: number; grossEur: number }[];
  forecast: ForecastPoint[];
  // Prédiction ciblée pour aujourd'hui (conditionnée sur ce qui a déjà été vendu)
  today: {
    date: string;
    daysBeforeAid: number;
    soFar: number; // ventes déjà observées aujourd'hui
    expectedTotal: { p10: number; p50: number; p90: number }; // total attendu sur la journée entière
    remaining: { p10: number; p50: number; p90: number }; // restant à venir d'ici minuit
    revenueRemainingP50Eur: number;
  } | null;
  // Prédiction pour demain
  tomorrow: {
    date: string;
    daysBeforeAid: number;
    expected: { p10: number; p50: number; p90: number };
    revenueP50Eur: number;
  } | null;
  projection: {
    additionalSalesP10: number;
    additionalSalesP50: number;
    additionalSalesP90: number;
    additionalRevenueP50Eur: number;
    finalTotalSalesP50: number;
    finalTotalRevenueP50Eur: number;
  };
  stockout: {
    expectedDate: string | null;
    probability: number;
    remainingNow: number;
  };
  pacing: {
    actualSoFar: number;
    projectedFinal: number;
    daysObserved: number;
    daysRemaining: number;
    velocityRecent: number;
    velocityProjected: number;
    accelerationFactor: number;
  };
  diagnostics: {
    aovEur: number;
    method: "prior-from-last-year" | "empirical-aid-curve";
    baselineDaily: number;
    aidMultiplierLearned: number;
    residualStdDev: number;
  };
};

// ── Multiplicateur d'urgence empirique (fallback si pas de prior) ────────
function baseAidMultiplier(daysBeforeAid: number): number {
  // daysBeforeAid < 0 = avant Aïd (J-X)
  // daysBeforeAid >= 0 = jour J ou après → 0 (ventes fermées)
  if (daysBeforeAid >= 0) return 0;
  const dua = -daysBeforeAid; // jours avant Aïd, positif
  if (dua >= 60) return 1.0;
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
    if (dua <= d1 && dua >= d2) {
      const t = (d1 - dua) / (d1 - d2);
      return m1 + t * (m2 - m1);
    }
  }
  return 15.0;
}

// ── Prior depuis l'an dernier ────────────────────────────────────────────
// Construit une fonction qui donne la vélocité attendue pour un
// daysBeforeAid donné, lissée par moyenne mobile 3j sur les données réelles.
function makePriorFromLastYear(
  lastYear: AlignedBucket[]
): ((daysBeforeAid: number) => number) | null {
  if (lastYear.length < 30) return null;
  const map = new Map<number, number>();
  for (const b of lastYear) {
    map.set(b.daysBeforeAid, b.count);
  }
  // Lissage glissant 3j pour réduire bruit jour-à-jour
  return (daysBeforeAid: number) => {
    const window = [-1, 0, 1];
    let sum = 0;
    let n = 0;
    for (const w of window) {
      const v = map.get(daysBeforeAid + w);
      if (v !== undefined) {
        sum += v;
        n += 1;
      }
    }
    if (n === 0) return 0;
    return sum / n;
  };
}

// ── Baseline lissée (EWMA inverse de l'effet Aïd) ────────────────────────
function computeBaseline(
  series: { daysBeforeAid: number; count: number }[],
  shapeFn: (daysBeforeAid: number) => number,
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
    const shape = shapeFn(series[i].daysBeforeAid);
    if (shape <= 0) continue;
    num += w * (series[i].count / shape);
    den += w;
  }
  return den > 0 ? num / den : 0;
}

function fitScale(
  series: { daysBeforeAid: number; count: number }[],
  shapeFn: (daysBeforeAid: number) => number,
  baseline: number
): number {
  if (baseline <= 0 || series.length < 5) return 1.0;
  const recent = series.slice(-21).filter((p) => p.count > 0);
  if (recent.length < 3) return 1.0;
  let sumLogRatio = 0;
  let n = 0;
  for (const p of recent) {
    const expected = baseline * shapeFn(p.daysBeforeAid);
    if (expected <= 0) continue;
    sumLogRatio += Math.log(p.count / expected);
    n += 1;
  }
  if (n === 0) return 1.0;
  const factor = Math.exp(sumLogRatio / n);
  return Math.max(0.2, Math.min(5.0, factor));
}

function computeResidualStdDev(
  series: { daysBeforeAid: number; count: number }[],
  shapeFn: (daysBeforeAid: number) => number,
  baseline: number,
  factor: number
): number {
  if (series.length < 3) return Math.max(1, baseline * 0.5);
  const residuals: number[] = [];
  for (const p of series) {
    const expected = baseline * shapeFn(p.daysBeforeAid) * factor;
    residuals.push(p.count - expected);
  }
  const mean = residuals.reduce((a, b) => a + b, 0) / residuals.length;
  const variance =
    residuals.reduce((a, b) => a + (b - mean) ** 2, 0) / residuals.length;
  return Math.sqrt(variance);
}

// PRNG seedé
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

function normalRandom(rng: () => number): number {
  const u = 1 - rng();
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function dateKeyUtc(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// ── API principale ───────────────────────────────────────────────────────
export type ForecastInput = {
  current: AlignedBucket[]; // historique année en cours
  previous?: AlignedBucket[]; // historique année précédente (prior optionnel)
  aidDate: Date; // date Aïd année en cours
  now?: Date;
  stockRemaining: number;
  aovEurOverride?: number;
  simulations?: number;
  // Distribution horaire des ventes (pour ajustement bayésien
  // time-of-day sur la prédiction du jour partiel).
  hourlyDistribution?: { hour: number; count: number }[];
};

// Helpers timezone Paris pour fractionOfDayDone
function parisHour(d: Date): number {
  const h = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    hour12: false,
  }).format(d);
  return parseInt(h, 10);
}

function parisMinute(d: Date): number {
  const m = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    minute: "2-digit",
  }).format(d);
  return parseInt(m, 10);
}

// Fraction de la journée typique déjà accomplie au moment "now",
// en se basant sur la distribution horaire historique des ventes.
// Si pas de distribution dispo, fallback sur l'heure murale linéaire.
function fractionOfDayDone(
  now: Date,
  hourlyDist: { hour: number; count: number }[]
): number {
  const currentHour = parisHour(now);
  const currentMinute = parisMinute(now);
  const total = hourlyDist.reduce((a, h) => a + h.count, 0);
  if (total === 0) {
    return (currentHour + currentMinute / 60) / 24;
  }
  let done = 0;
  for (const { hour, count } of hourlyDist) {
    if (hour < currentHour) {
      done += count;
    } else if (hour === currentHour) {
      done += count * (currentMinute / 60);
    }
  }
  return done / total;
}

export function buildForecast(input: ForecastInput): ForecastResult {
  const now = input.now ?? new Date();
  const aidDate = input.aidDate;
  const simulations = input.simulations ?? 1000;

  // Construction de la série historique aplatie (déjà alignée)
  const historyAll = input.current
    .filter((b) => b.date <= dateKeyUtc(now))
    .map((b) => ({
      date: b.date,
      daysBeforeAid: b.daysBeforeAid,
      count: b.count,
      grossEur: b.grossEur,
    }));

  // Filtrer la fenêtre [-90, 0] pour le fit (on ignore l'après-Aïd)
  const fittable = historyAll.filter(
    (h) => h.daysBeforeAid >= -90 && h.daysBeforeAid < 0
  );

  const aovEur =
    input.aovEurOverride ??
    (() => {
      const paidCount = historyAll.reduce((a, b) => a + b.count, 0);
      const paidEur = historyAll.reduce((a, b) => a + b.grossEur, 0);
      return paidCount > 0 ? paidEur / paidCount : 140;
    })();

  // Choix de la shape function
  let method: "prior-from-last-year" | "empirical-aid-curve" =
    "empirical-aid-curve";
  let shapeFn: (dba: number) => number = baseAidMultiplier;

  const priorFn = input.previous ? makePriorFromLastYear(input.previous) : null;
  if (priorFn) {
    // Vérifier qu'on a une variance suffisante dans le prior pour s'en servir
    const totalLastYear = (input.previous ?? []).reduce(
      (a, b) => a + b.count,
      0
    );
    if (totalLastYear >= 20) {
      method = "prior-from-last-year";
      shapeFn = priorFn;
    }
  }

  const baseline = computeBaseline(fittable, shapeFn);
  const scale = fitScale(fittable, shapeFn, baseline);
  const sigma = computeResidualStdDev(fittable, shapeFn, baseline, scale);

  // Fenêtre future : daysBeforeAid actuel + 1 → 0 (jour de l'Aïd inclus)
  const todayDba = -Math.max(
    0,
    Math.round((aidDate.getTime() - now.getTime()) / 86_400_000)
  );
  // soFarToday = ce qui a déjà été observé aujourd'hui (jour partiel).
  // On l'extrait avant le Monte Carlo car il est utilisé pour calculer
  // "additional" sans double-comptage avec observedTotal.
  const todayBucket = input.current.find((b) => b.daysBeforeAid === todayDba);
  const soFarToday = todayBucket?.count ?? 0;

  // Fenêtre future : on inclut aujourd'hui (todayDba) afin que la courbe
  // de prédiction reflète bien la JOURNÉE COMPLÈTE attendue aujourd'hui
  // — pas le partiel observé jusqu'à maintenant. Le dashboard filtrera le
  // bucket "today" de l'historique pour éviter le dip visuel.
  const futureDays: { date: string; daysBeforeAid: number }[] = [];
  for (let dba = todayDba; dba <= 0; dba++) {
    const futureDate = new Date(aidDate);
    futureDate.setUTCDate(futureDate.getUTCDate() + dba);
    futureDays.push({
      date: dateKeyUtc(futureDate),
      daysBeforeAid: dba,
    });
    if (futureDays.length > 120) break;
  }

  // ── Monte Carlo en 2 passes ─────────────────────────────────────────
  // Pass 1 : on génère les échantillons "prior" pour chaque jour.
  // Pass 2 : on applique une mise à jour bayésienne sur aujourd'hui
  //          (en utilisant la distribution horaire pour conditionner sur
  //          ce qu'on a observé jusqu'à maintenant), puis on calcule les
  //          totaux cumulés et le stockout en injectant le today blended.
  const rng = makeRng(42);
  const perDaySamples: number[][] = futureDays.map(() => []);

  for (let s = 0; s < simulations; s++) {
    for (let i = 0; i < futureDays.length; i++) {
      const dba = futureDays[i].daysBeforeAid;
      const shape = shapeFn(dba);
      const mean = baseline * shape * scale;
      const noisy = mean + normalRandom(rng) * sigma;
      perDaySamples[i].push(Math.max(0, noisy));
    }
  }

  // Bayesian update sur aujourd'hui : si on est à 18h et qu'on n'a fait
  // que 18 ventes (au lieu des ~35 attendus à cette heure), la vraie
  // valeur finale du jour est probablement plus basse que le prior de
  // 50. On blende prior + observation, pondérée par fractionOfDayDone.
  const fractionDone = fractionOfDayDone(
    now,
    input.hourlyDistribution ?? []
  );
  const observedBasedFullDay =
    fractionDone > 0.05 ? soFarToday / fractionDone : null;
  // Plus la journée avance, plus on fait confiance à l'observation.
  const blendWeight = Math.min(0.95, fractionDone);

  const todayBlendedSamples: number[] =
    futureDays.length > 0 && futureDays[0].daysBeforeAid === todayDba
      ? perDaySamples[0].map((prior) => {
          if (observedBasedFullDay === null) return prior;
          const blended =
            blendWeight * observedBasedFullDay + (1 - blendWeight) * prior;
          // Garde-fou : ne peut pas être moins que ce qui a déjà été vendu.
          return Math.max(soFarToday, blended);
        })
      : [];

  const totalSamples: number[] = new Array(simulations).fill(0);
  const stockoutBeforeAid: boolean[] = new Array(simulations).fill(false);
  const stockoutDay: (number | null)[] = new Array(simulations).fill(null);

  for (let s = 0; s < simulations; s++) {
    let cumulative = 0;
    for (let i = 0; i < futureDays.length; i++) {
      const dba = futureDays[i].daysBeforeAid;
      let contribution: number;
      if (dba === todayDba) {
        // Aujourd'hui : blended full day moins ce qui est déjà fait
        // (le déjà-fait est dans observedTotal).
        contribution = Math.max(0, todayBlendedSamples[s] - soFarToday);
      } else {
        contribution = perDaySamples[i][s];
      }
      cumulative += contribution;

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

  // Forecast array : tous les jours simulés. Aujourd'hui utilise les
  // samples blended (prior + observation conditionné time-of-day).
  const forecast: ForecastPoint[] = futureDays.map((d, i) => {
    const samples =
      d.daysBeforeAid === todayDba && todayBlendedSamples.length > 0
        ? todayBlendedSamples
        : perDaySamples[i];
    return {
      date: d.date,
      daysBeforeAid: d.daysBeforeAid,
      p10: percentile(samples, 10),
      p50: percentile(samples, 50),
      p90: percentile(samples, 90),
    };
  });

  // ── Prédictions ciblées aujourd'hui & demain (extraites du même MC) ──
  let todayPrediction: ForecastResult["today"] = null;
  if (todayDba <= 0 && futureDays.length > 0 && futureDays[0].daysBeforeAid === todayDba) {
    // Pour la card "aujourd'hui" : on utilise les samples blended pour
    // expectedTotal afin que tout soit cohérent (chart, card, total).
    const todaySamples = todayBlendedSamples;
    const remainingSamples = todaySamples.map((v) =>
      Math.max(0, v - soFarToday)
    );
    todayPrediction = {
      date: futureDays[0].date,
      daysBeforeAid: todayDba,
      soFar: soFarToday,
      expectedTotal: {
        p10: percentile(todaySamples, 10),
        p50: percentile(todaySamples, 50),
        p90: percentile(todaySamples, 90),
      },
      remaining: {
        p10: percentile(remainingSamples, 10),
        p50: percentile(remainingSamples, 50),
        p90: percentile(remainingSamples, 90),
      },
      revenueRemainingP50Eur: Math.round(
        percentile(remainingSamples, 50) * aovEur
      ),
    };
  }

  let tomorrowPrediction: ForecastResult["tomorrow"] = null;
  const tomorrowDba = todayDba + 1;
  const tomorrowIdx = futureDays.findIndex(
    (d) => d.daysBeforeAid === tomorrowDba
  );
  if (tomorrowIdx >= 0) {
    const tomorrowSamples = perDaySamples[tomorrowIdx];
    tomorrowPrediction = {
      date: futureDays[tomorrowIdx].date,
      daysBeforeAid: tomorrowDba,
      expected: {
        p10: percentile(tomorrowSamples, 10),
        p50: percentile(tomorrowSamples, 50),
        p90: percentile(tomorrowSamples, 90),
      },
      revenueP50Eur: Math.round(percentile(tomorrowSamples, 50) * aovEur),
    };
  }

  const additionalP10 = percentile(totalSamples, 10);
  const additionalP50 = percentile(totalSamples, 50);
  const additionalP90 = percentile(totalSamples, 90);
  const observedTotal = historyAll.reduce((a, b) => a + b.count, 0);
  const observedRevenue = historyAll.reduce((a, b) => a + b.grossEur, 0);

  const probStockout =
    stockoutBeforeAid.filter(Boolean).length / Math.max(1, simulations);
  let expectedStockoutDateKey: string | null = null;
  const stockoutDayCounts = stockoutDay.filter(
    (v): v is number => v !== null
  );
  if (stockoutDayCounts.length > 0) {
    const medianIdx = percentile(stockoutDayCounts, 50);
    const idx = Math.min(futureDays.length - 1, Math.round(medianIdx));
    expectedStockoutDateKey = futureDays[idx]?.date ?? null;
  }

  // Vélocité récente : on exclut aujourd'hui (jour partiel par
  // construction) pour ne comparer que des jours complets.
  const completeRecent = historyAll
    .filter((h) => h.daysBeforeAid !== todayDba)
    .slice(-7);
  const velocityRecent =
    completeRecent.length > 0
      ? completeRecent.reduce((a, b) => a + b.count, 0) / completeRecent.length
      : 0;
  const velocityProjected =
    futureDays.length > 0 ? additionalP50 / futureDays.length : 0;

  return {
    history: historyAll,
    forecast,
    today: todayPrediction,
    tomorrow: tomorrowPrediction,
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
      daysObserved: historyAll.length,
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
      method,
      baselineDaily: baseline,
      aidMultiplierLearned: scale,
      residualStdDev: sigma,
    },
  };
}
