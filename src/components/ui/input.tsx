import * as React from "react";

import { cn } from "@/lib/utils";
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full border border-glass-border bg-glass-bg px-5 py-2 text-sm transition-all duration-500 backdrop-blur-xl file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
