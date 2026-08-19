import { Payment } from "@/types/payments";
import { apiClient } from "./client";


export const myPaymentsApi = {
  createIntent: (invoiceId: string) =>
    apiClient.post<{ clientSecret: string; payment: Payment }>(`/v1/payments/my/invoices/${invoiceId}/intent`),
};