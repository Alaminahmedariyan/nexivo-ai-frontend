export type ActivityLogAction = "created" | "updated" | "deleted" | "status_changed";

export type ActivityLog = {
  id: string;
  userId: string | null;
  action: ActivityLogAction;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  user: { id: string; name: string; email: string } | null;
};

export type ActivityLogFilters = {
  page?: number;
  limit?: number;
  entityType?: string;
  search?: string;
};