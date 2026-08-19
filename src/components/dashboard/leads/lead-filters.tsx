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

import { LEAD_STATUS_LABELS } from "@/lib/constants";

import type {
  LeadFilters,
  LeadSource,
  LeadSortField,
} from "@/types/lead";

const SOURCE_OPTIONS: {
  value: LeadSource;
  label: string;
}[] = [
  {
    value: "CONTACT_FORM",
    label: "Contact Form",
  },
  {
    value: "QUOTE_FORM",
    label: "Quote Form",
  },
  {
    value: "ORGANIC",
    label: "Organic",
  },
  {
    value: "GOOGLE",
    label: "Google",
  },
  {
    value: "LINKEDIN",
    label: "LinkedIn",
  },
  {
    value: "FACEBOOK",
    label: "Facebook",
  },
  {
    value: "REFERRAL",
    label: "Referral",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const SORT_OPTIONS: {
  value: LeadSortField;
  label: string;
}[] = [
  {
    value: "createdAt",
    label: "Created Date",
  },
  {
    value: "updatedAt",
    label: "Updated Date",
  },
  {
    value: "name",
    label: "Name",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "company",
    label: "Company",
  },
  {
    value: "status",
    label: "Status",
  },
];

type LeadFiltersBarProps = {
  filters: LeadFilters;
  onChange: (
    filters: LeadFilters,
  ) => void;
};

export function LeadFiltersBar({
  filters,
  onChange,
}: LeadFiltersBarProps) {
  const [searchValue, setSearchValue] =
    useState(filters.search ?? "");

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        const search =
          searchValue.trim() || undefined;

        if (
          search === filters.search
        ) {
          return;
        }

        onChange({
          ...filters,
          search,
          page: 1,
        });
      }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    searchValue,
    filters,
    onChange,
  ]);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <Input
        type="search"
        placeholder="Search by name, email, phone or company..."
        value={searchValue}
        onChange={(event) => {
          setSearchValue(
            event.target.value,
          );
        }}
        className="w-full sm:w-80"
      />

      <Select
        value={filters.status ?? "ALL"}
        onValueChange={(value) => {
          onChange({
            ...filters,
            status:
              value === "ALL"
                ? undefined
                : (value as LeadFilters["status"]),
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

          {Object.entries(
            LEAD_STATUS_LABELS,
          ).map(([value, label]) => (
            <SelectItem
              key={value}
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.source ?? "ALL"}
        onValueChange={(value) => {
          onChange({
            ...filters,
            source:
              value === "ALL"
                ? undefined
                : (value as LeadSource),
            page: 1,
          });
        }}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="All sources" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">
            All sources
          </SelectItem>

          {SOURCE_OPTIONS.map(
            (option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>

      <Select
        value={
          filters.sortBy ??
          "createdAt"
        }
        onValueChange={(value) => {
          onChange({
            ...filters,
            sortBy:
              value as LeadSortField,
            page: 1,
          });
        }}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          {SORT_OPTIONS.map(
            (option) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>

      <Select
        value={
          filters.sortOrder ??
          "desc"
        }
        onValueChange={(value) => {
          onChange({
            ...filters,
            sortOrder:
              value === "asc"
                ? "asc"
                : "desc",
            page: 1,
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