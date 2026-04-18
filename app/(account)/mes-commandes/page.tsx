"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Download, Video, LogOut, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Order } from "@/types";

/* ── Status config ── */
const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "En attente de paiement", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  paid: { label: "Commande confirmée", color: "text-green-accent", bg: "bg-green-accent/10 border-green-accent/30" },
  sacrificed: { label: "Sacrifice effectué", color: "text-gold", bg: "bg-gold/10 border-gold/30" },
  video_sent: { label: "Vidéo envoyée", color: "text-green-light", bg: "bg-green-light/10 border-green-light/30" },
};

/* ── Timeline ── */
const TIMELINE_STEPS = ["Commandé", "Confirmé", "Sacrifice", "Vidéo envoyée"];

function getStepIndex(status: string): number {
  switch (status) {
    case "pending": return 0;
    case "paid": return 1;
    case "sacrificed": return 2;
    case "video_sent": return 3;
    default: return 0;
  }
}

function StatusTimeline({ status }: { status: string }) {
  const active = getStepIndex(status);

  return (
    <div className="flex items-center gap-0 mt-5">
      {TIMELINE_STEPS.map((step, i) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
              i <= active
                ? "bg-gold border-gold text-white"
                : "bg-bg-tertiary border-text-muted-light/20 text-text-muted-light"
            )}>
              {i <= active ? <Check size={12} strokeWidth={3} /> : i + 1}
            </div>
            <span className={cn(
              "text-[10px] mt-1.5 whitespace-nowrap",
              i <= active ? "text-gold font-semibold" : "text-text-muted-light"
            )}>
              {step}
            </span>
          </div>
          {i < TIMELINE_STEPS.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-1 mt-[-14px]",
              i < active ? "bg-gold" : "bg-text-muted-light/20"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Order Card ── */
function OrderCard({ order }: { order: Order }) {
  const status = STATUS_MAP[order.payment_status] || STATUS_MAP.pending;
  const orderNum = `QRB-2026-${String(order.id).slice(0, 4).toUpperCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-text-primary font-bold flex items-center gap-2">
            Sacrifice Mouton · Aïd 2026
          </h3>
          <p className="text-text-muted-light text-sm mt-0.5">Commande #{orderNum}</p>
        </div>
        <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", status.bg, status.color)}>
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div>
          <span className="text-text-muted-light">Niyyah</span>
          <p className="text-text-primary font-medium">{order.niyyah}</p>
        </div>
        <div>
          <span className="text-text-muted-light">Montant</span>
          <p className="text-gold font-bold">140,00€</p>
        </div>
      </div>

      <StatusTimeline status={order.payment_status} />

      {/* Action buttons */}
      <div className="flex gap-3 mt-5 pt-5 border-t border-gray-200">
        <button className="flex items-center gap-1.5 text-text-muted text-sm hover:text-gold transition-colors">
          <Download size={14} />
          Télécharger le reçu
        </button>
        {order.video_sent && (
          <button className="flex items-center gap-1.5 text-gold text-sm font-semibold hover:text-gold-light transition-colors">
            <Video size={14} />
            Voir la vidéo
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main page ── */
export default function MesCommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.prenom) {
        setUserName(user.user_metadata.prenom);
      } else if (user?.email) {
        setUserName(user.email.split("@")[0]);
      }

      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setOrders(data as Order[]);
      setLoading(false);
    }

    fetchData();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-2xl md:text-3xl font-black uppercase">
                BIENVENUE{userName ? ", " : ""}
                <span className="text-gold">{userName.toUpperCase()}</span>
              </h1>
              <p className="text-text-muted text-sm mt-1">Votre espace personnel Qurbaniya</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-text-muted-light text-sm hover:text-urgency transition-colors"
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-bg-tertiary border border-gray-200 flex items-center justify-center mx-auto mb-6">
                <Package size={32} className="text-text-muted-light" />
              </div>
              <h2 className="text-xl font-bold text-text-primary mb-2">Aucune commande</h2>
              <p className="text-text-muted mb-8 max-w-sm mx-auto">
                Vous n&apos;avez pas encore passé commande. Réservez votre sacrifice maintenant.
              </p>
              <Link href="/commander">
                <Button size="lg" variant="primary">
                  COMMANDER MON SACRIFICE
                </Button>
              </Link>
            </motion.div>
          ) : (
            /* Order list */
            <div className="space-y-5">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
