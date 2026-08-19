import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminPaymentsApi } from "@/lib/api/admin-payments";

import { ApiError } from "@/types/api";
import { RecordManualPaymentInput } from "@/types/payments";

export function useRecordManualPayment(invoiceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RecordManualPaymentInput) => adminPaymentsApi.recordManual(invoiceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-invoices", invoiceId] });
      queryClient.invalidateQueries({ queryKey: ["admin-invoices"] });
      toast.success("Payment recorded.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useCreatePaymentIntent(invoiceId: string) {
  return useMutation({
    mutationFn: () => adminPaymentsApi.createIntent(invoiceId),
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useRefundPayment(invoiceId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, amount }: { id: string; amount?: number }) => adminPaymentsApi.refund(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-invoices", invoiceId] });
      toast.success("Payment refunded.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}