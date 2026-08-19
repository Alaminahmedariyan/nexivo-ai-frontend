"use client";

import { motion, type Variants } from "framer-motion";

// ============================================================
// Shared easing/variants — every scroll-reveal animation across
// the site pulls from these two, so motion feels consistent
// instead of every section having its own slightly-different timing.
// ============================================================
const EASE = [0.16, 1, 0.3, 1] as const; // premium "ease-out-expo" feel

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ------------------------------------------------------------
// FadeIn — wraps a single element/section, animates once when it
// scrolls into view. Use for section headings, standalone blocks.
// ------------------------------------------------------------
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUpVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------------
// StaggerGroup + StaggerItem — wrap a grid/list, each child fades up
// one after another instead of all at once. Use for card grids
// (features, services, portfolio, testimonials).
// ------------------------------------------------------------
export function StaggerGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}