import { useEffect, useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Tables, Enums, Json } from "@/integrations/supabase/types";
import { CartItem } from "@/lib/cart-context";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

interface ShippingAddress {
  name?: string;
  phone?: string;
  city?: string;
}

const STATUS: Enums<"order_status">[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];
const LABEL: Record<string, string> = {
  pending: "قيد الانتظار",
  processing: "قيد المعالجة",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغى",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#c5a880", // Brand Sand
  processing: "#a08e70", // Muted Gold
  shipped: "#2d2a26", // Deep Charcoal
  delivered: "#141414", // Near Black
  cancelled: "#ef4444",
};

function AdminOrders() {
  const [orders, setOrders] = useState<Tables<"orders">[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders((data as Tables<"orders">[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: status as Enums<"order_status"> })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم تحديث الحالة");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };

  return (
    <div className="space-y-10" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter uppercase">
            الطلبات
          </h1>
          <p className="text-muted-foreground mt-3 text-lg font-sans tracking-wide">
            إدارة المبيعات — <span className="text-primary font-bold uppercase tracking-widest">{orders.length} طلب</span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-40">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase">جاري التحميل</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-32 glass-panel rounded-none">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">لا توجد طلبات مسجلة</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => {
            const addr = o.shipping_address as unknown as ShippingAddress;
            const items = (Array.isArray(o.items) ? (o.items as unknown as CartItem[]) : []);
            return (
              <div key={o.id} className="glass-panel rounded-none p-8 border-none hover:bg-surface/50 transition-all duration-500">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-primary text-background px-3 py-1">
                        {o.order_number || `#${o.id.slice(0, 8)}`}
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
                        {new Date(o.created_at).toLocaleString("ar-TN", { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                      <div>
                        <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-3">تفاصيل المنتجات</h3>
                        <div className="space-y-3">
                          {items.map((it, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              <span className="font-serif font-bold tracking-tight">{it.name} <span className="text-[10px] opacity-40 ml-2">x{it.quantity}</span></span>
                              <span className="font-bold opacity-60">{(Number(it.price) * it.quantity).toFixed(2)} د.ت</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-3">معلومات الشحن</h3>
                        <div className="space-y-1">
                          <p className="font-serif font-bold text-base">{addr?.name || "زائر"}</p>
                          <p className="text-[11px] font-bold opacity-60 tracking-widest uppercase">{addr?.phone}</p>
                          <p className="text-[11px] font-bold opacity-40 tracking-widest uppercase">{addr?.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-px lg:h-32 bg-border/30" />

                  <div className="flex flex-col lg:items-end justify-between gap-6 lg:min-w-[240px]">
                    <div className="flex items-center lg:justify-end gap-3">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30">الإجمالي</span>
                        <span className="text-3xl font-serif font-bold text-primary">{Number(o.total_amount).toFixed(2)} د.ت</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                      <div className="relative flex-1 lg:flex-none">
                        <select
                          value={o.status}
                          onChange={(e) => updateStatus(o.id, e.target.value)}
                          className="w-full lg:w-48 h-12 px-4 bg-surface/80 border border-border rounded-none text-[10px] font-bold tracking-widest uppercase appearance-none focus:border-primary outline-none transition-all cursor-pointer"
                          style={{ color: STATUS_COLORS[o.status] }}
                        >
                          {STATUS.map((s) => (
                            <option key={s} value={s} className="bg-background text-foreground">
                              {LABEL[s].toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_COLORS[o.status] }} />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(o.id)}
                        className="h-12 w-12 hover:bg-destructive/10 hover:text-destructive rounded-none transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

