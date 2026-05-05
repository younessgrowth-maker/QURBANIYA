import { z } from "zod";

export const orderSchema = z.object({
  prenom: z.string().min(2, "Prénom requis (min. 2 caractères)"),
  nom: z.string().min(2, "Nom requis (min. 2 caractères)"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .trim()
    .min(1, "Téléphone requis (la vidéo est envoyée sur WhatsApp)")
    .regex(/^[+\d\s().-]+$/, "Format invalide (chiffres, +, espaces, tirets uniquement)")
    .refine((val) => (val.match(/\d/g) ?? []).length >= 9, {
      message: "Numéro invalide (au moins 9 chiffres)",
    }),
  intention: z.enum(["pour_moi", "famille", "sadaqa"], {
    message: "Veuillez choisir une intention",
  }),
  niyyah: z.string().min(2, "Veuillez indiquer le nom pour le sacrifice"),
  payment_method: z.enum(["stripe"]),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

export const reviewSchema = z.object({
  prenom: z
    .string()
    .trim()
    .min(2, "Prénom requis (min. 2 caractères)")
    .max(50, "Prénom trop long"),
  ville: z
    .string()
    .trim()
    .max(50, "Ville trop longue")
    .optional()
    .or(z.literal("")),
  rating: z.number().int().min(1, "Note requise").max(5),
  text: z
    .string()
    .trim()
    .min(30, "Témoignage trop court (min. 30 caractères)")
    .max(1000, "Témoignage trop long (max. 1000 caractères)"),
  email: z
    .string()
    .email("Email invalide")
    .optional()
    .or(z.literal("")),
  year: z
    .number()
    .int()
    .min(2022)
    .max(2030)
    .optional(),
  // Honeypot anti-spam — doit rester vide
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
