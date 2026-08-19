import { requireRole } from "@/lib/auth/require-role";

export default async function AiLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER"]);
  return <>{children}</>;
}