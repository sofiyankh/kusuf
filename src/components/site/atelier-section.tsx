import { HoverSyncWrapper } from "./hover-sync-wrapper";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SafeImage } from "@/components/ui/safe-image";

export const AtelierSection = () => {
  return (
    <section className="reveal relative w-full bg-background py-24 md:py-32 overflow-hidden transition-colors duration-1000">
      {/* Subtle background pattern – adds texture without distraction */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,215,0,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Composition – now fully responsive with better mobile detail */}
          <HoverSyncWrapper
            imageUrl="/images/598ccfa54b4780d61a0a391d7768e6ea.jpg"
            className="relative w-full lg:w-1/2 aspect-[4/3] group order-2 lg:order-1"
          >
            {/* Overlapping Detail Image – visible on mobile too (scaled & repositioned) */}
            <div className="absolute -top-6 -right-4 md:-top-14 md:-right-12 w-1/2 md:w-2/5 aspect-square z-20 border-[8px] md:border-[14px] border-background shadow-2xl overflow-hidden transition-all duration-700 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 md:group-hover:translate-x-6 md:group-hover:-translate-y-6">
              <SafeImage
                src="/images/22a9a9710a0a5596583a23521e5fe49d.jpg"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Atelier detail – handcrafted texture"
              />
            </div>

            {/* Main Atelier Image */}
            <div className="w-full h-full overflow-hidden rounded-2xl shadow-2xl">
              <SafeImage
                src="/images/598ccfa54b4780d61a0a391d7768e6ea.jpg"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1600ms] ease-out"
                alt="Kusuf Atelier – main workspace"
              />
            </div>

            {/* Label – refined typography & animation */}
            <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md text-white px-5 py-2.5 text-[9px] font-mono font-bold tracking-[0.4em] uppercase z-30 border-l-2 border-primary transition-all duration-300 hover:tracking-[0.5em] hover:bg-black/90">
              Kusuf_ATELIER_OP.01
            </div>
          </HoverSyncWrapper>

          {/* Content Composition – enhanced spacing & micro‑interactions */}
          <div className="w-full lg:w-1/2 space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-4">
              <div className="w-10 h-px bg-primary/80 group-hover:w-16 transition-all duration-500" />
              <span className="text-primary font-bold uppercase tracking-[0.5em] text-[11px] font-mono">
                THE ATELIER
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-[68px] font-display leading-[0.95] uppercase tracking-[-2px] text-foreground">
              Crafting{" "}
              <span className="text-primary italic relative inline-block">
                Silence
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary/40 scale-x-0 transition-transform duration-700 group-hover:scale-x-100 origin-left" />
              </span>
              <br />
              With Precision
            </h2>

            <p className="text-foreground/75 text-[17px] leading-relaxed max-w-lg border-l-2 border-primary/30 pl-5">
              Our atelier in Tunisia masterfully blends heritage tailoring techniques with
              contemporary streetwear silhouettes. Every garment is a quiet manifestation of the
              "Move in Silence" philosophy.
            </p>

            {/* Quality Tags – cleaner design with hover lift */}
            <div className="flex flex-wrap gap-3 pt-4">
              {[
                { label: "Premium Cotton", icon: "🌿" },
                { label: "Hand Cut & Sewn", icon: "✂️" },
                { label: "Kusuf Verified", icon: "✓" },
                { label: "Tunisian Craft", icon: "🇹🇳" },
              ].map((tag, i) => (
                <div
                  key={i}
                  className="group/tag px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase text-foreground/80 hover:text-foreground hover:border-primary/40 hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-2"
                >
                  <span className="text-primary text-sm opacity-70 group-hover/tag:opacity-100 transition-opacity">
                    {tag.icon}
                  </span>
                  {tag.label}
                </div>
              ))}
            </div>

            <div className="pt-8">
              <LuxuryButton className="group/btn relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <span className="relative z-10">DISCOVER THE ATELIER</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-700" />
              </LuxuryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
