"use client";

import { FolderKanban, Receipt, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

import { useSession } from "@/lib/auth/auth-client";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { StatCard } from "@/components/dashboard/home/stat-card";
import { QuickLinkCard } from "@/components/dashboard/home/quick-link-card";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion";

import type { UserRole } from "@/types/user";

// =========================================================
// GREETING
// =========================================================

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
};

// =========================================================
// DASHBOARD HOME
// =========================================================

export default function DashboardHomePage() {
  // =======================================================
  // SESSION
  // =======================================================

  const {
    data: session,
    isPending: sessionLoading,
  } = useSession();

  // =======================================================
  // USER ROLE
  // =======================================================

  const userRole = (session?.user as { role?: UserRole })?.role;

  const isClient = userRole === "CLIENT";

  // =======================================================
  // DASHBOARD STATS
  //
  // IMPORTANT:
  // Stats are only needed for ADMIN / STAFF.
  // CLIENT dashboard does not request staff statistics.
  // =======================================================

  const {
    data: stats,
    isLoading: statsLoading,
  } = useDashboardStats();

  // =======================================================
  // SESSION LOADING
  //
  // Wait until Better Auth finishes resolving the session.
  // This prevents ADMIN UI -> CLIENT UI flicker.
  // =======================================================

  if (sessionLoading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}

        <div className="space-y-2">
          <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-80 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Stats skeleton */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-32 animate-pulse rounded-xl border bg-muted/40" />
          <div className="h-32 animate-pulse rounded-xl border bg-muted/40" />
          <div className="h-32 animate-pulse rounded-xl border bg-muted/40" />
        </div>

        {/* Quick links skeleton */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-40 animate-pulse rounded-xl border bg-muted/40" />
          <div className="h-40 animate-pulse rounded-xl border bg-muted/40" />
          <div className="h-40 animate-pulse rounded-xl border bg-muted/40" />
        </div>
      </div>
    );
  }

  // =======================================================
  // NO SESSION
  //
  // Normally the protected dashboard layout handles this.
  // This is only a safe fallback.
  // =======================================================

  if (!session?.user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-muted-foreground">
          Please sign in to continue.
        </p>
      </div>
    );
  }

  // =======================================================
  // GREETING
  //
  // Calculated directly during render.
  // No useEffect + setState required.
  // This avoids the React cascading-render error.
  // =======================================================

  const greeting = getGreeting();

  // =======================================================
  // DASHBOARD
  // =======================================================

  return (
    <div>
      {/* ===================================================
          HEADER
      =================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">
          {greeting},{" "}
          {session.user.name?.split(" ")[0] ?? ""}
        </h1>

        <p className="mt-1 text-muted-foreground">
          {isClient
            ? "Here's an overview of your projects and invoices."
            : "Here's what's happening across your workspace."}
        </p>
      </motion.div>

      {/* ===================================================
          ADMIN / STAFF STATS

          CLIENT WILL NEVER SEE THESE.
      =================================================== */}

      {!isClient && (
        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-3">
          {/* Total Leads */}

          <StaggerItem>
            <StatCard
              icon={Target}
              label="Total Leads"
              value={stats?.totalLeads ?? 0}
              isLoading={statsLoading}
              accent="bg-[oklch(0.7_0.17_280/0.15)] text-[oklch(0.55_0.2_280)]"
            />
          </StaggerItem>

          {/* Active Projects */}

          <StaggerItem>
            <StatCard
              icon={FolderKanban}
              label="Active Projects"
              value={stats?.totalProjects ?? 0}
              isLoading={statsLoading}
              accent="bg-[oklch(0.7_0.14_200/0.15)] text-[oklch(0.55_0.16_200)]"
            />
          </StaggerItem>

          {/* Total Invoices */}

          <StaggerItem>
            <StatCard
              icon={Receipt}
              label="Total Invoices"
              value={stats?.totalInvoices ?? 0}
              isLoading={statsLoading}
              accent="bg-[oklch(0.75_0.16_60/0.15)] text-[oklch(0.6_0.16_60)]"
            />
          </StaggerItem>
        </StaggerGroup>
      )}

      {/* ===================================================
          QUICK LINKS
      =================================================== */}

      <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* =================================================
            ADMIN / STAFF LINKS
        ================================================= */}

        {!isClient && (
          <>
            {/* Leads */}

            <StaggerItem>
              <QuickLinkCard
                icon={Target}
                title="Leads"
                description="Review and follow up on new inquiries."
                href="/leads"
              />
            </StaggerItem>

            {/* Clients */}

            <StaggerItem>
              <QuickLinkCard
                icon={Users}
                title="Clients"
                description="Manage client accounts and details."
                href="/clients"
              />
            </StaggerItem>
          </>
        )}

        {/* =================================================
            PROJECTS
        ================================================= */}

        <StaggerItem>
          <QuickLinkCard
            icon={FolderKanban}
            title="Projects"
            description="Track milestones, timelines, and files."
            href="/projects"
          />
        </StaggerItem>

        {/* =================================================
            INVOICES
        ================================================= */}

        <StaggerItem>
          <QuickLinkCard
            icon={Receipt}
            title={isClient ? "My Invoices" : "Invoices"}
            description="View and manage billing."
            href={isClient ? "/my-invoices" : "/invoices"}
          />
        </StaggerItem>
      </StaggerGroup>
    </div>
  );
}