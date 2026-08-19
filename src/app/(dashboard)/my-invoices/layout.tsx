import { requireRole } from "@/lib/auth/require-role";

export default async function MyInvoicesLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["CLIENT"]);
  return <>{children}</>;
}