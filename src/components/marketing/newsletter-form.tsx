"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSubscribeNewsletter } from "@/hooks/use-newsletter";
import { ApiError } from "@/types/api";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { mutate, isPending } = useSubscribeNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    mutate(
      { email },
      {
        onSuccess: () => setSubscribed(true),
        onError: (error) => {
          // Already-subscribed (409) still counts as a successful outcome
          // from the visitor's perspective — show the same confirmed state.
          if (error instanceof ApiError && error.statusCode === 409) {
            setSubscribed(true);
          }
        },
      },
    );
  };

  if (subscribed) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Check className="h-4 w-4 text-primary" /> You&apos;re subscribed!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-9"
      />
      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? "..." : <Send className="h-3.5 w-3.5" />}
      </Button>
    </form>
  );
}