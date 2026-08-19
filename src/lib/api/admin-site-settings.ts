import { apiClient } from "./client";
import type { SiteSetting, UpsertSettingInput } from "@/types/site-setting";

export const adminSiteSettingsApi = {
  getAll: () => apiClient.get<SiteSetting[]>("/v1/site-settings"),
  upsert: (payload: UpsertSettingInput) => apiClient.put<SiteSetting>("/v1/site-settings", payload),
  delete: (key: string) => apiClient.delete(`/v1/site-settings/${key}`),
};