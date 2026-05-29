import { Link } from "@tanstack/react-router";
import { useColorSync } from "@/hooks/use-color-sync";
import { useState, useEffect, useRef } from "react";

interface MarqueeItemProps {
  img: string;
  title: string;
  sub: string;
}

function MarqueeItem({ img, title, sub }: MarqueeItemProps) {
  const [isActive, setIsActive] = useState(false);
  const [sampleY, setSampleY] = useState(0.5);
  const itemRef = useRef<HTMLDivElement>(null);
  useColorSync(img, isActive, sampleY);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Intersection detection for pre-warming or touch on desktop
        },
        { threshold: 0.1 },
      );
      if (itemRef.current) observer.observe(itemRef.current);
      return () => observer.disconnect();
    } else {
      const handleScroll = () => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const vCenter = window.innerHeight / 2;
        const bandSize = 96;

        if (rect.top < vCenter + bandSize && rect.bottom > vCenter - bandSize) {
          setIsActive(true);
          const relativeY = Math.max(0, Math.min(1, (vCenter - rect.top) / rect.height));
          setSampleY(relativeY);
        } else {
          setIsActive(false);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={itemRef}
      className="shrink-0 w-[300px] md:w-[450px] aspect-[4/5] overflow-hidden relative group cursor-pointer border border-glass-border transition-[border-color] duration-1000"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
    >
      <img
        src={img}
        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]"
        alt="Drop"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-all duration-1000" />
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end backdrop-blur-[2px] transition-all">
        <span className="text-[9px] font-bold tracking-[0.4em] text-primary mb-2 uppercase transition-colors duration-1000">
          {sub}
        </span>
        <h3 className="text-foreground font-display text-4xl tracking-wider mb-4 leading-none transition-colors duration-1000">
          {title}
        </h3>
        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
          <p className="text-[10px] text-foreground/90 leading-relaxed mb-6 uppercase tracking-[0.1em] transition-colors duration-1000">
            Premium Material / Tunisian Atelier
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RunwayMarquee() {
  const drops = [
    {
      img: "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
      title: "URBAN ECLIPSE HOODIE",
      sub: "DROP 001",
    },
    {
      img: "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
      title: "SILENT RUNNER SHELL",
      sub: "DROP 002",
    },
    {
      img: "/images/f812cc870d28da5055fbbb7259ae1ebb.jpg",
      title: "TECH CARGO SYSTEM",
      sub: "DROP 003",
    },
    {
      img: "/images/d81af856f671f045137f4843339c77d3.jpg",
      title: "ATELIER ESSENTIAL TEE",
      sub: "DROP 004",
    },
    {
      img: "/images/a583c395a9133f31190311989d79caa9.jpg",
      title: "MINIMALIST Kusuf CAP",
      sub: "DROP 005",
    },
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden border-t border-b border-glass-border bg-background transition-colors duration-1000">
      <div className="flex justify-between items-center px-6 md:px-14 mb-16 transition-colors duration-1000">
        <h2 className="text-5xl md:text-7xl font-display tracking-tighter leading-none uppercase text-foreground transition-colors duration-1000">
          Runway <span className="text-primary italic">Drops</span>
        </h2>
        <div className="flex items-center gap-6">
          <div className="w-16 h-[1px] bg-primary transition-[width,background-color] duration-1000"></div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/90 transition-colors duration-1000">
            Autumn / Winter 2026
          </span>
        </div>
      </div>

      <div className="relative">
        <div
          className="flex animate-marquee hover:[animation-play-state:paused] w-fit will-change-transform"
          style={{ "--marquee-duration": "60s" } as React.CSSProperties}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 px-4">
              {drops.map((drop, j) => (
                <MarqueeItem key={`${i}-${j}`} {...drop} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
