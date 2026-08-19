"use client";

import { motion } from "framer-motion";
import { Bot, Rocket, ShieldCheck, Workflow } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/shared/motion";

const FEATURES = [
  {
    icon: Bot,
    title: "AI-Powered Delivery",
    description: "We use AI at every stage — from proposal generation to code — to ship faster without cutting corners.",
  },
  {
    icon: Workflow,
    title: "One Workflow, Not Six Tools",
    description: "Track your project, milestones, files, and invoices in one client portal. No email chains, no confusion.",
  },
  {
    icon: Rocket,
    title: "Launch in Weeks, Not Months",
    description: "Lean process, clear milestones, and constant visibility mean your project moves — always.",
  },
  {
    icon: ShieldCheck,
    title: "Built to Scale, Securely",
    description: "Production-grade architecture from day one, so what we build today still works when you 10x.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Everything you need, <span className="text-gradient">nothing you don&apos;t.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          A modern agency workflow built for speed, transparency, and results.
        </p>
      </FadeIn>

      <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <StaggerItem key={feature.title}>
            <motion.div
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="glow-border h-full rounded-2xl border bg-card p-7"
            >
              <motion.div
                whileHover={{ rotate: -6, scale: 1.08 }}
                transition={{ duration: 0.25 }}
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"
              >
                <feature.icon className="h-5 w-5 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}