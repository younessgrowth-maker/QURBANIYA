# BRIEF — Qurbaniya (pour nouvelle session Claude)

> À lire en premier. Ce document donne tout le contexte nécessaire pour reprendre le projet.

---

## 1. Projet

**Qurbaniya** — Plateforme e-commerce de sacrifice en ligne pour l'Aïd al-Adha.

- **Domaine** : `https://qurbaniya.fr`
- **Stack** : Next.js 14.2.35 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS 3.4
- **Langue** : Français uniquement · vouvoiement obligatoire
- **Cible** : Musulmans en France qui ne peuvent pas organiser leur sacrifice sur place
- **Value prop** : Sacrifice à Madagascar, conforme à la Sunnah, 140€, vidéo nominative WhatsApp
- **État actuel** : Front-end terminé, back-end partiellement connecté (Stripe checkout OK, webhook TODO)

## 2. Règles de collaboration

- **Ton** : Chaleureux, respectueux, vouvoiement. Terminologie islamique naturelle.
- **Source unique de vérité** : Toutes les données (stock, prix, stats, dates) sont dans `lib/constants.ts`. Ne JAMAIS hardcoder dans les composants.
- **Pas de placeholder** : Tout texte affiché doit être finalisé (pas de Lorem, pas de TODO visible, pas d'anglais par défaut).
- **Animations autorisées** : fade, slide, scale, blur. **Interdites** : bounce, rotate, shake.
- **Imports** : Alias `@/` pour la racine.
- **Typographie** : Playfair Display (serif) pour les titres, Inter pour le body.

## 3. Pages (12 routes)

| Route | Fichier | État |
|-------|---------|------|
| `/` | `app/(marketing)/page.tsx` | ✅ Complet (13 sections) |
| `/commander` | `app/(shop)/commander/page.tsx` | ✅ Form React Hook Form + Zod |
| `/confirmation` | `app/(shop)/confirmation/page.tsx` | ✅ Page post-paiement |
| `/login` | `app/(account)/login/page.tsx` | ✅ Magic link Supabase |
| `/mes-commandes` | `app/(account)/mes-commandes/page.tsx` | ✅ Dashboard (route protégée) |
| `/blog` | `app/blog/page.tsx` | ✅ Listing |
| `/blog/[slug]` | 3 articles SEO | ✅ Contenu finalisé |
| `/faq` | `app/faq/page.tsx` | ✅ |
| `/error`, `/not-found` | | ✅ Pages custom |

## 4. API routes (4)

| Endpoint | État | À faire |
|----------|------|---------|
| `POST /api/orders` | ✅ Validation Zod | TODO : save Supabase `status=pending` |
| `POST /api/stripe/checkout` | ✅ Session Stripe OK | — |
| `POST /api/stripe/webhook` | ⚠️ Structure OK | **TODO bloquant lancement** : save en DB, décrémenter inventaire, déclencher emails Resend |
| `POST /api/paypal` | ❌ Stub | Implémenter PayPal SDK |

## 5. Intégrations

| Service | Statut | Variables |
|---------|--------|-----------|
| **Supabase** (auth + DB) | Configuré | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Stripe** | Checkout OK | `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` |
| **Resend** (emails) | 3 templates prêts non branchés | `RESEND_API_KEY` |
| **PayPal** | Stub | `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` |

## 6. Constantes critiques (`lib/constants.ts`)

```ts
STOCK       : { total: 200, reserved: 147, remaining: 53 }
MEALS_PER_SHEEP    : 30    // source : Cheikh Omar
FAMILIES_PER_SHEEP : 5
PRICE_AMOUNT       : 140
PRICE_DISPLAY      : "140€"
PRICE_CENTS        : 14000 // Stripe
STATS              : { sacrificesCompleted: 300, mealsDistributed: 9000, familiesFed: 1500, rating: 4.8, yearsExperience: 5, satisfactionRate: 100 }
AID_DATE           : 2026-05-27
AID_YEAR           : "2026"
```

## 7. Structure landing page (ordre conversion)

1. Hero + StockGauge + TrustBar
2. ProblemSolution (empathie) + CTA
3. HowItWorks (processus) + CTA
4. Sheikh (autorité) + CTA
5. Testimonials (preuve sociale) + CTA
6. ImpactCalculator (engagement)
7. Offer (prix 140€)
8. ComparisonTable (objections)
9. ImpactCounters + CTA
10. CertificatePreview
11. FAQ
12. WhyActNow (urgence)
13. CTAFinal

## 8. Historique

Voir `CLAUDE.md` pour l'historique complet des 6 sprints et toutes les corrections effectuées.

## 9. Où aller chercher quoi

- **Design system** → `DESIGN_SYSTEM.md` dans ce dossier
- **Todo avant lancement** → `LAUNCH_CHECKLIST.md` dans ce dossier
- **Logos** → `logos/` dans ce dossier (SVG + PNG 1024px)
- **État QA** → `QA_REPORT.md` dans ce dossier
- **Historique détaillé** → `CLAUDE.md` dans ce dossier
- **Code source** → `/Users/younesselyacoubi/Documents/QURBA2` (racine du projet)
