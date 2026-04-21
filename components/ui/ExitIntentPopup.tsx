"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { X, Clock } from "lucide-react";
import { getUrgencyMessage } from "@/lib/constants";
import { track } from "@/lib/track";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const urgency = getUrgencyMessage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        const dismissed = sessionStorage.getItem("exit-popup-dismissed");
        if (!dismissed) {
          triggered = true;
          setShow(true);
          track("exit_popup_shown");
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

  if (!show || !mounted) return null;

  return createPortal(
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

      {/* Popup card — centered with flexbox, rendered via portal */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "90vw",
            maxWidth: "28rem",
            backgroundColor: "white",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            pointerEvents: "auto",
          }}
        >
          <button
            onClick={dismiss}
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              zIndex: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light px-6 py-5 text-center">
            <Clock size={28} className="text-gold-light mx-auto mb-2" />
            <h3 className="text-white font-playfair font-bold text-xl md:text-2xl">
              Ne partez pas sans votre sacrifice
            </h3>
          </div>

          {/* Body */}
          <div className="p-6 text-center">
            <p className="text-text-muted mb-6 font-inter">
              {urgency.long}
            </p>

            <Link
              href="/commander"
              onClick={() => {
                track("exit_popup_conversion");
                dismiss();
              }}
            >
              <Button size="lg" variant="secondary" className="w-full uppercase glow-pulse">
                Réserver maintenant →
              </Button>
            </Link>

            <p className="text-text-muted-light text-xs mt-4 font-inter">
              Rejoignez les +300 contributeurs satisfaits
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
