import { apiClient } from "./client";
import type { ApiKeyRecord, CreateApiKeyInput, CreatedApiKey } from "@/types/api-key";

export const adminApiKeysApi = {
  getAll: () => apiClient.get<ApiKeyRecord[]>("/v1/api-keys"),
  create: (payload: CreateApiKeyInput) => apiClient.post<CreatedApiKey>("/v1/api-keys", payload),
  revoke: (id: string) => apiClient.patch<ApiKeyRecord>(`/v1/api-keys/${id}/revoke`),
};