"use client";

import { Switch } from "@/components/ui/switch";
import { useUpdateService } from "@/hooks/use-admin-services";
import type { Service } from "@/types/service";

export function ServiceActiveToggle({ service }: { service: Service }) {
  const { mutate, isPending } = useUpdateService(service.id);

  return (
    <Switch
      checked={service.isActive}
      disabled={isPending}
      onCheckedChange={(checked) => mutate({ isActive: checked })}
    />
  );
}