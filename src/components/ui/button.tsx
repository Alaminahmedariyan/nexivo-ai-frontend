import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * THEME PERSONALITY NOTES
 * - Corner radius already changes automatically (rounded-md reads var(--radius-md),
 *   which is redefined per theme in globals.css) — no override needed for that.
 * - `default` variant is now the SAME structure in all 3 themes: transparent
 *   background, colored hairline border, shine-sweep on hover. Only the
 *   accent color (indigo / violet / gold) and radius/font change per theme.
 * - `outline` gets a matching premium hairline treatment so secondary buttons
 *   don't look like a leftover light-mode button inside premium.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden bg-transparent text-primary border border-primary/50 hover:border-primary hover:bg-primary/8 hover:-translate-y-px " +
          "dark:text-signal dark:border-signal/55 dark:hover:border-signal dark:hover:bg-signal/10 dark:rounded-xl dark:shadow-[0_0_22px_-6px_var(--signal)] dark:hover:shadow-[0_0_34px_-4px_var(--signal)] " +
          "premium:text-luxury premium:border-luxury/55 premium:hover:border-luxury premium:hover:bg-luxury/8 premium:font-normal premium:tracking-wide premium:rounded-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground " +
          "dark:border-white/10 dark:hover:border-white/20 " +
          "premium:border-foreground/15 premium:text-muted-foreground premium:hover:border-foreground/40 premium:hover:text-foreground premium:hover:bg-transparent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground premium:hover:bg-luxury/10 premium:hover:text-luxury",
        link: "text-primary underline-offset-4 hover:underline premium:text-luxury",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    if (asChild) {
      // Slot requires a single child element — skip the decorative sweep span
      return (
        <Comp
          className={cn("group", buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn("group", buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {/* premium-only foil sweep highlight — invisible in light/dark since
            the parent only gets `overflow-hidden`/`relative` under premium: */}
        {(!variant || variant === "default") && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-full block w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-current/40 to-transparent opacity-40 transition-[left] duration-500 group-hover:left-full"
          />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }