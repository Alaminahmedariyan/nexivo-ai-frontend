export type MilestoneStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type Milestone = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  status: MilestoneStatus;
  order: number;
  createdAt: string;
};

export type CreateMilestoneInput = {
  title: string;
  description?: string;
  dueDate?: string;
  order?: number;
};