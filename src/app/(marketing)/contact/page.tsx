"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, MessageSquare, Send } from "lucide-react";

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GradientBlobs } from "@/components/marketing/gradient-blobs";
import { BadgePill } from "@/components/marketing/badge-pill";

import { createLeadSchema, type CreateLeadFormInput } from "@/lib/validations/lead.schema";
import { publicLeadApi } from "@/lib/api/public/public-lead";

const BUDGET_OPTIONS = [
  { value: "UNDER_1K", label: "Under $1,000" },
  { value: "RANGE_1K_5K", label: "$1,000 – $5,000" },
  { value: "RANGE_5K_10K", label: "$5,000 – $10,000" },
  { value: "RANGE_10K_25K", label: "$10,000 – $25,000" },
  { value: "ABOVE_25K", label: "Above $25,000" },
  { value: "NOT_SURE", label: "Not sure yet" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<CreateLeadFormInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", message: "" },
  });

  const onSubmit = async (values: CreateLeadFormInput) => {
    setIsSubmitting(true);
    try {
      await publicLeadApi.create(values);
      setSubmitted(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden border-b">
      <GradientBlobs />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
        {/* -------- Info panel -------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <BadgePill>
            <MessageSquare className="h-3.5 w-3.5 text-primary" />
            Let&apos;s talk
          </BadgePill>
          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Tell us about your <span className="text-gradient">project.</span>
          </h1>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Fill out the form and we&apos;ll get back to you within 1 business day with next steps.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 rounded-xl border bg-card/60 p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Prefer email?</p>
                <a href="mailto:hello@nexivo.ai" className="text-sm text-muted-foreground hover:underline">
                  hello@nexivo.ai
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* -------- Form panel -------- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border bg-card p-7 shadow-xl shadow-primary/5 md:p-9"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Send className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">Thanks for reaching out!</h2>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                We&apos;ve received your message and will get back to you within 1–2 business days.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input className="h-11" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" className="h-11" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (optional)</FormLabel>
                      <FormControl><Input className="h-11" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (optional)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 w-full"><SelectValue placeholder="Select a range" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BUDGET_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell us about your project</FormLabel>
                      <FormControl><Textarea rows={5} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="h-12 w-full text-base shadow-lg shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
}