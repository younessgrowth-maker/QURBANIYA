export type PaymentStatus = "pending" | "paid" | "failed";
export type PaymentMethod = "stripe" | "paypal" | "virement";
export type Intention = "pour_moi" | "famille" | "sadaqa";

export interface Order {
  id: string;
  user_id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  intention: Intention;
  niyyah: string;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  stripe_session_id: string | null;
  amount: number;
  video_sent: boolean;
  created_at: string;
  updated_at: string;
}

export interface Inventory {
  id: string;
  year: number;
  total_slots: number;
  reserved_slots: number;
  is_open: boolean;
}

export interface OrderFormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  intention: Intention;
  niyyah: string;
  payment_method: PaymentMethod;
}
