"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import { FloatingBadge } from "./floating-badge";
import { FloatingAvatarBubble } from "./floating-avater-bubble";

const CHART_BARS = [40, 65, 45, 80, 55, 90, 70];

const STAT_CARDS = [
  {
    label: "Active Projects",
    value: "12",
    accent:
      "bg-[oklch(0.7_0.17_280/0.12)] text-[oklch(0.55_0.2_280)]",
  },
  {
    label: "This Month Revenue",
    value: "$24.6k",
    accent:
      "bg-[oklch(0.7_0.14_200/0.12)] text-[oklch(0.55_0.16_200)]",
  },
  {
    label: "New Leads",
    value: "8",
    accent:
      "bg-[oklch(0.75_0.16_60/0.12)] text-[oklch(0.6_0.16_60)]",
  },
];

const PROJECTS = [
  {
    name: "E-commerce Platform Redesign",
    status: "In Progress",
    color:
      "bg-[oklch(0.7_0.17_280/0.12)] text-[oklch(0.55_0.2_280)]",
  },
  {
    name: "AI Chatbot Integration",
    status: "Review",
    color:
      "bg-[oklch(0.75_0.16_60/0.12)] text-[oklch(0.6_0.16_60)]",
  },
  {
    name: "Brand Website Launch",
    status: "Completed",
    color:
      "bg-[oklch(0.72_0.16_150/0.12)] text-[oklch(0.55_0.16_150)]",
  },
];

export function HeroShowcase() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        margin: "-100px",
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        relative
        mx-auto
        mt-20
        w-full
        max-w-[1480px]
        px-2
        py-10
        sm:px-4
        sm:py-12
        md:px-8
        md:py-14
      "
    >
      {/* =========================================================
          PREMIUM STATIC BACKGROUND
          Layered soft gradient mesh + faint grid, no motion
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[48px]">
        <div
          className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full opacity-60 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.19 280 / 0.28) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute -right-24 top-10 h-[460px] w-[460px] rounded-full opacity-50 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.7 0.15 200 / 0.22) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full opacity-40 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.16 60 / 0.18) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 40%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 40%, black 20%, transparent 75%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 40%, transparent 45%, hsl(var(--background)) 88%)",
          }}
        />
      </div>

      {/* =========================================================
          FLOATING FEATURE BADGES
          z-30 = always above browser
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 z-30">
        <FloatingBadge
          icon={Sparkles}
          label="AI-Generated Proposals"
          className="
            pointer-events-auto
            absolute
            -left-1
            -top-3
            z-30
            sm:left-0
            sm:-top-5
            md:-left-8
            md:-top-6
          "
          revealDelay={0.3}
          floatDuration={3.2}
        />

        <FloatingBadge
          icon={Workflow}
          label="Real-time Milestones"
          className="
            pointer-events-auto
            absolute
            -right-1
            top-6
            z-30
            sm:-right-2
            sm:top-8
            md:-right-8
            md:top-10
          "
          revealDelay={0.45}
          floatDuration={3.8}
          floatDelay={0.4}
        />

        <FloatingBadge
          icon={ShieldCheck}
          label="Secure Invoicing"
          className="
            pointer-events-auto
            absolute
            -left-1
            bottom-24
            z-30
            sm:left-0
            sm:bottom-24
            md:-left-10
            md:bottom-28
          "
          revealDelay={0.6}
          floatDuration={3.5}
          floatDelay={0.8}
        />

        <FloatingBadge
          icon={Users}
          label="Client Portal"
          className="
            pointer-events-auto
            absolute
            -right-1
            bottom-8
            z-30
            sm:-right-2
            sm:bottom-10
            md:-right-8
            md:bottom-12
          "
          revealDelay={0.75}
          floatDuration={3.9}
          floatDelay={0.2}
        />
      </div>

      {/* =========================================================
          FLOATING CLIENT AVATARS
          z-40 = above everything
      ========================================================= */}

      <FloatingAvatarBubble
        initials="AR"
        name="Ayesha R."
        role="Client · Web Agency"
        color="bg-[oklch(0.7_0.17_280)]"
        className="
          absolute
          -top-2
          left-1/4
          z-40
          sm:-top-5
          md:-top-6
        "
        revealDelay={0.5}
        floatDuration={4.2}
      />

      <FloatingAvatarBubble
        initials="RH"
        name="Rafi H."
        role="Project Lead"
        color="bg-[oklch(0.7_0.2_25)]"
        className="
          absolute
          -bottom-2
          right-1/4
          z-40
          sm:-bottom-5
          md:-bottom-6
        "
        revealDelay={0.85}
        floatDuration={3.6}
      />

      {/* =========================================================
          BROWSER WINDOW
          z-10 = below floating elements
      ========================================================= */}

      <div
        className="
          relative
          z-10
          overflow-hidden
          rounded-2xl
          border
          border-border/70
          bg-card
          shadow-[0_30px_80px_-25px_hsl(var(--primary)/0.18)]
          ring-1
          ring-border/30
        "
      >
        {/* =======================================================
            Browser Top Bar
        ======================================================= */}

        <div
          className="
            flex
            h-14
            items-center
            gap-2
            border-b
            border-border/60
            bg-secondary/30
            px-4
            sm:h-16
            sm:px-5
          "
        >
          {/* Browser dots */}

          <div className="flex shrink-0 gap-1.5">
            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-[oklch(0.7_0.2_25)]
                sm:h-3
                sm:w-3
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-[oklch(0.78_0.16_80)]
                sm:h-3
                sm:w-3
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-[oklch(0.72_0.16_150)]
                sm:h-3
                sm:w-3
              "
            />
          </div>

          {/* URL */}

          <div
            className="
              mx-auto
              hidden
              h-8
              w-72
              items-center
              justify-center
              rounded-full
              border
              border-border/50
              bg-background/70
              px-4
              text-[11px]
              font-medium
              text-muted-foreground
              shadow-sm
              sm:flex
            "
          >
            app.nexivo.ai/dashboard
          </div>

          {/* Right browser indicator */}

          <div className="ml-auto flex h-7 w-7 items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        </div>

        {/* =======================================================
            Dashboard Body
        ======================================================= */}

        <div className="flex min-h-[480px] sm:min-h-[560px] md:min-h-[600px]">
          {/* =====================================================
              Sidebar
          ===================================================== */}

          <aside
            className="
              hidden
              w-16
              shrink-0
              flex-col
              items-center
              gap-3
              border-r
              border-border/60
              bg-secondary/20
              py-6
              sm:flex
              md:w-[72px]
            "
          >
            {/* Active icon */}

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                ring-1
                ring-primary/15
              "
            >
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>

            {/* Other icons */}

            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-8
                  w-8
                  rounded-lg
                  bg-muted/70
                  transition-colors
                "
              />
            ))}
          </aside>

          {/* =====================================================
              Main Dashboard
          ===================================================== */}

          <main className="min-w-0 flex-1 space-y-5 p-4 sm:space-y-6 sm:p-6 md:p-7">
            {/* =================================================
                Stats
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {STAT_CARDS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border/40
                    p-5
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-md
                    ${stat.accent}
                  `}
                >
                  {/* subtle glow */}

                  <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-current opacity-[0.04] blur-2xl" />

                  <p className="relative text-[10px] font-semibold uppercase tracking-wider opacity-70">
                    {stat.label}
                  </p>

                  <p className="relative mt-2 text-2xl font-bold tracking-tight">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* =================================================
                Chart (hover-to-lift + slow ambient breathing)
            ================================================= */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border/60
                bg-background/50
                shadow-sm
              "
            >
              {/* Chart Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-border/50
                  px-5
                  py-4
                  sm:px-6
                "
              >
                <div>
                  <p className="text-sm font-semibold tracking-tight">
                    Weekly Progress
                  </p>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Project activity overview
                  </p>
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-border/60
                    bg-secondary/40
                    px-3
                    py-1.5
                    text-[10px]
                    font-medium
                    text-muted-foreground
                  "
                >
                  This week
                </div>
              </div>

              {/* Chart */}

              <div className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
                <div className="flex h-36 items-end gap-2 sm:h-40 sm:gap-3">
                  {CHART_BARS.map((height, i) => (
                    <div
                      key={i}
                      className="relative flex-1"
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{
                          height: `${height}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: 0.15 + i * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full"
                        style={{ transformOrigin: "bottom" }}
                      >
                        <motion.div
                          animate={{
                            scaleY: [1, 1.025, 1],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.4,
                          }}
                          whileHover={{
                            scale: 1.06,
                            y: -6,
                          }}
                          style={{ transformOrigin: "bottom" }}
                          className="
                            h-full
                            w-full
                            cursor-pointer
                            rounded-t-lg
                            bg-gradient-to-t
                            from-primary/35
                            via-primary/70
                            to-primary
                            shadow-[0_-4px_18px_hsl(var(--primary)/0.12)]
                            transition-shadow
                            duration-300
                            hover:shadow-[0_-8px_28px_hsl(var(--primary)/0.25)]
                          "
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                Recent Projects
            ================================================= */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border/60
                bg-background/50
                shadow-sm
              "
            >
              {/* Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-border/50
                  px-5
                  py-4
                  sm:px-6
                "
              >
                <div>
                  <p className="text-sm font-semibold tracking-tight">
                    Recent Projects
                  </p>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Latest project activity
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    bg-primary/10
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    text-primary
                  "
                >
                  3 active
                </span>
              </div>

              {/* Project Rows */}

              <div>
                {PROJECTS.map((row, index) => (
                  <motion.div
                    key={row.name}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                    }}
                    className="
                      flex
                      min-h-[58px]
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-border/40
                      px-5
                      py-3
                      last:border-b-0
                      sm:px-6
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="
                          h-2
                          w-2
                          shrink-0
                          rounded-full
                          bg-primary
                          shadow-[0_0_8px_hsl(var(--primary)/0.35)]
                        "
                      />

                      <span className="truncate text-xs font-medium sm:text-sm">
                        {row.name}
                      </span>
                    </div>

                    <span
                      className={`
                        shrink-0
                        rounded-full
                        px-2.5
                        py-1
                        text-[9px]
                        font-semibold
                        sm:px-3
                        sm:text-[10px]
                        ${row.color}
                      `}
                    >
                      {row.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </motion.div>
  );
}