export type PaymentMethod = "STRIPE" | "BANK_TRANSFER" | "CASH" | "OTHER";
export type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";

export type Payment = {
  id: string;
  invoiceId: string;
  amount: string;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  stripePaymentIntentId: string | null;
  stripeChargeId: string | null;
  paidAt: string | null;
  notes: string | null;
  createdAt: string;
};

export type RecordManualPaymentInput = {
  amount: number;
  method?: "BANK_TRANSFER" | "CASH" | "OTHER";
  notes?: string;
};