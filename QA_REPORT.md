# QA REPORT — Qurbaniya
> Date : 27 mars 2026 (audit complet)

## Structure du projet

- **12 pages/routes** : Landing, Login, Mes-commandes, Commander, Confirmation, Blog (3 articles), FAQ, Error, 404
- **39 composants** : 2 forms, 3 layout, 12 sections, 1 seo, 21 ui
- **4 API routes** : orders, paypal (stub), stripe/checkout, stripe/webhook

---

## Problemes trouves et corriges

### CRITIQUE (corriges)

| # | Probleme | Fichiers | Statut |
|---|----------|----------|--------|
| 1 | **"2025" au lieu de "2026"** dans emails, commandes, confirmation, Stripe | `lib/resend.ts`, `OrderSummary.tsx`, `confirmation/page.tsx`, `mes-commandes/page.tsx`, `orders/route.ts`, `stripe/webhook/route.ts` (8 occurrences) | CORRIGE |
| 2 | **Metadata "+500 contributeurs"** vs "+300" dans les composants | `app/layout.tsx` | CORRIGE |

### HIGH (corriges dans cette session)

| # | Probleme | Statut |
|---|----------|--------|
| 3 | Trust bar chevauchement sur desktop | CORRIGE (grid 3x2) |
| 4 | Tutoiement dans HowItWorks, WhyActNow, ExitIntentPopup | CORRIGE (vouvoiement) |
| 5 | Chiffres impact faux (15 repas → 30, 3 familles → 5) | CORRIGE (source Cheikh Omar) |
| 6 | Chiffres historiques gonfles (850 sacrifices → 300 reels) | CORRIGE |
| 7 | Section ProblemSolution copiee de qurban.fr | CORRIGE (texte unique) |
| 8 | ComparisonTable incitait a ne pas faire en France | CORRIGE (angle "obstacles → solution") |
| 9 | ImpactCalculator trop bas dans la page | CORRIGE (remonte apres HowItWorks) |
| 10 | Pas assez de CTA sur la page | CORRIGE (5 CTA ajoutes) |
| 11 | Stats centralisees dans `lib/constants.ts` | CORRIGE (STATS object) |

### MEDIUM (non corriges — TODOs existants)

| # | Probleme | Localisation |
|---|----------|-------------|
| 12 | Webhook Stripe : save order en DB | `api/stripe/webhook/route.ts` |
| 13 | Webhook Stripe : decrementer inventaire | `api/stripe/webhook/route.ts` |
| 14 | Brancher emails Resend au webhook | `api/stripe/webhook/route.ts` |
| 15 | Implementer PayPal | `api/paypal/route.ts` |
| 16 | WhatsApp fake number (33600000000) | `components/ui/WhatsAppButton.tsx` |
| 17 | Prix 140EUR hardcode dans 30+ fichiers (devrait utiliser PRICE_DISPLAY) | Multiple |
| 18 | Prix early bird 129EUR sans constante | `PricingTiers.tsx`, `SacrificeQuiz.tsx` |
| 19 | SacrificeQuiz tutoiement (composant desactive) | `components/ui/SacrificeQuiz.tsx` |

### LOW

| # | Probleme | Localisation |
|---|----------|-------------|
| 20 | 3 console.log dans resend.ts | `lib/resend.ts` |
| 21 | 2 imports commentes dans page.tsx | `app/(marketing)/page.tsx` |
| 22 | PayPal API retourne "coming soon" | `api/paypal/route.ts` |

---

## Verifications OK

- Unicode : 0 echappement \u00xx ou \u20xx dans le code source
- TypeScript : 0 usage de `any`
- Orthographe : vouvoiement respecte dans tous les composants actifs
- Dates : toutes les references visibles disent "2026" ou "Mai 2026"
- Stock : source unique `lib/constants.ts` (200 total, 147 reserves, 53 restants)
- Impact : source unique `lib/constants.ts` (30 repas/mouton, 5 familles/mouton)
- Stats historiques : centralisees dans `lib/constants.ts` (STATS object)
- SEO : metadata, OG tags, structured data presents sur toutes les pages
- 404 : page personnalisee existante
- Error : page error.tsx avec boundary existante

---

## Ordre des sections landing page (optimise conversion)

1. Hero + StockGauge + TrustBar
2. ProblemSolution (empathie) + CTA
3. HowItWorks (processus) + CTA
4. Sheikh (autorite) + CTA
5. Testimonials (preuve sociale) + CTA
6. ImpactCalculator (engagement interactif)
7. Offer (prix 140EUR)
8. ComparisonTable (objections)
9. ImpactCounters (chiffres) + CTA
10. CertificatePreview
11. FAQ
12. WhyActNow (urgence)
13. CTAFinal
