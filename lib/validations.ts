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
