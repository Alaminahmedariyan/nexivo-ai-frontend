import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { leadsApi } from "@/lib/api/leads";
import { ApiError } from "@/types/api";

import type {
  LeadFilters,
  LeadStatus,
} from "@/types/lead";

export const leadKeys = {
  all: ["leads"] as const,

  list: (filters: LeadFilters) =>
    [...leadKeys.all, "list", filters] as const,

  detail: (id: string) =>
    [...leadKeys.all, "detail", id] as const,
};

export function useLeads(
  filters: LeadFilters = {},
) {
  return useQuery({
    queryKey: leadKeys.list(filters),

    queryFn: () =>
      leadsApi.getAll(filters),

    placeholderData: (previousData) =>
      previousData,
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: leadKeys.detail(id),

    queryFn: () =>
      leadsApi.getById(id),

    enabled: Boolean(id),
  });
}

export function useUpdateLeadStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      assignedToId,
    }: {
      id: string;
      status: LeadStatus;
      assignedToId?: string;
    }) =>
      leadsApi.updateStatus(
        id,
        {
          status,
          assignedToId,
        },
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: leadKeys.all,
      });

      toast.success(
        "Lead status updated.",
      );
    },

    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}