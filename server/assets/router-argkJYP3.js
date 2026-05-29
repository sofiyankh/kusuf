import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouterState, Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter, useRouter } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect, useContext, createContext, useCallback, Component } from "react";
import { toast, Toaster as Toaster$1 } from "sonner";
import { createClient } from "@supabase/supabase-js";
import { Home, Search, ShoppingBag, User, Heart, X, Minus, Plus, Trash2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Drawer } from "vaul";
const appCss = "/kusuf/assets/styles-DLcL7d2m.css";
function createSupabaseClient() {
  const SUPABASE_URL = "https://hsgasgvhohkmwqqnaypt.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZ2FzZ3Zob2hrbXdxcW5heXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODY4MDcsImV4cCI6MjA5NTU2MjgwN30.8S3AYKfkyxlSTmDtPo2i9V6Vhs1Wp90CkwgY-hf2OlA";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const AuthContext = createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const checkAdmin = async (uid) => {
    if (!uid) {
      setIsAdmin(false);
      return;
    }
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    setIsAdmin(!!data);
  };
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setTimeout(() => checkAdmin(newSession?.user?.id), 0);
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      checkAdmin(s?.user?.id).finally(() => setLoading(false));
    });
    return () => subscription.unsubscribe();
  }, []);
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  const register = async (email, password, name) => {
    const redirectUrl = typeof window !== "undefined" ? `${window.location.origin}/` : void 0;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name }, emailRedirectTo: redirectUrl }
    });
    if (error) throw error;
  };
  const logout = async () => {
    await supabase.auth.signOut();
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, session, loading, isAdmin, login, register, logout }, children });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
const CartContext = createContext(void 0);
const STORAGE_KEY = "Kusuf_cart";
const getCartKey = (item) => `${item.id}-${item.variantId || "base"}`;
function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [dbLoaded, setDbLoaded] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    console.log("Cart: Initializing hydration...");
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log("Cart: Hydrated from storage", parsed);
        setItems(parsed);
      }
    } catch (err) {
      console.error("Cart: Hydration failed", err);
    }
    setHydrated(true);
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setItems(updated);
        } catch (err) {
          console.error("Cart: Storage event sync failed", err);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  useEffect(() => {
    if (!user || !hydrated || dbLoaded) return;
    const loadCart = async () => {
      console.log("Cart: Fetching from DB for user", user.id);
      try {
        const { data, error } = await supabase.from("carts").select("items").eq("user_id", user.id).maybeSingle();
        if (error) throw error;
        if (data?.items) {
          const dbItems = data.items;
          console.log("Cart: DB data received", dbItems);
          setItems((prev) => {
            const merged = [...dbItems];
            prev.forEach((local) => {
              const localKey = getCartKey(local);
              const idx = merged.findIndex((i) => getCartKey(i) === localKey);
              if (idx > -1) {
                merged[idx].quantity = Math.min(
                  merged[idx].quantity + local.quantity,
                  merged[idx].stock ?? Infinity
                );
              } else {
                merged.push(local);
              }
            });
            return merged;
          });
        }
      } catch (err) {
        console.error("Cart: DB load failed", err);
      } finally {
        setDbLoaded(true);
      }
    };
    loadCart();
  }, [user, hydrated, dbLoaded]);
  useEffect(() => {
    if (!user) {
      setDbLoaded(false);
    }
  }, [user]);
  useEffect(() => {
    if (!hydrated) return;
    console.log("Cart: Persisting to localStorage", items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);
  useEffect(() => {
    if (!user || !hydrated || !dbLoaded) return;
    const timer = setTimeout(() => {
      console.log("Cart: Syncing to Supabase...");
      supabase.from("carts").upsert({
        user_id: user.id,
        items,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).then(({ error }) => {
        if (error) console.error("Cart: DB sync error", error);
        else console.log("Cart: DB sync success");
      });
    }, 2e3);
    return () => clearTimeout(timer);
  }, [items, user, hydrated, dbLoaded]);
  const addToCart = (newItem) => {
    console.log("Cart: Attempting to add item", newItem.id, newItem.name);
    let actionType = "added";
    setItems((prev) => {
      const newKey = getCartKey(newItem);
      const existingIdx = prev.findIndex((i) => getCartKey(i) === newKey);
      const cap = newItem.stock ?? Infinity;
      if (existingIdx > -1) {
        const existing = prev[existingIdx];
        const nextQty = Math.min(existing.quantity + newItem.quantity, cap);
        if (nextQty === existing.quantity) {
          actionType = "limit";
          return prev;
        }
        const updated = [...prev];
        updated[existingIdx] = { ...existing, quantity: nextQty };
        actionType = "updated";
        return updated;
      }
      actionType = "added";
      return [...prev, { ...newItem, quantity: Math.min(newItem.quantity, cap) }];
    });
    if (actionType === "limit") {
      toast.warning("وصلت للحد الأقصى");
    } else if (actionType === "updated") {
      toast.success("تمت الإضافة إلى السلة");
    } else {
      toast.success("تمت الإضافة إلى السلة");
    }
    setCartOpen(true);
  };
  const removeFromCart = (cartItemId) => {
    console.log("Cart: Attempting to remove item", cartItemId);
    let removedItemName = "";
    setItems((prev) => {
      const item = prev.find((i) => getCartKey(i) === cartItemId);
      if (item) removedItemName = item.name;
      return prev.filter((i) => getCartKey(i) !== cartItemId);
    });
    if (removedItemName) {
      toast.info("تم تعديل السلة");
    }
  };
  const updateQuantity = (cartItemId, quantity) => {
    console.log("Cart: Updating quantity", cartItemId, quantity);
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems(
      (prev) => prev.map((i) => {
        if (getCartKey(i) !== cartItemId) return i;
        const cap = i.stock ?? Infinity;
        return { ...i, quantity: Math.min(quantity, cap) };
      })
    );
  };
  const clearCart = () => {
    console.log("Cart: Clearing...");
    setItems([]);
  };
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  return /* @__PURE__ */ jsx(
    CartContext.Provider,
    {
      value: {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        isCartOpen,
        setCartOpen
      },
      children
    }
  );
}
function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
const NotificationsContext = createContext(void 0);
function NotificationsProvider({ children }) {
  const { user, isAdmin } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const refresh = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      return;
    }
    let q = supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(30);
    if (isAdmin) {
      q = q.or(`user_id.eq.${user.id},for_admin.eq.true`);
    } else {
      q = q.eq("user_id", user.id);
    }
    const { data } = await q;
    setNotifications(data || []);
  }, [user, isAdmin]);
  useEffect(() => {
    refresh();
  }, [refresh]);
  useEffect(() => {
    if (!user) return;
    const channel = supabase.channel(`notif-${user.id}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications" },
      (payload) => {
        const n = payload.new;
        const mine = n.user_id === user.id || n.for_admin && isAdmin;
        if (!mine) return;
        setNotifications((prev) => [n, ...prev].slice(0, 30));
        toast(n.title, { description: n.body || void 0 });
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin]);
  const markRead = async (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
    await supabase.from("notifications").update({ read: true }).eq("id", id);
  };
  const markAllRead = async () => {
    const ids = notifications.filter((n) => !n.read).map((n) => n.id);
    if (!ids.length) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await supabase.from("notifications").update({ read: true }).in("id", ids);
  };
  const unreadCount = notifications.filter((n) => !n.read).length;
  return /* @__PURE__ */ jsx(
    NotificationsContext.Provider,
    {
      value: { notifications, unreadCount, markAllRead, markRead, refresh },
      children
    }
  );
}
function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used inside NotificationsProvider");
  return ctx;
}
const playPremiumChime = (type) => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
    masterGain.connect(ctx.destination);
    if (type === "success") {
      const frequencies = [523.25, 659.25, 783.99, 1046.5];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.07 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + idx * 0.07 + 0.5);
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.6);
      });
    } else if (type === "error") {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.4);
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === "warning") {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.3);
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === "info") {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.5);
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch (e) {
    console.warn("AudioContext initialization bypassed until interaction.", e);
  }
};
const Toaster = ({ ...props }) => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setTheme(isDarkNow ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.hasAttribute("data-sonner-toast")) {
              const type = node.getAttribute("data-type") || "default";
              playPremiumChime(type);
            }
          });
        }
      });
    });
    const toasterContainer = document.querySelector("section[data-sonner-toaster]");
    if (toasterContainer) {
      observer.observe(toasterContainer, { childList: true, subtree: true });
    } else {
      const timeout = setTimeout(() => {
        const tc = document.querySelector("section[data-sonner-toaster]");
        if (tc) observer.observe(tc, { childList: true, subtree: true });
      }, 1e3);
      return () => {
        clearTimeout(timeout);
        observer.disconnect();
      };
    }
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group font-sans",
      icons: {},
      toastOptions: {
        classNames: {
          toast: "group toast glass rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden transition-all duration-300",
          description: "group-[.toast]:text-foreground/60 text-[11px] tracking-[0.12em] leading-relaxed",
          title: "text-[12px] font-semibold tracking-[0.18em] uppercase text-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground rounded-none text-[10px] font-bold tracking-[0.2em] uppercase px-5 h-8",
          cancelButton: "group-[.toast]:bg-foreground/5 group-[.toast]:text-foreground rounded-none text-[10px] font-bold tracking-[0.2em] uppercase px-5 h-8"
        }
      },
      ...props
    }
  );
};
function MobileNav() {
  const { itemCount, setCartOpen } = useCart();
  const { user } = useAuth();
  const { location: location2 } = useRouterState();
  const path = location2.pathname;
  const isActive = (p) => p === "/" ? path === "/" : path.startsWith(p);
  const itemClass = (active) => `flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-500 ${active ? "text-primary scale-110" : "text-foreground/90 hover:text-foreground"}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "md:hidden h-20", "aria-hidden": true }),
    /* @__PURE__ */ jsx(
      "nav",
      {
        dir: "rtl",
        className: "md:hidden fixed bottom-0 inset-x-0 z-[90] bg-surface/90 backdrop-blur-[80px] border-t border-glass-border shadow-2xl transition-all duration-1000 liquid-glass",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-stretch justify-around h-20 px-4 pb-[env(safe-area-inset-bottom)]", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: itemClass(isActive("/")), "aria-label": "Home", children: [
            /* @__PURE__ */ jsx(Home, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: "خسوف" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "/shop", className: itemClass(isActive("/shop")), "aria-label": "Shop", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: "المتجر" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setCartOpen(true), className: itemClass(false), "aria-label": "Cart", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 transition-colors" }),
              itemCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1.5 -right-1.5 bg-primary text-background text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center transition-all duration-1000", children: itemCount })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: "السلة" })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: user ? "/account" : "/login",
              className: itemClass(isActive("/account") || isActive("/login")),
              "aria-label": "Account",
              children: [
                user ? /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: user ? "حسابي" : "دخول" })
              ]
            }
          )
        ] })
      }
    )
  ] });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "luxury-button-square",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 rounded-none",
        outline: "border border-glass-border bg-glass-bg shadow-sm hover:bg-primary hover:text-background backdrop-blur-md rounded-none",
        secondary: "bg-secondary text-foreground shadow-sm hover:opacity-80 rounded-none",
        ghost: "hover:bg-glass-bg hover:text-foreground rounded-none",
        link: "text-primary underline-offset-4 hover:underline rounded-none"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function UnifiedModal({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  showTitle = false,
  className
}) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return /* @__PURE__ */ jsx(Drawer.Root, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(Drawer.Portal, { children: [
      /* @__PURE__ */ jsx(Drawer.Overlay, { className: "glass-overlay" }),
      /* @__PURE__ */ jsxs(
        Drawer.Content,
        {
          className: cn(
            "fixed bottom-0 left-0 right-0 z-[101] flex flex-col h-auto max-h-[96vh] outline-none glass-panel rounded-t-[2.5rem] p-6",
            className
          ),
          children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-foreground/10 mt-2 mb-6" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 relative pb-[env(safe-area-inset-bottom)]", children: [
              /* @__PURE__ */ jsx(
                Drawer.Title,
                {
                  className: cn(
                    "text-[12px] font-semibold tracking-[0.18em] uppercase text-foreground",
                    !showTitle && "sr-only"
                  ),
                  children: title
                }
              ),
              description && /* @__PURE__ */ jsx(
                Drawer.Description,
                {
                  className: cn(
                    "text-[11px] tracking-[0.12em] text-foreground/60 uppercase",
                    !showTitle && "sr-only"
                  ),
                  children: description
                }
              ),
              children,
              /* @__PURE__ */ jsxs(Drawer.Close, { className: "absolute right-0 top-0 rounded-sm opacity-70 transition-opacity hover:opacity-100", children: [
                /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ] })
            ] })
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { open: isOpen, onOpenChange, children: /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [
    /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "glass-overlay animate-in fade-in-0 duration-300" }),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "glass-panel rounded-3xl",
          className
        ),
        children: [
          /* @__PURE__ */ jsx(
            DialogPrimitive.Title,
            {
              className: cn(
                "text-[12px] font-semibold tracking-[0.18em] uppercase text-foreground",
                !showTitle && "sr-only"
              ),
              children: title
            }
          ),
          description && /* @__PURE__ */ jsx(
            DialogPrimitive.Description,
            {
              className: cn(
                "text-[11px] tracking-[0.12em] text-foreground/60 uppercase",
                !showTitle && "sr-only"
              ),
              children: description
            }
          ),
          children,
          /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] }) });
}
function CartSidebar() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    total,
    isCartOpen: isOpen,
    setCartOpen
  } = useCart();
  const isMobile = useIsMobile();
  const onClose = () => setCartOpen(false);
  return /* @__PURE__ */ jsx(
    UnifiedModal,
    {
      isOpen,
      onOpenChange: setCartOpen,
      title: "سلة التسوق",
      description: "منتجاتك المختارة في سلة التسوق",
      className: isMobile ? "p-0" : "max-w-lg p-0 overflow-hidden",
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-[80vh] md:h-[85vh] overflow-hidden", dir: "rtl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-glass-border", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-serif text-2xl font-bold text-foreground flex items-center gap-2 transition-colors", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 text-primary transition-colors" }),
            "سلة التسوق"
          ] }),
          !isMobile && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              "aria-label": "Close cart",
              className: "p-2 rounded-lg hover:bg-glass-bg transition-colors",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-foreground transition-colors" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-6 space-y-4", children: items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-foreground/90 transition-colors", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }),
          /* @__PURE__ */ jsx("p", { children: "سلتك فارغة" })
        ] }) : items.map((item) => {
          const itemKey = getCartKey(item);
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex gap-4 p-4 rounded-xl border border-glass-border bg-glass-bg backdrop-blur-md transition-all hover:border-primary/30",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: item.image || "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
                    alt: item.name,
                    onError: (e) => {
                      e.currentTarget.style.visibility = "hidden";
                    },
                    className: "w-20 h-20 object-cover rounded-lg bg-foreground/5 flex-shrink-0 transition-colors"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 text-right", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm line-clamp-2 text-foreground transition-colors", children: item.name }),
                  item.selectedSize && /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-bold tracking-widest text-foreground/90 mt-1 transition-colors", children: [
                    "SIZE: ",
                    item.selectedSize
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-primary font-bold text-sm mt-1 transition-colors", children: [
                    item.price.toFixed(2),
                    " د.ت"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "aria-label": "Decrease",
                        onClick: () => updateQuantity(itemKey, item.quantity - 1),
                        className: "p-1 rounded border border-glass-border hover:bg-primary hover:text-background transition-all",
                        children: /* @__PURE__ */ jsx(Minus, { className: "w-3 h-3" })
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-sm w-6 text-center text-foreground transition-colors", children: item.quantity }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "aria-label": "Increase",
                        onClick: () => updateQuantity(itemKey, item.quantity + 1),
                        disabled: item.stock !== void 0 && item.quantity >= item.stock,
                        className: "p-1 rounded border border-glass-border hover:bg-primary hover:text-background disabled:opacity-10 transition-all",
                        children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "aria-label": "Remove",
                        onClick: () => removeFromCart(itemKey),
                        className: "p-1 mr-auto rounded text-destructive hover:bg-destructive/10 transition-colors",
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] })
              ]
            },
            itemKey
          );
        }) }),
        items.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-glass-border p-6 space-y-3 bg-surface/50 backdrop-blur-xl transition-all", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg font-semibold text-foreground transition-colors", children: [
            /* @__PURE__ */ jsx("span", { children: "المجموع" }),
            /* @__PURE__ */ jsxs("span", { className: "text-primary transition-colors", children: [
              total.toFixed(2),
              " د.ت"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/checkout", onClick: onClose, className: "block", children: /* @__PURE__ */ jsx(Button, { className: "w-full luxury-button-square h-auto py-5", children: "إتمام الطلب" }) })
        ] })
      ] })
    }
  );
}
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const observeAll = () => {
      const elements = document.querySelectorAll(".reveal:not(.revealed)");
      elements.forEach((el) => observer.observe(el));
    };
    observeAll();
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
const ThemeContext = createContext(void 0);
function ThemeProvider({ children }) {
  const [palette, setInternalPalette] = useState({
    "--background": "#000000",
    "--foreground": "#f2eee8",
    "--surface": "rgba(20, 20, 20, 0.8)",
    "--primary": "#c5a880",
    "--secondary": "rgba(242, 238, 232, 0.1)",
    "--card": "rgba(15, 15, 15, 0.9)",
    "--glass-bg": "rgba(255, 255, 255, 0.03)",
    "--glass-border": "rgba(255, 255, 255, 0.08)",
    "--btn-bg": "#f2eee8",
    "--btn-fg": "#000000"
  });
  const [isManualTheme, setIsManualTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme-manual") === "true";
    }
    return false;
  });
  const applyPalette = useCallback((p) => {
    Object.entries(p).forEach(([key, value]) => {
      if (value) {
        document.documentElement.style.setProperty(key, value);
      }
    });
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || !savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
    const savedPalette = localStorage.getItem("Kusuf-dynamic-palette");
    if (savedPalette && localStorage.getItem("theme-manual") !== "true") {
      try {
        const parsed = JSON.parse(savedPalette);
        setInternalPalette((prev) => ({ ...prev, ...parsed }));
        applyPalette(parsed);
      } catch (e) {
        console.error("Failed to restore palette", e);
      }
    }
  }, [applyPalette]);
  useEffect(() => {
    applyPalette(palette);
  }, [palette, applyPalette]);
  const setPalette = useCallback((newPalette) => {
    setInternalPalette((prev) => ({ ...prev, ...newPalette }));
  }, []);
  const setManualTheme = (value) => {
    setIsManualTheme(value);
    localStorage.setItem("theme-manual", value.toString());
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { palette, setPalette, isManualTheme, setManualTheme }, children });
}
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error) {
    console.error("App error:", error);
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-4", dir: "rtl", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center space-y-4", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "حدث خطأ غير متوقع" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: this.state.error.message }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              this.setState({ error: null });
              location.reload();
            },
            className: "px-4 py-2 rounded-md bg-primary text-primary-foreground",
            children: "إعادة المحاولة"
          }
        )
      ] }) });
    }
    return this.props.children;
  }
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$j = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "خسوف Kusuf — تحرّك في صمت" },
      {
        name: "description",
        content: "Kusuf علامة تجارية تونسية لملابس الشارع، تجمع بين الجودة الفاخرة والهوية الحضرية."
      },
      { property: "og:title", content: "Kusuf — تحرّك في صمت" },
      {
        property: "og:description",
        content: "Kusuf علامة تجارية تونسية لملابس الشارع، تجمع بين الجودة الفاخرة والهوية الحضرية."
      },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "ar", dir: "rtl", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `try{
              var t=localStorage.getItem('theme');
              var isD=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);
              document.documentElement.classList.toggle('dark',isD);
              
              var p=localStorage.getItem('Kusuf-dynamic-palette');
              if(p && localStorage.getItem('theme-manual')!=='true'){
                var o=JSON.parse(p);
                for(var k in o)document.documentElement.style.setProperty(k,o[k]);
              }
            }catch(e){}`
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "relative min-h-screen overflow-x-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden md:hidden fixed top-1/2 left-0 right-0 h-48 -translate-y-1/2 border-y-2 border-dashed border-primary/40 bg-primary/5 pointer-events-none z-[9999] flex flex-col items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-primary/20" }),
        /* @__PURE__ */ jsx("div", { className: "bg-background/80 backdrop-blur-md px-6 py-2 border border-primary/30 rounded-full", children: /* @__PURE__ */ jsx("span", { className: "text-[14px] font-bold font-display text-primary uppercase tracking-[0.5em] drop-shadow-sm", children: "Theme Sampling Zone" }) }),
        /* @__PURE__ */ jsx("div", { className: "w-full h-px bg-primary/20" })
      ] }),
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  useScrollReveal();
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(NotificationsProvider, { children: /* @__PURE__ */ jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(MobileNav, {}),
    /* @__PURE__ */ jsx(CartSidebar, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }) }) }) });
}
const $$splitComponentImporter$i = () => import("./shop-CTjhsYOs.js");
const Route$i = createFileRoute("/shop")({
  head: () => ({
    meta: [{
      title: "Kusuf — All Products | Move in Silence"
    }, {
      name: "description",
      content: "Explore the full collection of Tunisian luxury streetwear. Every piece manifests the 'Move in Silence' philosophy."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./register-DcNkMvZf.js");
const Route$h = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "إنشاء حساب — Kusuf"
    }, {
      name: "description",
      content: "انضم إلى مجتمع Kusuf."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./login-DGKWd4pP.js");
const Route$g = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "تسجيل الدخول — Kusuf"
    }, {
      name: "description",
      content: "سجل الدخول إلى حساب Kusuf الخاص بك."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./essentials-lclxYa2a.js");
const Route$f = createFileRoute("/essentials")({
  head: () => ({
    meta: [{
      title: "الأساسيات — Kusuf"
    }, {
      name: "description",
      content: "قطع أساسية فاخرة مصنوعة من أفضل القطن التونسي."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./drops-Dwae36xi.js");
const Route$e = createFileRoute("/drops")({
  head: () => ({
    meta: [{
      title: "إصدارات — Kusuf"
    }, {
      name: "description",
      content: "إصدارات حصرية ومحدودة من ملابس الشارع التونسية."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./contact-1qdL3bh3.js");
const Route$d = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "تواصل معنا — Kusuf"
    }, {
      name: "description",
      content: "تواصل مع فريق Kusuf: استفسارات، دعم، أو شراكات."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./checkout-B9W5ruGS.js");
const Route$c = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "إتمام الطلب — Kusuf"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin-DTyR2fdZ.js");
const Route$b = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Kusuf"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./account-BJ9mZt5B.js");
const Route$a = createFileRoute("/account")({
  head: () => ({
    meta: [{
      title: "حسابي — Kusuf"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./about-DGtmJELp.js");
const Route$9 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "قصتنا — Kusuf"
    }, {
      name: "description",
      content: "تعرف على قصة Kusuf: علامة تجارية تونسية لملابس الشارع تجمع بين الهوية الحضرية والجودة الفاخرة."
    }, {
      property: "og:title",
      content: "قصة خسوف Kusuf"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
function mapProduct(r) {
  return {
    id: r.id,
    name: r.name,
    nameAr: r.name_ar || r.name,
    category: r.category === "drops" ? "drops" : "essentials",
    price: Number(r.price ?? 0),
    originalPrice: r.original_price != null ? Number(r.original_price) : void 0,
    image: r.image || "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
    description: r.description || "",
    descriptionAr: r.description_ar || r.description || "",
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    rating: Number(r.rating ?? 0),
    reviews: Number(r.reviews ?? 0),
    inStock: r.in_stock !== false,
    isNew: !!r.is_new,
    discount: r.discount ?? void 0,
    stock: r.stock ?? void 0,
    variants: Array.isArray(r.variants) ? r.variants : []
  };
}
async function fetchProducts(limit) {
  let query = supabase.from("products").select(
    "id, name, name_ar, category, price, original_price, image, rating, reviews, in_stock, is_new, discount, stock, variants"
  ).order("created_at", { ascending: false });
  if (limit) {
    query = query.limit(limit);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(mapProduct);
}
async function fetchProductsByCategory(category) {
  const { data, error } = await supabase.from("products").select("*").eq("category", category).order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapProduct);
}
async function fetchProductById(id) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data) : null;
}
const $$splitComponentImporter$8 = () => import("./index-fusaMvt4.js");
const Route$8 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "خسوف Kusuf — تحرّك في صمت"
    }, {
      name: "description",
      content: "Kusuf علامة تجارية تونسية لملابس الشارع، تجمع بين الجودة الفاخرة والهوية الحضرية."
    }]
  }),
  loader: async () => {
    const featured = await fetchProducts(6);
    return {
      featured
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.index-DsflB1OZ.js");
const Route$7 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./product._id-DdK6Lu6c.js");
const Route$6 = createFileRoute("/product/$id")({
  head: () => ({
    meta: [{
      title: "المنتج — Kusuf"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.users-Cwv9HgXn.js");
const Route$5 = createFileRoute("/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.products-DMPF2rYH.js");
const Route$4 = createFileRoute("/admin/products")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.orders-CkcRbG9m.js");
const Route$3 = createFileRoute("/admin/orders")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.offers-DchJD3BI.js");
const Route$2 = createFileRoute("/admin/offers")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.messages-CmOARvY4.js");
const Route$1 = createFileRoute("/admin/messages")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.login-xM0qYOyH.js");
const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{
      title: "Admin Login — Kusuf"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ShopRoute = Route$i.update({
  id: "/shop",
  path: "/shop",
  getParentRoute: () => Route$j
});
const RegisterRoute = Route$h.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$j
});
const LoginRoute = Route$g.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$j
});
const EssentialsRoute = Route$f.update({
  id: "/essentials",
  path: "/essentials",
  getParentRoute: () => Route$j
});
const DropsRoute = Route$e.update({
  id: "/drops",
  path: "/drops",
  getParentRoute: () => Route$j
});
const ContactRoute = Route$d.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$j
});
const CheckoutRoute = Route$c.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$j
});
const AdminRoute = Route$b.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$j
});
const AccountRoute = Route$a.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => Route$j
});
const AboutRoute = Route$9.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$j
});
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$j
});
const AdminIndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const ProductIdRoute = Route$6.update({
  id: "/product/$id",
  path: "/product/$id",
  getParentRoute: () => Route$j
});
const AdminUsersRoute = Route$5.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AdminRoute
});
const AdminProductsRoute = Route$4.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => AdminRoute
});
const AdminOrdersRoute = Route$3.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AdminRoute
});
const AdminOffersRoute = Route$2.update({
  id: "/offers",
  path: "/offers",
  getParentRoute: () => AdminRoute
});
const AdminMessagesRoute = Route$1.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => AdminRoute
});
const AdminLoginRoute = Route.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminLoginRoute,
  AdminMessagesRoute,
  AdminOffersRoute,
  AdminOrdersRoute,
  AdminProductsRoute,
  AdminUsersRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AccountRoute,
  AdminRoute: AdminRouteWithChildren,
  CheckoutRoute,
  ContactRoute,
  DropsRoute,
  EssentialsRoute,
  LoginRoute,
  RegisterRoute,
  ShopRoute,
  ProductIdRoute
};
const routeTree = Route$j._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  Route$8 as R,
  fetchProductsByCategory as a,
  useCart as b,
  cn as c,
  useNotifications as d,
  useTheme as e,
  fetchProducts as f,
  Route$6 as g,
  fetchProductById as h,
  router as r,
  supabase as s,
  useAuth as u
};
