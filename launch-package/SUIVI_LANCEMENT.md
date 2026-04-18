# Suivi du lancement — Qurbaniya

> Document de bord mis à jour à chaque étape. Point d'entrée pour reprendre là où on s'est arrêté.
>
> **Dernière mise à jour** : 2026-04-18

---

## Où on en est

| Bloc | État |
|---|---|
| Front-end (13 sections, blog, FAQ, tunnel) | TERMINÉ |
| Back-end paiement (code) | TERMINÉ |
| **Supabase** (base de données) | BRANCHÉ |
| **Stripe** (paiements) | CLÉS TEST INSTALLÉES |
| **Stripe Live** (vrais paiements) | CLÉS SAUVEGARDÉES pour Vercel |
| **Resend** (emails) | 100% FONCTIONNEL (test email envoyé avec succès) |
| **Domaine qurbaniya.fr** | ACHETÉ (registrar à préciser) |
| **Vercel** (hébergeur) | PAS ENCORE |
| Webhook Stripe (prod) | PAS ENCORE |
| Photo remplaçant la vidéo cheikh | PAS ENCORE |
| Pages légales (CGV, mentions, RGPD) | PAS ENCORE — SIRET dispo, à rédiger |
| Numéro WhatsApp réel | PAS ENCORE |

---

## Infos collectées

| Info | Valeur |
|---|---|
| Email utilisateur | younessgrowth@gmail.com |
| SIRET | OUI (obtenu) — détails à collecter pour les mentions légales |
| Domaine | qurbaniya.fr — acheté, registrar non précisé |
| Stripe account | Créé, mode Test + Live actifs |
| Supabase project URL | https://smhpeolksotaabdnfcxf.supabase.co |
| Supabase project name | qurbaniya (région : Central EU / Frankfurt) |

---

## Fichiers créés / modifiés pendant le setup

### Code
- `app/api/orders/route.ts` — insert commande pending en DB (Stripe + virement paths)
- `app/api/stripe/webhook/route.ts` — update paid + décrément inventaire + email Resend
- `app/(marketing)/page.tsx` — fetch stock live depuis Supabase (SSR, revalidate 60s)
- `lib/supabase/queries.ts` — `getInventory(year)` avec fallback gracieux si env vars absentes
- `lib/constants.ts` — `CURRENT_YEAR` ajouté, commentaire fallback sur `STOCK`
- `supabase/migrations/0001_init.sql` — script SQL des tables `orders` + `inventory` + RPC + RLS

### Configuration
- `.env.local` — clés Supabase + Stripe TEST (gitignored)
- `.env.production.local` — clés Supabase + Stripe LIVE pour Vercel (gitignored)
- `.claude/launch.json` — config dev server
- `launch-package/.claude/launch.json` — idem (cwd launch-package)

### Documentation
- `/Users/younesselyacoubi/.claude/plans/je-lance-mon-site-sharded-pinwheel.md` — plan initial du branchement back-end
- `launch-package/SUIVI_LANCEMENT.md` — ce fichier

---

## Étapes réalisées (journal)

### Sprint back-end (terminé)
1. Lecture du projet (BRIEF, DESIGN_SYSTEM, LAUNCH_CHECKLIST, QA_REPORT, CLAUDE.md)
2. Exploration du code (API routes, Supabase, Resend, types)
3. Plan back-end paiement rédigé + approuvé
4. Code webhook Stripe terminé (update + décrément + email)
5. Code `/api/orders` terminé (insert pending Stripe + virement)
6. SQL migrations écrites
7. `getInventory()` + SSR live stock landing page
8. Lint + types : OK, QA : 0 erreur

### Setup Supabase (terminé)
9. Compte Supabase créé (org `younessgrowth-maker's Org`)
10. Projet `qurbaniya` créé en région EU Central
11. API keys récupérées (anon + service_role)
12. `.env.local` configuré
13. Migration SQL 0001 exécutée dans Supabase (tables + RPC + RLS)
14. Vérification : site lit `53 places restantes` depuis la DB → OK

### Setup Stripe (en cours de finalisation)
15. Compte Stripe créé
16. Activation Live demandée (SIRET fourni)
17. 4 clés récupérées (pk_test, sk_test, pk_live, sk_live)
18. Clés Test installées dans `.env.local`
19. Clés Live sauvegardées dans `.env.production.local` pour Vercel

### Setup Resend (terminé)
20. Compte Resend créé
21. Domaine `qurbaniya.fr` ajouté (région eu-west-1 / Irlande)
22. DNS records ajoutés chez IONOS (DKIM + SPF + MX)
23. Domaine vérifié (2026-04-18 17:52)
24. Clé API créée et installée dans `.env.local` + `.env.production.local`
25. Test email envoyé avec succès (ID: faf10a93-216e-417b-8b19-899367bf7597)
26. Registrar DNS : **IONOS** (retenu pour pointer qurbaniya.fr vers Vercel plus tard)

---

## Prochaines étapes (dans l'ordre)

1. **Resend** — créer le compte + vérifier qurbaniya.fr (DNS) + récupérer clé API
2. **Stripe CLI** (optionnel) OU passer directement à Vercel pour tester le webhook en vrai
3. **Déploiement Vercel** — connecter le repo GitHub, coller les env vars
4. **Domaine** — pointer qurbaniya.fr vers Vercel (DNS CNAME/A)
5. **Webhook Stripe prod** — créer endpoint dans Stripe dashboard (Live) → récupérer whsec_...
6. **Test bout-en-bout en prod** (carte Stripe live + refund immédiat)
7. **Photo** pour remplacer VideoPlaceholder
8. **Pages légales** (mentions, CGV, RGPD) — rédaction avec infos SIRET
9. **Numéro WhatsApp réel** — remplacer 33600000000
10. **Analytics** (GA4 ou Plausible)
11. **Monitoring** (Sentry ou équivalent)
12. **Test final + go-live public**

---

## Ce qu'il me manque côté utilisateur

- [ ] **Registrar du domaine** (OVH, Gandi, Cloudflare, Namecheap...) → pour guider l'ajout des DNS Resend
- [ ] **Infos entreprise complètes** pour les mentions légales :
  - Raison sociale (nom SAS)
  - Adresse siège
  - SIRET (chiffres)
  - Forme juridique (SAS, SASU, EURL, etc.)
  - Nom du représentant légal
  - Hébergeur retenu (Vercel → on remplira avec leurs infos)
- [ ] **Numéro WhatsApp Business** réel (ou perso si pas encore Business)
- [ ] **IBAN/BIC du compte pro** (pour le template email virement)
- [ ] **Photo** pour remplacer la vidéo cheikh (fournie ou trouvée par moi sur Unsplash)
- [ ] **Compte Vercel** (à créer avec GitHub)
- [ ] **Repo GitHub** du projet (existe déjà ? ou à créer et pusher ?)

---

## Règle de sécurité

- Les clés secrètes (Stripe sk_*, Supabase service_role) sont **uniquement** dans `.env.local` et `.env.production.local`
- Ces fichiers sont **gitignorés** (`.env*.local` dans `.gitignore`) → aucune fuite possible sur GitHub
- Les clés Live doivent être copiées dans Vercel UI au déploiement, pas commitées
- Rotation recommandée : après chaque partage de clés dans un chat, régénérer les clés dans le dashboard (pas urgent, à faire avant go-live public)
