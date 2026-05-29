import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { s as supabase, B as Button } from "./router-argkJYP3.js";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
const STATUS = ["pending", "processing", "shipped", "delivered", "cancelled"];
const LABEL = {
  pending: "قيد الانتظار",
  processing: "قيد المعالجة",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغى"
};
const STATUS_COLORS = {
  pending: "#c5a880",
  // Brand Sand
  processing: "#a08e70",
  // Muted Gold
  shipped: "#2d2a26",
  // Deep Charcoal
  delivered: "#141414",
  // Near Black
  cancelled: "#ef4444"
};
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("orders").select("*").order("created_at", {
      ascending: false
    });
    setOrders(data || []);
    setLoading(false);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const updateStatus = async (id, status) => {
    const {
      error
    } = await supabase.from("orders").update({
      status
    }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم تحديث الحالة");
    load();
  };
  const remove = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
    const {
      error
    } = await supabase.from("orders").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10", dir: "rtl", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-serif font-bold tracking-tighter uppercase", children: "الطلبات" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-3 text-lg font-sans tracking-wide", children: [
        "إدارة المبيعات — ",
        /* @__PURE__ */ jsxs("span", { className: "text-primary font-bold uppercase tracking-widest", children: [
          orders.length,
          " طلب"
        ] })
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 opacity-40", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.3em] uppercase", children: "جاري التحميل" })
    ] }) : orders.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-32 glass-panel rounded-none", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-40", children: "لا توجد طلبات مسجلة" }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-6", children: orders.map((o) => {
      const addr = o.shipping_address;
      const items = Array.isArray(o.items) ? o.items : [];
      return /* @__PURE__ */ jsx("div", { className: "glass-panel rounded-none p-8 border-none hover:bg-surface/50 transition-all duration-500", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono font-bold tracking-widest uppercase bg-primary text-background px-3 py-1", children: o.order_number || `#${o.id.slice(0, 8)}` }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.2em] uppercase opacity-40", children: new Date(o.created_at).toLocaleString("ar-TN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-3", children: "تفاصيل المنتجات" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: items.map((it, i) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                /* @__PURE__ */ jsxs("span", { className: "font-serif font-bold tracking-tight", children: [
                  it.name,
                  " ",
                  /* @__PURE__ */ jsxs("span", { className: "text-[10px] opacity-40 ml-2", children: [
                    "x",
                    it.quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "font-bold opacity-60", children: [
                  (Number(it.price) * it.quantity).toFixed(2),
                  " د.ت"
                ] })
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-3", children: "معلومات الشحن" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("p", { className: "font-serif font-bold text-base", children: addr?.name || "زائر" }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold opacity-60 tracking-widest uppercase", children: addr?.phone }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold opacity-40 tracking-widest uppercase", children: addr?.city })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:w-px lg:h-32 bg-border/30" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:items-end justify-between gap-6 lg:min-w-[240px]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center lg:justify-end gap-3", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-30", children: "الإجمالي" }),
            /* @__PURE__ */ jsxs("span", { className: "text-3xl font-serif font-bold text-primary", children: [
              Number(o.total_amount).toFixed(2),
              " د.ت"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 w-full lg:w-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1 lg:flex-none", children: [
              /* @__PURE__ */ jsx("select", { value: o.status, onChange: (e) => updateStatus(o.id, e.target.value), className: "w-full lg:w-48 h-12 px-4 bg-surface/80 border border-border rounded-none text-[10px] font-bold tracking-widest uppercase appearance-none focus:border-primary outline-none transition-all cursor-pointer", style: {
                color: STATUS_COLORS[o.status]
              }, children: STATUS.map((s) => /* @__PURE__ */ jsx("option", { value: s, className: "bg-background text-foreground", children: LABEL[s].toUpperCase() }, s)) }),
              /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full", style: {
                background: STATUS_COLORS[o.status]
              } }) })
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(o.id), className: "h-12 w-12 hover:bg-destructive/10 hover:text-destructive rounded-none transition-all", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
          ] })
        ] })
      ] }) }, o.id);
    }) })
  ] });
}
export {
  AdminOrders as component
};
