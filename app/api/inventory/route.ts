import { NextResponse } from "next/server";
import { getInventory } from "@/lib/supabase/queries";
import { CURRENT_YEAR } from "@/lib/constants";

// Endpoint public lu par les widgets client pour savoir si les réservations
// sont encore ouvertes. Revalidation courte (30s) : on veut que la bascule
// "complet" se propage rapidement sans marteler Supabase.
export const revalidate = 30;

export async function GET() {
  const inventory = await getInventory(CURRENT_YEAR);

  if (!inventory) {
    // Fail-open : Supabase injoignable → on considère que c'est ouvert.
    // Le vrai garde-fou reste côté /api/orders qui refusera la commande si besoin.
    return NextResponse.json({
      total: null,
      reserved: null,
      remaining: null,
      isOpen: true,
      isFull: false,
    });
  }

  return NextResponse.json({
    total: inventory.total,
    reserved: inventory.reserved,
    remaining: inventory.remaining,
    isOpen: inventory.isOpen,
    isFull: !inventory.isOpen || inventory.remaining <= 0,
  });
}
