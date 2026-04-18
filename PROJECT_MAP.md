# PROJECT_MAP.md — Qurbaniya

> Cartographie complete du projet — 27 mars 2026

## Stack

- **Framework :** Next.js 14.2.35 (App Router)
- **UI :** React 18 + TypeScript (strict) + Tailwind CSS 3.4
- **Animations :** Framer Motion 12
- **Formulaires :** React Hook Form 7 + Zod 4
- **Paiements :** Stripe 20 (backend) + @stripe/stripe-js 8 (frontend)
- **Auth + DB :** Supabase (@supabase/supabase-js 2, @supabase/ssr 0.9)
- **Emails :** Resend 6
- **Icones :** Lucide React 1.6
- **Utilitaires :** clsx + tailwind-merge

---

## Arborescence commentee

```
QURBA2/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (fonts Inter+Playfair, metadata SEO, JSON-LD Organization+Website)
│   ├── globals.css                   # Styles globaux Tailwind
│   ├── error.tsx                     # Page d'erreur globale
│   ├── not-found.tsx                 # Page 404
│   ├── robots.ts                     # Regles robots.txt (disallow /api, /login, /mes-commandes)
│   ├── sitemap.ts                    # Sitemap XML dynamique (7 URLs)
│   │
│   ├── (marketing)/                  # Groupe de routes — Landing page
│   │   ├── layout.tsx                # Wrapper : StickyTopBar, Header, Footer, FloatingCTA, SocialProofToast, WhatsAppButton, ExitIntentPopup
│   │   └── page.tsx                  # Landing page (13 sections + 4 JSON-LD)
│   │
│   ├── (account)/                    # Groupe de routes — Espace compte (noindex)
│   │   ├── layout.tsx                # Layout minimal (noindex metadata)
│   │   ├── login/page.tsx            # Connexion magic link Supabase (OTP email)
│   │   └── mes-commandes/page.tsx    # Dashboard commandes utilisateur (statut, timeline)
│   │
│   ├── (shop)/                       # Groupe de routes — Tunnel d'achat
│   │   ├── commander/page.tsx        # Formulaire commande + sidebar recapitulatif sticky
│   │   └── confirmation/page.tsx     # Page de confirmation post-paiement (confetti)
│   │
│   ├── blog/                         # Blog SEO
│   │   ├── layout.tsx                # Layout blog (Header + Footer)
│   │   ├── page.tsx                  # Listing des 3 articles
│   │   ├── date-aid-al-adha-2026/page.tsx
│   │   ├── sacrifice-aid-en-ligne-comment-ca-marche/page.tsx
│   │   └── prix-mouton-france-2026/page.tsx
│   │
│   ├── faq/page.tsx                  # Page FAQ avec JSON-LD
│   │
│   └── api/                          # Routes API backend
│       ├── orders/route.ts           # POST — Creation commande + redirection paiement
│       ├── paypal/route.ts           # POST — Stub PayPal (non implemente)
│       └── stripe/
│           ├── checkout/route.ts     # POST — Creation session Stripe checkout
│           └── webhook/route.ts      # POST — Webhook Stripe (events checkout)
│
├── components/
│   ├── forms/                        # Composants formulaire
│   │   ├── OrderForm.tsx             # Formulaire multi-etapes (info, sacrifice, paiement)
│   │   └── OrderSummary.tsx          # Sidebar recapitulatif commande (140 EUR)
│   │
│   ├── layout/                       # Composants structurels
│   │   ├── Header.tsx                # Navigation + logo + burger mobile + barre de progression scroll
│   │   ├── Footer.tsx                # Footer dark (liens, WhatsApp, copyright, accordion mobile)
│   │   └── StickyTopBar.tsx          # Barre urgence sticky (stock + countdown)
│   │
│   ├── sections/                     # Sections landing page
│   │   ├── Hero.tsx                  # Hero principal (headline, CTA, countdown, video placeholder)
│   │   ├── ProblemSolution.tsx       # 3 piliers (Simple, Conforme, Video)
│   │   ├── HowItWorks.tsx           # Process 4 etapes
│   │   ├── Sheikh.tsx                # Section autorite imam (photo parallax, credentials)
│   │   ├── Testimonials.tsx          # 6 temoignages clients
│   │   ├── ImpactCounters.tsx        # Compteurs animes (300 sacrifices, 9000 repas, 1500 familles)
│   │   ├── Offer.tsx                 # Offre principale (140 EUR, inclusions, stock gauge, pricing tiers)
│   │   ├── ComparisonTable.tsx       # Obstacles France vs Solution Qurbaniya (5 lignes)
│   │   ├── FAQ.tsx                   # Accordion FAQ (~10 questions)
│   │   ├── WhyActNow.tsx            # 5 raisons d'urgence
│   │   ├── CTAFinal.tsx              # CTA final gradient bleu
│   │   └── SocialProofBar.tsx        # [COMMENTE] Barre stats (300+ familles, 4.8★)
│   │
│   ├── ui/                           # Composants UI reutilisables
│   │   ├── Button.tsx                # Bouton avec variantes (primary/secondary/ghost) + loading
│   │   ├── Card.tsx                  # Carte animee (hover effects, Framer Motion)
│   │   ├── Badge.tsx                 # Badge colore avec icone
│   │   ├── SectionTitle.tsx          # Titre section anime (accent highlight au scroll)
│   │   ├── SectionWrapper.tsx        # Container section (dark/light, max-width)
│   │   ├── Breadcrumb.tsx            # Fil d'Ariane (Home icon + separateurs)
│   │   ├── StockGauge.tsx            # Barre de progression stock (remaining/total)
│   │   ├── TrustBar.tsx              # 6 badges de confiance horizontaux
│   │   ├── CountdownTimer.tsx        # Compte a rebours Aid (flip-card animation)
│   │   ├── CountdownBadge.tsx        # [ORPHELIN] Badge urgence avec pulse
│   │   ├── FloatingCTA.tsx           # CTA mobile sticky (apparait apres scroll 600px)
│   │   ├── ExitIntentPopup.tsx       # Popup exit-intent (CSS pur, vouvoiement)
│   │   ├── SocialProofToast.tsx      # Notifications rotatives (reservations, temoignages)
│   │   ├── WhatsAppButton.tsx        # Bouton WhatsApp fixe (bottom-right, apparait apres 3s)
│   │   ├── VideoPlaceholder.tsx      # Placeholder video + capture email lead
│   │   ├── ImpactCalculator.tsx      # Calculateur interactif (qty -> repas, familles, prix)
│   │   ├── InlineCTA.tsx             # CTA inline reutilisable (primary/subtle)
│   │   ├── PricingTiers.tsx          # 3 paliers de prix (Early Bird/Standard/Dernier moment)
│   │   ├── CertificatePreview.tsx    # Apercu certificat interactif (nom, date, signature)
│   │   ├── TestimonialCard.tsx       # [ORPHELIN] Carte temoignage standalone
│   │   └── SacrificeQuiz.tsx         # [COMMENTE] Quiz multi-etapes
│   │
│   └── seo/
│       └── JsonLd.tsx                # 6 schemas JSON-LD (Organization, Product, FAQ, Event, Breadcrumb, Website)
│
├── lib/                              # Logique metier et utilitaires
│   ├── constants.ts                  # Source unique : STOCK, PRICE, STATS, MEALS/FAMILIES_PER_SHEEP, AID_DATE
│   ├── utils.ts                      # cn(), formatPrice(), getBaseUrl()
│   ├── validations.ts                # Schema Zod orderSchema + type OrderFormValues
│   ├── stripe.ts                     # Singleton Stripe + PRICE_MOUTON (14000 cents) ⚠️ doublon avec constants.ts
│   ├── resend.ts                     # 3 templates email (confirmation, rappel virement, jour du sacrifice)
│   ├── animations.ts                 # Variants Framer Motion centralises (fadeUp, fadeScale, stagger...)
│   └── supabase/
│       ├── client.ts                 # Client Supabase browser (SSR)
│       └── server.ts                 # Client Supabase server + service role
│
├── types/
│   └── index.ts                      # Types : Order, Inventory, PaymentStatus, PaymentMethod, Intention, OrderFormData
│
├── scripts/
│   └── qa-check.js                   # Script QA (unicode, images, console, env, liens)
│
├── public/
│   ├── logos/                        # 3 logos SVG (dark, light, symbol)
│   └── manifest.json                 # PWA manifest
│
├── middleware.ts                      # Auth guard /mes-commandes -> redirect /login
├── tailwind.config.ts                # Palette islamique (vert + or), fonts, shadows, animations custom
├── next.config.mjs                   # Redirections, security headers, cache immutable, images Unsplash
├── tsconfig.json                     # Strict mode, alias @/
├── postcss.config.mjs                # Plugin Tailwind
├── package.json                      # Scripts : dev, build, start, lint, qa
├── .env.local.example                # Template variables d'environnement
├── CLAUDE.md                         # Documentation projet (a mettre a jour)
└── QA_REPORT.md                      # Rapport QA du 27 mars 2026
```

---

## Routes / Pages du site

| URL | Fichier | Description | Statut |
|-----|---------|-------------|--------|
| `/` | `app/(marketing)/page.tsx` | Landing page (13 sections marketing) | ✅ Fonctionnel |
| `/commander` | `app/(shop)/commander/page.tsx` | Formulaire commande + recapitulatif | ✅ Fonctionnel |
| `/confirmation` | `app/(shop)/confirmation/page.tsx` | Page succes post-paiement | ✅ Fonctionnel |
| `/login` | `app/(account)/login/page.tsx` | Connexion magic link Supabase | ✅ Fonctionnel |
| `/mes-commandes` | `app/(account)/mes-commandes/page.tsx` | Dashboard commandes (protege) | ✅ Fonctionnel |
| `/blog` | `app/blog/page.tsx` | Listing 3 articles | ✅ Fonctionnel |
| `/blog/date-aid-al-adha-2026` | `app/blog/.../page.tsx` | Article date Aid 2026 | ✅ Fonctionnel |
| `/blog/sacrifice-aid-en-ligne-comment-ca-marche` | `app/blog/.../page.tsx` | Article sacrifice en ligne | ✅ Fonctionnel |
| `/blog/prix-mouton-france-2026` | `app/blog/.../page.tsx` | Article prix mouton | ✅ Fonctionnel |
| `/faq` | `app/faq/page.tsx` | Page FAQ | ✅ Fonctionnel |

### Redirections permanentes (301)

| Ancienne URL | Destination |
|--------------|-------------|
| `/offrandes` | `/commander` |
| `/offres` | `/commander` |
| `/sacrifice` | `/commander` |
| `/sacrifice-aid-2026` | `/commander` |

---

## API Routes

| Route | Methode | Description | Statut |
|-------|---------|-------------|--------|
| `/api/orders` | POST | Cree une commande, redirige vers le paiement (Stripe checkout session ou URL confirmation) | 🟡 Partiel — TODO: sauvegarder en DB |
| `/api/stripe/checkout` | POST | Cree une session Stripe checkout (endpoint alternatif) | ✅ Fonctionnel |
| `/api/stripe/webhook` | POST | Recoit les events Stripe (`checkout.session.completed/expired`) | 🟡 Partiel — TODO: save DB, emails, inventaire |
| `/api/paypal` | POST | Stub PayPal | ❌ Non implemente |

---

## Composants et ou ils sont utilises

### Layout (3)

| Composant | Utilise dans |
|-----------|-------------|
| `Header` | `(marketing)/layout`, `blog/layout`, `faq/page`, `commander/page`, `mes-commandes/page`, `confirmation/page` |
| `Footer` | `(marketing)/layout`, `blog/layout`, `faq/page` |
| `StickyTopBar` | `(marketing)/layout` |

### Sections landing (12)

| Composant | Utilise dans |
|-----------|-------------|
| `Hero` | `(marketing)/page` |
| `ProblemSolution` | `(marketing)/page` |
| `HowItWorks` | `(marketing)/page` |
| `Sheikh` | `(marketing)/page` |
| `Testimonials` | `(marketing)/page` |
| `ImpactCounters` | `(marketing)/page` |
| `Offer` | `(marketing)/page` |
| `ComparisonTable` | `(marketing)/page` |
| `FAQ` | `(marketing)/page`, `faq/page` |
| `WhyActNow` | `(marketing)/page` |
| `CTAFinal` | `(marketing)/page` |
| `SocialProofBar` | **COMMENTE** dans `(marketing)/page` — non affiche |

### UI (21)

| Composant | Nb imports | Utilise dans |
|-----------|-----------|-------------|
| `Button` | 14 | OrderForm, ImpactCalculator, ExitIntentPopup, SacrificeQuiz, ComparisonTable, Offer, CertificatePreview, CTAFinal, Header, mes-commandes, confirmation, login |
| `SectionTitle` | 11 | ImpactCounters, Testimonials, HowItWorks, ProblemSolution, WhyActNow, ComparisonTable, FAQ, ImpactCalculator, CertificatePreview, Offer, SacrificeQuiz |
| `Breadcrumb` | 7 | `(marketing)/page`, blog (4 pages), faq, commander |
| `InlineCTA` | 5 | ImpactCounters, Testimonials, Sheikh, HowItWorks, ProblemSolution |
| `Card` | 5 | OrderSummary, ProblemSolution, Offer, OrderForm, FAQ |
| `StockGauge` | 2 | `(marketing)/page`, Offer |
| `CountdownTimer` | 1 | Hero |
| `TrustBar` | 1 | `(marketing)/page` |
| `FloatingCTA` | 1 | `(marketing)/layout` |
| `ExitIntentPopup` | 1 | `(marketing)/layout` |
| `SocialProofToast` | 1 | `(marketing)/layout` |
| `WhatsAppButton` | 1 | `(marketing)/layout` |
| `VideoPlaceholder` | 1 | Hero |
| `ImpactCalculator` | 1 | `(marketing)/page` |
| `PricingTiers` | 1 | Offer |
| `CertificatePreview` | 1 | `(marketing)/page` |
| `SectionWrapper` | 1 | FAQ |
| `Badge` | 1 | Sheikh |
| `CountdownBadge` | **0** | **ORPHELIN — importe nulle part** |
| `TestimonialCard` | **0** | **ORPHELIN — doublon avec version locale dans Testimonials.tsx** |
| `SacrificeQuiz` | **0 actif** | **COMMENTE** dans `(marketing)/page` |

### Forms (2)

| Composant | Utilise dans |
|-----------|-------------|
| `OrderForm` | `commander/page` |
| `OrderSummary` | `commander/page` |

### SEO (1)

| Composant | Utilise dans |
|-----------|-------------|
| `JsonLd` (6 exports) | `layout.tsx`, `(marketing)/page`, 3 articles blog, `faq/page`, `commander/page`, `blog/page` |

---

## Integrations externes

| Service | Fichiers | Statut | Details |
|---------|----------|--------|---------|
| **Supabase Auth** | `lib/supabase/client.ts`, `server.ts`, `middleware.ts`, `login/page.tsx` | ✅ Configure | Magic link OTP, guard `/mes-commandes` |
| **Supabase DB** | `lib/supabase/server.ts`, `mes-commandes/page.tsx` | 🟡 Partiel | Client pret, tables supposees existantes, webhook ne save pas encore |
| **Stripe Checkout** | `lib/stripe.ts`, `api/orders/route.ts`, `api/stripe/checkout/route.ts` | ✅ Fonctionnel | Session checkout avec redirect, prix 140 EUR |
| **Stripe Webhook** | `api/stripe/webhook/route.ts` | 🟡 Partiel | Verification signature OK, mais TODO: save DB, decrement stock, envoyer emails |
| **PayPal** | `api/paypal/route.ts` | ❌ Stub | Route vide, renvoie "coming soon" |
| **Resend (emails)** | `lib/resend.ts` | 🟡 Pret non branche | 3 templates codes (confirmation, rappel virement, jour J), pas appeles depuis le webhook |
| **WhatsApp** | `components/ui/WhatsAppButton.tsx`, `Footer.tsx` | ✅ Fonctionnel | Lien `wa.me` direct (bouton fixe + lien footer) |
| **Framer Motion** | `lib/animations.ts`, tous les composants sections/ui | ✅ Fonctionnel | Variants centralises, animations scroll-reveal |

---

## Variables d'environnement

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal (non utilise pour l'instant)
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Source unique des constantes — `lib/constants.ts`

| Constante | Valeur | Utilisee dans |
|-----------|--------|---------------|
| `STOCK.total` | 200 | StockGauge, Header, StickyTopBar, FloatingCTA, ExitIntentPopup, Offer, SocialProofToast, Hero |
| `STOCK.reserved` | 147 | idem |
| `STOCK.remaining` | 53 | idem |
| `PRICE_AMOUNT` | 140 | ImpactCalculator, composants affichage prix |
| `PRICE_DISPLAY` | "140€" | Offer, OrderSummary, landing sections |
| `PRICE_CENTS` | 14000 | ⚠️ Doublon avec `PRICE_MOUTON` dans `lib/stripe.ts` |
| `MEALS_PER_SHEEP` | 30 | FAQ, WhyActNow, ComparisonTable, ImpactCalculator, ImpactCounters, SacrificeQuiz, blog |
| `FAMILIES_PER_SHEEP` | 5 | idem |
| `STATS.sacrificesCompleted` | 300 | ImpactCounters, SocialProofBar, Testimonials, ExitIntentPopup |
| `STATS.mealsDistributed` | 9000 | idem |
| `STATS.familiesFed` | 1500 | idem |
| `STATS.rating` | 4.8 | idem |
| `STATS.yearsExperience` | 5 | idem |
| `STATS.satisfactionRate` | 100 | idem |
| `AID_DATE` | 2026-05-27 | CountdownTimer, StickyTopBar |
| `AID_YEAR` | "2026" | Divers |

**⚠️ Doublon identifie :** `PRICE_MOUTON = 14000` dans `lib/stripe.ts` duplique `PRICE_CENTS` de `lib/constants.ts`.

---

## Dependances npm

### Production (14 packages)

| Package | Version | Role |
|---------|---------|------|
| next | 14.2.35 | Framework |
| react / react-dom | ^18 | UI |
| typescript | ^5 | Typage |
| tailwindcss | ^3.4.1 | Styles |
| framer-motion | ^12.38.0 | Animations |
| react-hook-form | ^7.72.0 | Formulaires |
| @hookform/resolvers | ^5.2.2 | Validation RHF |
| zod | ^4.3.6 | Schemas validation |
| stripe | ^20.4.1 | Stripe backend |
| @stripe/stripe-js | ^8.11.0 | Stripe frontend |
| @supabase/supabase-js | ^2.100.0 | Supabase client |
| @supabase/ssr | ^0.9.0 | Supabase SSR |
| resend | ^6.9.4 | Emails |
| lucide-react | ^1.6.0 | Icones |
| clsx | ^2.1.1 | Classes dynamiques |
| tailwind-merge | ^3.5.0 | Merge classes Tailwind |

### Dev (7 packages)

| Package | Version | Role |
|---------|---------|------|
| @types/node | ^20 | Types Node |
| @types/react | ^18 | Types React |
| @types/react-dom | ^18 | Types React DOM |
| eslint | ^8 | Linter |
| eslint-config-next | 14.2.35 | Config ESLint Next |
| postcss | ^8 | PostCSS |
| typescript | ^5 | Compilateur TS |
