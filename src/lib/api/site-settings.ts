import { apiClient } from "./client";
import type { SiteSetting } from "@/types/site-setting";

export const siteSettingsApi = {
  getAll: () => apiClient.get<SiteSetting[]>("/v1/site-settings"),
};

// Convenience — turns the flat SiteSetting[] into a { key: value } map,
// since components almost always want settings.companyName, not an array.
export async function getSiteSettingsMap(): Promise<Record<string, unknown>> {
  const settings = await siteSettingsApi.getAll();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}