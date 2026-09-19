import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border border-white/[0.1] bg-[#101317] px-3.5 py-3 text-sm text-[#ededed] placeholder:text-[#525866] transition-colors focus:border-[#00f5a0]/50 focus:bg-[#14181e] focus:outline-none focus:ring-1 focus:ring-[#00f5a0]/40 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
