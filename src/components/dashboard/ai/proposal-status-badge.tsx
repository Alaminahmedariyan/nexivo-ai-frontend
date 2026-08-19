import { Badge } from "@/components/ui/badge";
import type { ProposalStatus } from "@/types/ai";

const VARIANTS: Record<ProposalStatus, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline",
  SENT: "secondary",
  ACCEPTED: "default",
  REJECTED: "destructive",
};

export function ProposalStatusBadge({ status }: { status: ProposalStatus }) {
  return <Badge variant={VARIANTS[status]}>{status}</Badge>;
}