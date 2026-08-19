"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";
import { useUpdateProject } from "@/hooks/use-projects";
import type { Project, ProjectStatus } from "@/types/project";

export function ProjectStatusSelect({ project }: { project: Project }) {
  const { mutate, isPending } = useUpdateProject(project.id);

  return (
    <Select
      value={project.status}
      onValueChange={(value) => mutate({ status: value as ProjectStatus })}
      disabled={isPending}
    >
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}