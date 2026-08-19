"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { UserRoleSelect } from "./user-role-select";
import { UserStatusSwitch } from "./user-status-switch";
import type { ManagedUser } from "@/types/user";

export const userColumns: ColumnDef<ManagedUser>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <UserRoleSelect user={row.original} />,
  },
  {
    id: "verified",
    header: "Verified",
    cell: ({ row }) =>
      row.original.emailVerified ? (
        <Badge variant="outline">Verified</Badge>
      ) : (
        <Badge variant="secondary">Unverified</Badge>
      ),
  },
  {
    id: "active",
    header: "Active",
    cell: ({ row }) => <UserStatusSwitch user={row.original} />,
  },
  {
    accessorKey: "lastLoginAt",
    header: "Last login",
    cell: ({ row }) =>
      row.original.lastLoginAt ? format(new Date(row.original.lastLoginAt), "MMM d, yyyy") : "Never",
  },
];