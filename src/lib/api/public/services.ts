import { serverFetch } from "../server-client";
import type { Service } from "@/types/service";

export const publicServicesApi = {
  getAll: () => serverFetch<Service[]>("/v1/services?limit=50", { revalidate: 3600 }),
  getBySlug: (slug: string) => serverFetch<Service>(`/v1/services/slug/${slug}`, { revalidate: 3600 }),
};