import { createServiceRoleClient } from "@/lib/supabase/server";
import { CURRENT_YEAR } from "@/lib/constants";
import { expandOrderToSacrifices, type SacrificeItem } from "@/lib/sacrifices";
import type { Order } from "@/types";
import VideosManager from "@/components/admin/VideosManager";

export const dynamic = "force-dynamic";

// 1 ligne par sacrifice (= 1 mouton, 1 vidéo attendue, 1 étiquette imprimée).
// Pour une commande multi-mouton, l'admin verra N lignes consécutives avec
// le même client mais des N° distincts (12a, 12b...) et des niyyahs distinctes.
export interface SacrificeRow extends SacrificeItem {
  // Statut dérivé pour l'UI : si videoPath présent = uploaded, sinon idle.
  // Le flag "sent" est commun à toute la commande (on envoie 1 seul email
  // qui contient les N liens), donc on l'expose à chaque row.
  videoSent: boolean;
}

async function fetchSacrificeRows(): Promise<SacrificeRow[]> {
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

  return (data as Order[]).flatMap((order, idx) => {
    const items = expandOrderToSacrifices(order, idx + 1);
    return items.map((item) => ({
      ...item,
      videoSent: !!order.video_sent,
    }));
  });
}

export default async function AdminVideosPage() {
  const rows = await fetchSacrificeRows();
  const ordersCount = new Set(rows.map((r) => r.orderId)).size;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black uppercase text-text-primary">
          Vidéos du jour J
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Glisse-dépose toutes les vidéos reçues du cheikh. Chacune sera associée
          automatiquement à son sacrifice via le N° visible sur l&apos;étiquette
          (ex: N°12 ou N°12a/12b pour les commandes multi-moutons). L&apos;envoi
          email se fait au niveau de la commande complète (1 email = tous les
          liens vidéos de la commande).
        </p>
        <p className="text-text-muted-light text-xs mt-1">
          {rows.length} sacrifice{rows.length > 1 ? "s" : ""} attendu{rows.length > 1 ? "s" : ""}
          {" "}· {ordersCount} commande{ordersCount > 1 ? "s" : ""} payée{ordersCount > 1 ? "s" : ""}
        </p>
      </div>

      <VideosManager initialRows={rows} />
    </div>
  );
}
