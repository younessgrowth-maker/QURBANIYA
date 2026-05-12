import type { Metadata } from "next";
import Link from "next/link";
import { Check, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Désinscription email — Qurbaniya",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { status?: string; email?: string };
}) {
  const status = searchParams.status;
  const email = searchParams.email;

  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-soft text-center">
        {status === "ok" ? (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald/10 flex items-center justify-center mb-5">
              <Check size={32} className="text-emerald" strokeWidth={3} />
            </div>
            <h1 className="text-2xl font-black uppercase text-text-primary mb-3">
              Désinscription <span className="text-gold">confirmée</span>
            </h1>
            <p className="text-text-muted leading-relaxed mb-2">
              {email
                ? `L'adresse ${email} ne recevra plus d'emails promotionnels de notre part.`
                : "Vous ne recevrez plus d'emails promotionnels de notre part."}
            </p>
            <p className="text-text-muted-light text-sm leading-relaxed">
              Vous continuerez à recevoir les emails liés à vos commandes en cours (confirmation, vidéo du sacrifice, suivi) — exception légale pour les communications liées à l&apos;exécution d&apos;une commande.
            </p>
          </>
        ) : status === "invalid" ? (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-urgency/10 flex items-center justify-center mb-5">
              <AlertTriangle size={32} className="text-urgency" />
            </div>
            <h1 className="text-2xl font-black uppercase text-text-primary mb-3">
              Lien invalide
            </h1>
            <p className="text-text-muted leading-relaxed mb-3">
              Ce lien de désinscription n&apos;est plus valide ou a été modifié.
            </p>
            <p className="text-text-muted-light text-sm leading-relaxed">
              Pour vous désinscrire, écrivez-nous à{" "}
              <a href="mailto:support@qurbaniya.fr" className="text-gold hover:underline font-semibold">
                support@qurbaniya.fr
              </a>{" "}
              et nous nous en chargerons sous 48h.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-black uppercase text-text-primary mb-3">
              Désinscription
            </h1>
            <p className="text-text-muted leading-relaxed">
              Pour vous désinscrire de nos emails, utilisez le lien fourni en bas de l&apos;email que vous avez reçu.
            </p>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link
            href="/"
            className="text-sm text-text-muted-light hover:text-gold transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
