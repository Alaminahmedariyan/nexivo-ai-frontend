import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { publicNewsletterApi } from "@/lib/api/public/newsletter";
import { adminNewsletterApi } from "@/lib/api/admin-newsletter";
import { ApiError } from "@/types/api";

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: publicNewsletterApi.subscribe,
    onError: (error: ApiError) => {
      // 409 = already subscribed — treat as a soft success in the UI
      // rather than an error toast, since the end state the user wants
      // (being subscribed) is already true.
      if (error.statusCode === 409) return;
      toast.error(error.message);
    },
  });
}

export function useAdminNewsletterSubscribers(isActive?: boolean) {
  return useQuery({
    queryKey: ["admin-newsletter", isActive],
    queryFn: () => adminNewsletterApi.getAll(isActive),
  });
}