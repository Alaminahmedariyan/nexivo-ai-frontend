import { cn } from "@/lib/utils";

export function BadgePill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-secondary/60 px-4 py-1.5 text-sm font-medium text-secondary-foreground backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}