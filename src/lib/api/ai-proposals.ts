import { apiClient } from "./client";
import { buildQueryString } from "./query-string";
import type { AIProposal, CreateProposalInput, UpdatableProposalStatus } from "@/types/ai";

export const aiProposalsApi = {
  getAll: (filters: Record<string, unknown> = {}) =>
    apiClient.getWithMeta<AIProposal[]>(`/v1/ai/proposals${buildQueryString(filters)}`),

  getById: (id: string) => apiClient.get<AIProposal>(`/v1/ai/proposals/${id}`),

  create: (payload: CreateProposalInput) => apiClient.post<AIProposal>("/v1/ai/proposals", payload),

  updateStatus: (id: string, status: UpdatableProposalStatus) =>
    apiClient.patch<AIProposal>(`/v1/ai/proposals/${id}/status`, { status }),

  // Accepts AND generates an invoice — the only path that should ever
  // move a proposal to ACCEPTED (see the flagged backend gap above).
  accept: (id: string) =>
    apiClient.patch<{ proposal: AIProposal; invoice: unknown }>(`/v1/ai/proposals/${id}/accept`),
};