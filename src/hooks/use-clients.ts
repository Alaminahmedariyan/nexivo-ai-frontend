import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { clientsApi } from "@/lib/api/clients";
import type { ClientFilters } from "@/types/client";
import { ApiError } from "@/types/api";

export const clientKeys = {
  all: ["clients"] as const,
  list: (filters: ClientFilters) => [...clientKeys.all, "list", filters] as const,
  detail: (id: string) => [...clientKeys.all, "detail", id] as const,
};

export function useClients(filters: ClientFilters = {}) {
  return useQuery({
    queryKey: clientKeys.list(filters),
    queryFn: () => clientsApi.getAll(filters),
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      toast.success("Client created successfully.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}