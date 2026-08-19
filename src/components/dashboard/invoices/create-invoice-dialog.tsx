"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
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

import { useCreateInvoice } from "@/hooks/use-admin-invoices";
import { ClientPicker } from "@/components/dashboard/pickers/client-picker";

const schema = z.object({
  clientId: z.string().min(1, "Client ID is required."),

  items: z
    .array(
      z.object({
        description: z.string().min(1, "Description is required."),
        quantity: z.coerce.number().positive("Quantity must be greater than 0."),
        unitPrice: z.coerce.number().nonnegative("Price cannot be negative."),
      }),
    )
    .min(1, "At least one item is required."),

  taxRate: z.coerce.number().min(0).max(100).optional(),

  currency: z.enum(["USD", "EUR", "BDT"]),

  notes: z.string().optional(),
});

type CreateInvoiceFormValues = z.infer<typeof schema>;

export function CreateInvoiceDialog() {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useCreateInvoice();

  const form = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      clientId: "",
      items: [
        {
          description: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
      taxRate: 0,
      currency: "USD",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (values: CreateInvoiceFormValues) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1 h-4 w-4" />
          New Invoice
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Invoice</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Client */}
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>

                  <FormControl>
                    <ClientPicker
                      value={field.value}
                      onChange={(id) => field.onChange(id ?? "")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Invoice Items */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Items
              </label>

              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_70px_90px_auto] gap-2"
                >
                  {/* Description */}
                  <Input
                    placeholder="Description"
                    {...form.register(
                      `items.${index}.description`,
                    )}
                  />

                  {/* Quantity */}
                  <Input
                    type="number"
                    placeholder="Qty"
                    {...form.register(
                      `items.${index}.quantity`,
                    )}
                  />

                  {/* Unit Price */}
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    {...form.register(
                      `items.${index}.unitPrice`,
                    )}
                  />

                  {/* Remove Item */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {/* Add Item */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    description: "",
                    quantity: 1,
                    unitPrice: 0,
                  })
                }
              >
                <Plus className="mr-1 h-3 w-3" />
                Add item
              </Button>
            </div>

            {/* Tax Rate + Currency */}
            <div className="grid grid-cols-2 gap-4">
              {/* Tax Rate */}
              <FormField
                control={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Rate (%)</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(event) =>
                          field.onChange(
                            event.target.value === ""
                              ? undefined
                              : Number(event.target.value),
                          )
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Currency */}
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="USD">
                          USD
                        </SelectItem>

                        <SelectItem value="EUR">
                          EUR
                        </SelectItem>

                        <SelectItem value="BDT">
                          BDT
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>

                  <FormControl>
                    <Textarea
                      rows={2}
                      placeholder="Add any additional notes..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Invoice"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}