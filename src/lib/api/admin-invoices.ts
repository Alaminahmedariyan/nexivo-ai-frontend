import { apiClient } from "./client";
import { buildQueryString } from "./query-string";
import type { CreateInvoiceInput, Invoice, UpdateInvoiceInput } from "@/types/invoice";

export const adminInvoicesApi = {
  getAll: (filters: Record<string, unknown> = {}) =>
    apiClient.getWithMeta<Invoice[]>(`/v1/invoices${buildQueryString(filters)}`),
  getById: (id: string) => apiClient.get<Invoice>(`/v1/invoices/${id}`),
  create: (payload: CreateInvoiceInput) => apiClient.post<Invoice>("/v1/invoices", payload),
  update: (id: string, payload: UpdateInvoiceInput) => apiClient.patch<Invoice>(`/v1/invoices/${id}`, payload),
  send: (id: string) => apiClient.patch<Invoice>(`/v1/invoices/${id}/send`),
  cancel: (id: string) => apiClient.patch<Invoice>(`/v1/invoices/${id}/cancel`),
  delete: (id: string) => apiClient.delete(`/v1/invoices/${id}`),
};

export const myInvoicesApi = {
  getAll: () => apiClient.get<Invoice[]>("/v1/invoices/my"),
};