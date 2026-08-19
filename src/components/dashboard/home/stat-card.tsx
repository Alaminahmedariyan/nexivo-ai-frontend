"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: number | string;
  isLoading?: boolean;
  accent: string;
};

export function StatCard({ icon: Icon, label, value, isLoading, accent }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"
    >
      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>
        <Icon className="h-4 w-4" />
      </div>
      {isLoading ? (
        <Skeleton className="h-7 w-16" />
      ) : (
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      )}
      <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}