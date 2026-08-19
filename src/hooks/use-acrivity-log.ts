import { useQuery } from "@tanstack/react-query";
import { adminActivityLogApi } from "@/lib/api/admin-activity-log";
import type { ActivityLogFilters } from "@/types/activity-log";

export function useActivityLogs(filters: ActivityLogFilters = {}) {
  return useQuery({
    queryKey: ["admin-activity-log", filters],
    queryFn: () => adminActivityLogApi.getAll(filters),
  });
}