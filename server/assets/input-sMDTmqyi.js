import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { c as cn } from "./router-argkJYP3.js";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-12 w-full border border-glass-border bg-glass-bg px-5 py-2 text-sm transition-all duration-500 backdrop-blur-xl file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
export {
  Input as I
};
