import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminSiteSettingsApi } from "@/lib/api/admin-site-settings";
import { revalidateMarketingPages } from "@/app/actions/revalidate";
import type { UpsertSettingInput } from "@/types/site-setting";
import { ApiError } from "@/types/api";

const settingsKeys = { all: ["admin-site-settings"] as const };

export function useAdminSiteSettings() {
  return useQuery({ queryKey: settingsKeys.all, queryFn: adminSiteSettingsApi.getAll });
}

export function useUpsertSetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpsertSettingInput) => adminSiteSettingsApi.upsert(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
      // Settings (companyName, contactEmail) are read in the marketing
      // (marketing) layout on every request via getSiteSettingsMap(),
      // which is also ISR-cached — same staleness issue as Services/Portfolio.
      revalidateMarketingPages();
      toast.success("Setting saved.");
    },
    onError: (error: ApiError) => toast.error(error.message),
  });
}