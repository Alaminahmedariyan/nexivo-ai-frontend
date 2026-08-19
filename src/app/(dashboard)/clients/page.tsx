"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClients } from "@/hooks/use-clients";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { clientColumns } from "@/components/dashboard/clients/client-columns";
import { Input } from "@/components/ui/input";
import type { ClientFilters } from "@/types/client";

export default function ClientsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<ClientFilters>({ page: 1, limit: 10 });

  const { data, isLoading, error } = useClients(filters);

  if (error) {
    return <p className="text-sm text-destructive">Failed to load clients: {error.message}</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Clients</h1>
      </div>

      <Input
        placeholder="Search clients..."
        defaultValue={filters.search ?? ""}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
        className="mb-4 max-w-xs"
      />

      <DataTable
        columns={clientColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        onRowClick={(client) => router.push(`/clients/${client.id}`)}
      />

      <DataTablePagination
        meta={data?.meta}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
}