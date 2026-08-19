import { apiClient } from "./client";
import type { ProjectFile } from "@/types/project-file";

export const projectFilesApi = {
  getByProject: (projectId: string) =>
    apiClient.get<ProjectFile[]>(`/v1/projects/${projectId}/files`),

  // File upload needs FormData, not JSON — bypasses apiClient's
  // JSON-only wrapper and hits fetch directly.
  upload: async (projectId: string, file: File): Promise<ProjectFile> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/v1/projects/${projectId}/files`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message ?? "Upload failed.");
    }

    return json.data;
  },

  delete: (projectId: string, fileId: string) =>
    apiClient.delete(`/v1/projects/${projectId}/files/${fileId}`),
};