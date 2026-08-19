"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateTestimonial, useUpdateTestimonial } from "@/hooks/use-admin-testimonials";
import type { Testimonial } from "@/types/testimonial";

const schema = z.object({
  clientName: z.string().min(2),
  role: z.string().optional(),
  company: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  content: z.string().min(10),
  rating: z.coerce.number().int().min(1).max(5),
  isFeatured: z.boolean(),
});

export function TestimonialFormDialog({ testimonial, trigger }: { testimonial?: Testimonial; trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!testimonial;

  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial(testimonial?.id ?? "");
  const { mutate, isPending } = isEditMode ? updateMutation : createMutation;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { clientName: "", role: "", company: "", avatarUrl: "", content: "", rating: 5, isFeatured: false },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        clientName: testimonial?.clientName ?? "",
        role: testimonial?.role ?? "",
        company: testimonial?.company ?? "",
        avatarUrl: testimonial?.avatarUrl ?? "",
        content: testimonial?.content ?? "",
        rating: testimonial?.rating ?? 5,
        isFeatured: testimonial?.isFeatured ?? false,
      });
    }
  }, [open, testimonial, form]);

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutate({ ...values, avatarUrl: values.avatarUrl || undefined }, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button size="sm"><Plus className="mr-1 h-4 w-4" /> New Testimonial</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{isEditMode ? "Edit Testimonial" : "New Testimonial"}</DialogTitle></DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="clientName" render={({ field }) => (
              <FormItem><FormLabel>Client Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem><FormLabel>Role (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem><FormLabel>Company (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="avatarUrl" render={({ field }) => (
              <FormItem><FormLabel>Avatar URL (optional)</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="content" render={({ field }) => (
              <FormItem><FormLabel>Testimonial</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="rating" render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select onValueChange={(v) => field.onChange(Number(v))} value={String(field.value)}>
                    <FormControl><SelectTrigger className="w-full"><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((r) => <SelectItem key={r} value={String(r)}>{r} star{r > 1 ? "s" : ""}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="isFeatured" render={({ field }) => (
                <FormItem className="flex flex-col justify-end pb-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Featured</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </div>
                </FormItem>
              )} />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : isEditMode ? "Save changes" : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}