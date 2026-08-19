"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminInvoices } from "@/hooks/use-admin-invoices";
import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";
import { invoiceColumns } from "@/components/dashboard/invoices/invoice-columns";
import { CreateInvoiceDialog } from "@/components/dashboard/invoices/create-invoice-dialog";

export default function InvoicesPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { data, isLoading, error } = useAdminInvoices(filters);

  if (error) return <p className="text-sm text-destructive">Failed to load invoices.</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Invoices</h1>
        <CreateInvoiceDialog />
      </div>

      <DataTable
        columns={invoiceColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        onRowClick={(inv) => router.push(`/invoices/${inv.id}`)}
      />

      <DataTablePagination meta={data?.meta} onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))} />
    </div>
  );
}