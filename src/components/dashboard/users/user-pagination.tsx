"use client";

import type { QueryMeta } from "@/types/api";

type UserPaginationProps = {
  meta?: QueryMeta;
  onPageChange: (page: number) => void;
};

export function UserPagination({
  meta,
  onPageChange,
}: UserPaginationProps) {
  if (!meta || meta.total === 0) {
    return null;
  }

  const start =
    (meta.page - 1) * meta.limit + 1;

  const end = Math.min(
    meta.page * meta.limit,
    meta.total,
  );

  const pages = Array.from(
    { length: meta.totalPage },
    (_, index) => index + 1,
  );

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-medium text-foreground">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-foreground">
          {meta.total}
        </span>{" "}
        users
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={meta.page <= 1}
          onClick={() =>
            onPageChange(meta.page - 1)
          }
          className="rounded-md border px-3 py-1.5 text-sm disabled:pointer-events-none disabled:opacity-40 hover:bg-secondary"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() =>
              onPageChange(page)
            }
            className={`min-w-9 rounded-md border px-2 py-1.5 text-sm ${
              page === meta.page
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={
            meta.page >= meta.totalPage
          }
          onClick={() =>
            onPageChange(meta.page + 1)
          }
          className="rounded-md border px-3 py-1.5 text-sm disabled:pointer-events-none disabled:opacity-40 hover:bg-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
}