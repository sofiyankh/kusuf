import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, getCartKey } from "@/lib/cart-context";
import { Drawer } from "vaul";
import { useIsMobile } from "@/hooks/use-mobile";

import { UnifiedModal } from "@/components/ui/unified-modal";

export default function CartSidebar() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    total,
    isCartOpen: isOpen,
    setCartOpen,
  } = useCart();
  const isMobile = useIsMobile();
  const onClose = () => setCartOpen(false);

  return (
    <UnifiedModal
      isOpen={isOpen}
      onOpenChange={setCartOpen}
      title="سلة التسوق"
      description="منتجاتك المختارة في سلة التسوق"
      className={isMobile ? "p-0" : "max-w-lg p-0 overflow-hidden"}
    >
      <div className="flex flex-col h-[80vh] md:h-[85vh] overflow-hidden" dir="rtl">
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2 transition-colors">
            <ShoppingBag className="w-5 h-5 text-primary transition-colors" />
            سلة التسوق
          </h2>
          {!isMobile && (
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 rounded-lg hover:bg-glass-bg transition-colors"
            >
              <X className="w-5 h-5 text-foreground transition-colors" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-foreground/90 transition-colors">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>سلتك فارغة</p>
            </div>
          ) : (
            items.map((item) => {
              const itemKey = getCartKey(item);
              return (
                <div
                  key={itemKey}
                  className="flex gap-4 p-4 rounded-xl border border-glass-border bg-glass-bg backdrop-blur-md transition-all hover:border-primary/30"
                >
                  <img
                    src={item.image || "/images/22a9a9710a0a5596583a23521e5fe49d.jpg"}
                    alt={item.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                    }}
                    className="w-20 h-20 object-cover rounded-lg bg-foreground/5 flex-shrink-0 transition-colors"
                  />

                  <div className="flex-1 min-w-0 text-right">
                    <h3 className="font-semibold text-sm line-clamp-2 text-foreground transition-colors">
                      {item.name}
                    </h3>
                    {item.selectedSize && (
                      <p className="text-[10px] font-bold tracking-widest text-foreground/90 mt-1 transition-colors">
                        SIZE: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-primary font-bold text-sm mt-1 transition-colors">
                      {item.price.toFixed(2)} د.ت
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        aria-label="Decrease"
                        onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                        className="p-1 rounded border border-glass-border hover:bg-primary hover:text-background transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-6 text-center text-foreground transition-colors">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase"
                        onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                        disabled={item.stock !== undefined && item.quantity >= item.stock}
                        className="p-1 rounded border border-glass-border hover:bg-primary hover:text-background disabled:opacity-10 transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        aria-label="Remove"
                        onClick={() => removeFromCart(itemKey)}
                        className="p-1 mr-auto rounded text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-glass-border p-6 space-y-3 bg-surface/50 backdrop-blur-xl transition-all">
            <div className="flex justify-between text-lg font-semibold text-foreground transition-colors">
              <span>المجموع</span>
              <span className="text-primary transition-colors">{total.toFixed(2)} د.ت</span>
            </div>
            <Link to="/checkout" onClick={onClose} className="block">
              <Button className="w-full luxury-button-square h-auto py-5">إتمام الطلب</Button>
            </Link>
          </div>
        )}
      </div>
    </UnifiedModal>
  );
}
