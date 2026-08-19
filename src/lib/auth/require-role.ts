import { redirect } from "next/navigation";
import { getServerSession } from "./session";
import { UserRole } from "@/types/user";


// Called at the top of any Server Component page that needs role
// restriction beyond "just logged in" (middleware.ts already handles
// that part). Redirects to /dashboard if the role doesn't match —
// never renders the page's content for a disallowed role, even briefly.
export async function requireRole(allowedRoles: UserRole[]) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  if (!allowedRoles.includes(session.role)) {
    redirect("/dashboard");
  }

  return session;
}