import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminTestimonialsApi } from "@/lib/api/admin-testimonials";
import { revalidateMarketingPages } from "@/app/actions/revalidate";
import type { CreateTestimonialInput, UpdateTestimonialInput } from "@/types/testimonial";
import { ApiError } from "@/types/api";

const keys = { all: ["admin-testimonials"] as const };

export function useAdminTestimonials(filters: Record<string, unknown> = {}) {
  return useQuery({ queryKey: [...keys.all, filters], queryFn: () => adminTestimonialsApi.getAll(filters) });
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTestimonialInput) => adminTestimonialsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.all });
      revalidateMarketingPages();
      toast.success("Testimonial created.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useUpdateTestimonial(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTestimonialInput) => adminTestimonialsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.all });
      revalidateMarketingPages();
      toast.success("Testimonial updated.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminTestimonialsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.all });
      revalidateMarketingPages();
      toast.success("Testimonial deleted.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}