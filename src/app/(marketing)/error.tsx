"use client";

export default function MarketingError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">We&apos;re having trouble loading this page. Please try again.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-foreground px-4 py-2 text-sm text-background hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}