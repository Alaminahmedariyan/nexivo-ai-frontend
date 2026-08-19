import { useQuery } from "@tanstack/react-query";
import { aiUsageLogsApi, automationExecutionsApi } from "@/lib/api/ai-usage";

export function useUsageLogs(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: ["ai-usage-logs", filters],
    queryFn: () => aiUsageLogsApi.getAll(filters),
  });
}

export function useAutomationExecutions(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: ["automation-executions", filters],
    queryFn: () => automationExecutionsApi.getAll(filters),
  });
}