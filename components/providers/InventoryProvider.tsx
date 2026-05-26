"use client";

import { createContext, useContext, type ReactNode } from "react";

// ─── Contexte d'inventaire global pour les CTAs publics ──────────────────
// Pourquoi un contexte plutôt qu'un fetch dans chaque CTA :
//   - L'inventaire est déjà fetché côté serveur dans marketing/layout.tsx
//     (1 seul appel Supabase par requête). Plutôt que de re-fetch dans
//     chaque composant client (N×/api/inventory), on hydrate les CTAs
//     via ce contexte.
//   - Quand stock=0, on veut basculer le label de TOUS les CTAs publics
//     ("RÉSERVER 140€" → "LISTE D'ATTENTE 2027") en cohérence. Sans
//     contexte, certains CTAs garderaient l'ancien label car ils sont
//     statiques (Hero, Offer, CTAFinal, ComparisonTable…) → frustration
//     visiteur qui clique avant de découvrir le sold-out.
//
// Valeur par défaut : open (au cas où le contexte n'est pas wrappé,
// fallback sur le comportement actuel sans casser le site).

export interface InventoryState {
  remaining: number;
  total: number;
  isSoldOut: boolean;
}

const InventoryContext = createContext<InventoryState>({
  remaining: 53,
  total: 300,
  isSoldOut: false,
});

export function InventoryProvider({
  remaining,
  total,
  children,
}: {
  remaining: number;
  total: number;
  children: ReactNode;
}) {
  const value: InventoryState = {
    remaining,
    total,
    isSoldOut: remaining <= 0,
  };
  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory(): InventoryState {
  return useContext(InventoryContext);
}
