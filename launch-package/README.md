# 📦 Launch Package — Qurbaniya

> Dossier à fournir à une nouvelle session Claude pour reprendre le projet proprement et préparer le lancement.

---

## Comment l'utiliser

**Ouvre une nouvelle conversation avec Claude** et démarre avec ce message :

> Je lance mon site Qurbaniya (sacrifice en ligne pour l'Aïd al-Adha) très bientôt.
> Lis dans l'ordre : `launch-package/BRIEF.md`, `launch-package/DESIGN_SYSTEM.md`, `launch-package/LAUNCH_CHECKLIST.md`, puis `launch-package/CLAUDE.md` et `launch-package/QA_REPORT.md` pour le contexte complet.
> Le code source est à la racine du projet (`app/`, `components/`, `lib/`).
> Aide-moi à cocher les cases bloquantes de la checklist pour pouvoir lancer.

Claude aura alors tout le contexte pour t'aider efficacement.

---

## Contenu du dossier

| Fichier | Contenu |
|---------|---------|
| **`README.md`** | Ce fichier — mode d'emploi du dossier |
| **`BRIEF.md`** | 🎯 Vue d'ensemble du projet (à lire en premier) |
| **`DESIGN_SYSTEM.md`** | 🎨 Palette, typographie, composants, conventions |
| **`LAUNCH_CHECKLIST.md`** | ✅ Checklist lancement : bloquants, importants, nice-to-have |
| **`QA_REPORT.md`** | 🔍 Rapport QA complet avec statut des corrections |
| **`CLAUDE.md`** | 📚 Historique détaillé des 6 sprints + conventions |
| **`logos/`** | 🖼️ Tous les logos (SVG vectoriels + PNG 1024px) |

---

## Logos disponibles

**SVG (qualité infinie, pour imprimeurs) :**
- `qurbaniya-symbol.svg` — icône seule (favicon, app)
- `qurbaniya-logo-light.svg` — logo complet fond clair
- `qurbaniya-logo-dark.svg` — logo complet fond sombre

**PNG 1024px (pour WhatsApp/email, packaging) :**
- `qurbaniya-symbol-1024.png`
- `qurbaniya-logo-light-1024.png`
- `qurbaniya-logo-dark-1024.png`

Design : croissant doré (dégradé 3 stops) + étoile 5 branches + wordmark serif "QURBANI**YA**".

---

## État du projet en date

- **Frontend** : ✅ Complet (13 sections landing, 12 pages, 39 composants)
- **Paiement Stripe** : ⚠️ Checkout OK, webhook partiellement implémenté (TODO bloquant)
- **Emails Resend** : ⚠️ 3 templates prêts, pas encore branchés au webhook
- **Supabase DB** : ⚠️ Auth OK, tables `orders`/`inventory` à créer
- **PayPal** : ❌ Stub, à implémenter
- **Pages légales** : ❌ À rédiger (Mentions légales, CGV, RGPD)
- **SEO** : ✅ Metadata, OG, structured data, sitemap, robots
- **Design** : ✅ Conforme au design system, vouvoiement 100%, dates 2026

**Prochaine étape critique** : finaliser le webhook Stripe pour que les commandes soient sauvegardées en DB et que les emails partent automatiquement.
