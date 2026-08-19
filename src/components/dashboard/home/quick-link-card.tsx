"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QuickLinkCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export function QuickLinkCard({ icon: Icon, title, description, href }: QuickLinkCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={href} className="glow-border group flex h-full flex-col rounded-xl border bg-card p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </div>
        <h3 className="font-medium">{title}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Open
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}