import { apiClient } from "./client";
import type { NewsletterSubscriber } from "@/types/newsletter";

export const adminNewsletterApi = {
  getAll: (isActive?: boolean) =>
    apiClient.get<NewsletterSubscriber[]>(
      `/v1/newsletter${isActive === undefined ? "" : `?isActive=${isActive}`}`,
    ),
};