"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAddPackage } from "@/hooks/use-admin-services";

const schema = z.object({
  name: z.string().min(2, "Package name must be at least 2 characters."),
  price: z.coerce.number().min(0, "Price cannot be negative."),
  features: z.string().min(2, "Add at least one feature."),
});

type AddPackageDialogProps = {
  serviceId: string;
};

export function AddPackageDialog({
  serviceId,
}: AddPackageDialogProps) {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useAddPackage(serviceId);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      features: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    const features = values.features
      .split("\n")
      .map((feature) => feature.trim())
      .filter(Boolean)
      .map((label) => ({
        label,
      }));

    if (features.length === 0) {
      form.setError("features", {
        type: "manual",
        message: "Add at least one feature.",
      });

      return;
    }

    mutate(
      {
        name: values.name.trim(),
        price: values.price,
        features,
      },
      {
        onSuccess: () => {
          form.reset({
            name: "",
            price: 0,
            features: "",
          });

          setOpen(false);
        },
      },
    );
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      form.reset({
        name: "",
        price: 0,
        features: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="shadow-sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Package
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg overflow-hidden p-0">
        <DialogHeader className="border-b bg-muted/20 px-6 py-5">
          <DialogTitle className="text-lg">
            Create Pricing Package
          </DialogTitle>

          <DialogDescription className="text-xs leading-5">
            Define the package name, pricing, and deliverables included with
            this service.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 px-6 py-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Professional Website"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>

                  <p className="text-[11px] text-muted-foreground">
                    Use a clear client-facing package name.
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Price</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        $
                      </span>

                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="1499"
                        className="h-10 pl-7"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <p className="text-[11px] text-muted-foreground">
                    Enter the one-time project price.
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-3">
                    <FormLabel>Included Features</FormLabel>

                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      One per line
                    </span>
                  </div>

                  <FormControl>
                    <Textarea
                      rows={7}
                      className="resize-none"
                      placeholder={`Responsive premium UI
Next.js application architecture
REST API integration
PostgreSQL database setup
Authentication and authorization
Production deployment`}
                      {...field}
                    />
                  </FormControl>

                  <div className="rounded-lg border bg-muted/20 px-3 py-2.5">
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

                      <p className="text-[11px] leading-4 text-muted-foreground">
                        Each line will appear as an individual feature on the
                        public service page.
                      </p>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 border-t pt-5">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="flex-1"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Package"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}