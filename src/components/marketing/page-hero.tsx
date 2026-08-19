"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Layers,
  type LucideIcon,
} from "lucide-react";

import { GradientBlobs } from "./gradient-blobs";
import { BadgePill } from "./badge-pill";

const ICONS = {
  layers: Layers,
  briefcase: Briefcase,
} satisfies Record<string, LucideIcon>;

type PageHeroProps = {
  icon: keyof typeof ICONS;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHero({
  icon,
  eyebrow,
  title,
  subtitle,
}: PageHeroProps) {
  const Icon = ICONS[icon];

  return (
    <section className="relative overflow-hidden border-b">
      <GradientBlobs />

      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center md:py-28"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <BadgePill>
          <Icon
            className="h-3.5 w-3.5 text-primary"
            aria-hidden="true"
          />
          {eyebrow}
        </BadgePill>

        <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>

        <p className="mt-4 max-w-lg text-balance text-muted-foreground">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}