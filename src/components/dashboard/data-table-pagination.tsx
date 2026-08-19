"use client";

import { Button } from "@/components/ui/button";
import type { QueryMeta } from "@/types/api";

type DataTablePaginationProps = {
  meta?: QueryMeta;
  onPageChange: (page: number) => void;
};

export function DataTablePagination({ meta, onPageChange }: DataTablePaginationProps) {
  if (!meta) return null;

  return (
    <div className="flex items-center justify-between px-1 py-4">
      <p className="text-sm text-muted-foreground">
        Page {meta.page} of {meta.totalPage} — {meta.total} total
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={meta.page <= 1}
          onClick={() => onPageChange(meta.page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={meta.page >= meta.totalPage}
          onClick={() => onPageChange(meta.page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}