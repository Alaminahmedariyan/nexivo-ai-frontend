export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
export type ProjectCurrency = "USD" | "EUR" | "BDT";
export type ProjectMemberRole = "LEAD" | "DEVELOPER" | "DESIGNER" | "MANAGER";

export type ProjectMember = {
  userId: string;
  projectRole: ProjectMemberRole;
  joinedAt: string;
  user: { id: string; name: string; email: string };
};

export type Project = {
  id: string;
  clientId: string;
  title: string;
  description: string;
  status: ProjectStatus;
  startDate: string | null;
  dueDate: string | null;
  budget: string | null;
  currency: ProjectCurrency;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  client?: { id: string; companyName: string | null };
  members?: ProjectMember[];
};

export type ProjectFilters = {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus;
  clientId?: string;
};

export type UpdateProjectInput = Partial<{
  title: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
  budget: number;
  currency: ProjectCurrency;
}>;

import type { Milestone } from "./milestone";
import type { TimelineEntry } from "./timeline";
import type { ProjectFile } from "./project-file";

export type MyProject = {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  startDate: string | null;
  dueDate: string | null;
  budget: string | null;
  currency: ProjectCurrency;
  createdAt: string;
  milestones: Milestone[];
};

export type MyProjectDetail = MyProject & {
  timeline: TimelineEntry[];
  files: ProjectFile[];
};