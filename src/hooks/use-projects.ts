import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectsApi } from "@/lib/api/projects";
import type { ProjectFilters, UpdateProjectInput } from "@/types/project";
import { ApiError } from "@/types/api";

export const projectKeys = {
  all: ["projects"] as const,
  list: (filters: ProjectFilters) => [...projectKeys.all, "list", filters] as const,
  detail: (id: string) => [...projectKeys.all, "detail", id] as const,
};

export function useProjects(filters: ProjectFilters = {}) {
  return useQuery({
    queryKey: projectKeys.list(filters),
    queryFn: () => projectsApi.getAll(filters),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });
}

export function useUpdateProject(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProjectInput) => projectsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      toast.success("Project updated.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useMyProjects() {
  return useQuery({
    queryKey: [...projectKeys.all, "my"],
    queryFn: () => projectsApi.getMy(),
  });
}

export function useMyProject(id: string) {
  return useQuery({
    queryKey: [...projectKeys.all, "my", id],
    queryFn: () => projectsApi.getMyById(id),
    enabled: !!id,
  });
}