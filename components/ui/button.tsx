import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00f5a0] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#00f5a0] text-[#08090a] font-semibold hover:bg-[#0df2c8] shadow-[0_0_20px_rgba(0,245,160,0.25)] hover:shadow-[0_0_30px_rgba(0,245,160,0.4)]",
        secondary:
          "bg-white/[0.05] text-[#ededed] border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2] backdrop-blur-sm",
        outline:
          "border border-white/[0.12] text-[#ededed] bg-transparent hover:bg-white/[0.04] hover:border-[#00f5a0]/50 hover:text-white",
        ghost:
          "text-[#a1a1aa] hover:text-[#ededed] hover:bg-white/[0.06]",
        link:
          "text-[#00f5a0] underline-offset-4 hover:underline",
        subtleGlow:
          "border border-[#00f5a0]/30 bg-[#00f5a0]/[0.06] text-[#00f5a0] hover:bg-[#00f5a0]/[0.12] hover:border-[#00f5a0]/60",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
