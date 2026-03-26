"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Mail, CreditCard, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const LINK_GROUPS = [
  {
    title: "Liens utiles",
    links: [
      { label: "Commander mon sacrifice", href: "/commander" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "mailto:contact@qurbaniya.fr" },
      { label: "Mentions légales", href: "#" },
      { label: "CGV", href: "#" },
    ],
  },
];

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-gold/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-white font-semibold text-sm"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={16}
          className={cn("text-gold transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Desktop columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-12">
          {/* Col 1: Logo + tagline + socials */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Qurbaniya — Accueil">
              <Image
                src="/logos/qurbaniya-symbol.svg"
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
              />
              <span className="text-lg font-black uppercase tracking-tight">
                <span className="text-white">QURBANI</span>
                <span className="text-gold">YA</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Votre sacrifice conforme à la Sunnah, filmé et envoyé en preuve vidéo par WhatsApp. Depuis 5 ans au service des familles musulmanes.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/qurbaniya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 hover:rotate-3 transition-all duration-250"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="https://tiktok.com/@qurbaniya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 hover:rotate-3 transition-all duration-250"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.8.1v-3.5a6.37 6.37 0 0 0-.8-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 10.86 4.48c1.15-1.15 1.8-2.72 1.8-4.35V8.72a8.2 8.2 0 0 0 4.78 1.53V6.8a4.84 4.84 0 0 1-1-.11Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Liens utiles */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Liens utiles
            </h4>
            <ul className="space-y-3">
              {LINK_GROUPS[0].links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-gold transition-colors duration-200 footer-link-animated"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <a href="mailto:contact@qurbaniya.fr" className="hover:text-gold transition-colors">
                  contact@qurbaniya.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold flex-shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"/>
                </svg>
                <span>WhatsApp : +33 6 XX XX XX XX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile accordion layout */}
        <div className="md:hidden">
          <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Qurbaniya — Accueil">
            <Image
              src="/logos/qurbaniya-symbol.svg"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />
            <span className="text-lg font-black uppercase tracking-tight">
              <span className="text-white">QURBANI</span>
              <span className="text-gold">YA</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Votre sacrifice conforme à la Sunnah, filmé et envoyé en preuve vidéo par WhatsApp.
          </p>

          <div className="flex items-center gap-3 mb-6">
            <a
              href="https://instagram.com/qurbaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 hover:rotate-3 transition-all duration-250"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://tiktok.com/@qurbaniya"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 hover:scale-110 hover:rotate-3 transition-all duration-250"
              aria-label="TikTok"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.8.1v-3.5a6.37 6.37 0 0 0-.8-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 10.86 4.48c1.15-1.15 1.8-2.72 1.8-4.35V8.72a8.2 8.2 0 0 0 4.78 1.53V6.8a4.84 4.84 0 0 1-1-.11Z"/>
              </svg>
            </a>
          </div>

          <FooterAccordion title="Liens utiles">
            <ul className="space-y-3 pl-1">
              {LINK_GROUPS[0].links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <FooterAccordion title="Contact">
            <ul className="space-y-3 text-sm text-gray-400 pl-1">
              <li>
                <a href="mailto:contact@qurbaniya.fr" className="hover:text-gold transition-colors">
                  contact@qurbaniya.fr
                </a>
              </li>
              <li>WhatsApp : +33 6 XX XX XX XX</li>
            </ul>
          </FooterAccordion>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Qurbaniya — Tous droits réservés
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1.5 text-xs">
              <Shield size={12} className="text-emerald" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={14} />
              <span className="text-xs font-medium">Stripe</span>
              <span className="text-gray-500/50">|</span>
              <span className="text-xs font-medium">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
