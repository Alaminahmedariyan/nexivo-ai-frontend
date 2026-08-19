import { apiClient } from "./client";
import type { CreateTimelineInput, TimelineEntry } from "@/types/timeline";

export const timelineApi = {
  getByProject: (projectId: string) =>
    apiClient.get<TimelineEntry[]>(`/v1/projects/${projectId}/timeline`),

  create: (projectId: string, payload: CreateTimelineInput) =>
    apiClient.post<TimelineEntry>(`/v1/projects/${projectId}/timeline`, payload),
};