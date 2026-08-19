"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEAD_STATUS_LABELS } from "@/lib/constants";
import { useUpdateLeadStatus } from "@/hooks/use-leads";
import type { Lead, LeadStatus } from "@/types/lead";

export function LeadStatusSelect({ lead }: { lead: Lead }) {
  const { mutate, isPending } = useUpdateLeadStatus();

  const handleChange = (value: string) => {
    mutate({ id: lead.id, status: value as LeadStatus });
  };

  return (
    <Select value={lead.status} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}