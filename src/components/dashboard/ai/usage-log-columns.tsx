"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { AIUsageLog } from "@/types/ai";

export const usageLogColumns: ColumnDef<AIUsageLog>[] = [
  { accessorKey: "feature", header: "Feature" },
  { accessorKey: "promptTokens", header: "Prompt Tokens" },
  { accessorKey: "outputTokens", header: "Output Tokens" },
  {
    id: "cost",
    header: "Cost",
    cell: ({ row }) => (row.original.cost ? `$${row.original.cost}` : "—"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "SUCCESS" ? "default" : "destructive"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy h:mm a"),
  },
];