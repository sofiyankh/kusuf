"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Drawer } from "vaul";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/**
 * UnifiedModal: A single component that handles both Desktop (Modal) and Mobile (Drawer).
 * Automatically provides accessibility requirements like Title.
 */
interface UnifiedModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  showTitle?: boolean;
  className?: string;
}

export function UnifiedModal({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  showTitle = false,
  className,
}: UnifiedModalProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
        <Drawer.Portal>
          <Drawer.Overlay className="glass-overlay" />
          <Drawer.Content
            className={cn(
              "fixed bottom-0 left-0 right-0 z-[101] flex flex-col h-auto max-h-[96vh] outline-none glass-panel rounded-t-[2.5rem] p-6",
              className,
            )}
          >
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-foreground/10 mt-2 mb-6" />
            <div className="flex flex-col gap-4 relative pb-[env(safe-area-inset-bottom)]">
              {/* Accessibility Title / Minimalist Display */}
              <Drawer.Title
                className={cn(
                  "text-[12px] font-semibold tracking-[0.18em] uppercase text-foreground",
                  !showTitle && "sr-only",
                )}
              >
                {title}
              </Drawer.Title>
              {description && (
                <Drawer.Description
                  className={cn(
                    "text-[11px] tracking-[0.12em] text-foreground/60 uppercase",
                    !showTitle && "sr-only",
                  )}
                >
                  {description}
                </Drawer.Description>
              )}

              {children}

              <Drawer.Close className="absolute right-0 top-0 rounded-sm opacity-70 transition-opacity hover:opacity-100">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Drawer.Close>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="glass-overlay animate-in fade-in-0 duration-300" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "glass-panel rounded-3xl",
            className,
          )}
        >
          {/* Accessibility Title / Minimalist Display */}
          <DialogPrimitive.Title
            className={cn(
              "text-[12px] font-semibold tracking-[0.18em] uppercase text-foreground",
              !showTitle && "sr-only",
            )}
          >
            {title}
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description
              className={cn(
                "text-[11px] tracking-[0.12em] text-foreground/60 uppercase",
                !showTitle && "sr-only",
              )}
            >
              {description}
            </DialogPrimitive.Description>
          )}

          {children}

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
