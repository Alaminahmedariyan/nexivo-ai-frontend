"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Code2, Plus } from "lucide-react";

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

import {
  useCreateService,
  useUpdateService,
} from "@/hooks/use-admin-services";

import type { Service } from "@/types/service";

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Service title must be at least 2 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),

  icon: z.string().optional(),
});

type ServiceFormDialogProps = {
  service?: Service;
  trigger?: React.ReactNode;
};

export function ServiceFormDialog({
  service,
  trigger,
}: ServiceFormDialogProps) {
  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(service);

  const createMutation = useCreateService();
  const updateMutation = useUpdateService(service?.id ?? "");

  const { mutate, isPending } = isEditMode
    ? updateMutation
    : createMutation;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (service) {
      form.reset({
        title: service.title,
        description: service.description,
        icon: service.icon ?? "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        icon: "",
      });
    }
  }, [open, service, form]);

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutate(
      {
        title: values.title.trim(),
        description: values.description.trim(),
        icon: values.icon?.trim() || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            New Service
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg overflow-hidden p-0">
        <DialogHeader className="border-b bg-muted/20 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background">
              <Code2 className="h-5 w-5 text-primary" />
            </div>

            <div>
              <DialogTitle>
                {isEditMode ? "Edit Service" : "Create Service"}
              </DialogTitle>

              <DialogDescription className="mt-1 text-xs">
                {isEditMode
                  ? "Update the service information displayed across your platform."
                  : "Create a new service that can be offered to clients."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 px-6 py-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Title</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Full-Stack Web Development"
                      className="h-10"
                      {...field}
                    />
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
                    <Textarea
                      rows={5}
                      className="resize-none"
                      placeholder="Production-ready web applications built with modern frontend and backend technologies..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="code"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>

                  <p className="text-[11px] leading-4 text-muted-foreground">
                    Optional Lucide icon name used to visually represent this
                    service.
                  </p>

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
                {isPending
                  ? "Saving..."
                  : isEditMode
                    ? "Save Changes"
                    : "Create Service"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}