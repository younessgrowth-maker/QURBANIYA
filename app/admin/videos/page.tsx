import { createServiceRoleClient } from "@/lib/supabase/server";
import { CURRENT_YEAR } from "@/lib/constants";
import type { Order } from "@/types";
import VideosManager from "@/components/admin/VideosManager";

export const dynamic = "force-dynamic";

export interface OrderWithNumber extends Order {
  order_number: number;
  full_name: string;
}

async function fetchPaidOrders(): Promise<OrderWithNumber[]> {
  const supabase = createServiceRoleClient();
  const yearStart = new Date(`${CURRENT_YEAR}-01-01T00:00:00Z`).toISOString();
  const yearEnd = new Date(`${CURRENT_YEAR + 1}-01-01T00:00:00Z`).toISOString();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "paid")
    .gte("created_at", yearStart)
    .lt("created_at", yearEnd)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return (data as Order[]).map((order, idx) => ({
    ...order,
    order_number: idx + 1,
    full_name: `${order.prenom} ${order.nom}`.toUpperCase(),
  }));
}

export default async function AdminVideosPage() {
  const orders = await fetchPaidOrders();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black uppercase text-text-primary">
          Vidéos du jour J
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Glisse-dépose toutes les vidéos reçues du cheikh. Chacune sera associée
          automatiquement à sa commande via le N° visible sur l&apos;étiquette,
          puis tu pourras envoyer l&apos;email de livraison d&apos;un clic.
        </p>
      </div>

      <VideosManager initialOrders={orders} />
    </div>
  );
}
