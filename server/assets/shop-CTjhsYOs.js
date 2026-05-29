import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { H as Header, F as Footer } from "./footer-DLzK94hm.js";
import { P as ProductsLoading, a as ProductGrid } from "./products-loading-EhnwkuvO.js";
import { f as fetchProducts } from "./router-argkJYP3.js";
import "@tanstack/react-router";
import "lucide-react";
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
function ShopPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts().then(setItems).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 pt-[100px] md:pt-[120px]", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative w-full overflow-hidden border-b border-glass-border bg-surface", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,215,0,0.02),transparent_50%)] pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-[8%] w-px bg-white/[0.03]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-[8%] w-px bg-white/[0.03]" }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-[1600px] mx-auto px-6 md:px-14 py-12 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between gap-12 md:gap-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-px bg-primary/80" }),
              /* @__PURE__ */ jsx("span", { className: "text-primary font-mono text-[10px] md:text-[11px] font-bold tracking-[0.45em] uppercase", children: "KUSUF ATELIER — VOL. 01" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "border-l-2 border-primary/30 pl-5 text-sm md:text-base leading-relaxed text-foreground/70 max-w-md", children: "Discover our complete range of Tunisian luxury streetwear. Every piece is crafted in silence, made to move." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 md:gap-6 text-[10px] font-mono tracking-[0.25em] uppercase text-foreground/50 pt-2", children: [
              /* @__PURE__ */ jsx("span", { children: "EST. 2026" }),
              /* @__PURE__ */ jsx("span", { children: "—" }),
              /* @__PURE__ */ jsx("span", { children: "ALL_ENTRIES" }),
              /* @__PURE__ */ jsx("span", { children: "—" }),
              /* @__PURE__ */ jsx("span", { children: "LIMITED DROP" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:w-1/2 text-left md:text-right", children: /* @__PURE__ */ jsxs("h1", { className: "font-display uppercase tracking-tighter leading-[0.88] text-5xl md:text-7xl lg:text-8xl", children: [
            "Runway ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "italic text-primary", children: "Collection" })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-14 md:py-20 bg-transparent", children: /* @__PURE__ */ jsx("div", { className: "max-w-[1600px] mx-auto px-6 md:px-14", children: loading ? /* @__PURE__ */ jsx(ProductsLoading, {}) : /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-5", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-foreground/70", children: [
            "SHOWING ",
            items.length,
            " RESULTS"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
            /* @__PURE__ */ jsxs("button", { className: "group flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-foreground/70 transition-colors duration-300 hover:text-primary", children: [
              "Filter",
              /* @__PURE__ */ jsx("span", { className: "h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "group flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-foreground/70 transition-colors duration-300 hover:text-primary", children: [
              "Sort By",
              /* @__PURE__ */ jsx("span", { className: "h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ProductGrid, { products: items })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ShopPage as component
};
