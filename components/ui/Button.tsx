"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  type = "button",
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={
        isDisabled
          ? undefined
          : {
              y: -2,
              transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            }
      }
      whileTap={
        isDisabled
          ? undefined
          : {
              y: 0,
              scale: 0.98,
              transition: { duration: 0.1 },
            }
      }
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={loading}
      aria-label={rest["aria-label"]}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-inter font-semibold tracking-wide rounded-button transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "btn-shine",
        {
          "bg-primary text-white hover:bg-primary-light shadow-glow-primary hover:shadow-[0_6px_24px_rgba(27,67,50,0.3)]":
            variant === "primary",
          "bg-gold text-white hover:bg-gold-light shadow-glow-gold hover:shadow-[0_6px_24px_rgba(184,134,11,0.25)]":
            variant === "secondary",
          "text-text-primary bg-transparent hover:text-primary hover:bg-primary/5":
            variant === "ghost",
        },
        {
          "px-4 py-2.5 text-sm": size === "sm",
          "px-6 py-3 text-sm": size === "md",
          "px-8 py-4 text-base": size === "lg",
        },
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span
            key="loader"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            <Loader2 size={size === "sm" ? 14 : size === "md" ? 16 : 20} className="animate-spin" />
          </motion.span>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-2"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
