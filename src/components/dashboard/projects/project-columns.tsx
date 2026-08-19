"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ProjectStatusBadge } from "./project-status-badge";
import type { Project } from "@/types/project";

export const projectColumns: ColumnDef<Project>[] = [
  { accessorKey: "title", header: "Title" },
  {
    id: "client",
    header: "Client",
    cell: ({ row }) => row.original.client?.companyName ?? "—",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ProjectStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "dueDate",
    header: "Due",
    cell: ({ row }) => (row.original.dueDate ? format(new Date(row.original.dueDate), "MMM d, yyyy") : "—"),
  },
];