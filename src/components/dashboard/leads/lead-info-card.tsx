import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Lead } from "@/types/lead";

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b py-2 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function LeadInfoCard({ lead }: { lead: Lead }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Details</CardTitle>
      </CardHeader>
      <CardContent>
        <InfoRow label="Email" value={lead.email} />
        <InfoRow label="Phone" value={lead.phone ?? "—"} />
        <InfoRow label="Company" value={lead.company ?? "—"} />
        <InfoRow label="Budget" value={lead.budget.replace(/_/g, " ")} />
        <InfoRow label="Source" value={lead.source.replace(/_/g, " ")} />
        <InfoRow label="Submitted" value={format(new Date(lead.createdAt), "MMM d, yyyy 'at' h:mm a")} />
      </CardContent>
    </Card>
  );
}