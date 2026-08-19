import { requireRole } from "@/lib/auth/require-role";

export default async function ApiKeysLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["SUPER_ADMIN"]);
  return <>{children}</>;
}