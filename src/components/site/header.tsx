import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  X,
  ShoppingBag,
  User as UserIcon,
  LogOut,
  Shield,
  Search,
  Heart,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import CartSidebar from "./cart-sidebar";
import ThemeToggle from "./theme-toggle";
import NotificationsBell from "./notifications-bell";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount, setCartOpen } = useCart();
  const { user, isAdmin, logout } = useAuth();

  return (
    <header dir="rtl" className="homogeneous-nav transition-all duration-1000 ease-in-out">
      <nav className="max-w-[1800px] mx-auto px-6 md:px-14 py-1 md:py-2">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="group flex flex-col items-center gap-0.5">
              <img
                src="/images/kusuf.png"
                alt="Kusuf Logo"
                className="h-10 md:h-12 w-auto object-contain transition-all duration-1000 group-hover:scale-110"
              />
              <span className="text-[10px] md:text-[11px] tracking-[0.5em] font-bold uppercase text-foreground transition-colors duration-1000">
                Kusuf
              </span>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex justify-center items-center gap-10">
            {[
              { to: "/shop", label: "المنتجات" },
              { to: "/essentials", label: "الأساسيات" },
              { to: "/drops", label: "إصدارات" },
              { to: "/about", label: "قصتنا" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative py-2 text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors duration-1000 group"
                activeProps={{ className: "text-foreground font-bold" }}
              >
                {l.label}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
              </Link>
            ))}
          </div>

          {/* Right Utilities */}
          <div className="flex items-center justify-end gap-5 md:gap-8">
            <div className="hidden sm:flex items-center gap-6">
              <button className="text-foreground/90 hover:text-foreground transition-colors duration-1000 hover:-translate-y-0.5 transform">
                <Search className="w-5 h-5" />
              </button>
              <NotificationsBell />

              {user ? (
                <>
                  <Link
                    to="/account"
                    className="p-1 text-foreground/90 hover:text-foreground transition-colors duration-1000"
                    aria-label="Account"
                  >
                    <UserIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="p-1 text-foreground/90 hover:text-foreground transition-colors duration-1000"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-[11px] font-bold tracking-[0.15em] uppercase text-foreground/90 hover:text-foreground transition-colors duration-1000"
                >
                  دخول
                </Link>
              )}
            </div>

            <ThemeToggle />

            <button
              onClick={() => setCartOpen(true)}
              className="hidden md:block relative p-1 text-foreground/90 hover:text-foreground transition-all duration-1000 active:scale-90"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {itemCount > 0 && (
                <span
                  key={itemCount}
                  className="absolute -top-1.5 -right-1.5 bg-primary text-background text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center animate-scale-in transition-colors duration-1000"
                >
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-1 text-foreground/90 hover:text-foreground"
              aria-label="Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {open && (
          <div className="md:hidden mt-4 glass-panel rounded-2xl border p-4 space-y-2 animate-fadeIn">
            {[
              { to: "/shop", label: "المنتجات" },
              { to: "/essentials", label: "الأساسيات" },
              { to: "/drops", label: "إصدارات" },
              { to: "/about", label: "قصتنا" },
              { to: "/contact", label: "تواصل معنا" },
              ...(user ? [{ to: "/account", label: "حسابي" }] : [{ to: "/login", label: "دخول" }]),
              ...(isAdmin ? [{ to: "/admin", label: "لوحة التحكم" }] : []),
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-muted rounded-xl transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
