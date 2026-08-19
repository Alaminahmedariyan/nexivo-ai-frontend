import { Badge } from "@/components/ui/badge";
import { LEAD_STATUS_LABELS } from "@/lib/constants";
import type { LeadStatus } from "@/types/lead";

const STATUS_VARIANTS: Record<LeadStatus, "default" | "secondary" | "destructive" | "outline"> = {
  NEW: "secondary",
  CONTACTED: "outline",
  QUOTED: "outline",
  MEETING_SCHEDULED: "default",
  NEGOTIATION: "default",
  WON: "default",
  LOST: "destructive",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <Badge variant={STATUS_VARIANTS[status]}>{LEAD_STATUS_LABELS[status]}</Badge>;
}