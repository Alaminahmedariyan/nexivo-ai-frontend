"use client";

import { useAdminSiteSettings } from "@/hooks/use-admin-site-settings";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsGroupPanel } from "@/components/dashboard/settings/settings-grout-panel";

const GROUPS = [
  { value: "GENERAL", label: "General" },
  { value: "CONTACT", label: "Contact" },
  { value: "SEO", label: "SEO" },
  { value: "SOCIAL", label: "Social" },
] as const;

export default function SiteSettingsPage() {
  const { data: settings, isLoading, error } = useAdminSiteSettings();

  if (error) return <p className="text-sm text-destructive">Failed to load settings.</p>;

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-xl font-semibold">Site Settings</h1>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <Tabs defaultValue="GENERAL">
          <TabsList>
            {GROUPS.map((g) => (
              <TabsTrigger key={g.value} value={g.value}>
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {GROUPS.map((g) => (
            <TabsContent key={g.value} value={g.value} className="mt-6">
              <SettingsGroupPanel group={g.value} settings={settings ?? []} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}