import { cn } from "@/lib/utils";

/**
 * Uses the `.skeleton` utility already defined in globals.css (shimmer
 * sweep over var(--surface-3)) instead of a flat animate-pulse block.
 * Nothing here is hardcoded — if globals.css's shimmer speed/color ever
 * changes, this component updates automatically. No future edit needed.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn("skeleton", className)} {...props} />;
}

export { Skeleton };
