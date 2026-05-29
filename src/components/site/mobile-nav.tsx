import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Heart, User as UserIcon } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import CartSidebar from "./cart-sidebar";

export default function MobileNav() {
  const { itemCount, setCartOpen } = useCart();
  const { user } = useAuth();
  const { location } = useRouterState();
  const path = location.pathname;

  const isActive = (p: string) => (p === "/" ? path === "/" : path.startsWith(p));

  const itemClass = (active: boolean) =>
    `flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-500 ${
      active ? "text-primary scale-110" : "text-foreground/90 hover:text-foreground"
    }`;

  return (
    <>
      {/* Spacer so content isn't hidden behind the dock */}
      <div className="md:hidden h-20" aria-hidden />

      <nav
        dir="rtl"
        className="md:hidden fixed bottom-0 inset-x-0 z-[90] bg-surface/90 backdrop-blur-[80px] border-t border-glass-border shadow-2xl transition-all duration-1000 liquid-glass"
      >
        <div className="flex items-stretch justify-around h-20 px-4 pb-[env(safe-area-inset-bottom)]">
          <Link to="/" className={itemClass(isActive("/"))} aria-label="Home">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">خسوف</span>
          </Link>
          <Link to="/shop" className={itemClass(isActive("/shop"))} aria-label="Shop">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">المتجر</span>
          </Link>
          <button onClick={() => setCartOpen(true)} className={itemClass(false)} aria-label="Cart">
            <div className="relative">
              <ShoppingBag className="w-5 h-5 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-background text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center transition-all duration-1000">
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">السلة</span>
          </button>
          <Link
            to={user ? "/account" : "/login"}
            className={itemClass(isActive("/account") || isActive("/login"))}
            aria-label="Account"
          >
            {user ? <UserIcon className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {user ? "حسابي" : "دخول"}
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
