import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-white/[0.1] bg-[#101317] px-3.5 py-2 text-sm text-[#ededed] placeholder:text-[#525866] transition-colors focus:border-[#00f5a0]/50 focus:bg-[#14181e] focus:outline-none focus:ring-1 focus:ring-[#00f5a0]/40 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
