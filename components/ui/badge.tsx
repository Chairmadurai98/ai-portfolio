import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-[#00f5a0]",
  {
    variants: {
      variant: {
        default:
          "border-white/[0.1] bg-white/[0.04] text-[#ededed] backdrop-blur-sm",
        accent:
          "border-[#00f5a0]/40 bg-[#00f5a0]/10 text-[#00f5a0] shadow-[0_0_12px_rgba(0,245,160,0.15)]",
        outline:
          "border-white/[0.15] text-[#a1a1aa] bg-transparent",
        subtle:
          "border-white/[0.06] bg-white/[0.02] text-[#8e94a0]",
        secondary:
          "border-white/[0.1] bg-white/[0.08] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
