"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ProposalStatusBadge } from "./proposal-status-badge";
import type { AIProposal } from "@/types/ai";

export const proposalColumns: ColumnDef<AIProposal>[] = [
  { accessorKey: "title", header: "Title" },
  {
    id: "client",
    header: "Client / Lead",
    cell: ({ row }) => row.original.client?.companyName ?? row.original.lead?.name ?? "—",
  },
  {
    id: "amount",
    header: "Amount",
    cell: ({ row }) =>
      row.original.amount ? `${row.original.amount} ${row.original.currency}` : "—",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ProposalStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy"),
  },
];