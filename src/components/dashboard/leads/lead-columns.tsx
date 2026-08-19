"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { LeadStatusBadge } from "./lead-status-badge";
import type { Lead } from "@/types/lead";

export const leadColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => row.original.company ?? "—",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <LeadStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy"),
  },
];