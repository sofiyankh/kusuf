import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, ShoppingBag, Minus, Plus, Check, Star } from "lucide-react";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import ProductCard from "@/components/site/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { HoverSyncWrapper } from "@/components/site/hover-sync-wrapper";
import { fetchProductById, fetchProductsByCategory, type Product } from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  head: () => ({ meta: [{ title: "المنتج — Kusuf" }] }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [imageVariant, setImageVariant] = useState<"model" | "detail">("model");
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(async (p) => {
        setProduct(p);
        if (p) {
          const others = await fetchProductsByCategory(p.category);
          setRelated(others.filter((x) => x.id !== p.id).slice(0, 4));
          if (p.variants?.length > 0) {
            setSelectedVariant(p.variants[0].id);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user || !product) return;
    supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle()
      .then(({ data }) => setWishlist(!!data));
  }, [user, product]);

  const handleAdd = () => {
    if (!product) return;
    const variant = product.variants?.find((v) => v.id === selectedVariant);

    addToCart({
      id: product.id,
      variantId: selectedVariant || undefined,
      name: product.nameAr,
      price: variant?.price || product.price,
      quantity,
      image: product.image,
      stock: variant?.stock ?? product.stock ?? (product.inStock ? 999 : 0),
      selectedSize: variant?.size,
      selectedColor: variant?.color,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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
      const { error } = await supabase
        .from("wishlists")
        .insert({ user_id: user.id, product_id: product.id });
      if (error) return toast.error(error.message);
      setWishlist(true);
      toast.success("أضيف إلى المفضلة");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div
        dir="rtl"
        className="h-screen flex flex-col bg-background transition-colors duration-1000"
      >
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-serif text-foreground transition-colors duration-1000">
              المنتج غير موجود
            </h1>
            <Link to="/shop">
              <Button className="luxury-button-square">العودة إلى المتجر</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="min-h-screen w-full bg-background transition-all duration-1000 text-foreground"
    >
      <Header />

      <main className="pt-[120px] md:pt-[140px]">
        {/* Radical Centered Visual Section */}
        <section className="relative min-h-[90vh] md:h-[90vh] overflow-hidden px-4 sm:px-8 md:px-14 flex flex-col md:flex-row gap-8 md:gap-12 max-w-[1600px] mx-auto transition-all duration-1000 pb-10 md:pb-0">
          <HoverSyncWrapper
            imageUrl={product.image}
            className="relative flex-1 w-full h-[60vh] md:h-full flex items-center justify-center perspective-[2000px]"
          >
            {/* Liquid Background Backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-cover bg-center scale-150 opacity-10 blur-[100px] transition-all duration-1000"
              style={{ backgroundImage: `url(${product.image})` }}
            />

            <div
              className="transition-all duration-1000 ease-[var(--return-easing)] relative z-10"
              style={{ transform: "translateZ(100px) scale(1.1)" }}
            >
              <img
                src={
                  imageVariant === "model"
                    ? product.image
                    : "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg"
                }
                alt={product.nameAr}
                className="h-[42vh] md:h-[60vh] object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.2)] select-none animate-fadeIn transition-all duration-1000"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = product.image;
                }}
              />
            </div>

            {/* Image Toggle (Glass Primitives) */}
            <div className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 md:gap-4 z-40">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageVariant("model");
                }}
                className={`px-6 md:px-10 py-2.5 md:py-3 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-bold uppercase transition-all border backdrop-blur-xl ${imageVariant === "model" ? "bg-primary text-background border-primary" : "bg-glass-bg text-foreground border-glass-border"}`}
              >
                MODEL
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImageVariant("detail");
                }}
                className={`px-6 md:px-10 py-2.5 md:py-3 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-bold uppercase transition-all border backdrop-blur-xl ${imageVariant === "detail" ? "bg-primary text-background border-primary" : "bg-glass-bg text-foreground border-glass-border"}`}
              >
                DETAIL
              </button>
            </div>

            {/* Branding Watermark — hidden on mobile to reduce clutter */}
            <div className="hidden md:block absolute bottom-12 left-0 z-20 transition-colors duration-1000">
              <div className="text-[6vw] font-display font-bold tracking-[0.2em] uppercase opacity-[0.05] select-none leading-none">
                Kusuf RUNWAY
              </div>
            </div>
          </HoverSyncWrapper>

          {/* Technical Glass Sidebar */}
          <aside
            className="w-full md:w-[450px] flex flex-col p-6 sm:p-8 md:p-14 liquid-glass relative z-30 transition-all duration-1000"
            dir="rtl"
          >
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] transition-colors">
                    Kusuf ATELIER
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 transition-colors ${i < Math.round(product.rating) ? "fill-primary text-primary" : "fill-foreground/10 text-foreground/90"}`}
                      />
                    ))}
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-display leading-none uppercase tracking-tighter transition-colors">
                  {product.nameAr}
                </h1>
                <div className="flex items-baseline gap-4 pt-2 transition-colors">
                  <span className="text-3xl font-display text-primary">
                    {product.price.toFixed(2)} TND
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl font-display text-foreground/80 line-through">
                      {product.originalPrice.toFixed(2)} TND
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-foreground/80 text-lg font-light leading-relaxed transition-colors">
                  {product.descriptionAr}
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-4 py-1.5 border border-glass-border bg-glass-bg text-[10px] font-bold tracking-widest text-foreground/80 uppercase transition-all"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-8 py-10 border-t border-glass-border transition-colors">
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/90 transition-colors">
                      <span>{product.variants[0].size ? "المقاس" : "الخيار"}</span>
                      <span className="text-primary cursor-pointer border-b border-primary/10">
                        SIZE_GUIDE
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v.id)}
                          disabled={v.stock <= 0}
                          className={`min-w-14 h-14 px-4 border transition-all duration-500 disabled:opacity-10 disabled:cursor-not-allowed text-xs font-bold ${
                            selectedVariant === v.id
                              ? "bg-primary text-background border-primary scale-105 shadow-lg"
                              : "bg-glass-bg text-foreground border-glass-border hover:border-primary/50"
                          }`}
                        >
                          {v.size || v.color || "ONE SIZE"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="flex items-center border border-glass-border bg-glass-bg px-2 transition-all">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:text-primary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-display text-lg text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:text-primary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={handleAdd} className="flex-1 luxury-button-square h-auto py-5">
                    {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                    {added ? "ADDED" : "ADD_TO_BAG"}
                  </button>
                </div>

                <button
                  onClick={toggleWish}
                  className="w-full py-4 border border-glass-border bg-glass-bg flex items-center justify-center gap-4 font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-primary hover:text-background transition-all"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${wishlist ? "fill-current" : ""}`}
                  />
                  ADD_TO_WISHLIST
                </button>
              </div>
            </div>
          </aside>
        </section>

        {/* Testimonies Section (Liquid Contrast) */}
        <section
          className="bg-transparent py-32 border-t border-glass-border transition-all duration-1000"
          dir="rtl"
        >
          <div className="max-w-[1600px] mx-auto px-6 md:px-14">
            <div className="mb-24 border-b border-foreground/10 pb-8 transition-colors">
              <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px] block mb-4">
                — VERIFIED TESTIMONIES
              </span>
              <h2 className="text-5xl md:text-[10rem] font-display text-foreground uppercase tracking-tighter transition-colors">
                What they <span className="italic text-primary">Say</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="space-y-8 p-12 liquid-glass group hover:border-primary transition-all duration-700"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-primary text-primary transition-colors"
                      />
                    ))}
                  </div>
                  <p className="text-2xl font-light text-foreground/80 leading-relaxed italic transition-colors">
                    "جودة القطن استثنائية، القصة واسعة ومريحة جداً. فعلاً قطعة تستحق الاقتناء."
                  </p>
                  <div className="flex justify-between items-center border-t border-glass-border pt-8 transition-colors">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-foreground/85 uppercase">
                      CLIENT_ID_00{idx + 1}
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-primary uppercase">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products (Total Sync) */}
        <section className="bg-transparent py-32 border-y border-glass-border transition-all duration-1000">
          <div className="max-w-[1600px] mx-auto px-6 md:px-14">
            <div className="flex justify-between items-end mb-16 border-b border-foreground/10 pb-8 transition-colors">
              <h2 className="text-6xl md:text-[10rem] font-display uppercase tracking-tighter text-foreground transition-colors">
                Related <span className="text-primary italic">Pieces</span>
              </h2>
              <Link
                to="/shop"
                className="text-[10px] font-bold tracking-[0.4em] text-foreground/90 hover:text-primary transition-colors uppercase mb-2"
              >
                View Collection
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
