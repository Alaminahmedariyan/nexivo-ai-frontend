import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { aiProposalsApi } from "@/lib/api/ai-proposals";
import type { CreateProposalInput, UpdatableProposalStatus } from "@/types/ai";
import { ApiError } from "@/types/api";

const proposalKeys = {
  all: ["ai-proposals"] as const,
  detail: (id: string) => [...proposalKeys.all, id] as const,
};

export function useProposals(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: [...proposalKeys.all, "list", filters],
    queryFn: () => aiProposalsApi.getAll(filters),
  });
}

export function useProposal(id: string) {
  return useQuery({
    queryKey: proposalKeys.detail(id),
    queryFn: () => aiProposalsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateProposal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProposalInput) => aiProposalsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proposalKeys.all });
      toast.success("Proposal created.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useUpdateProposalStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: UpdatableProposalStatus) => aiProposalsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proposalKeys.all });
      queryClient.invalidateQueries({ queryKey: proposalKeys.detail(id) });
      toast.success("Proposal status updated.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useAcceptProposal(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => aiProposalsApi.accept(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proposalKeys.all });
      queryClient.invalidateQueries({ queryKey: proposalKeys.detail(id) });
      toast.success("Proposal accepted — invoice generated.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}