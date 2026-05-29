import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Json } from "@/integrations/supabase/types";

export interface CartItem {
  id: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock?: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "Kusuf_cart";

// Helper to get unique key for cart items
export const getCartKey = (item: { id: string; variantId?: string }) =>
  `${item.id}-${item.variantId || "base"}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [dbLoaded, setDbLoaded] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  // 1. Initial hydration from localStorage
  useEffect(() => {
    console.log("Cart: Initializing hydration...");
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log("Cart: Hydrated from storage", parsed);
        setItems(parsed);
      }
    } catch (err) {
      console.error("Cart: Hydration failed", err);
    }
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setItems(updated);
        } catch (err) {
          console.error("Cart: Storage event sync failed", err);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 2. Fetch from DB and merge
  useEffect(() => {
    if (!user || !hydrated || dbLoaded) return;

    const loadCart = async () => {
      console.log("Cart: Fetching from DB for user", user.id);
      try {
        const { data, error } = await supabase
          .from("carts")
          .select("items")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (data?.items) {
          const dbItems = data.items as unknown as CartItem[];
          console.log("Cart: DB data received", dbItems);
          setItems((prev) => {
            const merged = [...dbItems];
            prev.forEach((local) => {
              const localKey = getCartKey(local);
              const idx = merged.findIndex((i) => getCartKey(i) === localKey);
              if (idx > -1) {
                merged[idx].quantity = Math.min(
                  merged[idx].quantity + local.quantity,
                  merged[idx].stock ?? Infinity,
                );
              } else {
                merged.push(local);
              }
            });
            return merged;
          });
        }
      } catch (err) {
        console.error("Cart: DB load failed", err);
      } finally {
        setDbLoaded(true);
      }
    };
    loadCart();
  }, [user, hydrated, dbLoaded]);

  // 3. Reset on logout
  useEffect(() => {
    if (!user) {
      setDbLoaded(false);
    }
  }, [user]);

  // 4. Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    console.log("Cart: Persisting to localStorage", items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  // 5. Persist to DB (debounced)
  useEffect(() => {
    if (!user || !hydrated || !dbLoaded) return;

    const timer = setTimeout(() => {
      console.log("Cart: Syncing to Supabase...");
      supabase
        .from("carts")
        .upsert({
          user_id: user.id,
          items: items as unknown as Json,
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.error("Cart: DB sync error", error);
          else console.log("Cart: DB sync success");
        });
    }, 2000); // 2s debounce for stability

    return () => clearTimeout(timer);
  }, [items, user, hydrated, dbLoaded]);

  const addToCart = (newItem: CartItem) => {
    console.log("Cart: Attempting to add item", newItem.id, newItem.name);

    let actionType: string = "added";

    setItems((prev) => {
      const newKey = getCartKey(newItem);
      const existingIdx = prev.findIndex((i) => getCartKey(i) === newKey);
      const cap = newItem.stock ?? Infinity;

      if (existingIdx > -1) {
        const existing = prev[existingIdx];
        const nextQty = Math.min(existing.quantity + newItem.quantity, cap);

        if (nextQty === existing.quantity) {
          actionType = "limit";
          return prev;
        }

        const updated = [...prev];
        updated[existingIdx] = { ...existing, quantity: nextQty };
        actionType = "updated";
        return updated;
      }

      actionType = "added";
      return [...prev, { ...newItem, quantity: Math.min(newItem.quantity, cap) }];
    });

    // Trigger toasts after state update request
    if (actionType === "limit") {
      toast.warning("وصلت للحد الأقصى");
    } else if (actionType === "updated") {
      toast.success("تمت الإضافة إلى السلة");
    } else {
      toast.success("تمت الإضافة إلى السلة");
    }

    setCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    console.log("Cart: Attempting to remove item", cartItemId);
    let removedItemName = "";

    setItems((prev) => {
      const item = prev.find((i) => getCartKey(i) === cartItemId);
      if (item) removedItemName = item.name;
      return prev.filter((i) => getCartKey(i) !== cartItemId);
    });

    if (removedItemName) {
      toast.info("تم تعديل السلة");
    }
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    console.log("Cart: Updating quantity", cartItemId, quantity);
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (getCartKey(i) !== cartItemId) return i;
        const cap = i.stock ?? Infinity;
        return { ...i, quantity: Math.min(quantity, cap) };
      }),
    );
  };

  const clearCart = () => {
    console.log("Cart: Clearing...");
    setItems([]);
  };

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
