"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Bell } from "lucide-react";

export default function VideoPlaceholder() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to Supabase or Resend for lead capture
    setSubmitted(true);
  };

  return (
    <div className="relative max-w-3xl mx-auto rounded-card overflow-hidden bg-gradient-to-br from-primary/5 via-bg-secondary to-gold/5 border border-text-primary/6 shadow-medium" style={{ aspectRatio: "16/7" }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* Play icon */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-4"
        >
          <Play size={26} className="ml-1 text-primary/40" fill="currentColor" />
        </motion.div>

        <p className="text-sm md:text-base text-text-muted font-medium mb-1">
          Message du cheikh
        </p>
        <p className="text-xs text-text-muted-light mb-4">
          Vidéo bientôt disponible
        </p>

        {/* Lead capture */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full max-w-sm">
            <div className="relative flex-1">
              <Bell size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email pour être notifié"
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-text-primary/10 bg-white focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="flex-shrink-0 bg-primary hover:bg-primary-light text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Me notifier
            </button>
          </form>
        ) : (
          <p className="text-xs text-emerald font-medium">
            Vous serez notifié dès la mise en ligne.
          </p>
        )}
      </div>
    </div>
  );
}
