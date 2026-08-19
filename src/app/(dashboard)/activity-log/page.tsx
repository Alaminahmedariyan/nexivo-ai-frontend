"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ActionBadge } from "@/components/dashboard/activity-log/action-badge";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { ActivityLogFilters } from "@/types/activity-log";
import { useActivityLogs } from "@/hooks/use-acrivity-log";

function LogRow({ log }: { log: import("@/types/activity-log").ActivityLog }) {
  const [open, setOpen] = useState(false);
  const hasMetadata = log.metadata && Object.keys(log.metadata).length > 0;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-md border p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ActionBadge action={log.action} />
            <span className="text-sm font-medium">{log.entityType}</span>
            <span className="font-mono text-xs text-muted-foreground">#{log.entityId.slice(0, 8)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {log.user ? log.user.name : "System"} · {format(new Date(log.createdAt), "MMM d, h:mm a")}
            </span>
            {hasMetadata && (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
            )}
          </div>
        </div>
        {hasMetadata && (
          <CollapsibleContent className="mt-3 rounded-md bg-secondary/40 p-3">
            <pre className="overflow-x-auto text-xs text-muted-foreground">
              {JSON.stringify(log.metadata, null, 2)}
            </pre>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
}

export default function ActivityLogPage() {
  const [filters, setFilters] = useState<ActivityLogFilters>({ page: 1, limit: 20 });
  const debouncedSearch = useDebouncedValue(filters.search, 350);
  const queryFilters = { ...filters, search: debouncedSearch };

  const { data, isLoading, error } = useActivityLogs(queryFilters);

  if (error) return <p className="text-sm text-destructive">Failed to load activity log.</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="mb-4 text-xl font-semibold">Activity Log</h1>

      <Input
        placeholder="Filter by entity type (Lead, Project, Invoice...)"
        value={filters.entityType ?? ""}
        onChange={(e) => setFilters((prev) => ({ ...prev, entityType: e.target.value || undefined, page: 1 }))}
        className="mb-4 max-w-xs"
      />

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
        </div>
      ) : !data?.data || data.data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
      ) : (
        <div className="space-y-2">
          {data.data.map((log) => (
            <LogRow key={log.id} log={log} />
          ))}
        </div>
      )}

      <DataTablePagination meta={data?.meta} onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} />
    </div>
  );
}