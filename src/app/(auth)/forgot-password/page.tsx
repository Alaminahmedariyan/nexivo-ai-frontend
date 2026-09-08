"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordOtpSchema, resetPasswordOtpSchema, type ForgotPasswordOtpInput, type ResetPasswordOtpInput } from "@/lib/validations/auth.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { authApi } from "@/lib/api/auth";

function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const emailForm = useForm<ForgotPasswordOtpInput>({
    resolver: zodResolver(forgotPasswordOtpSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetPasswordOtpInput>({
    resolver: zodResolver(resetPasswordOtpSchema),
    defaultValues: { email: "", otp: "", password: "" },
  });

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const onSendOtp = async (values: ForgotPasswordOtpInput) => {
    setIsSubmitting(true);
    try {
      await authApi.otp.forgotPassword({ email: values.email });
      setEmail(values.email);
      resetForm.setValue("email", values.email);
      setStep("reset");
      setResendCooldown(60);
      toast.success("OTP sent to your email.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to send OTP."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResetPassword = async (values: ResetPasswordOtpInput) => {
    setIsSubmitting(true);
    try {
        await authApi.otp.resetPassword({
          email: values.email,
          otp: values.otp,
          password: values.password,
        });
        toast.success("Password reset successfully. Please log in.");
        router.push("/login");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to reset password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResendOtp = async () => {
    if (resendCooldown > 0 || !email) return;
    setIsSubmitting(true);
    try {
      await authApi.otp.forgotPassword({ email });
      setResendCooldown(60);
      toast.success("OTP resent to your email.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to resend OTP."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === "email") {
    return (
      <div>
        <h1 className="mb-6 text-xl font-semibold">Forgot password</h1>

        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onSendOtp)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        </Form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="text-foreground hover:underline">
            Log in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Reset your password</h1>

      <Form {...resetForm}>
        <form onSubmit={resetForm.handleSubmit(onResetPassword)} className="space-y-4">
          <FormField
            control={resetForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={resetForm.control}
            name="password"
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Resetting..." : "Reset password"}
          </Button>
        </form>
      </Form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        <span className="mr-2">
          Sent to <span className="font-medium text-foreground">{email}</span>
        </span>
        <button
          type="button"
          onClick={onResendOtp}
          disabled={resendCooldown > 0 || isSubmitting}
          className="text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground"
        >
          {resendCooldown > 0
            ? `Resend in ${resendCooldown}s`
            : "Resend OTP"}
        </button>
      </p>

      <p className="mt-2 text-center text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => setStep("email")}
          className="text-foreground hover:underline"
        >
          Change email
        </button>
      </p>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}