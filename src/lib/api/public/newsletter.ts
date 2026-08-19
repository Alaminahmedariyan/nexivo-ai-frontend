import { apiClient } from "../client";
import type { SubscribeInput } from "@/types/newsletter";

export const publicNewsletterApi = {
  subscribe: (payload: SubscribeInput) => apiClient.post("/v1/newsletter/subscribe", payload),
};