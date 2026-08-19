"use client";

import { Settings } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAdminSiteSettings } from "@/hooks/use-admin-site-settings";
import type { SettingGroup } from "@/types/site-setting";
import { SettingsGroupPanel } from "@/components/dashboard/settings/settings-grout-panel";



const GROUPS: {
  value: SettingGroup;
  label: string;
  description: string;
}[] = [
  {
    value: "GENERAL",
    label: "General",
    description:
      "Basic information about your company or website.",
  },
  {
    value: "CONTACT",
    label: "Contact",
    description:
      "Contact information displayed throughout the website.",
  },
  {
    value: "SEO",
    label: "SEO",
    description:
      "Default search engine optimization settings.",
  },
  {
    value: "SOCIAL",
    label: "Social Media",
    description:
      "Social media profile links.",
  },
];

export default function SiteSettingsPage() {
  const {
    data: settings,
    isLoading,
    error,
  } = useAdminSiteSettings();

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
        <p className="text-sm text-destructive">
          Failed to load site settings.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Settings className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Site Settings
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your website&apos;s general, contact, SEO,
              and social media information.
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      ) : (
        <div className="space-y-6">
          {GROUPS.map((group) => (
            <Card key={group.value}>
              <CardHeader>
                <CardTitle>{group.label}</CardTitle>

                <CardDescription>
                  {group.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SettingsGroupPanel
                  group={group.value}
                  settings={settings ?? []}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}