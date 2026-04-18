# LAUNCH CHECKLIST — Qurbaniya

> À parcourir dans l'ordre avant de lancer sur internet. Cases cochées = prêt, cases vides = à faire.

---

## 🔴 BLOQUANTS LANCEMENT (obligatoires)

### Paiement & Commandes
- [ ] **Webhook Stripe** : sauvegarder la commande en DB Supabase après `checkout.session.completed` (`app/api/stripe/webhook/route.ts`)
- [ ] **Webhook Stripe** : décrémenter l'inventaire (`STOCK.reserved`) dans Supabase après paiement réussi
- [ ] **Webhook Stripe** : marquer commande comme `failed` si `checkout.session.expired`
- [ ] **Branchement Resend** : déclencher `sendOrderConfirmation()` après paiement (template déjà codé dans `lib/resend.ts`)
- [ ] **Form `/api/orders`** : sauvegarder en DB Supabase avec `status=pending` (TODO ligne 11)
- [ ] **Tester un paiement de bout en bout** : form → Stripe → webhook → DB → email → dashboard

### Données & Infra
- [ ] **Créer la table `orders` dans Supabase** conforme à `types/index.ts`
- [ ] **Créer la table `inventory`** avec colonnes `year`, `total_slots`, `reserved_slots`, `is_open`
- [ ] **RPC `decrement_slots(year)`** pour décrément atomique
- [ ] **RLS policies Supabase** : utilisateur ne peut lire QUE ses propres commandes
- [ ] **Remplacer `lib/constants.ts STOCK`** par fetch Supabase temps réel (TODO ligne 2)
- [ ] **WhatsApp** : remplacer le numéro fake `33600000000` dans `components/ui/WhatsAppButton.tsx`

### Légal (obligatoire e-commerce France)
- [ ] **Page Mentions légales** (`/mentions-legales`) — actuellement placeholder dans footer
- [ ] **Page CGV** (`/cgv`) — actuellement placeholder dans footer
- [ ] **Page Politique de confidentialité** (RGPD)
- [ ] **Bandeau cookies** si tracking tiers (GA, Meta Pixel)
- [ ] **Droit de rétractation** : formulation claire (14 jours ou exception religieuse)

### Vidéo du cheikh
- [ ] **Tournage vidéo** avec Cheikh Omar (message avant commande)
- [ ] **Remplacer `VideoPlaceholder`** par le vrai player dans `components/sections/Hero.tsx`

---

## 🟡 IMPORTANTS (à faire avant lancement public)

### SEO & Marketing
- [ ] **Google Search Console** : vérification propriété + soumission sitemap
- [ ] **Google Analytics 4** ou alternative (Plausible, Umami) — tracking conversions
- [ ] **Meta Pixel** / TikTok Pixel si publicité prévue
- [ ] **Open Graph image** haute qualité (1200x630) pour partages sociaux
- [ ] **Favicon complet** (16, 32, 192, 512 + apple-touch-icon)
- [ ] **Tester parts sociaux** : WhatsApp, Facebook, Twitter, LinkedIn

### Performance
- [ ] **Lighthouse score** > 90 sur mobile + desktop (Performance, SEO, A11y, Best practices)
- [ ] **Images optimisées** : AVIF/WebP, lazy loading, tailles correctes
- [ ] **Core Web Vitals** : LCP < 2.5s, FID < 100ms, CLS < 0.1

### Accessibilité
- [ ] **Tests clavier** : toute la navigation fonctionne sans souris
- [ ] **Contraste WCAG AA** : vérifier tous les textes sur fonds colorés
- [ ] **Screen reader** : labels aria sur tous les inputs et boutons icon-only

### Monitoring & Support
- [ ] **Sentry** (ou Vercel Error Tracking) pour les erreurs runtime
- [ ] **Uptime monitoring** (Better Uptime, UptimeRobot)
- [ ] **Email support** configuré : `contact@qurbaniya.fr` avec auto-répondeur
- [ ] **WhatsApp Business** : numéro officiel configuré

---

## 🟢 NICE-TO-HAVE (post-lancement possible)

- [ ] **Dashboard admin** : gestion commandes, inventaire, export CSV
- [ ] **Implémenter PayPal** (actuellement stub dans `/api/paypal`)
- [ ] **Formulaire virement bancaire** : RIB affiché + référence unique
- [ ] **Téléchargement vidéo sacrifice** dans `/mes-commandes` (post-Aïd)
- [ ] **Téléchargement certificat PDF** dans `/mes-commandes`
- [ ] **A/B test** sur Hero CTA (couleur, copy)
- [ ] **Retarget** : email flow pour paniers abandonnés
- [ ] **PWA complète** (manifest.json déjà présent, ajouter service worker)
- [ ] **Multi-langue** (arabe ?)

---

## 🚀 DÉPLOIEMENT

### Hébergement recommandé : Vercel
1. Connecter repo GitHub à Vercel
2. Configurer les variables d'environnement (voir `BRIEF.md` section 5)
3. Domaine custom : pointer `qurbaniya.fr` vers Vercel (CNAME / A record)
4. Activer Analytics Vercel + Speed Insights
5. Branch `main` = production, `staging` = preview

### Variables d'environnement production
Les clés doivent être en **mode LIVE** (pas test) :
- `STRIPE_SECRET_KEY` → `sk_live_...`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
- `STRIPE_WEBHOOK_SECRET` → webhook endpoint live
- `RESEND_API_KEY` → clé live
- `NEXT_PUBLIC_BASE_URL` → `https://qurbaniya.fr`

### Post-déploiement
- [ ] Tester un paiement réel avec carte test Stripe LIVE puis refund
- [ ] Vérifier tous les emails arrivent (pas en spam)
- [ ] Tester le webhook Stripe en production (Stripe dashboard → Events)
- [ ] Tester auth magic link Supabase en production (domain whitelisted ?)
- [ ] 404/error pages s'affichent correctement en prod
- [ ] Robots.txt n'interdit pas l'indexation (sauf routes privées)

---

## CONTACTS & REFERENCES

- **Stripe dashboard** : https://dashboard.stripe.com
- **Supabase project** : voir `.env.local` pour URL
- **Vercel** : à créer
- **Resend** : https://resend.com
- **Cheikh Omar** : source des chiffres impact (30 repas / 5 familles par mouton)
