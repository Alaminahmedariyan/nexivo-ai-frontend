"use client";

import { Switch } from "@/components/ui/switch";
import { useUpdateUserStatus } from "@/hooks/use-admin-users";
import { useSession } from "@/lib/auth/auth-client";
import type { ManagedUser } from "@/types/user";

export function UserStatusSwitch({ user }: { user: ManagedUser }) {
  const { mutate, isPending } = useUpdateUserStatus();
  const { data: session } = useSession();
  const isSelf = session?.user?.id === user.id;

  return (
    <Switch
      checked={user.isActive}
      disabled={isPending || isSelf}
      onCheckedChange={(checked) => mutate({ id: user.id, isActive: checked })}
    />
  );
}