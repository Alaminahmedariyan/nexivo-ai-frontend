import { apiClient } from "./client";
import { buildQueryString } from "./query-string";
import type { AIUsageLog, AutomationExecution } from "@/types/ai";

export const aiUsageLogsApi = {
  getAll: (filters: Record<string, unknown> = {}) =>
    apiClient.getWithMeta<AIUsageLog[]>(`/v1/ai/usage-logs${buildQueryString(filters)}`),
};

export const automationExecutionsApi = {
  getAll: (filters: Record<string, unknown> = {}) =>
    apiClient.getWithMeta<AutomationExecution[]>(`/v1/ai/automation-executions${buildQueryString(filters)}`),
};