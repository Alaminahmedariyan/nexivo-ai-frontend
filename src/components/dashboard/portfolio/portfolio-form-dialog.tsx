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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreatePortfolio, useUpdatePortfolio } from "@/hooks/use-admin-portfolio";
import type { Portfolio } from "@/types/portfolio";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  thumbnail: z.string().url("Must be a valid URL."),
  liveUrl: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean(),
});

type PortfolioFormDialogProps = {
  portfolio?: Portfolio;
  trigger?: React.ReactNode;
};

export function PortfolioFormDialog({ portfolio, trigger }: PortfolioFormDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!portfolio;

  const createMutation = useCreatePortfolio();
  const updateMutation = useUpdatePortfolio(portfolio?.id ?? "");
  const { mutate, isPending } = isEditMode ? updateMutation : createMutation;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "", thumbnail: "", liveUrl: "", isFeatured: false },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: portfolio?.title ?? "",
        description: portfolio?.description ?? "",
        thumbnail: portfolio?.thumbnail ?? "",
        liveUrl: portfolio?.liveUrl ?? "",
        isFeatured: portfolio?.isFeatured ?? false,
      });
    }
  }, [open, portfolio, form]);

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutate(
      { ...values, liveUrl: values.liveUrl || undefined },
      { onSuccess: () => setOpen(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" /> New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Portfolio Item" : "New Portfolio Item"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="liveUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Featured on homepage</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : isEditMode ? "Save changes" : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}