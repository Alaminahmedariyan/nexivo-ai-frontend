import { Payment, RecordManualPaymentInput } from "@/types/payments";
import { apiClient } from "./client";


export const adminPaymentsApi = {
  getByInvoice: (invoiceId: string) => apiClient.get<Payment[]>(`/v1/payments/invoices/${invoiceId}`),
  recordManual: (invoiceId: string, payload: RecordManualPaymentInput) =>
    apiClient.post<Payment>(`/v1/payments/invoices/${invoiceId}/manual`, payload),
  createIntent: (invoiceId: string) =>
    apiClient.post<{ clientSecret: string; payment: Payment }>(`/v1/payments/invoices/${invoiceId}/intent`),
  refund: (id: string, amount?: number) =>
    apiClient.post<Payment>(`/v1/payments/${id}/refund`, amount ? { amount } : undefined),
};