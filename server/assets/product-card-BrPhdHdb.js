import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Heart, Star } from "lucide-react";
import { b as useCart, u as useAuth, s as supabase, B as Button } from "./router-argkJYP3.js";
import { toast } from "sonner";
import { u as useColorSync } from "./use-color-sync-3KHhHXEH.js";
function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();
  useColorSync(product.image, isHovered);
  useEffect(() => {
    if (!user) return;
    supabase.from("wishlists").select("id").eq("user_id", user.id).eq("product_id", product.id).maybeSingle().then(({ data }) => setWishlisted(!!data));
  }, [user, product.id]);
  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.nameAr || product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock
    });
  };
  const toggleWish = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info("سجل الدخول لحفظ المنتجات في المفضلة");
      return;
    }
    if (wishlisted) {
      await supabase.from("wishlists").delete().eq("user_id", user.id).eq("product_id", product.id);
      setWishlisted(false);
      toast("أزيل من المفضلة");
    } else {
      const { error } = await supabase.from("wishlists").insert({ user_id: user.id, product_id: product.id });
      if (error) return toast.error(error.message);
      setWishlisted(true);
      toast.success("أضيف إلى المفضلة");
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group relative flex flex-col liquid-glass hover:border-primary transition-all duration-700 overflow-hidden",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/product/$id",
            params: { id: product.id },
            className: "relative aspect-[3/4] overflow-hidden",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: product.image,
                  alt: product.name,
                  loading: "lazy",
                  className: "w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 z-20", children: /* @__PURE__ */ jsx("span", { className: "bg-primary text-background px-3 py-1 text-[8px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000", children: product.category === "essentials" ? "ESS" : "DRP" }) }),
              product.isNew && /* @__PURE__ */ jsx("span", { className: "absolute top-4 left-0 bg-primary text-background text-[9px] tracking-[0.3em] font-bold px-3 py-1 uppercase z-20 transition-colors duration-1000", children: "NEW" }),
              product.discount && /* @__PURE__ */ jsxs("span", { className: "absolute top-12 left-0 bg-glass-bg backdrop-blur-md text-foreground text-[9px] font-bold px-3 py-1 border-r border-primary z-20 transition-colors duration-1000", children: [
                "-",
                product.discount,
                "%"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute inset-x-0 bottom-0 p-4 pr-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30 pointer-events-none", children: /* @__PURE__ */ jsxs(
                Button,
                {
                  onClick: handleAdd,
                  className: "w-full luxury-button-square h-12 pointer-events-auto",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                    " QUICK ADD"
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleWish,
            "aria-label": "Toggle wishlist",
            className: "absolute top-4 left-4 p-2.5 bg-glass-bg backdrop-blur-md text-foreground hover:bg-primary hover:text-background transition-all duration-300 z-40 border border-glass-border",
            children: /* @__PURE__ */ jsx(Heart, { className: `w-4 h-4 ${wishlisted ? "fill-current" : ""}` })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "p-5 md:p-6 flex flex-col gap-3 relative z-20", dir: "rtl", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl md:text-3xl tracking-tight leading-none group-hover:text-primary transition-colors", children: product.nameAr }),
            /* @__PURE__ */ jsx("p", { className: "text-[9px] text-foreground/90 font-bold tracking-[0.2em] uppercase transition-colors", children: product.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[9px] font-bold tracking-[0.2em] uppercase text-foreground/70", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                Star,
                {
                  className: `w-3 h-3 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "fill-foreground/10 text-foreground/30"}`
                },
                i
              )),
              /* @__PURE__ */ jsxs("span", { className: "ml-1", children: [
                "(",
                product.reviews,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: product.inStock ? "text-primary" : "text-destructive", children: product.inStock ? "IN STOCK" : "SOLD OUT" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-3 pt-2 border-t border-glass-border transition-colors", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-3", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-display text-2xl text-foreground transition-colors", children: [
                product.price.toFixed(2),
                " TND"
              ] }),
              product.originalPrice && /* @__PURE__ */ jsxs("span", { className: "font-display text-base text-foreground/80 line-through transition-colors", children: [
                product.originalPrice.toFixed(2),
                " TND"
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleAdd,
                "aria-label": "Add to cart",
                className: "md:hidden p-2 bg-primary text-background hover:opacity-90 transition-all",
                children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
