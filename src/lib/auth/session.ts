import { cache } from "react";
import { headers } from "next/headers";
import type { SessionUser } from "@/types/user";

export const getServerSession = cache(async (): Promise<SessionUser | null> => {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") ?? "";

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);

  if (!res.ok) return null;

  return json.success ? json.data : null;
});