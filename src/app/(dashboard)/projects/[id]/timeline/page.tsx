"use client";

import { use } from "react";
import { format } from "date-fns";
import { useSession } from "@/lib/auth/auth-client";
import { useTimeline } from "@/hooks/use-timeline";
import { useMyProject } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTimelineDialog } from "@/components/dashboard/projects/add-timeline-dialog";
import type { UserRole } from "@/types/user";

function TimelineList({ entries }: { entries: { id: string; title: string; description: string | null; statusDate: string; updatedBy?: { name: string } }[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No updates yet.</p>;
  }

  return (
    <div className="space-y-4 border-l pl-4">
      {entries.map((entry) => (
        <div key={entry.id}>
          <p className="text-sm font-medium">{entry.title}</p>
          {entry.description && <p className="text-sm text-muted-foreground">{entry.description}</p>}
          <p className="mt-1 text-xs text-muted-foreground">
            {format(new Date(entry.statusDate), "MMM d, yyyy")}
            {entry.updatedBy ? ` — ${entry.updatedBy.name}` : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

function AdminTimelineView({ id }: { id: string }) {
  const { data: entries, isLoading } = useTimeline(id);

  return (
    <Card className="max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Timeline</CardTitle>
        <AddTimelineDialog projectId={id} />
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-24 w-full" /> : <TimelineList entries={entries ?? []} />}
      </CardContent>
    </Card>
  );
}

function ClientTimelineView({ id }: { id: string }) {
  const { data: project, isLoading } = useMyProject(id);

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-24 w-full" /> : <TimelineList entries={project?.timeline ?? []} />}
      </CardContent>
    </Card>
  );
}

export default function ProjectTimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();

  if (isPending) return <Skeleton className="h-40 w-full" />;

  // Safe type-casting for role
  const userRole = (session?.user as { role?: UserRole })?.role;

  return userRole === "CLIENT" ? <ClientTimelineView id={id} /> : <AdminTimelineView id={id} />;
}