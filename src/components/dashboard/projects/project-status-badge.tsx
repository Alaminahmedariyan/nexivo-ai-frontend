import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_LABELS } from "@/lib/constants";
import type { ProjectStatus } from "@/types/project";

const VARIANTS: Record<ProjectStatus, "default" | "secondary" | "destructive" | "outline"> = {
  PLANNING: "outline",
  IN_PROGRESS: "default",
  REVIEW: "secondary",
  COMPLETED: "default",
  ON_HOLD: "secondary",
  CANCELLED: "destructive",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return <Badge variant={VARIANTS[status]}>{PROJECT_STATUS_LABELS[status]}</Badge>;
}