import { apiClient } from "./client";
import { buildQueryString } from "./query-string";
import type { Client, ClientFilters } from "@/types/client";

export const clientsApi = {
  getAll: (filters: ClientFilters = {}) =>
    apiClient.getWithMeta<Client[]>(`/v1/clients${buildQueryString(filters)}`),

  getById: (id: string) => apiClient.get<Client>(`/v1/clients/${id}`),

  create: (payload: { companyName?: string; leadId?: string; userId?: string }) =>
    apiClient.post<Client>("/v1/clients", payload),

  linkUser: (id: string, userId: string) =>
    apiClient.patch<Client>(`/v1/clients/${id}/link-user`, { userId }),
};