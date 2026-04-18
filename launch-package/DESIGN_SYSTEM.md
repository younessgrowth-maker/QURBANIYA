# DESIGN SYSTEM — Qurbaniya

## Palette de couleurs

### Primaires
| Rôle | Hex | Usage |
|------|-----|-------|
| Emerald / Primary | `#1B4332` | Vert islamique principal (CTAs secondaires, badges trust) |
| Gold | `#C9A84C` | Accent premium (prix, YA dans wordmark, icônes) |
| Gold light | `#EACE7E` | Dégradé doré (point haut) |
| Gold dark | `#8B6508` | Dégradé doré (point bas) |

### Textes
| Rôle | Hex | Usage |
|------|-----|-------|
| Text primary | `#1A1A18` | Titres, corps principal |
| Text muted | `#5C5347` | Sous-titres, taglines |
| Text muted light | `#8C8279` | Labels secondaires |

### Fonds
| Rôle | Hex | Usage |
|------|-----|-------|
| BG primary | `#FDFCF8` | Fond principal (blanc cassé chaud) |
| BG secondary | `#F5F0E8` | Sections alternées |
| BG tertiary | `#EFE7D7` | Cards, inputs |
| BG dark | `#0C0F0A` | Footer, sections dark |

### États
| Rôle | Hex |
|------|-----|
| Success | `#2D6A4F` |
| Warning | `#D4A843` |
| Error | `#C1272D` |
| Urgency (rouge CTA) | `#C1272D` |

## Typographie

```ts
// app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";
```

| Usage | Police | Poids |
|-------|--------|-------|
| Titres H1/H2 | **Playfair Display** (serif) | 700-900 |
| Corps, boutons, UI | **Inter** (sans-serif) | 400-700 |
| Monospaces | system mono | — |

### Échelle typographique
- H1 : `text-5xl md:text-6xl` (Playfair, 900)
- H2 : `text-3xl md:text-4xl` (Playfair, 700)
- H3 : `text-xl md:text-2xl` (Playfair ou Inter, 700)
- Body : `text-base md:text-lg` (Inter, 400)
- Small : `text-sm` (Inter, 400-500)
- Caption : `text-xs` (Inter, 600, letter-spacing + uppercase pour labels)

## Espacements & radius

| Token | Valeur | Usage |
|-------|--------|-------|
| Card radius | `16px` (`rounded-card`) | Cards, boxes principales |
| Button radius | `10px` (`rounded-button`) | CTAs |
| Input radius | `10px` (`rounded-input`) | Form fields |
| Section padding | `py-16 md:py-24` | Padding vertical des sections |

## Ombres

```ts
shadow-soft       // subtile, cards standards
shadow-medium     // cards mises en avant
shadow-elevated   // modals, popups
shadow-glow-primary  // focus vert
shadow-glow-gold     // focus/hover doré
```

## Animations (framer-motion)

**Variants centralisés** dans `lib/animations.ts` :
- `fadeUp` / `fadeUpSubtle`
- `fadeSlideLeft` / `fadeSlideRight`
- `fadeScale`
- `staggerContainer` / `staggerChild`

**Easing** : `[0.16, 1, 0.3, 1]` (EASE_OUT_EXPO)

**Durations** : fast 0.2s · base 0.3s · medium 0.4s · slow 0.6s

**Interdites** : bounce, rotate, shake

## Icônes

Bibliothèque unique : **Lucide React** · stroke 1.5-2.5 · outlined.

## Logos

| Fichier | Usage |
|---------|-------|
| `qurbaniya-symbol.svg` | Icône 32px (header, footer, login) |
| `qurbaniya-logo-light.svg` | Logo complet fond clair (SEO, certificats) |
| `qurbaniya-logo-dark.svg` | Logo complet fond sombre |

Design : crescent doré (dégradé 3 stops) + étoile 5 branches + wordmark Playfair Display "QURBANI**YA**" (YA en dégradé doré) + tagline `SACRIFICE CONFORME · AÏD AL-ADHA`.

## Composants réutilisables (ui/)

- `Button` — variants : primary gold, secondary emerald, outline, ghost
- `Badge` — variants : success, warning, urgency, neutral
- `Card` — radius card, shadow-soft
- `SectionTitle` — avec accent coloré (span `<accent>`)
- `SectionWrapper` — padding cohérent
- `InlineCTA` — CTA réutilisable après conviction
- `CountdownTimer` — countdown Aïd
- `StockGauge` — barre progression stock
- `TrustBar` — 6 badges confiance (grille 3x2)
- `ImpactCalculator` — slider quantité moutons
- `VideoPlaceholder` — à remplacer par vrai player vidéo cheikh
- `ExitIntentPopup` — popup sortie CSS pur
- `SocialProofToast` — toast "X vient de réserver"
- `FloatingCTA` + `WhatsAppButton` — fixed bottom right

## Conventions de code

- **TypeScript strict**, pas de `any`
- **React Hook Form + Zod** pour tous les forms
- **Server Components** par défaut, `"use client"` uniquement si nécessaire (state, effects, event handlers)
- **Import paths** : `@/components`, `@/lib`, `@/app`, `@/types`
- **Tests visuels** avant chaque commit : `npm run qa`
