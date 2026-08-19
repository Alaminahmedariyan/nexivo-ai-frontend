"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateMyPaymentIntent } from "@/hooks/use-my-payments";
import { getStripe } from "@/lib/stripe";
import { CheckoutForm } from "./checkout-form";

export function PayInvoiceDialog({ invoiceId, amount, currency }: { invoiceId: string; amount: string; currency: string }) {
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { mutate: createIntent, isPending } = useCreateMyPaymentIntent(invoiceId);
  const queryClient = useQueryClient();

  const handleOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen && !clientSecret) {
      createIntent(undefined, {
        onSuccess: (result) => setClientSecret(result.clientSecret),
      });
    }
    if (!nextOpen) setClientSecret(null); // fresh intent next time — avoids a stale/expired secret
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["my-invoices"] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <CreditCard className="mr-1.5 h-4 w-4" /> Pay Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay {amount} {currency}</DialogTitle>
        </DialogHeader>

        {isPending || !clientSecret ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Elements stripe={getStripe()} options={{ clientSecret }}>
            <CheckoutForm onSuccess={handleSuccess} />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}