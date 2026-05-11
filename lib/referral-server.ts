import { randomInt } from "node:crypto";

// ─── Génération de codes parrains (server-only) ──────────────────
// Espace 30^6 ≈ 729M combinaisons. Alphabet sans confusion possible
// (pas de 0/O, 1/I/L). La colonne `referral_code` est `unique` côté
// DB donc en cas de collision rare, on retente (cf. webhook Stripe).

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 6;

export function generateReferralCode(): string {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[randomInt(0, ALPHABET.length)];
  }
  return code;
}
