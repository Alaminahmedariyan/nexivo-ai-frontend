"use client";

import { motion } from "framer-motion";
import { Target, Users2, Zap, Sparkles } from "lucide-react";

import { GradientBlobs } from "@/components/marketing/gradient-blobs";
import { BadgePill } from "@/components/marketing/badge-pill";

const VALUES = [
  {
    icon: Zap,
    title: "Move fast, ship real work",
    description:
      "We favor working software over polished decks. You'll see progress every week.",
  },
  {
    icon: Target,
    title: "Outcomes over output",
    description:
      "Every project starts with your business goal, not a feature checklist.",
  },
  {
    icon: Users2,
    title: "Radical transparency",
    description:
      "One shared portal, real milestones, no surprises at the end of the sprint.",
  },
];

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden border-b">
      <GradientBlobs />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
        {/* -------- Left Info / Story panel -------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <BadgePill>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            About us
          </BadgePill>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            We build the products <span className="text-gradient">AI-first</span> companies need.
          </h1>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Nexivo AI is a small, senior team that pairs modern engineering with AI tooling to ship faster than traditional agencies.
          </p>

          <div className="mt-10 rounded-xl border bg-card/60 p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold">Our Story</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nexivo AI started with a simple frustration: agencies were too slow, and freelancers couldn&apos;t scale. We built a workflow where AI handles the repetitive parts — proposals, scaffolding, QA — so our team can focus entirely on the decisions that actually need a human.
            </p>
          </div>
        </motion.div>

        {/* -------- Right Values panel -------- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 rounded-2xl border bg-card p-7 shadow-xl shadow-primary/5 md:p-9"
        >
          <h2 className="text-2xl font-bold tracking-tight">Core Values</h2>
          <p className="text-sm text-muted-foreground">
            How we partner with teams to deliver modern digital products.
          </p>

          <div className="mt-6 space-y-4">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="flex items-start gap-4 rounded-xl border bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{val.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}