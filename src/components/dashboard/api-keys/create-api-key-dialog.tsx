"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateApiKey } from "@/hooks/use-admin-api-keys";

const schema = z.object({ name: z.string().min(2) });

export function CreateApiKeyDialog() {
  const [open, setOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { mutate, isPending } = useCreateApiKey();

  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { name: "" } });

const onSubmit = (values: z.infer<typeof schema>) => {
  mutate(values, {
    onSuccess: (result) => {
      setCreatedKey(result.key);
      form.reset();
    },
  });
};

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) { setCreatedKey(null); setCopied(false); }
    setOpen(nextOpen);
  };

  const copyKey = () => {
    if (!createdKey) return;
    navigator.clipboard.writeText(createdKey);
    setCopied(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-1 h-4 w-4" /> New API Key</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{createdKey ? "API Key Created" : "New API Key"}</DialogTitle></DialogHeader>

        {createdKey ? (
          <div className="space-y-3">
            <p className="text-sm text-destructive">
              Copy this key now — it will never be shown again.
            </p>
            <div className="flex items-center gap-2 rounded-md border bg-muted p-3">
              <code className="flex-1 truncate text-xs">{createdKey}</code>
              <Button size="icon" variant="ghost" onClick={copyKey}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button className="w-full" onClick={() => handleClose(false)}>Done</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Key Name</FormLabel><FormControl><Input placeholder="n8n automation" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Create Key"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}