import { requireRole } from "@/lib/auth/require-role";

export default async function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["SUPER_ADMIN", "ADMIN"]);
  return <>{children}</>;
}