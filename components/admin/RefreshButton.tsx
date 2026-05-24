"use client";

import { useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { refreshAnalytics } from "@/app/admin/analytics/actions";

export default function RefreshButton() {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await refreshAnalytics();
        })
      }
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-lg bg-text-primary text-white text-sm font-semibold px-3 py-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
    >
      <RefreshCw
        size={14}
        className={pending ? "animate-spin" : ""}
      />
      {pending ? "Rafraîchissement…" : "Rafraîchir Stripe"}
    </button>
  );
}
