import React from "react";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "square" | "glass";
}

export const LuxuryButton = ({
  children,
  className,
  variant = "square",
  ...props
}: LuxuryButtonProps) => {
  return (
    <button
      className={cn(
        variant === "square"
          ? "luxury-button-square"
          : "liquid-glass px-8 py-3 text-[11px] font-bold tracking-widest uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
