import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { milestonesApi } from "@/lib/api/milestones";
import type { CreateMilestoneInput, MilestoneStatus } from "@/types/milestone";
import { ApiError } from "@/types/api";

const milestoneKeys = {
  byProject: (projectId: string) => ["milestones", projectId] as const,
};

export function useMilestones(projectId: string) {
  return useQuery({
    queryKey: milestoneKeys.byProject(projectId),
    queryFn: () => milestonesApi.getByProject(projectId),
    enabled: !!projectId,
  });
}

export function useCreateMilestone(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMilestoneInput) => milestonesApi.create(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.byProject(projectId) });
      toast.success("Milestone added.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useUpdateMilestoneStatus(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ milestoneId, status }: { milestoneId: string; status: MilestoneStatus }) =>
      milestonesApi.updateStatus(projectId, milestoneId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.byProject(projectId) });
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useDeleteMilestone(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (milestoneId: string) => milestonesApi.delete(projectId, milestoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: milestoneKeys.byProject(projectId) });
      toast.success("Milestone deleted.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}