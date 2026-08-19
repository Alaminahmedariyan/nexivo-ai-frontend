import { apiClient } from "./client";
import type { CreateMilestoneInput, Milestone, MilestoneStatus } from "@/types/milestone";

export const milestonesApi = {
  getByProject: (projectId: string) =>
    apiClient.get<Milestone[]>(`/v1/projects/${projectId}/milestones`),

  create: (projectId: string, payload: CreateMilestoneInput) =>
    apiClient.post<Milestone>(`/v1/projects/${projectId}/milestones`, payload),

  updateStatus: (projectId: string, milestoneId: string, status: MilestoneStatus) =>
    apiClient.patch<Milestone>(`/v1/projects/${projectId}/milestones/${milestoneId}`, { status }),

  delete: (projectId: string, milestoneId: string) =>
    apiClient.delete(`/v1/projects/${projectId}/milestones/${milestoneId}`),
};