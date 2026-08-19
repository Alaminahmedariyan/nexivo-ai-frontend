"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUserRole } from "@/hooks/use-admin-users";
import type { ManagedUser, UserRole } from "@/types/user";
import { useSession } from "@/lib/auth/auth-client";

const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  TEAM_MEMBER: "Team Member",
  CLIENT: "Client",
  USER: "User",
};

export function UserRoleSelect({ user }: { user: ManagedUser }) {
  const { mutate, isPending } = useUpdateUserRole();
  const { data: session } = useSession();

  // Prevent a super admin from accidentally demoting themselves and
  // getting locked out of the users page mid-session.
  const isSelf = session?.user?.id === user.id;

  return (
    <Select
      value={user.role}
      onValueChange={(value) => mutate({ id: user.id, role: value as UserRole })}
      disabled={isPending || isSelf}
    >
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(ROLE_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}