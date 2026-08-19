import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { aiConversationsApi } from "@/lib/api/ai-conversations";
import type { AddMessageInput, StartConversationInput } from "@/types/ai";
import { ApiError } from "@/types/api";

const conversationKeys = {
  all: ["ai-conversations"] as const,
  detail: (id: string) => [...conversationKeys.all, id] as const,
};

export function useConversations(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: [...conversationKeys.all, "list", filters],
    queryFn: () => aiConversationsApi.getAll(filters),
  });
}

export function useConversation(id: string | null) {
  return useQuery({
    queryKey: conversationKeys.detail(id ?? ""),
    queryFn: () => aiConversationsApi.getById(id as string),
    enabled: !!id,
  });
}

export function useStartConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: StartConversationInput) => aiConversationsApi.start(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: conversationKeys.all }),
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useAddMessage(conversationId: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddMessageInput) => aiConversationsApi.addMessage(conversationId as string, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: conversationKeys.detail(conversationId ?? "") });
      queryClient.invalidateQueries({ queryKey: conversationKeys.all });
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}