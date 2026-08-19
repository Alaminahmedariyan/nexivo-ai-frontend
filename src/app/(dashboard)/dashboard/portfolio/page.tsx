"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Search, Trash2, X } from "lucide-react";

import {
  useAdminPortfolios,
  useDeletePortfolio,
} from "@/hooks/use-admin-portfolio";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PortfolioFormDialog } from "@/components/dashboard/portfolio/portfolio-form-dialog";
import { ManageGalleryDialog } from "@/components/dashboard/portfolio/manage-gallery-dialog";

export default function AdminPortfolioPage() {
  const {
    data: portfolios,
    isLoading,
    error,
  } = useAdminPortfolios();

  const { mutate: deletePortfolio } = useDeletePortfolio();

  const [search, setSearch] = useState("");

  const filteredPortfolios = useMemo(() => {
    if (!portfolios) return [];

    const query = search.trim().toLowerCase();

    if (!query) return portfolios;

    return portfolios.filter((portfolio) => {
      return (
        portfolio.title.toLowerCase().includes(query) ||
        portfolio.description.toLowerCase().includes(query) ||
        portfolio.slug.toLowerCase().includes(query) ||
        portfolio.service?.title
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [portfolios, search]);

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Failed to load portfolio items.
      </p>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold">
          Portfolio
        </h1>

        <PortfolioFormDialog />
      </div>

      {/* Search */}
      {!isLoading &&
        portfolios &&
        portfolios.length > 0 && (
          <div className="mb-5 flex items-center gap-2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search portfolio..."
                className="pl-9 pr-9"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {search && (
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {filteredPortfolios.length} of{" "}
                {portfolios.length}
              </span>
            )}
          </div>
        )}

      {/* Loading */}
      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : !portfolios || portfolios.length === 0 ? (
        /* Empty State */
        <p className="text-sm text-muted-foreground">
          No portfolio items yet.
        </p>
      ) : filteredPortfolios.length === 0 ? (
        /* Search Empty State */
        <div className="rounded-lg border py-10 text-center">
          <p className="text-sm text-muted-foreground">
            No portfolio items found for &quot;{search}&quot;.
          </p>

          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => setSearch("")}
          >
            Clear search
          </Button>
        </div>
      ) : (
        /* Portfolio Grid */
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPortfolios.map((portfolio) => (
            <Card key={portfolio.id}>
              <CardContent className="p-4">
                {/* Thumbnail */}
                <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-md">
                  <Image
                    src={portfolio.thumbnail}
                    alt={portfolio.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Portfolio Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {portfolio.title}
                      </p>

                      {portfolio.isFeatured && (
                        <Badge>Featured</Badge>
                      )}
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {portfolio.description}
                    </p>

                    {portfolio.service && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Service: {portfolio.service.title}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex justify-end gap-2">
                  <ManageGalleryDialog
                    portfolioId={portfolio.id}
                    slug={portfolio.slug}
                    title={portfolio.title}
                  />

                  <PortfolioFormDialog
                    portfolio={portfolio}
                    trigger={
                      <button
                        type="button"
                        className="rounded-md px-3 py-1.5 text-sm hover:bg-secondary"
                      >
                        Edit
                      </button>
                    }
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      deletePortfolio(portfolio.id)
                    }
                    aria-label={`Delete ${portfolio.title}`}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}