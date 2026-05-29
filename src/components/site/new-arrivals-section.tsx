import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HoverSyncWrapper } from "./hover-sync-wrapper";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SafeImage } from "@/components/ui/safe-image";
import type { Product } from "@/lib/products";

interface NewArrivalsSectionProps {
  featured: Product[];
}

export const NewArrivalsSection = ({ featured }: NewArrivalsSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-background py-24 overflow-hidden transition-all duration-1000">
      <div className="max-w-[1600px] mx-auto px-6 md:px-14">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-primary pb-8 transition-all duration-1000">
          <h2 className="text-7xl md:text-[10rem] font-display leading-[0.8] uppercase tracking-tighter text-foreground transition-colors duration-1000">
            New <br /> <span className="text-primary italic">Arrivals</span>
          </h2>
          <div className="text-right space-y-4">
            <span className="text-[9px] font-bold tracking-[0.5em] text-foreground/85 uppercase transition-colors duration-1000">
              SEASONAL_RUNWAY_01
            </span>
            <p className="text-xl md:text-2xl font-light text-foreground max-w-sm transition-colors duration-1000">
              The latest evolution of Kusuf streetwear. Silent, precise, and uncompromising.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12" dir="rtl">
          <HoverSyncWrapper
            imageUrl="/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg"
            className="md:col-span-7 space-y-8 group cursor-pointer glass-card p-4 transition-all duration-1000"
            onClick={() => navigate({ to: `/product/${featured[0]?.id || ""}` })}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
              <SafeImage
                src="/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]"
                alt="Runway hero"
              />
              <div className="absolute top-0 right-0 p-8 z-20">
                <span className="bg-primary text-background px-6 py-2 text-[10px] font-bold tracking-[0.4em] transition-all duration-1000">
                  RUNWAY_L_01
                </span>
              </div>
            </div>
            <div className="flex justify-between items-baseline border-t border-glass-border pt-6 transition-all duration-1000">
              <div className="space-y-1">
                <h3 className="text-5xl font-display uppercase tracking-tight text-foreground transition-colors duration-1000">
                  {featured[0]?.nameAr || "هودي الخسوف - أسود"}
                </h3>
                <p className="text-[10px] font-bold tracking-[0.3em] text-foreground/90 uppercase transition-colors duration-1000">
                  {featured[0]?.name || "Eclipse Hoodie - Black"}
                </p>
              </div>
              <span className="text-3xl font-display text-primary transition-colors duration-1000">
                {featured[0]?.price.toFixed(2) || "145.00"} TND
              </span>
            </div>
          </HoverSyncWrapper>

          <div className="md:col-span-5 flex flex-col gap-24">
            <HoverSyncWrapper
              imageUrl="/images/598ccfa54b4780d61a0a391d7768e6ea.jpg"
              className="space-y-6 group cursor-pointer glass-card p-4 transition-all duration-1000"
              onClick={() => navigate({ to: `/product/${featured[1]?.id || ""}` })}
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-100">
                <SafeImage
                  src="/images/598ccfa54b4780d61a0a391d7768e6ea.jpg"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]"
                  alt="Runway secondary"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <span className="bg-primary text-background px-4 py-1.5 text-[9px] font-bold tracking-[0.4em] transition-all duration-1000">
                    TECH_S_02
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-right border-t border-glass-border pt-4 transition-all duration-1000">
                <h3 className="text-3xl font-display uppercase text-foreground transition-colors duration-1000">
                  {featured[1]?.nameAr || "هودي الخسوف - رملي"}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-display text-primary transition-colors duration-1000">
                    {featured[1]?.price.toFixed(2) || "145.00"} TND
                  </span>
                  <p className="text-[9px] font-bold tracking-[0.3em] text-foreground/90 uppercase transition-colors duration-1000">
                    {featured[1]?.name || "Eclipse Hoodie - Sand"}
                  </p>
                </div>
              </div>
            </HoverSyncWrapper>

            <HoverSyncWrapper
              imageUrl="/images/f812cc870d28da5055fbbb7259ae1ebb.jpg"
              className="space-y-6 group cursor-pointer glass-card p-4 transition-all duration-1000"
              onClick={() => navigate({ to: `/product/${featured[2]?.id || ""}` })}
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-100">
                <SafeImage
                  src="/images/f812cc870d28da5055fbbb7259ae1ebb.jpg"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]"
                  alt="Runway tertiary"
                />
                <div className="absolute top-0 left-0 p-6 z-20">
                  <span className="bg-primary text-background px-4 py-1.5 text-[9px] font-bold tracking-[0.4em] transition-all duration-1000">
                    CARGO_S_03
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-right border-t border-glass-border pt-4 transition-all duration-1000">
                <h3 className="text-3xl font-display uppercase text-foreground transition-colors duration-1000">
                  {featured[2]?.nameAr || "سروال كارغو حضري"}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-display text-primary transition-colors duration-1000">
                    {featured[2]?.price.toFixed(2) || "185.00"} TND
                  </span>
                  <p className="text-[9px] font-bold tracking-[0.3em] text-foreground/90 uppercase transition-colors duration-1000">
                    {featured[2]?.name || "Urban Cargo Pants"}
                  </p>
                </div>
              </div>
            </HoverSyncWrapper>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 border-t border-glass-border pt-12"
          dir="rtl"
        >
          {[
            {
              img: "/images/d81af856f671f045137f4843339c77d3.jpg",
              titleAr: "تيشيرت أساسي - رملي",
              titleEn: "Essential Tee - Sand",
              price: "65.00",
            },
            {
              img: "/images/a583c395a9133f31190311989d79caa9.jpg",
              titleAr: "قبعة الصمت - أسود",
              titleEn: "Silent Cap - Black",
              price: "45.00",
            },
            {
              img: "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
              titleAr: "تيشيرت الخسوف - أسود",
              titleEn: "Kusuf Tee - Black",
              price: "65.00",
            },
            {
              img: "/images/hero-compact.jpg",
              titleAr: "إكسسوارات الخسوف",
              titleEn: "Kusuf Essentials",
              price: "Various",
            },
          ].map((item, idx) => (
            <HoverSyncWrapper
              key={idx}
              imageUrl={item.img}
              className="space-y-4 group cursor-pointer glass-card p-4 transition-all duration-1000"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <SafeImage
                  src={item.img}
                  className="w-full h-full object-cover transition-all duration-1000"
                  alt={item.titleEn}
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-display uppercase text-foreground transition-colors duration-1000">
                  {item.titleAr}
                </h4>
                <p className="text-[8px] font-bold tracking-[0.4em] text-foreground/85 uppercase transition-colors duration-1000">
                  {item.titleEn}
                </p>
                <p className="text-lg font-display text-primary transition-colors duration-1000">
                  {item.price} TND
                </p>
              </div>
            </HoverSyncWrapper>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <Link
            to="/shop"
            className="luxury-button-square h-auto py-6 px-20 group transition-all duration-1000"
          >
            <span className="text-xs font-bold tracking-[0.6em] uppercase">
              ACCESS FULL COLLECTION
            </span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform duration-700" />
          </Link>
        </div>
      </div>
    </section>
  );
};
