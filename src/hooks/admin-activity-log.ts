
import { apiClient } from "@/lib/api/client";
import { buildQueryString } from "@/lib/api/query-string";
import type { ActivityLog, ActivityLogFilters } from "@/types/activity-log";

export const adminActivityLogApi = {
  getAll: (filters: ActivityLogFilters = {}) =>
    apiClient.getWithMeta<ActivityLog[]>(`/v1/activity-logs${buildQueryString(filters)}`),
};