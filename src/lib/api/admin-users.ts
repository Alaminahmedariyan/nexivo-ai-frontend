import { apiClient } from "./client";
import { buildQueryString } from "./query-string";

import type {
  ManagedUser,
  UserFilters,
  UserRole,
} from "@/types/user";

import type { QueryMeta } from "@/types/api";

export type AdminUsersResponse = {
  data: ManagedUser[];
  meta?: QueryMeta;
};

export const adminUsersApi = {
  getAll: async (
    filters: UserFilters = {},
  ): Promise<AdminUsersResponse> => {
    return apiClient.getWithMeta<ManagedUser[]>(
      `/v1/users${buildQueryString(filters)}`,
    );
  },

  updateRole: (
    id: string,
    role: UserRole,
  ) =>
    apiClient.patch<ManagedUser>(
      `/v1/users/${id}/role`,
      { role },
    ),

  updateStatus: (
    id: string,
    isActive: boolean,
  ) =>
    apiClient.patch<ManagedUser>(
      `/v1/users/${id}/status`,
      { isActive },
    ),

  delete: (id: string) =>
    apiClient.delete(`/v1/users/${id}`),
};