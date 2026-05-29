import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Facebook, Music, Shirt, Zap, Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      className="bg-background text-foreground py-24 md:py-32 border-t-4 border-primary overflow-hidden relative transition-all duration-1000 ease-in-out"
    >
      {/* Glass Overlay Layer */}
      <div className="absolute inset-0 backdrop-blur-[100px] opacity-30 pointer-events-none" />

      {/* Background Decorative Text */}
      <div className="absolute top-10 left-0 opacity-[0.03] select-none pointer-events-none transition-colors duration-1000">
        <span className="text-[30vw] font-display leading-none whitespace-nowrap tracking-tighter">
          Kusuf
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          {/* Brand Identity Section */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8 flex flex-col items-start">
              <img
                src="/images/kusuf.png"
                alt="Kusuf Logo"
                className="h-20 md:h-28 w-auto object-contain transition-all duration-1000"
              />
              <div className="space-y-4">
                <h3 className="text-6xl md:text-7xl font-display leading-none tracking-tighter uppercase transition-colors duration-1000">
                  خسوف <br />
                  <span className="text-primary italic">Kusuf</span>
                </h3>
                <p className="text-foreground/80 text-lg font-light leading-relaxed max-w-sm transition-colors duration-1000">
                  نحن نؤمن بأن القوة الحقيقية تكمن في الإتقان وليس في الضجيج. علامتنا هي بيان للصمت
                  والتميز.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-xs font-bold tracking-[0.4em] text-foreground/90 uppercase transition-colors duration-1000">
                <Shirt className="w-4 h-4 text-primary" />
                <span>Tunisian Atelier Origin</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold tracking-[0.4em] text-foreground/90 uppercase transition-colors duration-1000">
                <Zap className="w-4 h-4 text-primary" />
                <span>Limited Runway Drops</span>
              </div>
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <span className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase block transition-colors duration-1000">
                — القائمة
              </span>
              <ul className="space-y-4">
                {[
                  { label: "Shop", to: "/shop" as const, ar: "المتجر" },
                  { label: "Essentials", to: "/essentials" as const, ar: "الأساسيات" },
                  { label: "Drops", to: "/drops" as const, ar: "الإصدارات" },
                  { label: "About", to: "/about" as const, ar: "قصتنا" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xl md:text-2xl font-display text-foreground/80 hover:text-primary transition-colors duration-1000 uppercase tracking-tight"
                    >
                      {link.ar}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <span className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase block transition-colors duration-1000">
                — مساعدة
              </span>
              <ul className="space-y-4">
                {["Contact", "Shipping", "Returns"].map((link) => (
                  <li key={link}>
                    <Link
                      to="/contact"
                      className="text-xl md:text-2xl font-display text-foreground/80 hover:text-primary transition-colors duration-1000 uppercase tracking-tight"
                    >
                      {link === "Contact"
                        ? "تواصل معنا"
                        : link === "Shipping"
                          ? "الشحن"
                          : "الاسترجاع"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8 col-span-2 md:col-span-1">
              <span className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase block transition-colors duration-1000">
                — تواصل
              </span>
              <div className="flex flex-col gap-6">
                <a
                  href="#"
                  className="group flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors duration-1000"
                >
                  <Instagram className="w-5 h-5 group-hover:text-primary transition-colors duration-1000" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                    Instagram
                  </span>
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors duration-1000"
                >
                  <Facebook className="w-5 h-5 group-hover:text-primary transition-colors duration-1000" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Facebook</span>
                </a>
                <a
                  href="#"
                  className="group flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors duration-1000"
                >
                  <Music className="w-5 h-5 group-hover:text-primary transition-colors duration-1000" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact / Meta Section */}
          <div className="lg:col-span-3 space-y-12">
            <div className="p-8 border border-glass-border bg-surface backdrop-blur-xl transition-all duration-1000">
              <span className="text-[9px] font-bold tracking-[0.5em] text-primary uppercase block mb-6 transition-colors duration-1000">
                HQ_LOCATION
              </span>
              <div className="space-y-6 text-foreground/80 transition-colors duration-1000">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-primary shrink-0 transition-colors duration-1000" />
                  <p className="text-sm font-light leading-relaxed">
                    Kusuf ATELIER,
                    <br />
                    TUNISIA DISTRICT 01
                  </p>
                </div>
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0 transition-colors duration-1000" />
                  <p className="text-sm font-light">HELLO@Kusuf.TN</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 py-3 bg-primary/10 border border-primary/20 transition-all duration-1000">
              <Shield className="w-4 h-4 text-primary transition-colors duration-1000" />
              <span className="text-[9px] font-bold tracking-[0.4em] text-primary uppercase transition-colors duration-1000">
                Secure Checkout Verified
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-12 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-8 transition-colors duration-1000">
          <div className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-bold tracking-[0.4em] text-foreground/80 uppercase transition-colors duration-1000">
            <span>© {currentYear} Kusuf ATELIER</span>
            <div className="w-1 h-1 rounded-full bg-foreground/10 hidden md:block"></div>
            <span>Move in Silence.</span>
          </div>

          <div className="flex gap-12">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] font-bold tracking-[0.4em] text-foreground/80 hover:text-foreground uppercase transition-colors duration-1000"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
