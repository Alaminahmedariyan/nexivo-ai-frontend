"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLeads } from "@/hooks/use-leads";

import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { LeadFiltersBar } from "@/components/dashboard/leads/lead-filters";
import { leadColumns } from "@/components/dashboard/leads/lead-columns";
import type { LeadFilters } from "@/types/lead";
import { useDebouncedValue } from "@/hooks/use-devounced";

export default function LeadsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<LeadFilters>({ page: 1, limit: 10 });

  const debouncedSearch = useDebouncedValue(filters.search, 350);
  const queryFilters = { ...filters, search: debouncedSearch };

  const { data, isLoading, error } = useLeads(queryFilters);

  if (error) {
    return <p className="text-sm text-destructive">Failed to load leads: {error.message}</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Leads</h1>
      </div>

      <LeadFiltersBar filters={filters} onChange={setFilters} />

      <DataTable
        columns={leadColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        onRowClick={(lead) => router.push(`/leads/${lead.id}`)}
      />

      <DataTablePagination
        meta={data?.meta}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
}