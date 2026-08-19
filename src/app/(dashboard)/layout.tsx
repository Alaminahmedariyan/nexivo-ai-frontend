import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/auth/session";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

// Staff-only baseline — matches the backend pattern where almost every
// admin module router starts with
// requireRole("ADMIN", "SUPER_ADMIN", "TEAM_MEMBER"). Individual dashboard
// pages/layouts (e.g. api-keys) can narrow this further (e.g. to
// ADMIN + SUPER_ADMIN only), but nothing under /dashboard should be
// reachable by a plain USER or CLIENT role, even by omission.
const DASHBOARD_ROLES = ["ADMIN", "SUPER_ADMIN", "TEAM_MEMBER"] as const;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerSession();

  if (!user) {
    redirect("/login");
  }

  if (!DASHBOARD_ROLES.includes(user.role as (typeof DASHBOARD_ROLES)[number])) {
    // CLIENT-role users belong in the client portal. Everyone else
    // (e.g. a plain USER — the default role for public/Google sign-ups)
    // is logged in but doesn't belong in the staff dashboard, so send
    // them back to the marketing home page rather than /login — they
    // already have a valid session.
    if (user.role === "CLIENT") {
      redirect("/portal");
    }
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Dashboard Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Dashboard Topbar */}
        <Topbar user={user} />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}