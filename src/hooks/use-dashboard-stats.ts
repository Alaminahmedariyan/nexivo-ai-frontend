import { useQuery } from "@tanstack/react-query";
import { leadsApi } from "@/lib/api/leads";
import { projectsApi } from "@/lib/api/projects";
import { adminInvoicesApi } from "@/lib/api/admin-invoices";

// `limit=1` — we only need `meta.total` from each list endpoint, not the
// actual records, so this stays cheap regardless of table size.
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [leads, projects, invoices] = await Promise.all([
        leadsApi.getAll({ limit: 1 }),
        projectsApi.getAll({ limit: 1 }),
        adminInvoicesApi.getAll({ limit: 1 }),
      ]);

      return {
        totalLeads: leads.meta?.total ?? 0,
        totalProjects: projects.meta?.total ?? 0,
        totalInvoices: invoices.meta?.total ?? 0,
      };
    },
  });
}