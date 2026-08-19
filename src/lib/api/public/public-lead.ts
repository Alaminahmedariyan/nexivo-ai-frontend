
import type { CreateLeadFormInput } from "@/lib/validations/lead.schema";
import { apiClient } from "../client";

// Uses the browser-side apiClient (not serverFetch) because this is a
// Client Component form submission, not a server-rendered page load.
export const publicLeadApi = {
  create: (payload: CreateLeadFormInput) => apiClient.post("/v1/leads", payload),
};