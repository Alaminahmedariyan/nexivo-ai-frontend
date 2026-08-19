import { Badge } from "@/components/ui/badge";
import type { InvoiceStatus } from "@/types/invoice";

const VARIANTS: Record<InvoiceStatus, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline",
  SENT: "secondary",
  PARTIALLY_PAID: "secondary",
  PAID: "default",
  OVERDUE: "destructive",
  CANCELLED: "destructive",
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return <Badge variant={VARIANTS[status]}>{status.replace("_", " ")}</Badge>;
}