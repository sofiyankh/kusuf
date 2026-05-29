import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Shirt } from "lucide-react";
import { H as Header, F as Footer } from "./footer-DLzK94hm.js";
import { P as ProductsLoading, a as ProductGrid } from "./products-loading-EhnwkuvO.js";
import { H as HoverSyncWrapper } from "./hover-sync-wrapper-F39nYR2h.js";
import { a as fetchProductsByCategory } from "./router-argkJYP3.js";
import "@tanstack/react-router";
import "./theme-toggle-CARAU6uN.js";
import "./notifications-bell-BYGZWSnU.js";
import "@radix-ui/react-popover";
import "./product-card-BrPhdHdb.js";
import "sonner";
import "./use-color-sync-3KHhHXEH.js";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
function EssentialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroImg = "/images/hero-compact.jpg";
  useEffect(() => {
    fetchProductsByCategory("essentials").then(setItems).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxs("div", { dir: "rtl", className: "min-h-screen flex flex-col bg-background transition-all duration-1000", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 pt-[100px] md:pt-[120px]", children: [
      /* @__PURE__ */ jsxs("section", { className: "reveal relative py-16 md:py-20 overflow-hidden border-b border-glass-border", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 liquid-glass opacity-30 pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-primary transition-all duration-1000" }),
              /* @__PURE__ */ jsx("span", { className: "text-primary font-bold uppercase tracking-[0.5em] text-[9px] transition-colors", children: "CORE SERIES" })
            ] }),
            /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-[7rem] font-display uppercase leading-tight tracking-tighter", children: [
              "The ",
              /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Essentials" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-base text-foreground/80 font-light leading-relaxed max-w-md mr-0 ml-auto", children: "قطع خالدة مصممة لتدوم، مصنوعة من أجود أنواع القطن التونسي الفاخر." })
          ] }),
          /* @__PURE__ */ jsx(HoverSyncWrapper, { imageUrl: heroImg, className: "h-80 rounded-container overflow-hidden shadow-2xl glass-card p-2", children: /* @__PURE__ */ jsx("img", { src: heroImg, alt: "Essentials", className: "w-full h-full object-cover hover:scale-105 transition-transform duration-1000", onError: (e) => {
            e.currentTarget.style.display = "none";
          } }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "reveal py-16 bg-transparent", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 mb-10", children: [
          /* @__PURE__ */ jsx(Shirt, { className: "w-6 h-6 text-primary" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-display uppercase tracking-tight", children: "مجموعتنا" }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-glass-border" })
        ] }),
        loading ? /* @__PURE__ */ jsx(ProductsLoading, {}) : /* @__PURE__ */ jsx(ProductGrid, { products: items })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  EssentialsPage as component
};
