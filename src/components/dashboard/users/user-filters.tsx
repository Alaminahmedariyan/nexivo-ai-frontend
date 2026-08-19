"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  UserFilters,
  UserRole,
  UserSortField,
} from "@/types/user";

const ROLE_OPTIONS: {
  value: UserRole;
  label: string;
}[] = [
  {
    value: "SUPER_ADMIN",
    label: "Super Admin",
  },
  {
    value: "ADMIN",
    label: "Admin",
  },
  {
    value: "TEAM_MEMBER",
    label: "Team Member",
  },
  {
    value: "CLIENT",
    label: "Client",
  },
  {
    value: "USER",
    label: "User",
  },
];

const SORT_OPTIONS: {
  value: UserSortField;
  label: string;
}[] = [
  {
    value: "createdAt",
    label: "Created Date",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "email",
    label: "Email",
  },
];

type UserFiltersBarProps = {
  filters: UserFilters;
  onChange: (filters: UserFilters) => void;
};

export function UserFiltersBar({
  filters,
  onChange,
}: UserFiltersBarProps) {
  const [searchValue, setSearchValue] = useState(
    filters.search ?? "",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const trimmedSearch = searchValue.trim();

      const currentSearch = filters.search ?? "";

      if (trimmedSearch === currentSearch) {
        return;
      }

      onChange({
        ...filters,
        search: trimmedSearch || undefined,
      });
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchValue, filters, onChange]);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Search */}
      <Input
        type="search"
        placeholder="Search by name, email or phone..."
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        className="w-full sm:w-80"
      />

      {/* Role */}
      <Select
        value={filters.role ?? "ALL"}
        onValueChange={(value) => {
          onChange({
            ...filters,
            role:
              value === "ALL"
                ? undefined
                : (value as UserRole),
          });
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All roles" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All roles
          </SelectItem>

          {ROLE_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select
        value={
          filters.isActive === undefined
            ? "ALL"
            : String(filters.isActive)
        }
        onValueChange={(value) => {
          onChange({
            ...filters,
            isActive:
              value === "ALL"
                ? undefined
                : value === "true",
          });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All statuses
          </SelectItem>

          <SelectItem value="true">
            Active
          </SelectItem>

          <SelectItem value="false">
            Inactive
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Field */}
      <Select
        value={filters.sortBy ?? "createdAt"}
        onValueChange={(value) => {
          onChange({
            ...filters,
            sortBy: value as UserSortField,
          });
        }}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort Order */}
      <Select
        value={filters.sortOrder ?? "desc"}
        onValueChange={(value) => {
          onChange({
            ...filters,
            sortOrder:
              value === "asc"
                ? "asc"
                : "desc",
          });
        }}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Order" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="desc">
            Descending
          </SelectItem>

          <SelectItem value="asc">
            Ascending
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}