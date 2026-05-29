import { jsxs, jsx } from "react/jsx-runtime";
import { H as Header, F as Footer } from "./footer-DLzK94hm.js";
import { u as useColorSync } from "./use-color-sync-3KHhHXEH.js";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Facebook, Twitter, Instagram, ArrowLeft, ShoppingCart, Zap, Shirt, Globe, Gem, Heart, Bell, Mail, Check, Clock } from "lucide-react";
import { e as useTheme, c as cn, s as supabase, R as Route } from "./router-argkJYP3.js";
import { useNavigate, Link } from "@tanstack/react-router";
import { H as HoverSyncWrapper } from "./hover-sync-wrapper-F39nYR2h.js";
import { I as Input } from "./input-sMDTmqyi.js";
import { toast } from "sonner";
import "./theme-toggle-CARAU6uN.js";
import "./notifications-bell-BYGZWSnU.js";
import "@radix-ui/react-popover";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
function MarqueeItem({ img, title, sub }) {
  const [isActive, setIsActive] = useState(false);
  const [sampleY, setSampleY] = useState(0.5);
  const itemRef = useRef(null);
  useColorSync(img, isActive, sampleY);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      const observer = new IntersectionObserver(
        ([entry]) => {
        },
        { threshold: 0.1 }
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: itemRef,
      className: "shrink-0 w-[300px] md:w-[450px] aspect-[4/5] overflow-hidden relative group cursor-pointer border border-glass-border transition-[border-color] duration-1000",
      onMouseEnter: () => setIsActive(true),
      onMouseLeave: () => setIsActive(false),
      onTouchStart: () => setIsActive(true),
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: img,
            className: "absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]",
            alt: "Drop"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-all duration-1000" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end backdrop-blur-[2px] transition-all", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-[0.4em] text-primary mb-2 uppercase transition-colors duration-1000", children: sub }),
          /* @__PURE__ */ jsx("h3", { className: "text-foreground font-display text-4xl tracking-wider mb-4 leading-none transition-colors duration-1000", children: title }),
          /* @__PURE__ */ jsx("div", { className: "h-0 group-hover:h-auto overflow-hidden transition-all duration-500", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] text-foreground/90 leading-relaxed mb-6 uppercase tracking-[0.1em] transition-colors duration-1000", children: "Premium Material / Tunisian Atelier" }) })
        ] })
      ]
    }
  );
}
function RunwayMarquee() {
  const drops = [
    {
      img: "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
      title: "URBAN ECLIPSE HOODIE",
      sub: "DROP 001"
    },
    {
      img: "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
      title: "SILENT RUNNER SHELL",
      sub: "DROP 002"
    },
    {
      img: "/images/f812cc870d28da5055fbbb7259ae1ebb.jpg",
      title: "TECH CARGO SYSTEM",
      sub: "DROP 003"
    },
    {
      img: "/images/d81af856f671f045137f4843339c77d3.jpg",
      title: "ATELIER ESSENTIAL TEE",
      sub: "DROP 004"
    },
    {
      img: "/images/a583c395a9133f31190311989d79caa9.jpg",
      title: "MINIMALIST Kusuf CAP",
      sub: "DROP 005"
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full py-24 overflow-hidden border-t border-b border-glass-border bg-background transition-colors duration-1000", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-6 md:px-14 mb-16 transition-colors duration-1000", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-7xl font-display tracking-tighter leading-none uppercase text-foreground transition-colors duration-1000", children: [
        "Runway ",
        /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Drops" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-[1px] bg-primary transition-[width,background-color] duration-1000" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/90 transition-colors duration-1000", children: "Autumn / Winter 2026" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex animate-marquee hover:[animation-play-state:paused] w-fit will-change-transform",
        style: { "--marquee-duration": "60s" },
        children: [...Array(2)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "flex gap-8 px-4", children: drops.map((drop, j) => /* @__PURE__ */ jsx(MarqueeItem, { ...drop }, `${i}-${j}`)) }, i))
      }
    ) })
  ] });
}
const COLLECTIONS = [
  {
    name: "MEN",
    title: "THE_ECLIPSE",
    sub: "URBAN_STREETWEAR_VOL.01",
    bg: "#000000",
    fg: "#f2eee8",
    accent: "#c5a880",
    p_light: "rgba(20, 20, 20, 0.8)",
    p_dark: "rgba(242, 238, 232, 0.1)",
    prev: "WOMEN",
    next: "WOMEN",
    price: "145.00 TND",
    imgs: [
      "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
      "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
      "/images/f812cc870d28da5055fbbb7259ae1ebb.jpg"
    ],
    models: [
      "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
      "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg"
    ]
  },
  {
    name: "WOMEN",
    title: "THE_ESSENCE",
    sub: "MINIMAL_STREETWEAR_VOL.01",
    bg: "rgba(242, 238, 232, 0.75)",
    fg: "#2d2a26",
    accent: "#c5a880",
    p_light: "rgba(255, 255, 255, 0.4)",
    p_dark: "rgba(45, 42, 38, 0.2)",
    prev: "MEN",
    next: "MEN",
    price: "125.00 TND",
    imgs: [
      "/images/d81af856f671f045137f4843339c77d3.jpg",
      "/images/a583c395a9133f31190311989d79caa9.jpg",
      "/images/22a9a9710a0a5596583a23521e5fe49d.jpg"
    ],
    models: [
      "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
      "/images/d81af856f671f045137f4843339c77d3.jpg"
    ]
  }
];
const SafeImage = ({
  src,
  fallbackSrc = "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
  alt,
  className,
  loading = "lazy",
  ...props
}) => {
  const [error, setError] = useState(false);
  return /* @__PURE__ */ jsx(
    "img",
    {
      src: error ? fallbackSrc : src,
      alt,
      className,
      onError: () => setError(true),
      loading,
      ...props
    }
  );
};
const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const { setPalette, isManualTheme } = useTheme();
  const navigate = useNavigate();
  const data = COLLECTIONS[current];
  useColorSync(data.models[1], isHeroVisible && !animating && !isManualTheme);
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vCenter = window.innerHeight / 2;
      const bandSize = 96;
      setIsHeroVisible(rect.top < vCenter + bandSize && rect.bottom > vCenter - bandSize);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggle = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + COLLECTIONS.length) % COLLECTIONS.length);
      setAnimating(false);
    }, 850);
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      className: "reveal relative h-screen md:h-screen overflow-hidden",
      style: { backgroundColor: "var(--background)", color: "var(--foreground)" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 backdrop-blur-2xl bg-gradient-to-b from-black/10 via-black/5 to-transparent pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full pt-[100px] md:pt-[120px]", children: [
          /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex w-20 h-full flex-col justify-between items-center py-20 pb-10 z-[1010] flex-shrink-0 border-r border-white/10", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => toggle(-1),
                className: "flex items-center justify-center -rotate-90 w-[158px] h-11 group transition-all duration-1000 hover:-translate-x-0.5",
                "aria-label": `Previous collection: ${data.prev}`,
                children: [
                  /* @__PURE__ */ jsx(
                    ArrowRight,
                    {
                      className: "w-4 h-4 mr-4 rotate-90 transition-all duration-300 group-hover:opacity-75 group-hover:-translate-y-0.5",
                      style: { color: "var(--foreground)" }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "text-[10px] font-bold tracking-[3.5px] uppercase whitespace-nowrap transition-opacity duration-300 opacity-70 group-hover:opacity-100",
                      style: { color: "var(--foreground)" },
                      children: data.prev
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-7 mb-6", children: [Facebook, Twitter, Instagram].map((Icon, i) => /* @__PURE__ */ jsx(
              Icon,
              {
                className: "w-3.5 h-3.5 opacity-40 hover:opacity-90 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer",
                style: { color: "var(--foreground)" }
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsx("aside", { className: "hidden md:block w-[25vw] h-full relative ml-[5%] z-10 flex-shrink-0 overflow-hidden", children: /* @__PURE__ */ jsx(
            SafeImage,
            {
              src: data.models[0],
              className: `w-full h-full object-cover object-top transition-all duration-[950ms] ease-out ${animating ? "opacity-0 -translate-x-12 scale-[0.92]" : "opacity-100 translate-x-0 scale-100"}`,
              alt: `${data.name} collection model main`,
              fallbackSrc: "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col relative overflow-hidden z-20", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:hidden absolute top-1/2 -translate-y-[120px] left-0 right-0 flex justify-between px-4 z-[500] pointer-events-none", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => toggle(-1),
                  className: "p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 active:scale-90 transition-transform pointer-events-auto shadow-2xl",
                  style: { color: "var(--foreground)" },
                  children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => toggle(1),
                  className: "p-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 active:scale-90 transition-transform pointer-events-auto shadow-2xl",
                  style: { color: "var(--foreground)" },
                  children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => toggle(1),
                className: "hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 items-center gap-4 text-[11px] font-bold tracking-[3.5px] cursor-pointer z-[500] group transition-all duration-700 hover:scale-110 active:scale-95",
                style: { color: "var(--foreground)" },
                role: "button",
                "aria-label": `Next collection: ${data.next}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "group-hover:tracking-[4px] transition-all duration-300", children: data.next }),
                  /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("main", { className: "flex-1 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center px-6 md:px-14 pt-0 md:pt-20 overflow-hidden", children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `transition-all duration-1000 md:pr-10 z-10 -translate-y-10 md:translate-y-0 ${animating ? "opacity-0 -translate-y-20" : "opacity-100"}`,
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "block text-[9px] md:text-[10px] tracking-[4px] md:tracking-[4.5px] mb-3 md:mb-4 font-bold uppercase opacity-60", children: [
                      "▶ ",
                      data.name,
                      " COLLECTION"
                    ] }),
                    /* @__PURE__ */ jsx("h1", { className: "text-[42px] md:text-[70px] font-serif font-medium leading-[1] md:leading-[1.02] mb-4 tracking-[-1px] md:tracking-[-1.2px]", children: data.title }),
                    /* @__PURE__ */ jsx("h2", { className: "text-[9px] md:text-[10px] tracking-[1.5px] md:tracking-[2px] mb-8 md:mb-10 font-bold uppercase opacity-60", children: data.sub }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: "luxury-button-square mt-40 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-black/30",
                        style: {
                          backgroundColor: "var(--foreground)",
                          color: "var(--background)",
                          borderColor: "var(--primary)"
                        },
                        onClick: () => navigate({ to: "/shop" }),
                        children: "EXPLORE"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute md:relative bottom-[140px] md:bottom-auto right-0 md:right-auto w-full md:w-auto h-[68vh] md:h-[65vh] flex items-end justify-end overflow-hidden pointer-events-none md:pointer-events-auto -translate-y-10 md:translate-y-0", children: /* @__PURE__ */ jsx(
                SafeImage,
                {
                  src: data.models[1],
                  className: `max-h-full max-w-full object-contain transition-all duration-[950ms] ease-out scale-[1.15] md:scale-100 ${animating ? "opacity-0 translate-x-12 scale-[1.05]" : "opacity-100 translate-x-0"}`,
                  alt: `${data.name} collection model secondary`,
                  fallbackSrc: "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs(
              "section",
              {
                className: "h-[140px] md:h-[180px] w-full flex justify-start z-50 border-t border-glass-border overflow-x-auto no-scrollbar",
                style: { backgroundColor: "var(--surface)" },
                children: [
                  data.imgs.map((img, i) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `w-[140px] md:w-[200px] h-full border-r border-glass-border flex items-center justify-center relative flex-shrink-0 overflow-hidden transition-all duration-700 ${i === 1 ? "bg-white/5 md:scale-105 shadow-2xl" : "hover:bg-glass-bg hover:scale-[1.015]"}`,
                      style: { backgroundColor: i === 1 ? "var(--secondary)" : "transparent" },
                      children: [
                        /* @__PURE__ */ jsx(
                          SafeImage,
                          {
                            src: img,
                            className: "max-h-[62%] max-w-[82%] object-contain transition-transform duration-700",
                            style: { transform: i === 1 ? "scale(1.05)" : void 0 },
                            alt: `Product from ${data.name} collection`,
                            fallbackSrc: "/images/22a9a9710a0a5596583a23521e5fe49d.jpg"
                          }
                        ),
                        i === 1 && /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: "absolute bottom-0 left-0 w-full py-2 md:py-3 px-3 md:px-4 text-[8px] md:text-[9px] flex justify-between items-center tracking-widest font-bold backdrop-blur-md border-t border-glass-border",
                            style: { backgroundColor: "var(--primary)", color: "var(--background)" },
                            children: [
                              /* @__PURE__ */ jsx("span", { children: data.price }),
                              /* @__PURE__ */ jsx(ShoppingCart, { className: "w-3 md:w-3.5 h-3 md:h-3.5" })
                            ]
                          }
                        )
                      ]
                    },
                    i
                  )),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex-1 flex flex-col items-center justify-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-bold tracking-widest cursor-pointer hover:opacity-90 transition-all duration-700 group min-w-[140px] md:min-w-[200px]",
                      style: { backgroundColor: "var(--secondary)" },
                      onClick: () => navigate({ to: "/shop" }),
                      role: "button",
                      children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "w-8 md:w-9 h-8 md:h-9 border rounded-full flex items-center justify-center group-hover:rotate-45 transition-all duration-500",
                            style: {
                              borderColor: "var(--foreground)",
                              backgroundColor: "var(--foreground)",
                              color: "var(--background)"
                            },
                            children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 md:w-4 h-3.5 md:h-4" })
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "font-bold", style: { color: "var(--foreground)" }, children: "VIEW ALL" })
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
};
const LuxuryButton = ({
  children,
  className,
  variant = "square",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: cn(
        variant === "square" ? "luxury-button-square" : "liquid-glass px-8 py-3 text-[11px] font-bold tracking-widest uppercase",
        className
      ),
      ...props,
      children
    }
  );
};
const AtelierSection = () => {
  return /* @__PURE__ */ jsxs("section", { className: "reveal relative w-full bg-background py-24 md:py-32 overflow-hidden transition-colors duration-1000", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,215,0,0.02),transparent_50%)] pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-10", children: /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20", children: [
      /* @__PURE__ */ jsxs(
        HoverSyncWrapper,
        {
          imageUrl: "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
          className: "relative w-full lg:w-1/2 aspect-[4/3] group order-2 lg:order-1",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-6 -right-4 md:-top-14 md:-right-12 w-1/2 md:w-2/5 aspect-square z-20 border-[8px] md:border-[14px] border-background shadow-2xl overflow-hidden transition-all duration-700 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 md:group-hover:translate-x-6 md:group-hover:-translate-y-6", children: /* @__PURE__ */ jsx(
              SafeImage,
              {
                src: "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
                className: "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110",
                alt: "Atelier detail – handcrafted texture"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "w-full h-full overflow-hidden rounded-2xl shadow-2xl", children: /* @__PURE__ */ jsx(
              SafeImage,
              {
                src: "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
                className: "w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1600ms] ease-out",
                alt: "Kusuf Atelier – main workspace"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-6 bg-black/70 backdrop-blur-md text-white px-5 py-2.5 text-[9px] font-mono font-bold tracking-[0.4em] uppercase z-30 border-l-2 border-primary transition-all duration-300 hover:tracking-[0.5em] hover:bg-black/90", children: "Kusuf_ATELIER_OP.01" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-1/2 space-y-8 order-1 lg:order-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-px bg-primary/80 group-hover:w-16 transition-all duration-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-primary font-bold uppercase tracking-[0.5em] text-[11px] font-mono", children: "THE ATELIER" })
        ] }),
        /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-6xl lg:text-[68px] font-display leading-[0.95] uppercase tracking-[-2px] text-foreground", children: [
          "Crafting",
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-primary italic relative inline-block", children: [
            "Silence",
            /* @__PURE__ */ jsx("span", { className: "absolute -bottom-2 left-0 w-full h-[2px] bg-primary/40 scale-x-0 transition-transform duration-700 group-hover:scale-x-100 origin-left" })
          ] }),
          /* @__PURE__ */ jsx("br", {}),
          "With Precision"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground/75 text-[17px] leading-relaxed max-w-lg border-l-2 border-primary/30 pl-5", children: 'Our atelier in Tunisia masterfully blends heritage tailoring techniques with contemporary streetwear silhouettes. Every garment is a quiet manifestation of the "Move in Silence" philosophy.' }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 pt-4", children: [
          { label: "Premium Cotton", icon: "🌿" },
          { label: "Hand Cut & Sewn", icon: "✂️" },
          { label: "Kusuf Verified", icon: "✓" },
          { label: "Tunisian Craft", icon: "🇹🇳" }
        ].map((tag, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group/tag px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase text-foreground/80 hover:text-foreground hover:border-primary/40 hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary text-sm opacity-70 group-hover/tag:opacity-100 transition-opacity", children: tag.icon }),
              tag.label
            ]
          },
          i
        )) }),
        /* @__PURE__ */ jsx("div", { className: "pt-8", children: /* @__PURE__ */ jsxs(LuxuryButton, { className: "group/btn relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]", children: [
          /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "DISCOVER THE ATELIER" }),
          /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-700" })
        ] }) })
      ] })
    ] }) })
  ] });
};
const PHILOSOPHY = [
  {
    name: "Silence",
    arabic: "صمت",
    description: "نحن نؤمن بأن الإتقان لا يحتاج إلى صراخ. تصاميمنا تتحدث من خلال جودتها وتفاصيلها الدقيقة.",
    icon: Zap,
    benefits: ["جودة ملموسة", "تصميم هادئ", "هوية واثقة"]
  },
  {
    name: "Origin",
    arabic: "أصل",
    description: "كل قطعة تخرج من الأتيليه الخاص بنا في تونس، مصنوعة بأيدي محترفين يجمعون بين الحرفة والروح الحضرية.",
    icon: Shirt,
    benefits: ["صناعة تونسية", "مواد فاخرة", "دقة يدوية"]
  },
  {
    name: "Impact",
    arabic: "أثر",
    description: "نسعى لترك أثر من خلال الاستدامة والتميز. ملابسنا ليست مجرد موضة، بل هي بيان للمستقبل.",
    icon: Globe,
    benefits: ["استدامة فنية", "تميز حضري", "تأثير دائم"]
  },
  {
    name: "Rarity",
    arabic: "ندرة",
    description: "إصداراتنا محدودة دائماً لنضمن لك التفرد. نؤمن بأن القطعة المميزة يجب أن تبقى نادرة.",
    icon: Gem,
    benefits: ["ندرة مقصودة", "قيمة فنية", "تميز لا يتكرر"]
  }
];
const ManifestoSection = () => {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "reveal relative bg-background py-24 md:py-32 overflow-hidden transition-all duration-1000",
      dir: "rtl",
      children: [
        /* @__PURE__ */ jsx("div", { className: "max-w-[1600px] mx-auto px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 flex md:block items-center gap-8", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-7xl md:text-[10rem] font-display text-foreground leading-[0.85] uppercase tracking-tighter md:[writing-mode:vertical-rl] md:rotate-180 transition-colors duration-1000", children: [
              "Move In ",
              /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Silence" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-px h-24 md:h-48 bg-primary/20 md:mx-auto mt-8 hidden md:block transition-all duration-1000" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-9 space-y-24", children: [
            /* @__PURE__ */ jsxs("div", { className: "max-w-2xl text-right space-y-6", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary font-bold uppercase tracking-[0.5em] text-[9px] block transition-colors duration-1000", children: "— THE MANIFESTO" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl md:text-4xl text-foreground font-light leading-tight transition-colors duration-1000", children: "نتحرّك في صمت لأن القوة الحقيقية لا تحتاج إلى ضجيج. جودة القطعة وتفاصيلها هي التي تتحدث بالنيابة عنك." }),
              /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-base font-light leading-relaxed transition-colors duration-1000", children: "فلسفة Kusuf تعتمد على التميز الهادئ. نستخدم أفضل الخامات التونسية لنخلق هوية حضرية تجمع بين الفخامة والشارع." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24", children: PHILOSOPHY.map((p, i) => /* @__PURE__ */ jsxs("div", { className: "group relative space-y-6 text-right", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 justify-end", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-foreground/90 font-display text-5xl leading-none group-hover:text-primary transition-all duration-1000", children: [
                  "0",
                  i + 1
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-glass-border transition-all duration-1000" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-4xl font-bold text-foreground uppercase group-hover:text-primary transition-all duration-1000 tracking-tight", children: p.name }),
                /* @__PURE__ */ jsx("p", { className: "text-primary text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000", children: p.arabic })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-foreground/80 text-base leading-relaxed max-w-sm mr-auto ml-0 transition-colors duration-1000", children: p.description }),
              /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-x-6 gap-y-3 justify-end pt-4 border-t border-glass-border transition-all duration-1000", children: p.benefits.map((b) => /* @__PURE__ */ jsxs(
                "li",
                {
                  className: "flex items-center gap-2 text-[10px] text-foreground/90 font-bold tracking-widest uppercase transition-colors duration-1000",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-primary transition-colors duration-1000" }),
                    " ",
                    b
                  ]
                },
                b
              )) })
            ] }, p.name)) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 opacity-[0.02] pointer-events-none select-none transition-colors duration-1000", children: /* @__PURE__ */ jsx("span", { className: "text-[40vw] font-display leading-none uppercase tracking-tighter text-foreground", children: "Kusuf" }) })
      ]
    }
  );
};
const NewArrivalsSection = ({ featured }) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx("section", { className: "relative w-full bg-background py-24 overflow-hidden transition-all duration-1000", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1600px] mx-auto px-6 md:px-14", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-primary pb-8 transition-all duration-1000", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-7xl md:text-[10rem] font-display leading-[0.8] uppercase tracking-tighter text-foreground transition-colors duration-1000", children: [
        "New ",
        /* @__PURE__ */ jsx("br", {}),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Arrivals" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right space-y-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-[0.5em] text-foreground/85 uppercase transition-colors duration-1000", children: "SEASONAL_RUNWAY_01" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-light text-foreground max-w-sm transition-colors duration-1000", children: "The latest evolution of Kusuf streetwear. Silent, precise, and uncompromising." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12", dir: "rtl", children: [
      /* @__PURE__ */ jsxs(
        HoverSyncWrapper,
        {
          imageUrl: "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
          className: "md:col-span-7 space-y-8 group cursor-pointer glass-card p-4 transition-all duration-1000",
          onClick: () => navigate({ to: `/product/${featured[0]?.id || ""}` }),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] overflow-hidden bg-zinc-100", children: [
              /* @__PURE__ */ jsx(
                SafeImage,
                {
                  src: "/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg",
                  className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]",
                  alt: "Runway hero"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8 z-20", children: /* @__PURE__ */ jsx("span", { className: "bg-primary text-background px-6 py-2 text-[10px] font-bold tracking-[0.4em] transition-all duration-1000", children: "RUNWAY_L_01" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-baseline border-t border-glass-border pt-6 transition-all duration-1000", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-5xl font-display uppercase tracking-tight text-foreground transition-colors duration-1000", children: featured[0]?.nameAr || "هودي الخسوف - أسود" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.3em] text-foreground/90 uppercase transition-colors duration-1000", children: featured[0]?.name || "Eclipse Hoodie - Black" })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-3xl font-display text-primary transition-colors duration-1000", children: [
                featured[0]?.price.toFixed(2) || "145.00",
                " TND"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-5 flex flex-col gap-24", children: [
        /* @__PURE__ */ jsxs(
          HoverSyncWrapper,
          {
            imageUrl: "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
            className: "space-y-6 group cursor-pointer glass-card p-4 transition-all duration-1000",
            onClick: () => navigate({ to: `/product/${featured[1]?.id || ""}` }),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden bg-zinc-100", children: [
                /* @__PURE__ */ jsx(
                  SafeImage,
                  {
                    src: "/images/598ccfa54b4780d61a0a391d7768e6ea.jpg",
                    className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]",
                    alt: "Runway secondary"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 p-6 z-20", children: /* @__PURE__ */ jsx("span", { className: "bg-primary text-background px-4 py-1.5 text-[9px] font-bold tracking-[0.4em] transition-all duration-1000", children: "TECH_S_02" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-right border-t border-glass-border pt-4 transition-all duration-1000", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-display uppercase text-foreground transition-colors duration-1000", children: featured[1]?.nameAr || "هودي الخسوف - رملي" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xl font-display text-primary transition-colors duration-1000", children: [
                    featured[1]?.price.toFixed(2) || "145.00",
                    " TND"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold tracking-[0.3em] text-foreground/90 uppercase transition-colors duration-1000", children: featured[1]?.name || "Eclipse Hoodie - Sand" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          HoverSyncWrapper,
          {
            imageUrl: "/images/f812cc870d28da5055fbbb7259ae1ebb.jpg",
            className: "space-y-6 group cursor-pointer glass-card p-4 transition-all duration-1000",
            onClick: () => navigate({ to: `/product/${featured[2]?.id || ""}` }),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden bg-zinc-100", children: [
                /* @__PURE__ */ jsx(
                  SafeImage,
                  {
                    src: "/images/f812cc870d28da5055fbbb7259ae1ebb.jpg",
                    className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[2000ms]",
                    alt: "Runway tertiary"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 p-6 z-20", children: /* @__PURE__ */ jsx("span", { className: "bg-primary text-background px-4 py-1.5 text-[9px] font-bold tracking-[0.4em] transition-all duration-1000", children: "CARGO_S_03" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-right border-t border-glass-border pt-4 transition-all duration-1000", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-display uppercase text-foreground transition-colors duration-1000", children: featured[2]?.nameAr || "سروال كارغو حضري" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xl font-display text-primary transition-colors duration-1000", children: [
                    featured[2]?.price.toFixed(2) || "185.00",
                    " TND"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold tracking-[0.3em] text-foreground/90 uppercase transition-colors duration-1000", children: featured[2]?.name || "Urban Cargo Pants" })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 border-t border-glass-border pt-12",
        dir: "rtl",
        children: [
          {
            img: "/images/d81af856f671f045137f4843339c77d3.jpg",
            titleAr: "تيشيرت أساسي - رملي",
            titleEn: "Essential Tee - Sand",
            price: "65.00"
          },
          {
            img: "/images/a583c395a9133f31190311989d79caa9.jpg",
            titleAr: "قبعة الصمت - أسود",
            titleEn: "Silent Cap - Black",
            price: "45.00"
          },
          {
            img: "/images/22a9a9710a0a5596583a23521e5fe49d.jpg",
            titleAr: "تيشيرت الخسوف - أسود",
            titleEn: "Kusuf Tee - Black",
            price: "65.00"
          },
          {
            img: "/images/hero-compact.jpg",
            titleAr: "إكسسوارات الخسوف",
            titleEn: "Kusuf Essentials",
            price: "Various"
          }
        ].map((item, idx) => /* @__PURE__ */ jsxs(
          HoverSyncWrapper,
          {
            imageUrl: item.img,
            className: "space-y-4 group cursor-pointer glass-card p-4 transition-all duration-1000",
            children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-[4/5] overflow-hidden relative", children: /* @__PURE__ */ jsx(
                SafeImage,
                {
                  src: item.img,
                  className: "w-full h-full object-cover transition-all duration-1000",
                  alt: item.titleEn
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-2xl font-display uppercase text-foreground transition-colors duration-1000", children: item.titleAr }),
                /* @__PURE__ */ jsx("p", { className: "text-[8px] font-bold tracking-[0.4em] text-foreground/85 uppercase transition-colors duration-1000", children: item.titleEn }),
                /* @__PURE__ */ jsxs("p", { className: "text-lg font-display text-primary transition-colors duration-1000", children: [
                  item.price,
                  " TND"
                ] })
              ] })
            ]
          },
          idx
        ))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-32 flex justify-center", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/shop",
        className: "luxury-button-square h-auto py-6 px-20 group transition-all duration-1000",
        children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold tracking-[0.6em] uppercase", children: "ACCESS FULL COLLECTION" }),
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-6 h-6 group-hover:translate-x-4 transition-transform duration-700" })
        ]
      }
    ) })
  ] }) });
};
const NarrativeSection = () => {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "reveal relative w-full overflow-hidden transition-colors duration-1000 py-24 md:py-32",
      style: { backgroundColor: "var(--background)", color: "var(--foreground)" },
      dir: "rtl",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 backdrop-blur-xl opacity-20 pointer-events-none transition-opacity duration-1000" }),
        /* @__PURE__ */ jsx("div", { className: "max-w-[1600px] mx-auto px-6 md:px-14 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-16 items-center", children: [
          /* @__PURE__ */ jsxs(
            HoverSyncWrapper,
            {
              imageUrl: "/images/hero-compact.jpg",
              className: "lg:col-span-6 relative order-2 lg:order-1 glass-card p-4 transition-all duration-1000",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/10] overflow-hidden", children: [
                  /* @__PURE__ */ jsx(
                    SafeImage,
                    {
                      src: "/images/hero-compact.jpg",
                      className: "absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-[2000ms]",
                      alt: "Kusuf Narrative hero"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-l from-background/90 via-transparent to-transparent transition-all duration-1000" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -right-6 bg-primary text-background px-6 py-3 text-[9px] font-bold tracking-[0.4em] uppercase z-20 hidden md:block transition-all duration-1000 shadow-2xl", children: "EST. 2026 / TUNIS / Kusuf_NARRATIVE" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 space-y-8 order-1 lg:order-2 text-right", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-4 transition-colors duration-1000", children: [
                /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "text-primary font-bold uppercase tracking-[0.5em] text-[9px]", children: "THE ORIGIN" })
              ] }),
              /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-[8rem] font-display text-foreground leading-[0.85] uppercase tracking-tighter transition-colors duration-1000", children: [
                "Move In ",
                /* @__PURE__ */ jsx("br", {}),
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-primary italic", children: "Silence" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-xl mr-auto transition-colors duration-1000", children: "Kusuf هي أكثر من مجرد علامة ملابس. إنها حركة تحتفي بالهوية الحضرية التونسية، بالجودة، وبالأشخاص الذين يفضلون الفعل على الكلام." }),
              /* @__PURE__ */ jsx("p", { className: "text-foreground/90 text-lg font-light leading-relaxed max-w-lg mr-auto transition-colors duration-1000", children: "نحن نؤمن بأن الصمت هو أرقى أنواع التعبير. عندما تكون الجودة متناهية، والتصميم دقيقاً، لا نحتاج للكثير من الضجيج لترك أثر." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-8 justify-end pt-8 transition-all duration-1000", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/about",
                  className: "group flex items-center gap-6 text-foreground/80 hover:text-primary transition-colors duration-1000",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-[0.4em] uppercase", children: "READ FULL STORY" }),
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-px bg-glass-border group-hover:bg-primary transition-colors duration-1000" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsx(LuxuryButton, { className: "h-auto py-5 px-12", children: "SHOP THE COLLECTION" }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-32 opacity-[0.02] pointer-events-none select-none transition-colors duration-1000", children: /* @__PURE__ */ jsx(Globe, { className: "w-[40vw] h-[40vw] text-foreground" }) })
      ]
    }
  );
};
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(null);
  useEffect(() => {
    supabase.rpc("newsletter_count").then(({ data }) => {
      if (typeof data === "number") setCount(data);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    if (error && !error.message.includes("duplicate")) {
      toast.error(error.message);
      return;
    }
    setDone(true);
    setEmail("");
    setCount((c) => (c ?? 0) + 1);
    setTimeout(() => setDone(false), 3e3);
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "reveal relative overflow-hidden py-24 md:py-32 transition-all duration-1000",
      style: { backgroundColor: "var(--background)", color: "var(--foreground)" },
      dir: "rtl",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 backdrop-blur-[60px] opacity-20 pointer-events-none transition-all duration-1000" }),
        /* @__PURE__ */ jsx("div", { className: "blur-overlay blur-overlay-top" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 text-center space-y-10 relative z-20", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block px-5 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md transition-all", children: /* @__PURE__ */ jsxs("p", { className: "text-primary font-bold text-xs flex items-center gap-3 tracking-[0.2em] uppercase", children: [
            /* @__PURE__ */ jsx(Bell, { className: "w-4 h-4" }),
            " قائمة الانتظار"
          ] }) }),
          /* @__PURE__ */ jsxs("h2", { className: "text-5xl md:text-7xl font-serif font-bold leading-tight uppercase transition-colors", children: [
            "كن أول من يعلم ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "بالإصدار القادم" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-foreground/80 font-light leading-relaxed transition-colors", children: "اشترك في قائمة الانتظار لتصلك رسالة عند توفر الإصدارات الجديدة والمحدودة." }),
          /* @__PURE__ */ jsxs("form", { onSubmit, className: "flex flex-col sm:flex-row gap-4 max-w-xl mx-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
              /* @__PURE__ */ jsx(Mail, { className: "absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/90" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "email",
                  placeholder: "بريدك الإلكتروني...",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  required: true,
                  className: "pl-14 h-16 rounded-2xl border-glass-border bg-glass-bg backdrop-blur-3xl transition-all text-foreground placeholder:text-foreground/80"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(LuxuryButton, { type: "submit", className: "h-16 px-10 rounded-2xl shadow-xl transition-all", children: done ? "تم الاشتراك ✓" : "سجل في قائمة الانتظار" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-12 pt-12 border-t border-glass-border transition-colors", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
              /* @__PURE__ */ jsxs("p", { className: "font-bold text-3xl text-foreground mb-1 transition-transform group-hover:scale-110", children: [
                "+",
                (count ?? 1500).toLocaleString("ar-TN")
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold tracking-[0.2em] uppercase text-foreground/90", children: "في قائمة الانتظار" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-1.5 mb-3", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary" }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold tracking-[0.2em] uppercase text-foreground/90", children: "جودة مضمونة" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-6 h-6 mx-auto mb-3 text-primary" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold tracking-[0.2em] uppercase text-foreground/90", children: "إصدارات دورية" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "blur-overlay blur-overlay-bottom" })
      ]
    }
  );
};
function HomePage() {
  const {
    featured
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { dir: "ltr", className: "min-h-screen w-full font-sans selection:bg-primary/20 antialiased transition-colors duration-1000", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx(AtelierSection, {}),
      /* @__PURE__ */ jsx(RunwayMarquee, {}),
      /* @__PURE__ */ jsx(ManifestoSection, {}),
      /* @__PURE__ */ jsx(NewArrivalsSection, { featured }),
      /* @__PURE__ */ jsx(NarrativeSection, {}),
      /* @__PURE__ */ jsx(NewsletterSection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  HomePage as component
};
