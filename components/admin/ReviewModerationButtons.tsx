"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X, RotateCcw } from "lucide-react";

type Status = "pending" | "approved" | "rejected";

export default function ReviewModerationButtons({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: Status;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function moderate(next: Status) {
    setError(null);
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Erreur");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {currentStatus !== "approved" && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => moderate("approved")}
          className="inline-flex items-center gap-1.5 bg-emerald hover:bg-emerald/90 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
        >
          <Check size={14} />
          Approuver
        </button>
      )}
      {currentStatus !== "rejected" && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => moderate("rejected")}
          className="inline-flex items-center gap-1.5 bg-urgency hover:bg-urgency/90 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
        >
          <X size={14} />
          Rejeter
        </button>
      )}
      {currentStatus !== "pending" && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => moderate("pending")}
          className="inline-flex items-center gap-1.5 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-text-primary text-xs font-semibold px-3 py-1.5 rounded transition-colors"
        >
          <RotateCcw size={14} />
          Remettre en attente
        </button>
      )}
      {error && <span className="text-urgency text-xs">{error}</span>}
    </div>
  );
}
