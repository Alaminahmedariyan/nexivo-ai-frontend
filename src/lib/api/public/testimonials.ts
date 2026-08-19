import { serverFetch } from "../server-client";
import type { Testimonial } from "@/types/testimonial";

export const publicTestimonialsApi = {
  getFeatured: () =>
    serverFetch<Testimonial[]>("/v1/testimonials?isFeatured=true&limit=12", { revalidate: 3600 }),
};