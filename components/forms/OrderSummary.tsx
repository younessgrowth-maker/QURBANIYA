import { Check, CreditCard, Shield } from "lucide-react";

const inclusions = [
  "Preuve vidéo incluse",
  "Sacrifice nominatif",
  "Conforme à la Sunnah",
];

export default function OrderSummary() {
  return (
    <div className="bg-white border border-gray-100/80 rounded-card p-6 md:p-8 shadow-soft sticky top-[88px]">
      <h3 className="text-lg font-bold text-text-primary uppercase tracking-wide mb-6">
        Votre commande
      </h3>

      {/* Line item — prix unitaire (le total final dynamique avec quantité
          et discount éventuel est affiché dans le formulaire). */}
      <div className="border-t border-gray-200 py-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-primary font-medium text-[15px]">Mouton</p>
            <p className="text-text-muted-light text-xs">Aïd el-Kébir 2026</p>
          </div>
          <span className="text-text-primary font-semibold">140,00€</span>
        </div>
        <p className="text-text-muted-light text-[11px] mt-2">
          Prix unitaire · Le total selon le nombre de moutons s&apos;affiche
          dans le formulaire.
        </p>
      </div>

      {/* Inclusions */}
      <div className="border-t border-gray-200 pt-5 space-y-3">
        {inclusions.map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <Check size={14} className="text-emerald flex-shrink-0" strokeWidth={3} />
            <span className="text-text-muted text-sm">{item}</span>
          </div>
        ))}
      </div>

      {/* Payment icons */}
      <div className="mt-6 pt-5 border-t border-gray-200">
        <div className="flex items-center justify-center gap-3 text-text-muted-light/50">
          <Shield size={14} className="text-emerald/50" />
          <CreditCard size={16} />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Visa</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider">Mastercard</span>
          <span className="text-text-muted-light/30">|</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider">Stripe</span>
        </div>
      </div>
    </div>
  );
}
