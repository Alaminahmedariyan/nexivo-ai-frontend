import { CheckCircle2, Circle, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MilestoneStatus } from "@/types/milestone";

const CONFIG: Record<MilestoneStatus, { icon: typeof Circle; className: string; label: string }> = {
  COMPLETED: { icon: CheckCircle2, className: "text-[oklch(0.55_0.16_150)]", label: "Completed" },
  IN_PROGRESS: { icon: CircleDashed, className: "text-primary", label: "In Progress" },
  PENDING: { icon: Circle, className: "text-muted-foreground", label: "Pending" },
};

export function MilestoneStatusBadge({ status }: { status: MilestoneStatus }) {
  const { icon: Icon, className, label } = CONFIG[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", className)}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}