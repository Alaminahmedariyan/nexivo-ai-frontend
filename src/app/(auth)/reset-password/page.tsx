"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth.schema";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { authClient } from "@/lib/auth/auth-client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordInput) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword: values.newPassword,
        token,
      });

      if (error) {
        toast.error(error.message ?? "Reset link is invalid or expired.");
        return;
      }

      toast.success("Password reset successfully. Please log in.");
      router.push("/login");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Reset link is invalid or expired."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return <p className="text-sm text-muted-foreground">This reset link is invalid or has expired.</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </Form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Reset password</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}