"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type FloatingAvatarBubbleProps = {
  initials: string;
  name: string;
  role: string;
  color: string;
  className?: string;
  revealDelay?: number;
  floatDuration?: number;
};

export function FloatingAvatarBubble({
  initials,
  name,
  role,
  color,
  className,
  revealDelay = 0,
  floatDuration = 4,
}: FloatingAvatarBubbleProps) {
  return (
    <motion.div
      className={cn("absolute hidden md:block", className)}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: revealDelay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-full border bg-card/90 py-1.5 pl-1.5 pr-3.5 shadow-lg backdrop-blur-sm"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback className={`${color} text-[11px] font-semibold text-white`}>{initials}</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <p className="text-xs font-semibold">{name}</p>
          <p className="text-[10px] text-muted-foreground">{role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}