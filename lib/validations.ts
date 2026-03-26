import { z } from "zod";

export const orderSchema = z.object({
  prenom: z.string().min(2, "Prénom requis (min. 2 caractères)"),
  nom: z.string().min(2, "Nom requis (min. 2 caractères)"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  intention: z.enum(["pour_moi", "famille", "sadaqa"], {
    message: "Veuillez choisir une intention",
  }),
  niyyah: z.string().min(2, "Veuillez indiquer le nom pour le sacrifice"),
  payment_method: z.enum(["stripe", "paypal", "virement"], {
    message: "Veuillez choisir un moyen de paiement",
  }),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
