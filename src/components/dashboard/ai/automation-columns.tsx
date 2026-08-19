"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { AutomationExecution } from "@/types/ai";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  RUNNING: "secondary",
  SUCCESS: "default",
  FAILED: "destructive",
};

export const automationColumns: ColumnDef<AutomationExecution>[] = [
  { accessorKey: "workflowName", header: "Workflow" },
  { accessorKey: "triggerType", header: "Trigger" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant={STATUS_VARIANT[row.original.status]}>{row.original.status}</Badge>,
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => (row.original.executionTime ? `${row.original.executionTime}ms` : "—"),
  },
  {
    accessorKey: "startedAt",
    header: "Started",
    cell: ({ row }) => format(new Date(row.original.startedAt), "MMM d, yyyy h:mm a"),
  },
];