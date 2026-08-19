"use client";

import { useAdminServices } from "@/hooks/use-admin-services";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ServiceActiveToggle } from "@/components/dashboard/services/service-active-toggle";
import { ManagePackagesDialog } from "@/components/dashboard/services/manage-packages-dialog";
import { DeleteServiceButton } from "@/components/dashboard/services/delete-service-button";
import { ServiceFormDialog } from "@/components/dashboard/services/service-form.dialog";
import { ServicePackageList } from "@/components/dashboard/services/service-package-list";

export default function AdminServicesPage() {
  const {
    data: services,
    isLoading,
    error,
  } = useAdminServices();

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Failed to load services: {error.message}
      </p>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Services
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your services and pricing packages.
          </p>
        </div>

        <ServiceFormDialog />
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : !services || services.length === 0 ? (
        /* Empty */
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="font-medium">
            No services yet.
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first service to get started.
          </p>
        </div>
      ) : (
        /* Services */
        <div className="space-y-5">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-5">
                {/* Service Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">
                        {service.title}
                      </h2>

                      {!service.isActive && (
                        <Badge variant="outline">
                          Inactive
                        </Badge>
                      )}
                    </div>

                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                      {service.description}
                    </p>

                    {service.slug && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        /{service.slug}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    <ServiceActiveToggle
                      service={service}
                    />

                    <ManagePackagesDialog
                      serviceId={service.id}
                      serviceTitle={service.title}
                    />

                    <ServiceFormDialog
                      service={service}
                      trigger={
                        <button
                          type="button"
                          className="rounded-md px-3 py-1.5 text-sm hover:bg-secondary"
                        >
                          Edit
                        </button>
                      }
                    />

                    <DeleteServiceButton
                      id={service.id}
                      title={service.title}
                    />
                  </div>
                </div>

                {/* Packages */}
                <ServicePackageList
                  serviceId={service.id}
                  packages={service.packages}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}