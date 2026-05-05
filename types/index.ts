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
  video_url: string | null;
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

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  prenom: string;
  ville: string | null;
  rating: number;
  text: string;
  email: string | null;
  year: number | null;
  status: ReviewStatus;
  created_at: string;
  approved_at: string | null;
}
