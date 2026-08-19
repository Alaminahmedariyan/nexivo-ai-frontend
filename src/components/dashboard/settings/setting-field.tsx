"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpsertSetting } from "@/hooks/use-admin-site-settings";
import type { SettingGroup } from "@/types/site-setting";

type SettingFieldProps = {
  settingKey: string;
  label: string;
  currentValue: string;
  group: SettingGroup;
};

export function SettingField({ settingKey, label, currentValue, group }: SettingFieldProps) {
  const [value, setValue] = useState(currentValue);
  const { mutate, isPending } = useUpsertSetting();

  const isDirty = value !== currentValue;

  const handleSave = () => {
    mutate({ key: settingKey, value, group });
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button size="sm" onClick={handleSave} disabled={!isDirty || isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}