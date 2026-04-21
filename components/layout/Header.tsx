"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { getUrgencyMessage } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
];

const SECTION_IDS = ["comment-ca-marche", "temoignages", "faq"];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, width: "100%" }}
    />
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const urgency = getUrgencyMessage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255, 251, 245, 0.85)" : "rgba(255, 251, 245, 0)",
          boxShadow: scrolled ? "0 4px 30px rgba(44, 36, 24, 0.08)" : "0 0 0 rgba(0,0,0,0)",
          height: scrolled ? 60 : 72,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Qurbaniya - Accueil">
            <Image
              src="/logos/qurbaniya-symbol.svg"
              alt=""
              width={32}
              height={32}
              className="w-7 h-7 md:w-8 md:h-8"
              aria-hidden="true"
            />
            <span className="text-[22px] font-black uppercase tracking-tight leading-none">
              <span className="text-text-primary">QURBANI</span>
              <span className="text-gold">YA</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`text-sm transition-colors duration-200 nav-link-animated ${
                    activeSection === link.href.slice(1)
                      ? "text-gold font-medium"
                      : "text-text-muted hover:text-gold"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200 nav-link-animated text-text-muted hover:text-gold"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Urgency badge — desktop */}
            <div className="hidden md:flex items-center gap-1.5 text-urgency text-xs font-semibold">
              <Zap size={12} className="fill-current" />
              <span>{urgency.short}</span>
            </div>

            {/* CTA */}
            <Link href="/commander" className="hidden sm:block">
              <Button size="sm" variant="primary">
                COMMANDER — 140€
              </Button>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-text-primary p-2 -mr-2"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col pt-[60px]"
          >
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6" aria-label="Menu mobile">
              {NAV_LINKS.map((link, i) =>
                link.href.startsWith("#") ? (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl font-bold text-text-primary hover:text-gold transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-2xl font-bold text-text-primary hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="flex items-center gap-1.5 text-urgency text-sm font-semibold mt-4"
              >
                <Zap size={14} className="fill-current" />
                <span>{urgency.short}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Link href="/commander" onClick={() => setOpen(false)}>
                  <Button size="lg" variant="primary">
                    COMMANDER MON SACRIFICE — 140€
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
