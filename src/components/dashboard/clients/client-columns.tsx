"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { Client } from "@/types/client";

export const clientColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => row.original.companyName ?? "—",
  },
  {
    id: "contact",
    header: "Contact",
    cell: ({ row }) => row.original.user?.name ?? row.original.lead?.name ?? "—",
  },
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => row.original.user?.email ?? row.original.lead?.email ?? "—",
  },
  {
    id: "linked",
    header: "Account",
    cell: ({ row }) =>
      row.original.userId ? (
        <Badge>Linked</Badge>
      ) : (
        <Badge variant="outline">Not linked</Badge>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => format(new Date(row.original.createdAt), "MMM d, yyyy"),
  },
];