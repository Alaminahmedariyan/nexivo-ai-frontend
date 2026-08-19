import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { myPaymentsApi } from "@/lib/api/my-payments";
import { ApiError } from "@/types/api";

export function useCreateMyPaymentIntent(invoiceId: string) {
  return useMutation({
    mutationFn: () => myPaymentsApi.createIntent(invoiceId),
    onError: (error: ApiError) => toast.error(error.message),
  });
}