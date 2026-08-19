import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";
import type { Client } from "@/types/client";

export function ClientProjectsList({ projects }: { projects: Client["projects"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {!projects || projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50"
                >
                  <span className="text-sm font-medium">{project.title}</span>
                  <Badge variant="outline">{PROJECT_STATUS_LABELS[project.status] ?? project.status}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}