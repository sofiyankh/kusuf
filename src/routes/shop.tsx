import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import ProductGrid from "@/components/site/product-grid";
import ProductsLoading from "@/components/site/products-loading";
import { fetchProducts, type Product } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Kusuf — All Products | Move in Silence" },
      {
        name: "description",
        content:
          "Explore the full collection of Tunisian luxury streetwear. Every piece manifests the 'Move in Silence' philosophy.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 pt-[100px] md:pt-[120px]">
        {/* Hero Section — reversed columns: left content, right title */}
        <section className="relative w-full overflow-hidden border-b border-glass-border bg-surface">
          {/* Ambient texture (same as AtelierSection) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,215,0,0.02),transparent_50%)] pointer-events-none" />

          {/* Subtle vertical lines for luxury accent */}
          <div className="absolute inset-y-0 left-[8%] w-px bg-white/[0.03]" />
          <div className="absolute inset-y-0 right-[8%] w-px bg-white/[0.03]" />

          <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-14 py-12 md:py-20">
            {/* Two‑column layout — reversed */}
            <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16">
              {/* Left column: supporting content (label, description, meta) */}
              <div className="md:w-1/2 space-y-6">
                {/* Label with line */}
                <div className="inline-flex items-center gap-4">
                  <div className="w-10 h-px bg-primary/80" />
                  <span className="text-primary font-mono text-[10px] md:text-[11px] font-bold tracking-[0.45em] uppercase">
                    KUSUF ATELIER — VOL. 01
                  </span>
                </div>

                {/* Description with left border accent */}
                <p className="border-l-2 border-primary/30 pl-5 text-sm md:text-base leading-relaxed text-foreground/70 max-w-md">
                  Discover our complete range of Tunisian luxury streetwear. Every piece is crafted
                  in silence, made to move.
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 md:gap-6 text-[10px] font-mono tracking-[0.25em] uppercase text-foreground/50 pt-2">
                  <span>EST. 2026</span>
                  <span>—</span>
                  <span>ALL_ENTRIES</span>
                  <span>—</span>
                  <span>LIMITED DROP</span>
                </div>
              </div>

              {/* Right column: Title */}
              <div className="md:w-1/2 text-left md:text-right">
                <h1 className="font-display uppercase tracking-tighter leading-[0.88] text-5xl md:text-7xl lg:text-8xl">
                  Runway <br />
                  <span className="italic text-primary">Collection</span>
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-14 md:py-20 bg-transparent">
          <div className="max-w-[1600px] mx-auto px-6 md:px-14">
            {loading ? (
              <ProductsLoading />
            ) : (
              <div className="space-y-10">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-glass-border pb-5">
                  <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-foreground/70">
                    SHOWING {items.length} RESULTS
                  </span>

                  <div className="flex items-center gap-8">
                    <button className="group flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-foreground/70 transition-colors duration-300 hover:text-primary">
                      Filter
                      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    </button>

                    <button className="group flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-foreground/70 transition-colors duration-300 hover:text-primary">
                      Sort By
                      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    </button>
                  </div>
                </div>

                {/* Product Grid */}
                <ProductGrid products={items} />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
