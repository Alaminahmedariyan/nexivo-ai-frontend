import { apiClient } from "./client";
import type { Service } from "@/types/service";

export const servicesApi = {
  getAll: () => apiClient.get<Service[]>("/v1/services?limit=50"),
  getBySlug: (slug: string) => apiClient.get<Service>(`/v1/services/slug/${slug}`),
};