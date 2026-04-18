# CLAUDE.md — Qurbaniya

> Derniere mise a jour : 2026-03-27

## Projet

**Qurbaniya** — Plateforme e-commerce de sacrifice en ligne pour l'Aid al-Adha.
- **Stack :** Next.js 14.2.35 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS 3.4
- **Domaine :** `https://qurbaniya.fr`
- **Langue :** Francais uniquement (vouvoiement obligatoire)

---

## Architecture

```
app/
  (marketing)/          # Landing page (page.tsx)
  (account)/            # Auth : login/, mes-commandes/
  (shop)/               # Tunnel : commander/, confirmation/
  blog/                 # Blog listing + [slug] (3 articles)
  faq/                  # FAQ
  api/
    orders/             # POST — creation commande
    stripe/checkout/    # POST — session Stripe
    stripe/webhook/     # POST — webhook Stripe
    paypal/             # POST — stub (non implemente)
  layout.tsx            # Root layout (fonts, metadata SEO)
  globals.css
  error.tsx, not-found.tsx
  robots.ts, sitemap.ts

components/
  forms/                # OrderForm, OrderSummary
  layout/               # Header, Footer, StickyTopBar
  sections/             # 12 sections landing (Hero, HowItWorks, Offer, FAQ, etc.)
  ui/                   # ~21 composants reutilisables (Button, Badge, Card, CountdownTimer, FloatingCTA, ExitIntentPopup, VideoPlaceholder, etc.)
  seo/                  # JsonLd (Organization, Product, FAQ, Event, Breadcrumb, WebSite)

lib/
  constants.ts          # Source unique : STOCK (total/reserved/remaining), PRICE_DISPLAY, AID_DATE, MEALS_PER_SHEEP (30), FAMILIES_PER_SHEEP (5)
  utils.ts              # cn(), formatPrice(), getBaseUrl()
  validations.ts        # Zod schema (orderSchema)
  stripe.ts             # Stripe singleton, PRICE_MOUTON = 14000 (140 EUR)
  resend.ts             # 3 templates email (confirmation, rappel virement, jour du sacrifice)
  animations.ts         # Framer Motion variants & config
  supabase/
    client.ts           # Browser client
    server.ts           # Server client + service role

scripts/
  qa-check.js           # Script QA automatise (unicode, images, console, env, links)

types/index.ts          # Order, Inventory, PaymentStatus, PaymentMethod, Intention
middleware.ts           # Auth guard sur /mes-commandes (redirect /login)
```

---

## Integrations

| Service | Status | Details |
|---------|--------|---------|
| **Supabase** | Configure | Auth magic link (OTP email), DB orders. Webhook TODO: save order + update status |
| **Stripe** | Partiel | Checkout session fonctionne. Webhook ecoute `checkout.session.completed/expired` mais TODOs (save DB, emails, inventory) |
| **PayPal** | Stub | Route `/api/paypal` vide — non implemente |
| **Resend** | Pret | 3 templates email codes, pas encore branches au webhook |
| **Framer Motion** | OK | Animations sur toutes les sections, variants centralisees dans `lib/animations.ts` |

### Variables d'environnement requises

```
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET
RESEND_API_KEY
NEXT_PUBLIC_BASE_URL
```

---

## Features implementees

- Landing page complete (12 sections marketing avec animations)
- Formulaire commande multi-etapes (React Hook Form + Zod)
- Order summary sticky sidebar (140 EUR)
- Paiement Stripe (checkout redirect)
- Auth Supabase magic link + middleware route protegee
- Dashboard commandes utilisateur (`/mes-commandes`)
- Blog SEO (3 articles : date Aid, sacrifice en ligne, prix mouton)
- FAQ page
- SEO avance : metadata, OpenGraph, structured data (6 schemas), sitemap, robots.txt
- Redirections permanentes (`/offrandes`, `/offres`, `/sacrifice`, `/sacrifice-aid-2026` -> `/commander`)
- Security headers (HSTS, X-Frame-Options, nosniff, XSS protection)
- Cache immutable sur assets statiques
- Exit intent popup (CSS pur, sans Framer Motion, vouvoiement)
- Countdown timer Aid al-Adha
- Stock gauge / urgence (source unique `lib/constants.ts`)
- Floating CTA + WhatsApp button
- Social proof toasts
- VideoPlaceholder (avec capture email lead)
- Script QA automatise (`npm run qa`)
- Design system complet (voir STYLE_GUIDE.md)

---

## Ce qui reste a faire (TODOs dans le code)

### Priorite haute
- [ ] Webhook Stripe : sauvegarder commande en DB Supabase apres paiement
- [ ] Webhook Stripe : decrementer inventaire
- [ ] Brancher envoi emails Resend au webhook (confirmation, rappel virement, jour J)
- [ ] Implementer PayPal (`/api/paypal`)
- [ ] Formulaire details virement bancaire (RIB)
- [ ] Remplacer VideoPlaceholder par le vrai player quand la video du cheikh est tournee

### Priorite moyenne
- [ ] Dashboard mes-commandes : telechargement video sacrifice
- [ ] Dashboard mes-commandes : telechargement recu/certificat
- [ ] Admin dashboard (gestion commandes, inventaire)
- [ ] Gestion inventaire dynamique via Supabase (remplacer constantes dans `lib/constants.ts`)
- [ ] Pages Mentions legales et CGV (liens placeholder dans le Footer)

### Priorite basse
- [ ] Google Analytics / tracking
- [ ] Google Search Console verification
- [ ] Support multi-langue
- [ ] PWA complete (manifest.json existe deja)

---

## Conventions de code

- **Imports :** `@/` alias pour la racine du projet
- **Styling :** Tailwind utility-first, couleurs custom dans `tailwind.config.ts`
- **Formulaires :** React Hook Form + Zod (schema dans `lib/validations.ts`)
- **Animations :** Framer Motion, variants dans `lib/animations.ts` — autorise : fade, slide, scale, blur. Interdit : bounce, rotate, shake
- **Icones :** Lucide React (outlined, 1.5px stroke)
- **Composants :** Fonctionnels, TypeScript strict, pas de `any`
- **Ton :** Vouvoiement, chaleureux, respectueux. Terminologie islamique naturelle.
- **Stock/Inventaire :** Toutes les donnees de stock (total, reserved, remaining) viennent de `lib/constants.ts`. Ne jamais hardcoder de chiffres dans les composants.
- **Impact par mouton :** 30 repas / 5 familles (source : Cheikh Omar, mars 2026). Constantes dans `lib/constants.ts` (MEALS_PER_SHEEP, FAMILIES_PER_SHEEP).

---

## Commandes

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production
npm run lint     # ESLint
npm run qa       # QA automatise (unicode, images, console, env vars, liens)
```

---

## Derniere verification QA : 27 mars 2026

Resultats `npm run qa` : **0 erreurs, 13 warnings** (tous attendus : console.error dans API routes, assets statiques)

---

## Corrections du 27 mars 2026

### Phase 1 — Bugs visuels
- Corrige 69 echappements Unicode dans 6 fichiers (FAQ, Header, Hero, CTAFinal, 2 articles blog)
- Unifie les donnees de stock : cree `lib/constants.ts` comme source unique (STOCK.total=200, STOCK.reserved=147, STOCK.remaining=53). Mis a jour dans 8 composants (Header, StickyTopBar, FloatingCTA, ExitIntentPopup, StockGauge, Offer, SocialProofToast, Hero)
- Corrige le label annee "2025" → "2026" dans Offer.tsx
- Corrige le tutoiement dans ExitIntentPopup ("Tu allais" → vouvoiement)
- Corrige la date Hero "Juin 2025" → "Mai 2026"
- Trust bar : remplace grid rigide par flex-wrap responsive pour eviter overflow mobile

### Phase 2 — Video placeholder
- Cree `components/ui/VideoPlaceholder.tsx` : icone play, texte "Video bientot disponible", formulaire capture email
- Remplace la section video vide dans Hero par le nouveau composant

### Phase 3 — Script QA
- Cree `scripts/qa-check.js` : 5 verifications (unicode, images, console, env vars, liens internes)
- Ajoute `npm run qa` dans package.json

---

## Correction du 27 mars 2026 (soir) — Mise a jour chiffres impact et historique

### Chiffres impact par mouton (source : Cheikh Omar)
- Ancien : 15 repas / 3 familles par mouton
- Nouveau : 30 repas / 5 familles par mouton (tranche haute)
- Centralise `MEALS_PER_SHEEP` et `FAMILIES_PER_SHEEP` dans `lib/constants.ts`
- Mis a jour dans 9 fichiers : FAQ, WhyActNow, ComparisonTable, ImpactCalculator, ImpactCounters, SacrificeQuiz, blog prix-mouton

### Historique reel : 300 moutons vendus
- Ancien : 850 sacrifices, 800 familles (chiffres gonfles)
- Nouveau : 300 sacrifices, 9 000 repas, 1 500 familles (300 × 30 repas, 300 × 5 familles)
- Mis a jour dans 5 fichiers : ImpactCounters, SocialProofBar, Testimonials (subtitle + avis), ExitIntentPopup
- Corrige aussi tutoiement "Rejoins" → "Rejoignez" dans ExitIntentPopup

---

## Audit QA complet du 27 mars 2026 (nuit)

### Corrections critiques
- Corrige 8 occurrences de "2025" → "2026" dans : resend.ts (ref commande + email subject), OrderSummary, confirmation page, mes-commandes, orders API, stripe webhook
- Corrige metadata "+500 contributeurs" → "+300 familles satisfaites" dans layout.tsx
- Centralise toutes les stats dans `lib/constants.ts` (objet STATS : sacrifices, repas, familles, rating, experience, satisfaction)

### Refonte sections landing page
- ProblemSolution : nouveau titre "Accomplissez votre sacrifice, nourrissez des familles" + texte unique Qurbaniya
- ComparisonTable : transforme en "Obstacles en France → Solution Qurbaniya" (plus de comparaison prix)
- Nouvel ordre optimise conversion (13 sections, voir QA_REPORT.md)
- Retire SacrificeQuiz (tutoiement, cassait le flow) et SocialProofBar (redondant)
- Cree composant InlineCTA reutilisable, ajoute 5 CTAs aux points de conviction

### Corrections tutoiement
- HowItWorks : "Tu commandes" → "Vous commandez", "ton sacrifice" → "votre sacrifice"
- WhyActNow : "Réserve au tarif" → supprime, "Ne remets pas" → "Ne remettez pas"

### Rapport QA
- Genere `QA_REPORT.md` a la racine avec tous les problemes trouves et corriges
- 11 problemes HIGH+ corriges, 8 MEDIUM documentes (TODOs existants), 3 LOW

---

## Historique sprints

1. **Sprint 1** — Setup Next.js, Supabase, Stripe, landing page, formulaire commande
2. **Sprint 2** — Core Web Vitals optimization (perf)
3. **Sprint 3** — Blog SEO (3 articles optimises + internal linking)
4. **Sprint 4** — Advanced SEO (redirects, breadcrumbs, noindex, SSR structured data)
5. **Sprint 5** — QA visuels, unification stock, VideoPlaceholder, script QA automatise
6. **Sprint 6** — Audit QA complet, refonte sections, CTAs, centralisation stats, corrections 2025→2026
