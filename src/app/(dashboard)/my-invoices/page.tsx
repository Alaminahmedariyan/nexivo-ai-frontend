"use client";

import { format } from "date-fns";
import { useMyInvoices } from "@/hooks/use-admin-invoices";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceStatusBadge } from "@/components/dashboard/invoices/invoice-status-badge";
import { PayInvoiceDialog } from "@/components/dashboard/my-invoices/pay-invoice-dialog";

export default function MyInvoicesPage() {
  const { data: invoices, isLoading, error } = useMyInvoices();

  if (error) return <p className="text-sm text-destructive">{error.message}</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-4 text-xl font-semibold">My Invoices</h1>

      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : !invoices || invoices.length === 0 ? (
        <p className="text-sm text-muted-foreground">No invoices yet.</p>
      ) : (
        <div className="space-y-3">
          {invoices.map((inv) => {
            const paidTotal = (inv.payments ?? [])
              .filter((p) => p.status === "SUCCEEDED")
              .reduce((sum, p) => sum + Number(p.amount), 0);
            const remaining = Number(inv.total) - paidTotal;
            const isPayable = remaining > 0 && inv.status !== "CANCELLED" && inv.status !== "DRAFT";

            return (
              <Card key={inv.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{inv.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {inv.total} {inv.currency}
                      {inv.dueDate ? ` — Due ${format(new Date(inv.dueDate), "MMM d, yyyy")}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <InvoiceStatusBadge status={inv.status} />
                    {isPayable && (
                      <PayInvoiceDialog invoiceId={inv.id} amount={remaining.toFixed(2)} currency={inv.currency} />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}