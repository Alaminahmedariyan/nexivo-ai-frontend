"use client";

import { use } from "react";
import { format } from "date-fns";
import { useSession } from "@/lib/auth/auth-client";
import { useProject, useMyProject } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStatusSelect } from "@/components/dashboard/projects/project-status-select";
import { ProjectStatusBadge } from "@/components/dashboard/projects/project-status-badge";
import type { UserRole } from "@/types/user";

function AdminProjectOverview({ id }: { id: string }) {
  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (error || !project) return <p className="text-sm text-destructive">Project not found.</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{project.title}</h1>
        <ProjectStatusSelect project={project} />
      </div>

      <Card>
        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">{project.description}</p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <span className="text-muted-foreground">Client</span>
            <span>{project.client?.companyName ?? "—"}</span>
            <span className="text-muted-foreground">Start date</span>
            <span>{project.startDate ? format(new Date(project.startDate), "MMM d, yyyy") : "—"}</span>
            <span className="text-muted-foreground">Due date</span>
            <span>{project.dueDate ? format(new Date(project.dueDate), "MMM d, yyyy") : "—"}</span>
            <span className="text-muted-foreground">Budget</span>
            <span>{project.budget ? `${project.budget} ${project.currency}` : "—"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ClientProjectOverview({ id }: { id: string }) {
  const { data: project, isLoading, error } = useMyProject(id);

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (error || !project) return <p className="text-sm text-destructive">Project not found.</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{project.title}</h1>
        <ProjectStatusBadge status={project.status} />
      </div>

      <Card>
        <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">{project.description}</p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <span className="text-muted-foreground">Start date</span>
            <span>{project.startDate ? format(new Date(project.startDate), "MMM d, yyyy") : "—"}</span>
            <span className="text-muted-foreground">Expected due date</span>
            <span>{project.dueDate ? format(new Date(project.dueDate), "MMM d, yyyy") : "—"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();

  if (isPending) return <Skeleton className="h-40 w-full" />;

  // Safe type-casting for role
  const userRole = (session?.user as { role?: UserRole })?.role;

  return userRole === "CLIENT" ? <ClientProjectOverview id={id} /> : <AdminProjectOverview id={id} />;
}