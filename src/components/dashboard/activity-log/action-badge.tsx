import { Badge } from "@/components/ui/badge";
import type { ActivityLogAction } from "@/types/activity-log";

const CONFIG: Record<ActivityLogAction, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  created: { label: "Created", variant: "default" },
  updated: { label: "Updated", variant: "secondary" },
  deleted: { label: "Deleted", variant: "destructive" },
  status_changed: { label: "Status Changed", variant: "outline" },
};

export function ActionBadge({ action }: { action: ActivityLogAction }) {
  const config = CONFIG[action] ?? { label: action, variant: "outline" as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}