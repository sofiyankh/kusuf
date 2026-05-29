import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { P as ProductCard } from "./product-card-BrPhdHdb.js";
import { c as cn } from "./router-argkJYP3.js";
function ProductGrid({ products, showFilters = false }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    let list = products;
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, sort]);
  return /* @__PURE__ */ jsxs("div", { dir: "rtl", children: [
    showFilters && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl glass border border-border", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
        { v: "all", l: "الكل" },
        { v: "essentials", l: "الأساسيات" },
        { v: "drops", l: "إصدارات" }
      ].map((opt) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCategory(opt.v),
          className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${category === opt.v ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-primary/10"}`,
          children: opt.l
        },
        opt.v
      )) }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: sort,
          onChange: (e) => setSort(e.target.value),
          className: "px-3 py-2 bg-input border border-border rounded-lg text-sm",
          children: [
            /* @__PURE__ */ jsx("option", { value: "featured", children: "مميزة" }),
            /* @__PURE__ */ jsx("option", { value: "price-asc", children: "السعر: من الأقل" }),
            /* @__PURE__ */ jsx("option", { value: "price-desc", children: "السعر: من الأعلى" }),
            /* @__PURE__ */ jsx("option", { value: "rating", children: "الأعلى تقييماً" })
          ]
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground py-12", children: "لا توجد منتجات" }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: filtered.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id)) })
  ] });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props });
}
function ProductsLoading({ count = 8 }) {
  return /* @__PURE__ */ jsx("div", { dir: "rtl", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border overflow-hidden", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full" }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/3" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
    ] })
  ] }, i)) });
}
export {
  ProductsLoading as P,
  ProductGrid as a
};
