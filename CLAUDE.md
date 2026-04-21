# CLAUDE.md — Qurbaniya

> Derniere mise a jour : 2026-04-21 (session deploiement + admin dashboard + analytics)

## Projet

**Qurbaniya** — Plateforme e-commerce de sacrifice en ligne pour l'Aid al-Adha.
- **Stack :** Next.js 14.2.35 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS 3.4
- **Domaine :** `https://qurbaniya.fr` (deploye sur Vercel, DNS IONOS)
- **Langue :** Francais uniquement (vouvoiement obligatoire)
- **Propriétaire :** Youness (younessgrowth@gmail.com)

---

## ÉTAT ACTUEL (2026-04-21) — à lire en premier

### ✅ Ce qui est live en prod (`qurbaniya.fr`)
- Landing page complète + blog + FAQ + tunnel de commande
- Paiement Stripe live (checkout redirect OK)
- Formulaire commande (React Hook Form + Zod)
- Auth Supabase magic link via `/login` + route `/auth/callback` (PKCE)
- Middleware intercepte tout `?code=` sur n'importe quelle route et l'envoie à `/auth/callback`
- Photo Cheikh Chamsouddin intégrée dans section ambassadeur (`components/sections/Sheikh.tsx`, `/public/cheikhChamsouddin.jpg`)
- WhatsApp réel `+33 7 44 79 88 83` branché sur Floating button + FAQ CTA (centralisé `lib/constants.ts` → `WHATSAPP_NUMBER`, helper `whatsappUrl()`)
- **Dashboard admin `/admin`** : KPIs ventes (CA, panier moyen, conversion, stock, répartition méthode/intention) + table commandes filtrable + export CSV
- **Tracking analytics custom** : table `analytics_events` Supabase + `/api/track` endpoint + `<Tracker />` auto page_view + instrumentation CTAs (WhatsApp click, order_submitted, payment_started, exit_popup_shown/converted)

### 🔴 Blockers identifiés (audit 2026-04-21) NON RÉSOLUS
Voir `QA_REPORT.md` + section "Ce qui reste a faire" ci-dessous. Priorité absolue avant annonce publique :

1. **OG image manquante** `/public/og-sacrifice-aid-2026.png` (1200×630) — sharing WhatsApp/Meta cassé. Référencée dans `app/layout.tsx:60,72`.
2. **Footer WhatsApp placeholder** toujours `+33 6 XX XX XX XX` en dur ([Footer.tsx:127,194](components/layout/Footer.tsx)) — utiliser `WHATSAPP_NUMBER` de `lib/constants.ts`.
3. **Pages légales absentes** : Mentions légales, CGV, Politique confidentialité (`href="#"` dans Footer lignes 17-18). Obligation légale e-commerce France.
4. **Mode cadeau incomplet** : champs `gift_recipient_name`, `gift_message`, `gift_send_video` affichés dans OrderForm mais non validés Zod ni insérés en DB ([OrderForm.tsx:215-224](components/forms/OrderForm.tsx)). → Soit brancher, soit désactiver.
5. **PayPal stub** : `/api/paypal/route.ts` retourne "coming soon". Désactiver l'option PayPal dans le formulaire jusqu'à implémentation.
6. **Webhook Stripe** : ne sauvegarde PAS encore les commandes en DB ni n'envoie les emails Resend. Tant que pas fait → `/admin` aura 0 commandes même après paiements réels.

### ⚠️ Configuration externe à faire (Supabase / Vercel)
- **Supabase** : Site URL = `https://qurbaniya.fr` ; Redirect URLs = `https://qurbaniya.fr/**` (déjà configuré par l'utilisateur le 2026-04-21)
- **Migration à exécuter** : `supabase/migrations/0002_analytics.sql` dans SQL Editor Supabase → crée la table `analytics_events` (sinon tracking insère en erreur silencieuse)
- **Vercel env var optionnelle** : `ADMIN_EMAILS=email1,email2` pour whitelister plus d'admins (fallback : `younessgrowth@gmail.com`)

### 🧭 Accès admin
- URL : `https://qurbaniya.fr/admin`
- Email autorisé par défaut : `younessgrowth@gmail.com` (hardcoded dans `lib/admin.ts` comme fallback)
- Auth via magic link Supabase (`/login` → email → lien → session établie via `/auth/callback`)

---

## Architecture

```
app/
  (marketing)/          # Landing page (page.tsx) — inclut section Sheikh (Cheikh Chamsouddin)
  (account)/            # Auth : login/, mes-commandes/
  (shop)/               # Tunnel : commander/, confirmation/
  admin/                # [NEW 2026-04-21] Dashboard admin (layout + page) — protégé middleware + email whitelist
  auth/
    callback/           # [NEW 2026-04-21] Route GET : exchange PKCE code → session
  blog/                 # Blog listing + [slug] (3 articles)
  faq/                  # FAQ
  api/
    orders/             # POST — creation commande
    stripe/checkout/    # POST — session Stripe
    stripe/webhook/     # POST — webhook Stripe (TODO : save DB + emails)
    paypal/             # POST — stub (non implemente)
    track/              # [NEW 2026-04-21] POST — ingère événements analytics
    auth/signout/       # [NEW 2026-04-21] POST — déconnecte et redirige vers /
  layout.tsx            # Root layout (fonts, metadata SEO, <Tracker /> global)
  globals.css
  error.tsx, not-found.tsx
  robots.ts, sitemap.ts

components/
  forms/                # OrderForm (track order_submitted + payment_started), OrderSummary
  layout/               # Header, Footer (⚠️ WhatsApp encore placeholder ligne 127,194), StickyTopBar
  sections/             # 12 sections landing (Hero, HowItWorks, Offer, FAQ, Sheikh = Cheikh Chamsouddin, etc.)
  ui/                   # ~21 composants reutilisables (Button, Badge, Card, CountdownTimer, FloatingCTA, ExitIntentPopup, VideoPlaceholder, WhatsAppButton (track), etc.)
  seo/                  # JsonLd (Organization, Product, FAQ, Event, Breadcrumb, WebSite)
  admin/                # [NEW 2026-04-21] KpiCard, OrdersTable (filtres + CSV export), AnalyticsSection (Sparkline, top pages/referrers, events)
  analytics/            # [NEW 2026-04-21] Tracker (auto page_view client component)

lib/
  constants.ts          # Source unique : STOCK, PRICE, AID_DATE, MEALS_PER_SHEEP (30), FAMILIES_PER_SHEEP (5), WHATSAPP_NUMBER, whatsappUrl()
  utils.ts              # cn(), formatPrice(), getBaseUrl()
  validations.ts        # Zod schema (orderSchema)
  stripe.ts             # Stripe singleton, PRICE_MOUTON = 14000 (140 EUR)
  resend.ts             # 3 templates email (confirmation, rappel virement, jour du sacrifice)
  animations.ts         # Framer Motion variants & config
  admin.ts              # [NEW 2026-04-21] getAdminEmails() + isAdminEmail() — whitelist ADMIN_EMAILS env var
  track.ts              # [NEW 2026-04-21] track(event_name, metadata?) → POST /api/track via sendBeacon, session via localStorage
  analytics-queries.ts  # [NEW 2026-04-21] fetchAnalyticsSummary() : agrège 30j d'events pour le dashboard admin
  supabase/
    client.ts           # Browser client
    server.ts           # Server client + service role

supabase/migrations/
  0001_init.sql         # orders + inventory + RPC decrement_slots + RLS
  0002_analytics.sql    # [NEW 2026-04-21] analytics_events + index + RLS (service role only)

scripts/
  qa-check.js           # Script QA automatise (unicode, images, console, env, links)

public/
  cheikhChamsouddin.jpg # [NEW 2026-04-21] Photo ambassadeur
  logos/                # Logos SVG
  ⚠️ og-sacrifice-aid-2026.png MANQUANT → sharing cassé

types/index.ts          # Order, Inventory, PaymentStatus, PaymentMethod, Intention
middleware.ts           # Auth guard /mes-commandes + /admin + intercepte ?code= partout → /auth/callback
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
- [x] ~~Admin dashboard (gestion commandes, inventaire)~~ → **FAIT Sprint 7** (`/admin` avec KPIs + table + analytics)
- [ ] Gestion inventaire dynamique via Supabase (remplacer constantes dans `lib/constants.ts`) — en partie : landing page charge live via SSR, mais FloatingCTA/ExitIntentPopup utilisent encore le fallback
- [ ] Pages Mentions legales et CGV (liens placeholder dans le Footer) — **BLOQUANT avant lancement public (légal France)**
- [ ] OG image `/public/og-sacrifice-aid-2026.png` — **BLOQUANT (sharing cassé)**
- [ ] Footer : remplacer placeholder WhatsApp `+33 6 XX XX XX XX` par `WHATSAPP_NUMBER` ([Footer.tsx:127,194](components/layout/Footer.tsx))
- [ ] Désactiver PayPal dans OrderForm (stub non implémenté)

### Priorite basse
- [x] ~~Google Analytics / tracking~~ → **FAIT Sprint 7** (tracking custom Supabase + dashboard admin)
- [ ] Google Search Console verification
- [ ] Support multi-langue
- [ ] PWA complete (manifest.json existe deja)
- [ ] VideoPlaceholder : brancher la lead capture (fait juste `setSubmitted(true)` actuellement)

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
7. **Sprint 7 (2026-04-21)** — Deploiement prod qurbaniya.fr + ambassadeur Cheikh Chamsouddin + WhatsApp réel + **dashboard admin** + **analytics custom (tracking events + sparklines)** + fix auth PKCE magic link

---

## Commits récents (Sprint 7, 2026-04-21)

Ordre chronologique pour comprendre l'évolution de la session :

- `e6e6924` — feat: add Cheikh Chamsouddin photo & ambassadeur section
- `eb628a3` — feat: wire real WhatsApp number +33 7 44 79 88 83
- `459e41d` — feat: admin dashboard with sales KPIs, orders table & CSV export
- `d7a3a82` — fix: add /auth/callback route for PKCE magic link exchange
- `ea06929` — fix: intercept magic-link code at any route via middleware
- **(en cours)** feat: analytics tracker + admin analytics section
