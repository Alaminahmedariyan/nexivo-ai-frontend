"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/auth/auth-client";
import {
  useProjects,
  useMyProjects,
} from "@/hooks/use-projects";

import { DataTable } from "@/components/dashboard/data-table";
import { DataTablePagination } from "@/components/dashboard/data-table-pagination";

import { projectColumns } from "@/components/dashboard/projects/project-columns";
import { ProjectFiltersBar } from "@/components/dashboard/projects/project-filters";
import { MyProjectCard } from "@/components/dashboard/projects/my-project-card";

import {
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/motion";

import { Skeleton } from "@/components/ui/skeleton";

import type { ProjectFilters } from "@/types/project";
import type { UserRole } from "@/types/user";

function AdminProjectsView() {
  const router = useRouter();

  const [filters, setFilters] = useState<ProjectFilters>({
    page: 1,
    limit: 10,
  });

  const {
    data,
    isLoading,
    error,
  } = useProjects(filters);

  const handleFiltersChange = (nextFilters: ProjectFilters) => {
    setFilters({
      ...nextFilters,
      page: nextFilters.page ?? 1,
      limit: nextFilters.limit ?? 10,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Failed to load projects: {error.message}
      </p>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">
        Projects
      </h1>

      <ProjectFiltersBar
        filters={filters}
        onChange={handleFiltersChange}
      />

      <DataTable
        columns={projectColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        onRowClick={(project) => {
          router.push(`/projects/${project.id}`);
        }}
      />

      <DataTablePagination
        meta={data?.meta}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function ClientProjectsView() {
  const {
    data: projects,
    isLoading,
    error,
  } = useMyProjects();

  if (error) {
    return (
      <p className="text-sm text-destructive">
        {error.message}
      </p>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">
        Your Projects
      </h1>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
      ) : !projects || projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No projects yet. We&apos;ll notify you once
          your first project starts.
        </p>
      ) : (
        <StaggerGroup className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <MyProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const {
    data: session,
    isPending,
  } = useSession();

  if (isPending) {
    return (
      <Skeleton className="h-64 w-full" />
    );
  }

  const userRole = (
    session?.user as {
      role?: UserRole;
    }
  )?.role;

  return userRole === "CLIENT" ? (
    <ClientProjectsView />
  ) : (
    <AdminProjectsView />
  );
}