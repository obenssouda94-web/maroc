import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-moroccan-red)] text-white shadow-[0_8px_22px_-10px_rgba(193,39,45,0.7)] hover:bg-[var(--color-moroccan-red-dark)]",
        green:
          "bg-[var(--color-moroccan-green)] text-white shadow-[0_8px_22px_-10px_rgba(0,98,51,0.6)] hover:bg-[var(--color-moroccan-green-dark)]",
        gold: "bg-[var(--color-gold)] text-[#2c2820] hover:bg-[var(--color-gold-dark)]",
        outline:
          "border border-[var(--color-strong-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-moroccan-red)]/40",
        ghost: "text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)]",
        subtle:
          "bg-[var(--color-surface-2)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-3)]",
        link: "text-[var(--color-moroccan-red)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? (React.Fragment as React.ElementType) : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { buttonVariants };
