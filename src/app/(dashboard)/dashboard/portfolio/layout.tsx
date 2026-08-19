import { requireRole } from "@/lib/auth/require-role";

export default async function AdminPortfolioLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["SUPER_ADMIN", "ADMIN"]);
  return <>{children}</>;
}