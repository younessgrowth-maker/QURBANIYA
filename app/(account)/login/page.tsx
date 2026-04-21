"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-secondary" />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/mes-commandes";
  const callbackError = searchParams.get("error") === "auth";
  const [error, setError] = useState(
    callbackError ? "Le lien de connexion a expiré ou est invalide. Veuillez en demander un nouveau." : ""
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
        },
      });

      if (authError) {
        setError("Une erreur est survenue. Veuillez réessayer.");
        return;
      }
      setSent(true);
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <Image src="/logos/qurbaniya-symbol.svg" alt="" width={36} height={36} aria-hidden="true" />
          <span className="text-2xl font-black uppercase tracking-tight">
            <span className="text-text-primary">QURBANI</span>
            <span className="text-gold">YA</span>
          </span>
        </Link>

        {sent ? (
          /* ── Success state ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-green-accent/30 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-accent/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-green-accent" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Vérifiez votre boîte mail</h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Un lien de connexion a été envoyé à{" "}
              <span className="text-gold font-semibold">{email}</span>.
              <br />
              Cliquez sur le lien pour accéder à votre espace.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-text-muted-light text-sm hover:text-gold transition-colors"
            >
              Pas reçu ? Réessayer avec un autre email
            </button>
          </motion.div>
        ) : (
          /* ── Login form ── */
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black uppercase text-text-primary mb-2">
                MON <span className="text-gold">ESPACE</span>
              </h1>
              <p className="text-text-muted text-sm">
                Entrez votre email, nous vous envoyons un lien de connexion.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-bg-tertiary border border-gray-200 text-text-primary rounded-lg pl-11 pr-4 py-3.5 text-[15px] placeholder:text-text-muted-light/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {error && (
                <p className="text-urgency text-sm">{error}</p>
              )}

              <Button type="submit" size="lg" variant="primary" className="w-full" loading={loading}>
                RECEVOIR MON LIEN DE CONNEXION
              </Button>
            </form>

            <p className="text-text-muted-light text-xs text-center mt-6">
              Pas de mot de passe. Un lien sécurisé vous sera envoyé par email.
            </p>
          </div>
        )}

        {/* Back link */}
        <Link
          href="/"
          className="flex items-center justify-center gap-1.5 text-text-muted-light text-sm mt-8 hover:text-gold transition-colors"
        >
          <ArrowLeft size={14} />
          Retour à l&apos;accueil
        </Link>
      </motion.div>
    </main>
  );
}
