import { apiClient } from "./client";
import { buildQueryString } from "./query-string";
import type { ActivityLog, ActivityLogFilters } from "@/types/activity-log";

// Note: this endpoint returns { data, meta } but NOT wrapped in the
// standard { success, message, data } envelope the way other list
// endpoints are — activityLogService.getActivityLogs already returns
// { data, meta } itself, and the controller puts that whole object into
// the outer "data" field. So apiClient.get<T> (not getWithMeta) is used
// here, with T being the { data, meta } shape directly.
export const adminActivityLogApi = {
  getAll: (filters: ActivityLogFilters = {}) =>
    apiClient.get<{ data: ActivityLog[]; meta: { page: number; limit: number; total: number; totalPage: number } }>(
      `/v1/activity-logs${buildQueryString(filters)}`,
    ),
};