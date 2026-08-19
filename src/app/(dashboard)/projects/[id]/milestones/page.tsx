"use client";

import { use } from "react";
import { format } from "date-fns";
import { useSession } from "@/lib/auth/auth-client";
import { useMilestones } from "@/hooks/use-milestones";
import { useMyProject } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MilestoneItem } from "@/components/dashboard/projects/milestone-item";
import { MilestoneStatusBadge } from "@/components/dashboard/projects/milestone-status-badge";
import { AddMilestoneDialog } from "@/components/dashboard/projects/add-milestone-dialog";
import type { UserRole } from "@/types/user";

function AdminMilestonesView({ id }: { id: string }) {
  const { data: milestones, isLoading } = useMilestones(id);

  return (
    <Card className="max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Milestones</CardTitle>
        <AddMilestoneDialog projectId={id} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : !milestones || milestones.length === 0 ? (
          <p className="text-sm text-muted-foreground">No milestones yet.</p>
        ) : (
          milestones.map((milestone) => (
            <MilestoneItem key={milestone.id} milestone={milestone} projectId={id} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function ClientMilestonesView({ id }: { id: string }) {
  const { data: project, isLoading } = useMyProject(id);

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : !project?.milestones || project.milestones.length === 0 ? (
          <p className="text-sm text-muted-foreground">No milestones set yet.</p>
        ) : (
          <div className="space-y-1">
            {project.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between border-b py-3 last:border-0">
                <div>
                  <p className="text-sm font-medium">{milestone.title}</p>
                  {milestone.dueDate && (
                    <p className="text-xs text-muted-foreground">
                      Due {format(new Date(milestone.dueDate), "MMM d, yyyy")}
                    </p>
                  )}
                </div>
                <MilestoneStatusBadge status={milestone.status} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ProjectMilestonesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();

  if (isPending) return <Skeleton className="h-40 w-full" />;

  // Safe type-casting for role
  const userRole = (session?.user as { role?: UserRole })?.role;

  return userRole === "CLIENT" ? <ClientMilestonesView id={id} /> : <AdminMilestonesView id={id} />;
}