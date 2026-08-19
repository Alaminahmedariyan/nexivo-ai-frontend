"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingBadgeProps = {
  icon: LucideIcon;
  label: string;
  className?: string;
  revealDelay?: number;
  floatDuration?: number;
  floatDelay?: number;
};

// Two independent motion layers on purpose:
// - outer: plays ONCE when scrolled into view (fade + scale in)
// - inner: loops FOREVER (gentle up/down bob) — these can't share one
//   motion.div because `animate` (infinite loop) and `whileInView`
//   (once) would fight over the same transform.
export function FloatingBadge({
  icon: Icon,
  label,
  className,
  revealDelay = 0,
  floatDuration = 3.4,
  floatDelay = 0,
}: FloatingBadgeProps) {
  return (
    <motion.div
      className={cn("absolute hidden md:block", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: revealDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-xl border bg-card/90 px-3.5 py-2.5 shadow-lg backdrop-blur-sm"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="whitespace-nowrap text-xs font-medium">{label}</span>
      </motion.div>
    </motion.div>
  );
}