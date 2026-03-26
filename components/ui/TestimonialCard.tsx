"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  text: string;
  stars: 1 | 2 | 3 | 4 | 5;
  date?: string;
  avatar?: string;
  className?: string;
}

export default function TestimonialCard({
  name,
  text,
  stars,
  date,
  avatar,
  className,
}: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn(
        "bg-white rounded-xl p-6",
        "border border-gray-200",
        className
      )}
    >
      <div className="flex items-center gap-1 mb-3" aria-label={`${stars} étoiles sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={cn(
              i < stars ? "text-gold fill-gold" : "text-text-muted-light"
            )}
          />
        ))}
      </div>

      <p className="text-text-primary text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>

      <div className="flex items-center gap-3">
        {avatar ? (
          <Image
            src={avatar}
            alt={`Avis de ${name} sur Qurbaniya`}
            width={36}
            height={36}
            loading="lazy"
            className="w-9 h-9 rounded-full object-cover border border-gold/30"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold">
            {initials}
          </div>
        )}
        <div>
          <p className="text-text-primary text-sm font-semibold">{name}</p>
          {date && <p className="text-text-muted-light text-xs">{date}</p>}
        </div>
      </div>
    </motion.div>
  );
}
