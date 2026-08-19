import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminInvoicesApi, myInvoicesApi } from "@/lib/api/admin-invoices";
import type { CreateInvoiceInput, UpdateInvoiceInput } from "@/types/invoice";
import { ApiError } from "@/types/api";

const keys = { all: ["admin-invoices"] as const, detail: (id: string) => ["admin-invoices", id] as const };

export function useAdminInvoices(filters: Record<string, unknown> = {}) {
  return useQuery({ queryKey: [...keys.all, "list", filters], queryFn: () => adminInvoicesApi.getAll(filters) });
}

export function useAdminInvoice(id: string) {
  return useQuery({ queryKey: keys.detail(id), queryFn: () => adminInvoicesApi.getById(id), enabled: !!id });
}

export function useMyInvoices() {
  return useQuery({ queryKey: ["my-invoices"], queryFn: myInvoicesApi.getAll });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateInvoiceInput) => adminInvoicesApi.create(payload),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: keys.all }); toast.success("Invoice created."); },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useUpdateInvoice(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateInvoiceInput) => adminInvoicesApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.all });
      queryClient.invalidateQueries({ queryKey: keys.detail(id) });
      toast.success("Invoice updated.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useSendInvoice(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminInvoicesApi.send(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.all });
      queryClient.invalidateQueries({ queryKey: keys.detail(id) });
      toast.success("Invoice sent to client.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useCancelInvoice(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminInvoicesApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.all });
      queryClient.invalidateQueries({ queryKey: keys.detail(id) });
      toast.success("Invoice cancelled.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminInvoicesApi.delete(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: keys.all }); toast.success("Invoice deleted."); },
    onError: (error: ApiError) => toast.error(error.message),
  });
}