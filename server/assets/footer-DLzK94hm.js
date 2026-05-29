import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, LogOut, ShoppingBag, X, Menu, Shirt, Zap, Instagram, Facebook, Music, MapPin, Mail, Shield } from "lucide-react";
import { b as useCart, u as useAuth } from "./router-argkJYP3.js";
import { T as ThemeToggle } from "./theme-toggle-CARAU6uN.js";
import { N as NotificationsBell } from "./notifications-bell-BYGZWSnU.js";
function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount, setCartOpen } = useCart();
  const { user, isAdmin, logout } = useAuth();
  return /* @__PURE__ */ jsx("header", { dir: "rtl", className: "homogeneous-nav transition-all duration-1000 ease-in-out", children: /* @__PURE__ */ jsxs("nav", { className: "max-w-[1800px] mx-auto px-6 md:px-14 py-1 md:py-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "group flex flex-col items-center gap-0.5", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/kusuf.png",
            alt: "Kusuf Logo",
            className: "h-10 md:h-12 w-auto object-contain transition-all duration-1000 group-hover:scale-110"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] md:text-[11px] tracking-[0.5em] font-bold uppercase text-foreground transition-colors duration-1000", children: "Kusuf" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center items-center gap-10", children: [
        { to: "/shop", label: "المنتجات" },
        { to: "/essentials", label: "الأساسيات" },
        { to: "/drops", label: "إصدارات" },
        { to: "/about", label: "قصتنا" }
      ].map((l) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: l.to,
          className: "relative py-2 text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors duration-1000 group",
          activeProps: { className: "text-foreground font-bold" },
          children: [
            l.label,
            /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 w-full h-[1.5px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" })
          ]
        },
        l.to
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-5 md:gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-6", children: [
          /* @__PURE__ */ jsx("button", { className: "text-foreground/90 hover:text-foreground transition-colors duration-1000 hover:-translate-y-0.5 transform", children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsx(NotificationsBell, {}),
          user ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/account",
                className: "p-1 text-foreground/90 hover:text-foreground transition-colors duration-1000",
                "aria-label": "Account",
                children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => logout(),
                className: "p-1 text-foreground/90 hover:text-foreground transition-colors duration-1000",
                "aria-label": "Logout",
                children: /* @__PURE__ */ jsx(LogOut, { className: "w-5 h-5" })
              }
            )
          ] }) : /* @__PURE__ */ jsx(
            Link,
            {
              to: "/login",
              className: "text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/90 hover:text-foreground transition-colors duration-1000",
              children: "دخول"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setCartOpen(true),
            className: "hidden md:block relative p-1 text-foreground/90 hover:text-foreground transition-all duration-1000 active:scale-90",
            "aria-label": "Open cart",
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5 md:w-6 md:h-6" }),
              itemCount > 0 && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute -top-1.5 -right-1.5 bg-primary text-background text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center animate-scale-in transition-colors duration-1000",
                  children: itemCount
                },
                itemCount
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setOpen(!open),
            className: "md:hidden p-1 text-foreground/90 hover:text-foreground",
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "md:hidden mt-4 glass-panel rounded-2xl border p-4 space-y-2 animate-fadeIn", children: [
      { to: "/shop", label: "المنتجات" },
      { to: "/essentials", label: "الأساسيات" },
      { to: "/drops", label: "إصدارات" },
      { to: "/about", label: "قصتنا" },
      { to: "/contact", label: "تواصل معنا" },
      ...user ? [{ to: "/account", label: "حسابي" }] : [{ to: "/login", label: "دخول" }],
      ...isAdmin ? [{ to: "/admin", label: "لوحة التحكم" }] : []
    ].map((l) => /* @__PURE__ */ jsx(
      Link,
      {
        to: l.to,
        onClick: () => setOpen(false),
        className: "block px-4 py-3 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-muted rounded-xl transition-all",
        children: l.label
      },
      l.to
    )) })
  ] }) });
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      dir: "rtl",
      className: "bg-background text-foreground py-24 md:py-32 border-t-4 border-primary overflow-hidden relative transition-all duration-1000 ease-in-out",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 backdrop-blur-[100px] opacity-30 pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-10 left-0 opacity-[0.03] select-none pointer-events-none transition-colors duration-1000", children: /* @__PURE__ */ jsx("span", { className: "text-[30vw] font-display leading-none whitespace-nowrap tracking-tighter", children: "Kusuf" }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-[1600px] mx-auto px-6 md:px-14 relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 space-y-12", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-8 flex flex-col items-start", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/images/kusuf.png",
                    alt: "Kusuf Logo",
                    className: "h-20 md:h-28 w-auto object-contain transition-all duration-1000"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-6xl md:text-7xl font-display leading-none tracking-tighter uppercase transition-colors duration-1000", children: [
                    "خسوف ",
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Kusuf" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-lg font-light leading-relaxed max-w-sm transition-colors duration-1000", children: "نحن نؤمن بأن القوة الحقيقية تكمن في الإتقان وليس في الضجيج. علامتنا هي بيان للصمت والتميز." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs font-bold tracking-[0.4em] text-foreground/90 uppercase transition-colors duration-1000", children: [
                  /* @__PURE__ */ jsx(Shirt, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsx("span", { children: "Tunisian Atelier Origin" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs font-bold tracking-[0.4em] text-foreground/90 uppercase transition-colors duration-1000", children: [
                  /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsx("span", { children: "Limited Runway Drops" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.5em] text-primary uppercase block transition-colors duration-1000", children: "— القائمة" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
                  { label: "Shop", to: "/shop", ar: "المتجر" },
                  { label: "Essentials", to: "/essentials", ar: "الأساسيات" },
                  { label: "Drops", to: "/drops", ar: "الإصدارات" },
                  { label: "About", to: "/about", ar: "قصتنا" }
                ].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: link.to,
                    className: "text-xl md:text-2xl font-display text-foreground/80 hover:text-primary transition-colors duration-1000 uppercase tracking-tight",
                    children: link.ar
                  }
                ) }, link.label)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.5em] text-primary uppercase block transition-colors duration-1000", children: "— مساعدة" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: ["Contact", "Shipping", "Returns"].map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/contact",
                    className: "text-xl md:text-2xl font-display text-foreground/80 hover:text-primary transition-colors duration-1000 uppercase tracking-tight",
                    children: link === "Contact" ? "تواصل معنا" : link === "Shipping" ? "الشحن" : "الاسترجاع"
                  }
                ) }, link)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-8 col-span-2 md:col-span-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.5em] text-primary uppercase block transition-colors duration-1000", children: "— تواصل" }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "#",
                      className: "group flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors duration-1000",
                      children: [
                        /* @__PURE__ */ jsx(Instagram, { className: "w-5 h-5 group-hover:text-primary transition-colors duration-1000" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.3em] uppercase", children: "Instagram" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "#",
                      className: "group flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors duration-1000",
                      children: [
                        /* @__PURE__ */ jsx(Facebook, { className: "w-5 h-5 group-hover:text-primary transition-colors duration-1000" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.3em] uppercase", children: "Facebook" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: "#",
                      className: "group flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors duration-1000",
                      children: [
                        /* @__PURE__ */ jsx(Music, { className: "w-5 h-5 group-hover:text-primary transition-colors duration-1000" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.3em] uppercase", children: "TikTok" })
                      ]
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 space-y-12", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-8 border border-glass-border bg-surface backdrop-blur-xl transition-all duration-1000", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-[0.5em] text-primary uppercase block mb-6 transition-colors duration-1000", children: "HQ_LOCATION" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-foreground/80 transition-colors duration-1000", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-primary shrink-0 transition-colors duration-1000" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm font-light leading-relaxed", children: [
                      "Kusuf ATELIER,",
                      /* @__PURE__ */ jsx("br", {}),
                      "TUNISIA DISTRICT 01"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                    /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-primary shrink-0 transition-colors duration-1000" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-light", children: "HELLO@Kusuf.TN" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-4 py-3 bg-primary/10 border border-primary/20 transition-all duration-1000", children: [
                /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 text-primary transition-colors duration-1000" }),
                /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-[0.4em] text-primary uppercase transition-colors duration-1000", children: "Secure Checkout Verified" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-12 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-8 transition-colors duration-1000", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8 text-[10px] font-bold tracking-[0.4em] text-foreground/80 uppercase transition-colors duration-1000", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "© ",
                currentYear,
                " Kusuf ATELIER"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-foreground/10 hidden md:block" }),
              /* @__PURE__ */ jsx("span", { children: "Move in Silence." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-12", children: ["Privacy", "Terms", "Cookies"].map((item) => /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                className: "text-[10px] font-bold tracking-[0.4em] text-foreground/80 hover:text-foreground uppercase transition-colors duration-1000",
                children: item
              },
              item
            )) })
          ] })
        ] })
      ]
    }
  );
}
export {
  Footer as F,
  Header as H
};
