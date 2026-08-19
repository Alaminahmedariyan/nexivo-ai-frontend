import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { adminUsersApi } from "@/lib/api/admin-users";

import type {
  UserFilters,
  UserRole,
} from "@/types/user";

import { ApiError } from "@/types/api";

const userKeys = {
  all: ["admin-users"] as const,
};

export function useAdminUsers(
  filters: UserFilters = {},
) {
  return useQuery({
    queryKey: [...userKeys.all, filters],

    queryFn: () =>
      adminUsersApi.getAll(filters),

    placeholderData: (previousData) =>
      previousData,
  });
}

export function useUpdateUserRole() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      role,
    }: {
      id: string;
      role: UserRole;
    }) =>
      adminUsersApi.updateRole(
        id,
        role,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      toast.success(
        "User role updated.",
      );
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}

export function useUpdateUserStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: string;
      isActive: boolean;
    }) =>
      adminUsersApi.updateStatus(
        id,
        isActive,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      toast.success(
        "User status updated.",
      );
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}

export function useDeleteUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      adminUsersApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      toast.success(
        "User removed.",
      );
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}