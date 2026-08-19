"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProposals } from "@/hooks/use-ai-proposals";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { proposalColumns } from "@/components/dashboard/ai/proposal-columns";
import { CreateProposalDialog } from "@/components/dashboard/ai/create-proposal-dialog";

export default function AiProposalsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { data, isLoading, error } = useProposals(filters);

  if (error) return <p className="text-sm text-destructive">Failed to load proposals.</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">AI Proposals</h1>
        <CreateProposalDialog />
      </div>

      <DataTable
        columns={proposalColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        onRowClick={(p) => router.push(`/ai/proposals/${p.id}`)}
      />

      <DataTablePagination meta={data?.meta} onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} />
    </div>
  );
}