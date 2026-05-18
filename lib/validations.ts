import { z } from "zod";

export const orderSchema = z
  .object({
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
    // ─── Mode cadeau ───
    // Note: pas de .default() ici — react-hook-form fournit les valeurs par
    // défaut via defaultValues. Mettre .default() ici crée un mismatch entre
    // input/output types qui casse le Resolver.
    is_gift: z.boolean().optional(),
    recipient_name: z
      .string()
      .trim()
      .max(100, "Nom trop long")
      .optional()
      .or(z.literal("")),
    recipient_message: z
      .string()
      .trim()
      .max(500, "Message trop long (max. 500 caractères)")
      .optional()
      .or(z.literal("")),
    notify_recipient: z.boolean().optional(),
    recipient_email: z
      .string()
      .email("Email destinataire invalide")
      .optional()
      .or(z.literal("")),
    // ─── Parrainage ───
    // Le client peut saisir un code parrain à l'achat (-15€). Validé côté
    // serveur dans /api/orders avant création de la session Stripe.
    referred_by_code: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z0-9]{6}$/, "Code parrain invalide (6 caractères)")
      .optional()
      .or(z.literal("")),
    // Code affilié partenaire (cookie qrb_aff, jamais saisi par le client).
    // Validé réellement côté serveur contre la table affiliates approuvés.
    affiliate_code: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z0-9-]{3,24}$/, "Code affilié invalide")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // En mode cadeau, le nom du bénéficiaire est obligatoire.
    if (data.is_gift && !data.recipient_name?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nom du bénéficiaire requis pour un cadeau",
        path: ["recipient_name"],
      });
    }
    // Si l'utilisateur coche "envoyer la vidéo au destinataire par email",
    // l'email du destinataire devient obligatoire.
    if (data.is_gift && data.notify_recipient && !data.recipient_email?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email du bénéficiaire requis pour l'envoi automatique",
        path: ["recipient_email"],
      });
    }
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
