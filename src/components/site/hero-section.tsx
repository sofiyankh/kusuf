import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight, Facebook, Twitter, Instagram, ShoppingCart } from "lucide-react";
import { COLLECTIONS } from "@/data/collections";
import { useTheme } from "@/hooks/use-theme";
import { useColorSync } from "@/hooks/use-color-sync";
import { useNavigate } from "@tanstack/react-router";
import { SafeImage } from "@/components/ui/safe-image";

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const { setPalette, isManualTheme } = useTheme();
  const navigate = useNavigate();

  const data = COLLECTIONS[current];

  // Adaptive Collection Theme - Only active when hero is visible and not animating
  useColorSync(data.models[1], isHeroVisible && !animating && !isManualTheme);

  // Monitor visibility to toggle theme sync
  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vCenter = window.innerHeight / 2;
      const bandSize = 96; // Matching h-48 indicator

      setIsHeroVisible(rect.top < vCenter + bandSize && rect.bottom > vCenter - bandSize);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (dir: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + COLLECTIONS.length) % COLLECTIONS.length);
      setAnimating(false);
    }, 850);
  };

  return (
    <section
      ref={sectionRef}
      className="reveal relative h-screen md:h-screen overflow-hidden"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-b from-black/10 via-black/5 to-transparent pointer-events-none" />

      <div className="flex h-full w-full pt-[100px] md:pt-[120px]">
        {/* LEFT UI RAIL - Hidden on Mobile */}
        <nav className="hidden md:flex w-20 h-full flex-col justify-between items-center py-20 pb-10 z-[1010] flex-shrink-0 border-r border-white/10">
          <button
            onClick={() => toggle(-1)}
            className="flex items-center justify-center -rotate-90 w-[158px] h-11 group transition-all duration-1000 hover:-translate-x-0.5"
            aria-label={`Previous collection: ${data.prev}`}
          >
            <ArrowRight
              className="w-4 h-4 mr-4 rotate-90 transition-all duration-300 group-hover:opacity-75 group-hover:-translate-y-0.5"
              style={{ color: "var(--foreground)" }}
            />
            <span
              className="text-[10px] font-bold tracking-[3.5px] uppercase whitespace-nowrap transition-opacity duration-300 opacity-70 group-hover:opacity-100"
              style={{ color: "var(--foreground)" }}
            >
              {data.prev}
            </span>
          </button>

          <div className="flex flex-col gap-7 mb-6">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <Icon
                key={i}
                className="w-3.5 h-3.5 opacity-40 hover:opacity-90 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                style={{ color: "var(--foreground)" }}
              />
            ))}
          </div>
        </nav>

        {/* STANDING MODEL - Hidden on Mobile */}
        <aside className="hidden md:block w-[25vw] h-full relative ml-[5%] z-10 flex-shrink-0 overflow-hidden">
          <SafeImage
            src={data.models[0]}
            className={`w-full h-full object-cover object-top transition-all duration-[950ms] ease-out ${
              animating
                ? "opacity-0 -translate-x-12 scale-[0.92]"
                : "opacity-100 translate-x-0 scale-100"
            }`}
            alt={`${data.name} collection model main`}
            fallbackSrc="/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg"
          />
        </aside>

        {/* MAIN INTERACTION AREA */}
        <div className="flex-1 flex flex-col relative overflow-hidden z-20">
          {/* Mobile Toggle Controls - Centered on sides */}
          <div className="md:hidden absolute top-1/2 -translate-y-[120px] left-0 right-0 flex justify-between px-4 z-[500] pointer-events-none">
            <button
              onClick={() => toggle(-1)}
              className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 active:scale-90 transition-transform pointer-events-auto shadow-2xl"
              style={{ color: "var(--foreground)" }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggle(1)}
              className="p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 active:scale-90 transition-transform pointer-events-auto shadow-2xl"
              style={{ color: "var(--foreground)" }}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div
            onClick={() => toggle(1)}
            className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 items-center gap-4 text-[11px] font-bold tracking-[3.5px] cursor-pointer z-[500] group transition-all duration-700 hover:scale-110 active:scale-95"
            style={{ color: "var(--foreground)" }}
            role="button"
            aria-label={`Next collection: ${data.next}`}
          >
            <span className="group-hover:tracking-[4px] transition-all duration-300">
              {data.next}
            </span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          </div>

          <main className="flex-1 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center px-6 md:px-14 pt-0 md:pt-20 overflow-hidden">
            <div
              className={`transition-all duration-1000 md:pr-10 z-10 -translate-y-10 md:translate-y-0 ${
                animating ? "opacity-0 -translate-y-20" : "opacity-100"
              }`}
            >
              <span className="block text-[9px] md:text-[10px] tracking-[4px] md:tracking-[4.5px] mb-3 md:mb-4 font-bold uppercase opacity-60">
                ▶ {data.name} COLLECTION
              </span>
              <h1 className="text-[42px] md:text-[70px] font-serif font-medium leading-[1] md:leading-[1.02] mb-4 tracking-[-1px] md:tracking-[-1.2px]">
                {data.title}
              </h1>
              <h2 className="text-[9px] md:text-[10px] tracking-[1.5px] md:tracking-[2px] mb-8 md:mb-10 font-bold uppercase opacity-60">
                {data.sub}
              </h2>

              <button
                className="luxury-button-square mt-40 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-black/30"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                  borderColor: "var(--primary)",
                }}
                onClick={() => navigate({ to: "/shop" })}
              >
                EXPLORE
              </button>
            </div>

            <div className="absolute md:relative bottom-[140px] md:bottom-auto right-0 md:right-auto w-full md:w-auto h-[68vh] md:h-[65vh] flex items-end justify-end overflow-hidden pointer-events-none md:pointer-events-auto -translate-y-10 md:translate-y-0">
              <SafeImage
                src={data.models[1]}
                className={`max-h-full max-w-full object-contain transition-all duration-[950ms] ease-out scale-[1.15] md:scale-100 ${
                  animating ? "opacity-0 translate-x-12 scale-[1.05]" : "opacity-100 translate-x-0"
                }`}
                alt={`${data.name} collection model secondary`}
                fallbackSrc="/images/598ccfa54b4780d61a0a391d7768e6ea.jpg"
              />
            </div>
          </main>

          {/* BOTTOM SHELF */}
          <section
            className="h-[140px] md:h-[180px] w-full flex justify-start z-50 border-t border-glass-border overflow-x-auto no-scrollbar"
            style={{ backgroundColor: "var(--surface)" }}
          >
            {data.imgs.map((img, i) => (
              <div
                key={i}
                className={`w-[140px] md:w-[200px] h-full border-r border-glass-border flex items-center justify-center relative flex-shrink-0 overflow-hidden transition-all duration-700 ${
                  i === 1
                    ? "bg-white/5 md:scale-105 shadow-2xl"
                    : "hover:bg-glass-bg hover:scale-[1.015]"
                }`}
                style={{ backgroundColor: i === 1 ? "var(--secondary)" : "transparent" }}
              >
                <SafeImage
                  src={img}
                  className="max-h-[62%] max-w-[82%] object-contain transition-transform duration-700"
                  style={{ transform: i === 1 ? "scale(1.05)" : undefined }}
                  alt={`Product from ${data.name} collection`}
                  fallbackSrc="/images/22a9a9710a0a5596583a23521e5fe49d.jpg"
                />

                {i === 1 && (
                  <div
                    className="absolute bottom-0 left-0 w-full py-2 md:py-3 px-3 md:px-4 text-[8px] md:text-[9px] flex justify-between items-center tracking-widest font-bold backdrop-blur-md border-t border-glass-border"
                    style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
                  >
                    <span>{data.price}</span>
                    <ShoppingCart className="w-3 md:w-3.5 h-3 md:h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* VIEW ALL - Strong Contrast */}
            <div
              className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-bold tracking-widest cursor-pointer hover:opacity-90 transition-all duration-700 group min-w-[140px] md:min-w-[200px]"
              style={{ backgroundColor: "var(--secondary)" }}
              onClick={() => navigate({ to: "/shop" })}
              role="button"
            >
              <div
                className="w-8 md:w-9 h-8 md:h-9 border rounded-full flex items-center justify-center group-hover:rotate-45 transition-all duration-500"
                style={{
                  borderColor: "var(--foreground)",
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4" />
              </div>
              <span className="font-bold" style={{ color: "var(--foreground)" }}>
                VIEW ALL
              </span>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
