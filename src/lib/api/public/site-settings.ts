import { serverFetch } from "../server-client";
import type { SiteSetting } from "@/types/site-setting";

export const getSiteSettingsMap = async (): Promise<Record<string, unknown>> => {
  const settings = await serverFetch<SiteSetting[]>("/v1/site-settings", { revalidate: 3600 });
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
};