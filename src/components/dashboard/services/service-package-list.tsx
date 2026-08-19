"use client";

import { Check, Layers, Package, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { ServicePackage } from "@/types/service";

import { AddPackageDialog } from "./add-package-dialog";
import { PackageDeleteButton } from "./package-delete-button";

type ServicePackageListProps = {
  serviceId: string;
  packages?: ServicePackage[];
};

export function ServicePackageList({
  serviceId,
  packages = [],
}: ServicePackageListProps) {
  return (
    <section className="mt-5 overflow-hidden rounded-2xl border bg-background shadow-sm">
      <div className="border-b bg-muted/20 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
              <Layers className="h-5 w-5 text-primary" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold tracking-tight">
                  Pricing Packages
                </h3>

                {packages.length > 0 && (
                  <span className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {packages.length}{" "}
                    {packages.length === 1 ? "package" : "packages"}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Configure pricing plans and the features included with each
                service package.
              </p>
            </div>
          </div>

          <AddPackageDialog serviceId={serviceId} />
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {packages.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-muted/10 px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border bg-background shadow-sm">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>

            <h4 className="mt-4 text-sm font-semibold">
              No pricing packages yet
            </h4>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
              Create your first pricing package to define the scope, pricing,
              and deliverables for this service.
            </p>

            <div className="mt-5">
              <AddPackageDialog serviceId={serviceId} />
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                className="group relative overflow-hidden border bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {index === 1 && packages.length >= 3 && (
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center gap-1 rounded-full border bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      <Sparkles className="h-3 w-3" />
                      Recommended
                    </span>
                  </div>
                )}

                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Package {String(index + 1).padStart(2, "0")}
                      </p>

                      <h4 className="truncate text-lg font-semibold tracking-tight">
                        {pkg.name}
                      </h4>
                    </div>

                    <PackageDeleteButton
                      serviceId={serviceId}
                      packageId={pkg.id}
                      packageName={pkg.name}
                    />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold tracking-tight">
                        ${Number(pkg.price).toLocaleString()}
                      </span>

                      <span className="mb-1 text-xs text-muted-foreground">
                        one-time
                      </span>
                    </div>
                  </div>

                  <Separator className="my-5" />

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold">
                        {"What's"} included
                      </p>

                      <span className="text-[10px] font-medium text-muted-foreground">
                        {pkg.features.length}{" "}
                        {pkg.features.length === 1 ? "feature" : "features"}
                      </span>
                    </div>

                    {pkg.features.length > 0 ? (
                      <ul className="space-y-3">
                        {pkg.features.map((feature, featureIndex) => (
                          <li
                            key={`${pkg.id}-${featureIndex}`}
                            className="flex items-start gap-2.5"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Check className="h-3 w-3" />
                            </span>

                            <span
                              className={
                                feature.highlight
                                  ? "text-sm font-medium leading-5 text-foreground"
                                  : "text-sm leading-5 text-muted-foreground"
                              }
                            >
                              {feature.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No features configured.
                      </p>
                    )}
                  </div>

                  <div className="mt-6 rounded-xl border bg-muted/20 px-3 py-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Service Package
                      </span>

                      <span className="text-[10px] font-medium text-muted-foreground">
                        Active
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}