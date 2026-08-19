"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient, useSession } from "@/lib/auth/auth-client";

const STAFF_ROLES = ["ADMIN", "SUPER_ADMIN", "TEAM_MEMBER"];

export function NavAuthAction() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-secondary" />;
  }

  // Logged out — same style/behavior as before
  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
      >
        Client Login
      </Link>
    );
  }

  const user = session.user as unknown as {
    name: string;
    image?: string | null;
    role: string;
  };

  const isStaff = STAFF_ROLES.includes(user.role);
  const isClient = user.role === "CLIENT";

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-secondary/60">
        <Avatar className="h-9 w-9 ring-2 ring-transparent ring-offset-2 ring-offset-background transition-all hover:ring-primary/30">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback className="bg-gradient-to-br from-primary/90 to-primary/60 font-semibold text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-xl">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user.name}</p>
        </div>

        <DropdownMenuSeparator />

        {isStaff && (
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </DropdownMenuItem>
        )}

        {isClient && (
          <DropdownMenuItem onClick={() => router.push("/portal")}>
            Client Portal
          </DropdownMenuItem>
        )}

        {/* Plain USER (not yet converted to a client) */}
        {!isStaff && !isClient && (
          <DropdownMenuItem disabled className="text-muted-foreground">
            Account (coming soon)
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}