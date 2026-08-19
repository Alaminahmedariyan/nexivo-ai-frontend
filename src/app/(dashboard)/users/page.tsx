"use client";

import { useState } from "react";

import { userColumns } from "@/components/dashboard/users/user-columns";
import { UserFiltersBar } from "@/components/dashboard/users/user-filters";
import { UserPagination } from "@/components/dashboard/users/user-pagination";
import { DataTable } from "@/components/dashboard/data-table";

import { useAdminUsers } from "@/hooks/use-admin-users";

import type { UserFilters } from "@/types/user";

export default function UsersPage() {
  const [filters, setFilters] =
    useState<UserFilters>({
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useAdminUsers(filters);

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Failed to load users.
      </p>
    );
  }

  const users = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-semibold">
          Users
        </h1>

        {meta && (
          <p className="mt-1 text-sm text-muted-foreground">
            {meta.total} total users
          </p>
        )}
      </div>

      <UserFiltersBar
        filters={filters}
        onChange={setFilters}
      />

      <DataTable
        columns={userColumns}
        data={users}
        isLoading={isLoading}
      />

      <UserPagination
        meta={meta}
        onPageChange={(page) => {
          setFilters((current) => ({
            ...current,
            page,
          }));
        }}
      />

      {isFetching && !isLoading && (
        <p className="mt-2 text-right text-xs text-muted-foreground">
          Updating...
        </p>
      )}
    </div>
  );
}