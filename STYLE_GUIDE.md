# STYLE_GUIDE.md — Qurbaniya "Sacred Trust"

## Identité

**Direction :** Sacred Trust
**Concept :** La piété accessible — un service religieux numérique qui inspire la même confiance qu'une mosquée.
**Adjectifs :** Piété · Sérénité · Légitimité · Simplicité · Chaleur
**Message subliminal :** "Ce service est géré par des gens de confiance qui respectent ma religion."

---

## Palette de couleurs

### Primaires
| Token | Hex | Usage | Justification |
|-------|-----|-------|---------------|
| `primary` | `#1B4332` | CTA principaux, header, accents forts | Vert profond islamique — couleur du Prophète ﷺ, des mosquées, des drapeaux. Communique piété et légitimité religieuse |
| `primary-light` | `#2D6A4F` | Hover, badges, fond léger | Version plus claire pour hover et badges |
| `primary-dark` | `#14342A` | Active states, footer | Version sombre pour les fonds dark |

### Secondaires
| Token | Hex | Usage | Justification |
|-------|-----|-------|---------------|
| `gold` | `#B8860B` | Prix, accents premium, étoiles | Or islamique — rappelle les dômes des mosquées, le luxe accessible. Le prix en or dit "valeur exceptionnelle" |
| `gold-light` | `#D4A843` | Hover or, highlights | Version claire pour accents secondaires |
| `gold-dark` | `#8B6508` | Active states or | Version sombre |

### Fonds
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#FEFCF8` | Fond principal (ivoire très chaud) |
| `bg-secondary` | `#F7F3ED` | Sections alternées (sable clair) |
| `bg-tertiary` | `#EFE9DF` | Cards, inputs, hover |
| `bg-dark` | `#1B4332` | Footer, hero overlay, CTA final |

### Textes
| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#1A1A18` | Titres, texte principal |
| `text-muted` | `#5C5347` | Sous-titres, descriptions |
| `text-muted-light` | `#8C8279` | Placeholders, dates, micro-copy |

### Statuts
| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#2D6A4F` | Confirmations, checkmarks |
| `warning` | `#D4A843` | Attente, en cours |
| `error` | `#C0392B` | Erreurs, urgence |
| `info` | `#1B4332` | Informations |

---

## Typographie

### Fonts
- **Titres :** Playfair Display (serif) — Évoque la tradition, l'autorité spirituelle, le sérieux. Serif = institution, crédibilité.
- **Corps :** Inter (sans-serif) — Lisibilité maximale, modernité, neutralité professionnelle.

### Échelle
| Élément | Taille | Poids | Line-height | Letter-spacing |
|---------|--------|-------|-------------|----------------|
| H1 (Hero) | clamp(2.8rem, 6vw, 4.5rem) | 700 | 1.05 | -0.02em |
| H2 (Section) | clamp(1.8rem, 4vw, 2.8rem) | 700 | 1.1 | -0.01em |
| H3 (Card title) | 1.25rem | 600 | 1.3 | 0 |
| Body | 1.0625rem (17px) | 400 | 1.7 | 0 |
| Body small | 0.9375rem (15px) | 400 | 1.6 | 0 |
| Caption | 0.8125rem (13px) | 500 | 1.4 | 0.02em |
| Badge | 0.6875rem (11px) | 700 | 1 | 0.08em |

### Règles
- Titres : Playfair Display, jamais uppercase sauf badges
- Corps : Inter, weight 400 par défaut, 500 pour emphasis
- Bold : réservé aux prix, noms, et CTAs
- Italique : réservé aux citations du cheikh et aux du'a
- Uppercase : badges et boutons uniquement

---

## Bordures & Formes

- **Cards :** `border-radius: 16px`
- **Boutons :** `border-radius: 10px`
- **Inputs :** `border-radius: 10px`
- **Badges :** `border-radius: 999px` (pill)
- **Bordures :** `1px solid rgba(26,26,24,0.08)` — invisibles presque, pas de gris dur
- **Séparateurs :** Gradient `from-transparent via-primary/10 to-transparent`

---

## Ombres

| Niveau | Valeur CSS | Usage |
|--------|-----------|-------|
| Soft | `0 1px 3px rgba(26,26,24,0.04), 0 4px 12px rgba(26,26,24,0.03)` | Cards au repos |
| Medium | `0 2px 6px rgba(26,26,24,0.06), 0 8px 24px rgba(26,26,24,0.05)` | Cards hover, dropdowns |
| Elevated | `0 4px 12px rgba(26,26,24,0.08), 0 16px 40px rgba(26,26,24,0.06)` | Modales, Offer card |
| Glow-primary | `0 4px 20px rgba(27,67,50,0.2)` | Bouton primary hover |
| Glow-gold | `0 4px 20px rgba(184,134,11,0.15)` | Bouton gold hover |

---

## Espacements

**Base unit : 4px**

| Token | Valeur | Usage |
|-------|--------|-------|
| xs | 4px | Gap entre icône et texte |
| sm | 8px | Padding badges, petits gaps |
| md | 16px | Padding inputs, gaps cards |
| lg | 24px | Padding sections, marges |
| xl | 32px | Séparation composants |
| 2xl | 48px | Séparation sections |
| 3xl | 64px | Séparation majeures |

**Padding composants :**
- Cards : 28px (desktop), 20px (mobile)
- Boutons lg : 18px 36px
- Boutons md : 12px 24px
- Inputs : 14px 16px
- Sections : 64px 0 (desktop), 48px 0 (mobile)

---

## Animations

| Type | Durée | Easing | Usage |
|------|-------|--------|-------|
| Fast | 150ms | ease-out | Hover, focus, toggle |
| Normal | 300ms | ease-out | Cards, sections, reveals |
| Slow | 500ms | ease-out | Hero entrance, modales |
| Spring | type: "spring", stiffness: 200, damping: 20 | Checkmarks, confetti |

**Autorisé :** fade-in, slide-up, scale, blur-in
**Interdit :** bounce, rotate, shake, flash — trop playful pour un service religieux
**Philosophie :** Utilitaire et sereine — chaque animation guide le regard, jamais décorative

---

## Iconographie

- **Set :** Lucide React (déjà en place)
- **Style :** Outlined, 1.5px stroke
- **Tailles :** 14px (inline), 18px (cards), 24px (sections), 32px (hero)
- **Couleur :** primary ou gold, jamais noir pur

---

## Ton & Micro-copy

**Ton :** Chaleureux, respectueux, rassurant
**Vouvoiement :** Oui, toujours
**Terminologie islamique :** Utilisée naturellement (Sunnah, Niyyah, Barakallah, In sha Allah)

**Boutons :** Affirmatifs, directs → "Commander", "Finaliser", "Suivre"
**Erreurs :** Doux → "Veuillez vérifier ce champ" (pas "Erreur !")
**Empty states :** Encourageants → "Réservez votre sacrifice maintenant"
**Jamais :** Exclamation excessive, humour, langage familier, tutoiement
