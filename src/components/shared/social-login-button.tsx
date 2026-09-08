"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { authClient } from "@/lib/auth/auth-client";

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.44 3.58v2.98h3.94c2.31-2.13 3.64-5.26 3.64-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.94-2.98c-1.09.73-2.5 1.16-3.99 1.16-3.07 0-5.66-2.07-6.59-4.85H1.35v3.04C3.32 21.3 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.41 14.41c-.24-.73-.38-1.5-.38-2.41s.14-1.68.38-2.41V6.55H1.35A11.98 11.98 0 000 12c0 1.94.46 3.77 1.35 5.45l4.06-3.04z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.34 0 3.32 2.7 1.35 6.55l4.06 3.04C6.34 6.81 8.93 4.75 12 4.75z"
      />
    </svg>
  );
}

export function SocialLoginButtons() {
  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/auth-callback`,
      });
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Google sign-in failed."));
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full"
        onClick={handleGoogle}
      >
        <GoogleIcon />
        <span className="ml-2">Continue with Google</span>
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with email
          </span>
        </div>
      </div>
    </div>
  );
}
