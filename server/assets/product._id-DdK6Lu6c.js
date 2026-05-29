import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Star, Minus, Plus, Check, ShoppingBag, Heart } from "lucide-react";
import { H as Header, F as Footer } from "./footer-DLzK94hm.js";
import { P as ProductCard } from "./product-card-BrPhdHdb.js";
import { g as Route, b as useCart, u as useAuth, h as fetchProductById, a as fetchProductsByCategory, s as supabase, B as Button } from "./router-argkJYP3.js";
import { toast } from "sonner";
import { H as HoverSyncWrapper } from "./hover-sync-wrapper-F39nYR2h.js";
import "./theme-toggle-CARAU6uN.js";
import "./notifications-bell-BYGZWSnU.js";
import "@radix-ui/react-popover";
import "./use-color-sync-3KHhHXEH.js";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
function ProductPage() {
  const {
    id
  } = Route.useParams();
  const {
    addToCart
  } = useCart();
  const {
    user
  } = useAuth();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [imageVariant, setImageVariant] = useState("model");
  const [selectedVariant, setSelectedVariant] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetchProductById(id).then(async (p) => {
      setProduct(p);
      if (p) {
        const others = await fetchProductsByCategory(p.category);
        setRelated(others.filter((x) => x.id !== p.id).slice(0, 4));
        if (p.variants?.length > 0) {
          setSelectedVariant(p.variants[0].id);
        }
      }
    }).finally(() => setLoading(false));
  }, [id]);
  useEffect(() => {
    if (!user || !product) return;
    supabase.from("wishlists").select("id").eq("user_id", user.id).eq("product_id", product.id).maybeSingle().then(({
      data
    }) => setWishlist(!!data));
  }, [user, product]);
  const handleAdd = () => {
    if (!product) return;
    const variant = product.variants?.find((v) => v.id === selectedVariant);
    addToCart({
      id: product.id,
      variantId: selectedVariant || void 0,
      name: product.nameAr,
      price: variant?.price || product.price,
      quantity,
      image: product.image,
      stock: variant?.stock ?? product.stock ?? (product.inStock ? 999 : 0),
      selectedSize: variant?.size,
      selectedColor: variant?.color
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2e3);
  };
  const toggleWish = async () => {
    if (!user || !product) {
      toast.info("سجل الدخول لحفظ المنتج في المفضلة");
      return;
    }
    if (wishlist) {
      await supabase.from("wishlists").delete().eq("user_id", user.id).eq("product_id", product.id);
      setWishlist(false);
    } else {
      const {
        error
      } = await supabase.from("wishlists").insert({
        user_id: user.id,
        product_id: product.id
      });
      if (error) return toast.error(error.message);
      setWishlist(true);
      toast.success("أضيف إلى المفضلة");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-primary border-t-transparent animate-spin" }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxs("div", { dir: "rtl", className: "h-screen flex flex-col bg-background transition-colors duration-1000", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-serif text-foreground transition-colors duration-1000", children: "المنتج غير موجود" }),
        /* @__PURE__ */ jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsx(Button, { className: "luxury-button-square", children: "العودة إلى المتجر" }) })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { dir: "ltr", className: "min-h-screen w-full bg-background transition-all duration-1000 text-foreground", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "pt-[120px] md:pt-[140px]", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] md:h-[90vh] overflow-hidden px-4 sm:px-8 md:px-14 flex flex-col md:flex-row gap-8 md:gap-12 max-w-[1600px] mx-auto transition-all duration-1000 pb-10 md:pb-0", children: [
        /* @__PURE__ */ jsxs(HoverSyncWrapper, { imageUrl: product.image, className: "relative flex-1 w-full h-[60vh] md:h-full flex items-center justify-center perspective-[2000px]", children: [
          /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "absolute inset-0 -z-10 bg-cover bg-center scale-150 opacity-10 blur-[100px] transition-all duration-1000", style: {
            backgroundImage: `url(${product.image})`
          } }),
          /* @__PURE__ */ jsx("div", { className: "transition-all duration-1000 ease-[var(--return-easing)] relative z-10", style: {
            transform: "translateZ(100px) scale(1.1)"
          }, children: /* @__PURE__ */ jsx("img", { src: imageVariant === "model" ? product.image : "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg", alt: product.nameAr, className: "h-[42vh] md:h-[60vh] object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.2)] select-none animate-fadeIn transition-all duration-1000", onError: (e) => {
            e.currentTarget.src = product.image;
          } }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 md:gap-4 z-40", children: [
            /* @__PURE__ */ jsx("button", { onClick: (e) => {
              e.stopPropagation();
              setImageVariant("model");
            }, className: `px-6 md:px-10 py-2.5 md:py-3 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-bold uppercase transition-all border backdrop-blur-xl ${imageVariant === "model" ? "bg-primary text-background border-primary" : "bg-glass-bg text-foreground border-glass-border"}`, children: "MODEL" }),
            /* @__PURE__ */ jsx("button", { onClick: (e) => {
              e.stopPropagation();
              setImageVariant("detail");
            }, className: `px-6 md:px-10 py-2.5 md:py-3 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-bold uppercase transition-all border backdrop-blur-xl ${imageVariant === "detail" ? "bg-primary text-background border-primary" : "bg-glass-bg text-foreground border-glass-border"}`, children: "DETAIL" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute bottom-12 left-0 z-20 transition-colors duration-1000", children: /* @__PURE__ */ jsx("div", { className: "text-[6vw] font-display font-bold tracking-[0.2em] uppercase opacity-[0.05] select-none leading-none", children: "Kusuf RUNWAY" }) })
        ] }),
        /* @__PURE__ */ jsx("aside", { className: "w-full md:w-[450px] flex flex-col p-6 sm:p-8 md:p-14 liquid-glass relative z-30 transition-all duration-1000", dir: "rtl", children: /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary font-bold uppercase tracking-[0.4em] text-[10px] transition-colors", children: "Kusuf ATELIER" }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: `w-3 h-3 transition-colors ${i < Math.round(product.rating) ? "fill-primary text-primary" : "fill-foreground/10 text-foreground/90"}` }, i)) })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-display leading-none uppercase tracking-tighter transition-colors", children: product.nameAr }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4 pt-2 transition-colors", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-3xl font-display text-primary", children: [
                product.price.toFixed(2),
                " TND"
              ] }),
              product.originalPrice && /* @__PURE__ */ jsxs("span", { className: "text-xl font-display text-foreground/80 line-through", children: [
                product.originalPrice.toFixed(2),
                " TND"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-lg font-light leading-relaxed transition-colors", children: product.descriptionAr }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: product.ingredients.map((ing) => /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 border border-glass-border bg-glass-bg text-[10px] font-bold tracking-widest text-foreground/80 uppercase transition-all", children: ing }, ing)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8 py-10 border-t border-glass-border transition-colors", children: [
            product.variants && product.variants.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/90 transition-colors", children: [
                /* @__PURE__ */ jsx("span", { children: product.variants[0].size ? "المقاس" : "الخيار" }),
                /* @__PURE__ */ jsx("span", { className: "text-primary cursor-pointer border-b border-primary/10", children: "SIZE_GUIDE" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: product.variants.map((v) => /* @__PURE__ */ jsx("button", { onClick: () => setSelectedVariant(v.id), disabled: v.stock <= 0, className: `min-w-14 h-14 px-4 border transition-all duration-500 disabled:opacity-10 disabled:cursor-not-allowed text-xs font-bold ${selectedVariant === v.id ? "bg-primary text-background border-primary scale-105 shadow-lg" : "bg-glass-bg text-foreground border-glass-border hover:border-primary/50"}`, children: v.size || v.color || "ONE SIZE" }, v.id)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-glass-border bg-glass-bg px-2 transition-all", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => setQuantity(Math.max(1, quantity - 1)), className: "p-3 hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsx("span", { className: "w-8 text-center font-display text-lg text-foreground", children: quantity }),
                /* @__PURE__ */ jsx("button", { onClick: () => setQuantity(quantity + 1), className: "p-3 hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }) })
              ] }),
              /* @__PURE__ */ jsxs("button", { onClick: handleAdd, className: "flex-1 luxury-button-square h-auto py-5", children: [
                added ? /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ShoppingBag, { className: "w-5 h-5" }),
                added ? "ADDED" : "ADD_TO_BAG"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: toggleWish, className: "w-full py-4 border border-glass-border bg-glass-bg flex items-center justify-center gap-4 font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-primary hover:text-background transition-all", children: [
              /* @__PURE__ */ jsx(Heart, { className: `w-4 h-4 transition-colors ${wishlist ? "fill-current" : ""}` }),
              "ADD_TO_WISHLIST"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "bg-transparent py-32 border-t border-glass-border transition-all duration-1000", dir: "rtl", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1600px] mx-auto px-6 md:px-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-24 border-b border-foreground/10 pb-8 transition-colors", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary font-bold uppercase tracking-[0.5em] text-[10px] block mb-4", children: "— VERIFIED TESTIMONIES" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-[10rem] font-display text-foreground uppercase tracking-tighter transition-colors", children: [
            "What they ",
            /* @__PURE__ */ jsx("span", { className: "italic text-primary", children: "Say" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12", children: [...Array(3)].map((_, idx) => /* @__PURE__ */ jsxs("div", { className: "space-y-8 p-12 liquid-glass group hover:border-primary transition-all duration-700", children: [
          /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [...Array(5)].map((_2, i) => /* @__PURE__ */ jsx(Star, { className: "w-3 h-3 fill-primary text-primary transition-colors" }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-light text-foreground/80 leading-relaxed italic transition-colors", children: '"جودة القطن استثنائية، القصة واسعة ومريحة جداً. فعلاً قطعة تستحق الاقتناء."' }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-t border-glass-border pt-8 transition-colors", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold tracking-[0.4em] text-foreground/85 uppercase", children: [
              "CLIENT_ID_00",
              idx + 1
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-[0.2em] text-primary uppercase", children: "Verified Purchase" })
          ] })
        ] }, idx)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-transparent py-32 border-y border-glass-border transition-all duration-1000", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1600px] mx-auto px-6 md:px-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-16 border-b border-foreground/10 pb-8 transition-colors", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-6xl md:text-[10rem] font-display uppercase tracking-tighter text-foreground transition-colors", children: [
            "Related ",
            /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Pieces" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/shop", className: "text-[10px] font-bold tracking-[0.4em] text-foreground/90 hover:text-primary transition-colors uppercase mb-2", children: "View Collection" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: related.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ProductPage as component
};
