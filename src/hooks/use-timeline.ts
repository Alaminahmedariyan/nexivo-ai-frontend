import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { timelineApi } from "@/lib/api/timeline";
import type { CreateTimelineInput } from "@/types/timeline";
import { ApiError } from "@/types/api";

const timelineKeys = {
  byProject: (projectId: string) => ["timeline", projectId] as const,
};

export function useTimeline(projectId: string) {
  return useQuery({
    queryKey: timelineKeys.byProject(projectId),
    queryFn: () => timelineApi.getByProject(projectId),
    enabled: !!projectId,
  });
}

export function useCreateTimelineEntry(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTimelineInput) => timelineApi.create(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: timelineKeys.byProject(projectId) });
      toast.success("Timeline entry added.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}