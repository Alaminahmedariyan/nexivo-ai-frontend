"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import { ProjectStatusBadge } from "./project-status-badge";
import type { MyProject } from "@/types/project";

export function MyProjectCard({ project }: { project: MyProject }) {
  const completedCount = project.milestones.filter((m) => m.status === "COMPLETED").length;
  const totalCount = project.milestones.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/projects/${project.id}`} className="glow-border block rounded-2xl border bg-card p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold">{project.title}</h3>
          <ProjectStatusBadge status={project.status} />
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

        {totalCount > 0 && (
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{completedCount} of {totalCount} milestones</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>
        )}

        {project.dueDate && (
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CircleDot className="h-3 w-3" />
            Due {format(new Date(project.dueDate), "MMM d, yyyy")}
          </p>
        )}
      </Link>
    </motion.div>
  );
}