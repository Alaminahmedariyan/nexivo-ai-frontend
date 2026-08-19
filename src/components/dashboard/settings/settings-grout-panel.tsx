import { SettingField } from "./setting-field";
import type { SettingGroup, SiteSetting } from "@/types/site-setting";

type FieldConfig = { key: string; label: string; defaultValue?: string };

const GROUP_FIELDS: Record<SettingGroup, FieldConfig[]> = {
  GENERAL: [{ key: "companyName", label: "Company Name" }],
  CONTACT: [
    { key: "contactEmail", label: "Contact Email" },
    { key: "contactPhone", label: "Contact Phone" },
  ],
  SEO: [
    { key: "seoTitle", label: "Default SEO Title" },
    { key: "seoDescription", label: "Default SEO Description" },
  ],
  SOCIAL: [
    { key: "facebookUrl", label: "Facebook URL" },
    { key: "linkedinUrl", label: "LinkedIn URL" },
    { key: "twitterUrl", label: "Twitter / X URL" },
  ],
};

export function SettingsGroupPanel({ group, settings }: { group: SettingGroup; settings: SiteSetting[] }) {
  const fields = GROUP_FIELDS[group];
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <SettingField
          key={field.key}
          settingKey={field.key}
          label={field.label}
          currentValue={(settingsMap[field.key] as string) ?? field.defaultValue ?? ""}
          group={group}
        />
      ))}
    </div>
  );
}