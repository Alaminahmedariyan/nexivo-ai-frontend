"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  ProjectFilters,
  ProjectStatus,
} from "@/types/project";

const STATUS_OPTIONS: {
  value: ProjectStatus;
  label: string;
}[] = [
  {
    value: "PLANNING",
    label: "Planning",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "REVIEW",
    label: "Review",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "ON_HOLD",
    label: "On Hold",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

type ProjectFiltersBarProps = {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
};

export function ProjectFiltersBar({
  filters,
  onChange,
}: ProjectFiltersBarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Search */}
      <Input
        type="search"
        placeholder="Search by project title or description..."
        value={filters.search ?? ""}
        onChange={(event) => {
          const value = event.target.value;

          onChange({
            ...filters,
            search: value.trim() || undefined,
            page: 1,
          });
        }}
        className="w-full sm:w-80"
      />

      {/* Status */}
      <Select
        value={filters.status ?? "ALL"}
        onValueChange={(value) => {
          onChange({
            ...filters,
            status:
              value === "ALL"
                ? undefined
                : (value as ProjectStatus),
            page: 1,
          });
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All statuses
          </SelectItem>

          {STATUS_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}