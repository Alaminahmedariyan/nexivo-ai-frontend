import { apiClient } from "./client";
import { buildQueryString } from "./query-string";
import type { MyProject, MyProjectDetail, Project, ProjectFilters, UpdateProjectInput } from "@/types/project";

export const projectsApi = {
  getAll: (filters: ProjectFilters = {}) =>
    apiClient.getWithMeta<Project[]>(`/v1/projects${buildQueryString(filters)}`),
  getById: (id: string) => apiClient.get<Project>(`/v1/projects/${id}`),
  update: (id: string, payload: UpdateProjectInput) =>
    apiClient.patch<Project>(`/v1/projects/${id}`, payload),

  // Client-portal — scoped to the logged-in CLIENT's own projects.
  getMy: () => apiClient.get<MyProject[]>("/v1/projects/my"),
  getMyById: (id: string) => apiClient.get<MyProjectDetail>(`/v1/projects/my/${id}`),
};