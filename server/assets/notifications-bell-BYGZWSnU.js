import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { c as cn, u as useAuth, d as useNotifications, B as Button } from "./router-argkJYP3.js";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-none border border-glass-border bg-surface/90 backdrop-blur-[80px] p-4 text-foreground shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      "liquid-glass",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const TYPE_ICON = {
  order_placed: "🛍️",
  order_status: "📦",
  low_stock: "⚠️",
  new_offer: "🎁",
  new_user: "👤",
  system: "🔔"
};
function NotificationsBell() {
  const { user } = useAuth();
  const { notifications, unreadCount, markAllRead, markRead } = useNotifications();
  if (!user) return null;
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "relative p-2 text-foreground hover:text-primary transition-colors",
        "aria-label": "Notifications",
        children: [
          /* @__PURE__ */ jsx(Bell, { className: "w-5 h-5" }),
          unreadCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center animate-scale-in", children: unreadCount > 9 ? "9+" : unreadCount })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(PopoverContent, { align: "end", className: "w-80 p-0", dir: "rtl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "الإشعارات" }),
        unreadCount > 0 && /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: markAllRead, className: "h-7 text-xs", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 ml-1" }),
          " قراءة الكل"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-h-96 overflow-y-auto", children: notifications.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground py-12", children: "لا توجد إشعارات" }) : notifications.map((n) => {
        const inner = /* @__PURE__ */ jsx(
          "div",
          {
            className: `px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer ${!n.read ? "bg-primary/5" : ""}`,
            onClick: () => !n.read && markRead(n.id),
            children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl flex-shrink-0", children: TYPE_ICON[n.type] || "🔔" }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-sm", children: n.title }),
                n.body && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: n.body }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: new Date(n.created_at).toLocaleString("ar-TN", {
                  dateStyle: "short",
                  timeStyle: "short"
                }) })
              ] }),
              !n.read && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" })
            ] })
          }
        );
        return n.link ? /* @__PURE__ */ jsx(Link, { to: n.link, children: inner }, n.id) : /* @__PURE__ */ jsx("div", { children: inner }, n.id);
      }) })
    ] })
  ] });
}
export {
  NotificationsBell as N
};
