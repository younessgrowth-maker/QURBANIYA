export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
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
  reminder_sent_at: string | null;
  // Mode cadeau (migration 0006)
  is_gift: boolean;
  recipient_name: string | null;
  recipient_message: string | null;
  notify_recipient: boolean;
  recipient_email: string | null;
  // Tracking email de confirmation (migration 0008)
  confirmation_email_sent_at: string | null;
  confirmation_email_error: string | null;
  // Tracking vidéo + relance avis (migration 0010)
  video_sent_at: string | null;
  review_request_sent_at: string | null;
  // Refund (migration 0009)
  refunded_at: string | null;
  refund_reason: string | null;
  stripe_refund_id: string | null;
  // Parrainage (migration 0011)
  referral_code: string | null;
  referred_by_code: string | null;
  referrer_order_id: string | null;
  discount_amount: number;
  referrer_reward_paid_at: string | null;
  // Broadcast email parrainage (migration 0012)
  referral_broadcast_sent_at: string | null;
  // Broadcast WhatsApp parrainage (migration 0013)
  whatsapp_broadcast_sent_at: string | null;
  // Rappel J-7 (migration 0016)
  aid_reminder_sent_at: string | null;
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
