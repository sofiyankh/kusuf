import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import ProductGrid from "@/components/site/product-grid";
import ProductsLoading from "@/components/site/products-loading";
import { HoverSyncWrapper } from "@/components/site/hover-sync-wrapper";
import { fetchProductsByCategory, type Product } from "@/lib/products";

export const Route = createFileRoute("/drops")({
  head: () => ({
    meta: [
      { title: "إصدارات — Kusuf" },
      { name: "description", content: "إصدارات حصرية ومحدودة من ملابس الشارع التونسية." },
    ],
  }),
  component: DropsPage,
});

function DropsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const heroImg = "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg";

  useEffect(() => {
    fetchProductsByCategory("drops")
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col bg-background transition-all duration-1000"
    >
      <Header />
      <main className="flex-1 pt-[100px] md:pt-[120px]">
        <section className="reveal relative py-16 md:py-20 overflow-hidden border-b border-glass-border">
          <div className="absolute inset-0 liquid-glass opacity-30 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6 text-right">
              <div className="inline-flex items-center gap-4">
                <div className="w-8 h-[1px] bg-primary transition-all duration-1000"></div>
                <span className="text-primary font-bold uppercase tracking-[0.5em] text-[9px] transition-colors">
                  LIMITED RELEASES
                </span>
              </div>
              <h1 className="text-5xl md:text-[7rem] font-display uppercase leading-tight tracking-tighter">
                Seasonal <span className="text-primary italic">Drops</span>
              </h1>
              <p className="text-base text-foreground/80 font-light leading-relaxed max-w-md mr-0 ml-auto">
                تحرّك في صمت. قطع محدودة الإصدار تعبر عن الهوية الحضرية التونسية. إصدارات نادرة لا
                تتكرر.
              </p>
            </div>
            <HoverSyncWrapper
              imageUrl={heroImg}
              className="h-80 rounded-container overflow-hidden shadow-2xl glass-card p-2"
            >
              <img
                src={heroImg}
                alt="Drops"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </HoverSyncWrapper>
          </div>
        </section>
        <section className="reveal py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 mb-10">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-display uppercase tracking-tight">الإصدارات الحالية</h2>
              <div className="h-px flex-1 bg-glass-border" />
            </div>
            {loading ? <ProductsLoading /> : <ProductGrid products={items} />}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
