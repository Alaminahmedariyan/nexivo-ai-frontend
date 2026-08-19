"use client";

import { useState } from "react";
import { useUsageLogs } from "@/hooks/use-ai-usage";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { usageLogColumns } from "@/components/dashboard/ai/usage-log-columns";

export default function AiUsagePage() {
  const [filters, setFilters] = useState({ page: 1, limit: 15 });
  const { data, isLoading, error } = useUsageLogs(filters);

  if (error) return <p className="text-sm text-destructive">Failed to load usage logs.</p>;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">AI Usage Logs</h1>
      <DataTable columns={usageLogColumns} data={data?.data ?? []} isLoading={isLoading} />
      <DataTablePagination meta={data?.meta} onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} />
    </div>
  );
}