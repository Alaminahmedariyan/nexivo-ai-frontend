"use client";

import { useState } from "react";
import { useAutomationExecutions } from "@/hooks/use-ai-usage";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { automationColumns } from "@/components/dashboard/ai/automation-columns";

export default function AutomationsPage() {
  const [filters, setFilters] = useState({ page: 1, limit: 15 });
  const { data, isLoading, error } = useAutomationExecutions(filters);

  if (error) return <p className="text-sm text-destructive">Failed to load automation executions.</p>;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Automation Executions</h1>
      <DataTable columns={automationColumns} data={data?.data ?? []} isLoading={isLoading} />
      <DataTablePagination meta={data?.meta} onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} />
    </div>
  );
}