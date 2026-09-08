"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { authApi } from "@/lib/api/auth";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const onVerify = async () => {
    if (!email || otp.length < 6) return;
    setIsSubmitting(true);

    try {
      await authApi.otp.verifyEmail({ email, otp });
      toast.success("Email verified successfully!");
      router.push("/login");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Invalid or expired code."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResend = async () => {
    if (resendCooldown > 0 || !email) return;
    setIsSubmitting(true);

    try {
      await authApi.otp.send({ email, type: "email-verification" });
      setResendCooldown(60);
      toast.success("A new code has been sent.");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Could not resend code."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold">Verify your email</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        We sent a 6-digit code to{" "}
        <span className="font-medium text-foreground">{email || "your email"}</span>.
      </p>

      <Input
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
        inputMode="numeric"
        maxLength={6}
        placeholder="123456"
        className="mb-4 text-center text-lg tracking-widest"
      />

      <Button className="w-full" disabled={isSubmitting || otp.length < 6} onClick={onVerify}>
        {isSubmitting ? "Verifying..." : "Verify"}
      </Button>

      <button
        type="button"
        onClick={onResend}
        disabled={resendCooldown > 0 || isSubmitting}
        className="mt-4 w-full text-center text-sm text-muted-foreground hover:underline disabled:cursor-not-allowed"
      >
        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
      </button>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <VerifyEmailForm />
    </Suspense>
  );
}