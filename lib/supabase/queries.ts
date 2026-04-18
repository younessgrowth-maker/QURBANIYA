import { createServiceRoleClient } from "./server";

export interface InventoryView {
  total: number;
  reserved: number;
  remaining: number;
  isOpen: boolean;
}

function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function getInventory(year: number): Promise<InventoryView | null> {
  if (!supabaseConfigured()) return null;

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("inventory")
      .select("total_slots, reserved_slots, is_open")
      .eq("year", year)
      .single();

    if (error || !data) return null;

    return {
      total: data.total_slots,
      reserved: data.reserved_slots,
      remaining: data.total_slots - data.reserved_slots,
      isOpen: data.is_open,
    };
  } catch {
    return null;
  }
}
