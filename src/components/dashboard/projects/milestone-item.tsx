"use client";

import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useDeleteMilestone, useUpdateMilestoneStatus } from "@/hooks/use-milestones";
import type { Milestone } from "@/types/milestone";

export function MilestoneItem({ milestone, projectId }: { milestone: Milestone; projectId: string }) {
  const { mutate: updateStatus } = useUpdateMilestoneStatus(projectId);
  const { mutate: deleteMilestone } = useDeleteMilestone(projectId);

  const isDone = milestone.status === "COMPLETED";

  return (
    <div className="flex items-center gap-3 border-b py-3 last:border-0">
      <Checkbox
        checked={isDone}
        onCheckedChange={(checked) =>
          updateStatus({ milestoneId: milestone.id, status: checked ? "COMPLETED" : "PENDING" })
        }
      />
      <div className="flex-1">
        <p className={isDone ? "text-sm line-through text-muted-foreground" : "text-sm font-medium"}>
          {milestone.title}
        </p>
        {milestone.dueDate && (
          <p className="text-xs text-muted-foreground">
            Due {format(new Date(milestone.dueDate), "MMM d, yyyy")}
          </p>
        )}
      </div>
      <Button variant="ghost" size="icon" onClick={() => deleteMilestone(milestone.id)}>
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}