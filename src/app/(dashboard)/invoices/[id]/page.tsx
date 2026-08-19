"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAdminInvoice, useCancelInvoice, useSendInvoice } from "@/hooks/use-admin-invoices";
import { InvoiceStatusBadge } from "@/components/dashboard/invoices/invoice-status-badge";
import { RecordPaymentDialog } from "@/components/dashboard/invoices/record-payment-dialog";
import { RefundPaymentButton } from "@/components/dashboard/invoices/refund-button";


export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: invoice, isLoading, error } = useAdminInvoice(id);
  const { mutate: sendInvoice, isPending: isSending } = useSendInvoice(id);
  const { mutate: cancelInvoice, isPending: isCancelling } = useCancelInvoice(id);

  if (isLoading) return <Skeleton className="h-64 w-full" />;
  if (error || !invoice) return <p className="text-sm text-destructive">Invoice not found.</p>;

  const paidTotal = (invoice.payments ?? [])
    .filter((p) => p.status === "SUCCEEDED")
    .reduce((sum, p) => sum + Number(p.amount), 0);
  const remaining = Number(invoice.total) - paidTotal;

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/invoices" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to Invoices
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{invoice.invoiceNumber}</h1>
        <InvoiceStatusBadge status={invoice.status} />
      </div>

      <Card>
        <CardHeader><CardTitle>Items</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-2">Description</th>
                <th className="pb-2 text-right">Qty</th>
                <th className="pb-2 text-right">Unit Price</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{item.description}</td>
                  <td className="py-2 text-right">{item.quantity}</td>
                  <td className="py-2 text-right">{item.unitPrice}</td>
                  <td className="py-2 text-right">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{invoice.subtotal} {invoice.currency}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{invoice.tax} {invoice.currency}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>{invoice.total} {invoice.currency}</span></div>
            {paidTotal > 0 && (
              <div className="flex justify-between text-muted-foreground"><span>Remaining</span><span>{remaining.toFixed(2)} {invoice.currency}</span></div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Payments</CardTitle></CardHeader>
        <CardContent>
          {!invoice.payments || invoice.payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {invoice.payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-md border p-3 text-sm">
                  <div>
                    <p className="font-medium">{p.amount} {p.currency} — {p.method}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.paidAt ? format(new Date(p.paidAt), "MMM d, yyyy") : format(new Date(p.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={p.status === "SUCCEEDED" ? "default" : p.status === "REFUNDED" ? "destructive" : "secondary"}>
                      {p.status}
                    </Badge>
                    {p.status === "SUCCEEDED" && (
                      <RefundPaymentButton invoiceId={id} paymentId={p.id} amount={p.amount} currency={p.currency} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        {invoice.status === "DRAFT" && (
          <Button onClick={() => sendInvoice()} disabled={isSending}>
            {isSending ? "Sending..." : "Send to Client"}
          </Button>
        )}

        {remaining > 0 && invoice.status !== "CANCELLED" && (
          <RecordPaymentDialog invoiceId={id} remaining={remaining} />
        )}

        {invoice.status !== "PAID" && invoice.status !== "CANCELLED" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={isCancelling}>Cancel Invoice</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel this invoice?</AlertDialogTitle>
                <AlertDialogDescription>This can&apos;t be undone.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Back</AlertDialogCancel>
                <AlertDialogAction onClick={() => cancelInvoice()}>Cancel Invoice</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}