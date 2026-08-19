import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectFilesApi } from "@/lib/api/project-files";
import { ApiError } from "@/types/api";

const fileKeys = {
  byProject: (projectId: string) => ["project-files", projectId] as const,
};

export function useProjectFiles(projectId: string) {
  return useQuery({
    queryKey: fileKeys.byProject(projectId),
    queryFn: () => projectFilesApi.getByProject(projectId),
    enabled: !!projectId,
  });
}

export function useUploadProjectFile(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => projectFilesApi.upload(projectId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys.byProject(projectId) });
      toast.success("File uploaded.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}

export function useDeleteProjectFile(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fileId: string) => projectFilesApi.delete(projectId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys.byProject(projectId) });
      toast.success("File removed.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}