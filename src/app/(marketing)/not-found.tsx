import Link from "next/link";

export default function MarketingNotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 rounded-md bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">
        Back to home
      </Link>
    </div>
  );
}