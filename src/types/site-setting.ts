export type SettingGroup = "GENERAL" | "SEO" | "SOCIAL" | "CONTACT";

export type SiteSetting = {
  key: string;
  value: unknown;
  group: SettingGroup | null;
};

export type UpsertSettingInput = {
  key: string;
  value: unknown;
  group?: SettingGroup;
};