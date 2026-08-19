"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  userApi,
  type UpdateProfileInput,
} from "@/lib/api/user";

import { ApiError } from "@/types/api";
import { useSession } from "@/lib/auth/auth-client";

const userKeys = {
  all: ["users"] as const,
  me: ["users", "me"] as const,
};

export function useMyProfile() {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: userApi.getMe,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { refetch: refetchSession } = useSession();

  return useMutation({
    mutationFn: (payload: UpdateProfileInput) =>
      userApi.updateMe(payload),

    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(
        userKeys.me,
        updatedUser,
      );

      await refetchSession();

      toast.success("Profile updated successfully.");
    },

    onError: (error: ApiError) => {
      toast.error(
        error.message || "Failed to update profile.",
      );
    },
  });
}