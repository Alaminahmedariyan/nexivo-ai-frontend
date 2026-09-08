"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
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

import { sendOtpSchema, signInWithOtpSchema, type SendOtpInput, type SignInWithOtpInput } from "@/lib/validations/auth.schema";
import { SocialLoginButtons } from "@/components/shared/social-login-button";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { authApi } from "@/lib/api/auth";

function OtpLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const emailForm = useForm<SendOtpInput>({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: { email: "", type: "sign-in" },
  });

  const otpForm = useForm<SignInWithOtpInput>({
    resolver: zodResolver(signInWithOtpSchema),
    defaultValues: { email: "", otp: "" },
  });

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const onSendOtp = async (values: SendOtpInput) => {
    setIsSubmitting(true);
    try {
      await authApi.otp.send({ email: values.email, type: "sign-in" });
      setEmail(values.email);
      otpForm.setValue("email", values.email);
      setStep("otp");
      setResendCooldown(60);
      toast.success("OTP sent to your email.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to send OTP."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignInWithOtp = async (values: SignInWithOtpInput) => {
    setIsSubmitting(true);
    try {
      await authApi.otp.signIn({
        email: values.email,
        otp: values.otp,
        name: values.name || undefined,
        image: values.image || undefined,
      });

      toast.success("Logged in successfully.");
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Invalid or expired OTP."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResendOtp = async () => {
    if (resendCooldown > 0 || !email) return;
    setIsSubmitting(true);
    try {
      await authApi.otp.send({ email, type: "sign-in" });
      setResendCooldown(60);
      toast.success("OTP resent to your email.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Failed to resend OTP."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">
        {step === "email" ? "Log in with OTP" : "Enter OTP"}
      </h1>

      {step === "email" ? (
        <>
          <div className="mb-6">
            <SocialLoginButtons />
          </div>

          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSendOtp)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
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
            <Link
              href="/login"
              className="text-foreground hover:underline"
            >
              Use password instead
            </Link>
          </p>
        </>
      ) : (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onSignInWithOtp)} className="space-y-4">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-time password</FormLabel>
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Sign in / Create account"}
            </Button>
          </form>
        </Form>
      )}

      {step === "otp" && (
        <div className="mt-4 text-center text-sm">
          <p className="text-muted-foreground">
            Sent to <span className="font-medium text-foreground">{email}</span>
          </p>
          <button
            type="button"
            onClick={onResendOtp}
            disabled={resendCooldown > 0 || isSubmitting}
            className="mt-2 text-sm text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground"
          >
            {resendCooldown > 0
              ? `Resend OTP in ${resendCooldown}s`
              : "Resend OTP"}
          </button>

          <p className="mt-4 text-muted-foreground">
            <button
              type="button"
              onClick={() => setStep("email")}
              className="text-foreground hover:underline"
            >
              Change email
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default function OtpLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <OtpLoginForm />
    </Suspense>
  );
}
