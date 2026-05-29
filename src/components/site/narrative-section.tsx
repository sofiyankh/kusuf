import { Link } from "@tanstack/react-router";
import { Heart, Globe } from "lucide-react";
import { HoverSyncWrapper } from "./hover-sync-wrapper";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { SafeImage } from "@/components/ui/safe-image";

export const NarrativeSection = () => {
  return (
    <section
      className="reveal relative w-full overflow-hidden transition-colors duration-1000 py-24 md:py-32"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      dir="rtl"
    >
      <div className="absolute inset-0 backdrop-blur-xl opacity-20 pointer-events-none transition-opacity duration-1000" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <HoverSyncWrapper
            imageUrl="/images/hero-compact.jpg"
            className="lg:col-span-6 relative order-2 lg:order-1 glass-card p-4 transition-all duration-1000"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <SafeImage
                src="/images/hero-compact.jpg"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-[2000ms]"
                alt="Kusuf Narrative hero"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-transparent to-transparent transition-all duration-1000"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-background px-6 py-3 text-[9px] font-bold tracking-[0.4em] uppercase z-20 hidden md:block transition-all duration-1000 shadow-2xl">
              EST. 2026 / TUNIS / Kusuf_NARRATIVE
            </div>
          </HoverSyncWrapper>

          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2 text-right">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-4 transition-colors duration-1000">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold uppercase tracking-[0.5em] text-[9px]">
                  THE ORIGIN
                </span>
              </div>
              <h2 className="text-5xl md:text-[8rem] font-display text-foreground leading-[0.85] uppercase tracking-tighter transition-colors duration-1000">
                Move In <br /> <span className="text-primary italic">Silence</span>
              </h2>
              <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-xl mr-auto transition-colors duration-1000">
                Kusuf هي أكثر من مجرد علامة ملابس. إنها حركة تحتفي بالهوية الحضرية التونسية،
                بالجودة، وبالأشخاص الذين يفضلون الفعل على الكلام.
              </p>
              <p className="text-foreground/90 text-lg font-light leading-relaxed max-w-lg mr-auto transition-colors duration-1000">
                نحن نؤمن بأن الصمت هو أرقى أنواع التعبير. عندما تكون الجودة متناهية، والتصميم
                دقيقاً، لا نحتاج للكثير من الضجيج لترك أثر.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-end pt-8 transition-all duration-1000">
              <Link
                to="/about"
                className="group flex items-center gap-6 text-foreground/80 hover:text-primary transition-colors duration-1000"
              >
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase">
                  READ FULL STORY
                </span>
                <div className="w-12 h-px bg-glass-border group-hover:bg-primary transition-colors duration-1000"></div>
              </Link>
              <Link to="/shop">
                <LuxuryButton className="h-auto py-5 px-12">SHOP THE COLLECTION</LuxuryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-32 opacity-[0.02] pointer-events-none select-none transition-colors duration-1000">
        <Globe className="w-[40vw] h-[40vw] text-foreground" />
      </div>
    </section>
  );
};
