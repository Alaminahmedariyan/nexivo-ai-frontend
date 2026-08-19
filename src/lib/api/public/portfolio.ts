import { serverFetch } from "../server-client";
import type { Portfolio } from "@/types/portfolio";

export const publicPortfolioApi = {
  getAll: () => serverFetch<Portfolio[]>("/v1/portfolios?limit=50", { revalidate: 3600 }),
  getBySlug: (slug: string) => serverFetch<Portfolio>(`/v1/portfolios/slug/${slug}`, { revalidate: 3600 }),
};