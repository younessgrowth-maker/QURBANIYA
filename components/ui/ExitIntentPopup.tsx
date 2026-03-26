"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { X, Clock } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        const dismissed = sessionStorage.getItem("exit-popup-dismissed");
        if (!dismissed) {
          triggered = true;
          setShow(true);
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem("exit-popup-dismissed", "true");
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 9998,
        }}
      />

      {/* Popup card */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "90vw",
          maxWidth: "28rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
        >
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-5 text-center">
            <Clock size={28} className="text-gold-light mx-auto mb-2" />
            <h3 className="text-white font-playfair font-bold text-xl md:text-2xl">
              Attends ! Tu allais oublier ton sacrifice
            </h3>
          </div>

          {/* Body */}
          <div className="p-6 text-center">
            <p className="text-text-muted mb-6 font-inter">
              Il ne reste que <strong className="text-urgency">53 moutons</strong> disponibles.
              <br />
              Le prix augmente bientôt.
            </p>

            <Link href="/commander" onClick={dismiss}>
              <Button size="lg" variant="secondary" className="w-full uppercase glow-pulse">
                Réserver maintenant →
              </Button>
            </Link>

            <p className="text-text-muted-light text-xs mt-4 font-inter">
              Rejoins les +800 contributeurs satisfaits
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
