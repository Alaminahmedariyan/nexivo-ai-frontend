import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Client } from "@/types/client";

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b py-2 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function ClientInfoCard({ client }: { client: Client }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
      </CardHeader>
      <CardContent>
        <InfoRow label="Company" value={client.companyName ?? "—"} />
        <InfoRow label="Contact name" value={client.user?.name ?? client.lead?.name ?? "—"} />
        <InfoRow label="Email" value={client.user?.email ?? client.lead?.email ?? "—"} />
        <InfoRow label="Account" value={client.userId ? "Linked" : "Not linked"} />
        <InfoRow label="Created" value={format(new Date(client.createdAt), "MMM d, yyyy")} />
      </CardContent>
    </Card>
  );
}