"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useRefundPayment } from "@/hooks/use-admin-payments";

export function RefundPaymentButton({
  invoiceId,
  paymentId,
  amount,
  currency,
}: {
  invoiceId: string;
  paymentId: string;
  amount: string;
  currency: string;
}) {
  const { mutate, isPending } = useRefundPayment(invoiceId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" disabled={isPending}>
          <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Refund {amount} {currency}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will refund the full payment amount. If this was a Stripe payment, the refund
            is processed through Stripe and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate({ id: paymentId })}>Refund</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}