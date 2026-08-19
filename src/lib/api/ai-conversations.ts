import { apiClient } from "./client";
import { buildQueryString } from "./query-string";
import type { AddMessageInput, AIConversation, StartConversationInput } from "@/types/ai";

export const aiConversationsApi = {
  start: (payload: StartConversationInput) =>
    apiClient.post<AIConversation>("/v1/ai/conversations", payload),

  addMessage: (id: string, payload: AddMessageInput) =>
    apiClient.post<AIConversation>(`/v1/ai/conversations/${id}/messages`, payload),

  getById: (id: string) => apiClient.get<AIConversation>(`/v1/ai/conversations/${id}`),

  getAll: (filters: Record<string, unknown> = {}) =>
    apiClient.getWithMeta<AIConversation[]>(`/v1/ai/conversations${buildQueryString(filters)}`),
};