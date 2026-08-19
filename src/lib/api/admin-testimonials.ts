import { apiClient } from "./client";
import { buildQueryString } from "./query-string";
import type { CreateTestimonialInput, Testimonial, UpdateTestimonialInput } from "@/types/testimonial";

export const adminTestimonialsApi = {
  getAll: (filters: Record<string, unknown> = {}) =>
    apiClient.getWithMeta<Testimonial[]>(`/v1/testimonials${buildQueryString(filters)}`),
  create: (payload: CreateTestimonialInput) => apiClient.post<Testimonial>("/v1/testimonials", payload),
  update: (id: string, payload: UpdateTestimonialInput) =>
    apiClient.patch<Testimonial>(`/v1/testimonials/${id}`, payload),
  delete: (id: string) => apiClient.delete(`/v1/testimonials/${id}`),
};