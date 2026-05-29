import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, useRouterState, Outlet, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { u as useAuth } from "./router-argkJYP3.js";
import { LogOut, LayoutDashboard, ShoppingCart, Package, Tag, Users, MessageSquare, ArrowRight } from "lucide-react";
import { N as NotificationsBell } from "./notifications-bell-BYGZWSnU.js";
import { T as ThemeToggle } from "./theme-toggle-CARAU6uN.js";
import "sonner";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
import "@radix-ui/react-popover";
function AdminLayout() {
  const {
    user,
    isAdmin,
    loading,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
  const isLoginPage = pathname === "/admin/login";
  useEffect(() => {
    if (isLoginPage || loading) return;
    if (!user || !isAdmin) navigate({
      to: "/admin/login"
    });
  }, [user, isAdmin, loading, isLoginPage, navigate]);
  if (isLoginPage) return /* @__PURE__ */ jsx(Outlet, {});
  if (loading || !user || !isAdmin) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "جاري التحقق..." }) });
  }
  const links = [{
    to: "/admin",
    label: "نظرة عامة",
    icon: LayoutDashboard,
    exact: true
  }, {
    to: "/admin/orders",
    label: "الطلبات",
    icon: ShoppingCart
  }, {
    to: "/admin/products",
    label: "المنتجات",
    icon: Package
  }, {
    to: "/admin/offers",
    label: "العروض",
    icon: Tag
  }, {
    to: "/admin/users",
    label: "العملاء",
    icon: Users
  }, {
    to: "/admin/messages",
    label: "الرسائل",
    icon: MessageSquare
  }];
  return /* @__PURE__ */ jsxs("div", { className: "h-screen bg-background flex flex-col overflow-hidden", dir: "rtl", children: [
    /* @__PURE__ */ jsxs("header", { className: "h-16 border-b border-border bg-surface/30 backdrop-blur-xl flex items-center justify-between px-6 z-40 shrink-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-8", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-serif font-bold tracking-tighter uppercase text-primary", children: "KUSUF" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:block text-[9px] text-muted-foreground font-bold tracking-[0.4em] uppercase opacity-60", children: "Admin Portal" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsx(NotificationsBell, {}),
        /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-border mx-1" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-none bg-primary flex items-center justify-center text-[10px] font-bold text-background uppercase", children: user?.email?.[0] || "A" }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:block text-[10px] font-bold tracking-widest uppercase opacity-60 truncate max-w-[120px]", children: user?.email?.split("@")[0] }),
          /* @__PURE__ */ jsx("button", { onClick: async () => {
            await logout();
            navigate({
              to: "/admin/login"
            });
          }, className: "p-2 text-muted-foreground hover:text-destructive transition-colors", title: "خروج", children: /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex min-h-0 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxs("aside", { className: "hidden md:flex w-64 flex-col border-l border-border bg-surface/20 backdrop-blur-md shrink-0", children: [
        /* @__PURE__ */ jsx("nav", { className: "flex-1 p-4 space-y-1", children: links.map((l) => /* @__PURE__ */ jsxs(Link, { to: l.to, activeOptions: {
          exact: l.exact
        }, className: "group relative flex items-center gap-3 px-4 py-3 text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-all duration-300", activeProps: {
          className: "group relative flex items-center gap-3 px-4 py-3 text-[10px] font-bold tracking-widest uppercase text-primary bg-primary/5 border-l-2 border-primary shadow-none"
        }, children: [
          /* @__PURE__ */ jsx(l.icon, { className: "w-4 h-4 stroke-[1.5]" }),
          " ",
          l.label
        ] }, l.to)) }),
        /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-border/50", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3 px-4 py-2 text-[9px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors", children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" }),
          " الموقع"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 h-full overflow-hidden relative p-6 lg:p-8 bg-surface/5", children: /* @__PURE__ */ jsx("div", { className: "h-full max-w-[1600px] mx-auto overflow-hidden", children: /* @__PURE__ */ jsx(Outlet, {}) }) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
