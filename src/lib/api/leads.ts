import { apiClient } from "./client";
import { buildQueryString } from "./query-string";

import type {
  CreateLeadInput,
  Lead,
  LeadFilters,
  LeadStatus,
} from "@/types/lead";

import type { QueryMeta } from "@/types/api";

export type LeadsResponse = {
  data: Lead[];
  meta?: QueryMeta;
};

export const leadsApi = {
  getAll: async (
    filters: LeadFilters = {},
  ): Promise<LeadsResponse> => {
    return apiClient.getWithMeta<Lead[]>(
      `/v1/leads${buildQueryString(filters)}`,
    );
  },

  getById: (id: string) =>
    apiClient.get<Lead>(`/v1/leads/${id}`),

  create: (payload: CreateLeadInput) =>
    apiClient.post<Lead>("/v1/leads", payload),

  updateStatus: (
    id: string,
    payload: {
      status: LeadStatus;
      assignedToId?: string;
    },
  ) =>
    apiClient.patch<Lead>(
      `/v1/leads/${id}/status`,
      payload,
    ),
};