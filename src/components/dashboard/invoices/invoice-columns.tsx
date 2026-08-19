"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import type { Invoice } from "@/types/invoice";

export const invoiceColumns: ColumnDef<Invoice>[] = [
  { accessorKey: "invoiceNumber", header: "Invoice #" },
  { id: "client", header: "Client", cell: ({ row }) => row.original.client?.companyName ?? "—" },
  { id: "total", header: "Total", cell: ({ row }) => `${row.original.total} ${row.original.currency}` },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <InvoiceStatusBadge status={row.original.status} /> },
  {
    accessorKey: "dueDate",
    header: "Due",
    cell: ({ row }) => (row.original.dueDate ? format(new Date(row.original.dueDate), "MMM d, yyyy") : "—"),
  },
];