import { apiClient } from "./client";
import type { Portfolio } from "@/types/portfolio";

export const portfolioApi = {
  getAll: () => apiClient.get<Portfolio[]>("/v1/portfolios?limit=50"),
  getBySlug: (slug: string) => apiClient.get<Portfolio>(`/v1/portfolios/slug/${slug}`),
};