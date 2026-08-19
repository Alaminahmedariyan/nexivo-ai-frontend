import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminApiKeysApi } from "@/lib/api/admin-api-keys";
import type { CreateApiKeyInput } from "@/types/api-key";
import { ApiError } from "@/types/api";

const keys = { all: ["admin-api-keys"] as const };

export function useAdminApiKeys() {
  return useQuery({ queryKey: keys.all, queryFn: adminApiKeysApi.getAll });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateApiKeyInput) => adminApiKeysApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }),
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApiKeysApi.revoke(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.all });
      toast.success("API key revoked.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}