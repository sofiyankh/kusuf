import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { s as supabase } from "./router-argkJYP3.js";
import { TrendingUp, Sparkles, ShoppingCart, Clock, Package, Users, Inbox, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line, PieChart, Pie, Cell, LineChart } from "recharts";
import "@tanstack/react-router";
import "sonner";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
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
  // Keep red for cancel but muted if possible
};
const STATUS_LABEL = {
  pending: "قيد الانتظار",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغى"
};
function Sparkline({
  data,
  color
}) {
  const points = data.map((v, i) => ({
    i,
    v
  }));
  return /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 32, children: /* @__PURE__ */ jsx(LineChart, { data: points, children: /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "v", stroke: color, strokeWidth: 1.5, dot: false, isAnimationActive: false }) }) });
}
function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    products: 0,
    users: 0,
    todayRev: 0,
    pending: 0
  });
  const [byStatus, setByStatus] = useState([]);
  const [byDay, setByDay] = useState([]);
  const [recent, setRecent] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const [{
        data: ordersData
      }, {
        count: prodCount
      }, {
        count: userCount
      }, {
        data: low
      }] = await Promise.all([supabase.from("orders").select("*").order("created_at", {
        ascending: false
      }), supabase.from("products").select("*", {
        count: "exact",
        head: true
      }), supabase.from("profiles").select("*", {
        count: "exact",
        head: true
      }), supabase.from("products").select("*").lt("stock", 5).order("stock", {
        ascending: true
      }).limit(5)]);
      const orders = ordersData || [];
      const revenue = orders.reduce((s, o) => s + Number(o.total_amount || 0), 0);
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const todayRev = orders.filter((o) => new Date(o.created_at) >= today).reduce((s, o) => s + Number(o.total_amount || 0), 0);
      const pending = orders.filter((o) => o.status === "pending").length;
      const counts = {};
      orders.forEach((o) => {
        counts[o.status] = (counts[o.status] || 0) + 1;
      });
      setByStatus(Object.entries(counts).map(([k, v]) => ({
        key: k,
        name: STATUS_LABEL[k] || k,
        value: v
      })));
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = /* @__PURE__ */ new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        const next = new Date(d);
        next.setDate(d.getDate() + 1);
        const dayOrders = orders.filter((o) => {
          const t = new Date(o.created_at);
          return t >= d && t < next;
        });
        days.push({
          day: d.toLocaleDateString("ar-TN", {
            weekday: "short"
          }),
          orders: dayOrders.length,
          revenue: dayOrders.reduce((s, o) => s + Number(o.total_amount || 0), 0)
        });
      }
      setByDay(days);
      setRecent(orders.slice(0, 4));
      setLowStock(low || []);
      setStats({
        orders: orders.length,
        revenue,
        products: prodCount || 0,
        users: userCount || 0,
        todayRev,
        pending
      });
      setLoading(false);
    })();
  }, []);
  const revSpark = byDay.map((d) => d.revenue);
  const ordSpark = byDay.map((d) => d.orders);
  const cards = [{
    label: "إيرادات اليوم",
    value: `${stats.todayRev.toFixed(2)} د.ت`,
    icon: TrendingUp,
    color: "text-primary",
    spark: revSpark,
    sparkColor: "#c5a880"
  }, {
    label: "إيرادات إجمالية",
    value: `${stats.revenue.toFixed(2)} د.ت`,
    icon: Sparkles,
    color: "text-primary",
    spark: revSpark,
    sparkColor: "#c5a880"
  }, {
    label: "إجمالي الطلبات",
    value: stats.orders,
    icon: ShoppingCart,
    color: "text-foreground",
    spark: ordSpark,
    sparkColor: "#2d2a26"
  }, {
    label: "في الانتظار",
    value: stats.pending,
    icon: Clock,
    color: "text-primary"
  }, {
    label: "المنتجات",
    value: stats.products,
    icon: Package,
    color: "text-foreground"
  }, {
    label: "العملاء",
    value: stats.users,
    icon: Users,
    color: "text-primary"
  }];
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col gap-4 overflow-hidden", dir: "rtl", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-end justify-between shrink-0", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-serif font-bold tracking-tighter uppercase leading-none", children: "Dashboard" }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase mt-1 opacity-60", children: "Real-time shop performance" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 shrink-0", children: cards.map((c) => /* @__PURE__ */ jsxs("div", { className: "glass-panel p-3 border-none flex flex-col justify-between h-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[8px] text-muted-foreground font-bold tracking-[0.2em] uppercase", children: c.label }),
        /* @__PURE__ */ jsx(c.icon, { className: `w-3 h-3 ${c.color} opacity-40` })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-serif font-bold tracking-tight", children: loading ? "..." : c.value }),
      c.spark && c.spark.some((v) => v > 0) && /* @__PURE__ */ jsx("div", { className: "mt-1 opacity-40 h-4", children: /* @__PURE__ */ jsx(Sparkline, { data: c.spark, color: c.sparkColor }) })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-h-0 grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 glass-panel p-6 flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 shrink-0", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xs font-bold tracking-[0.2em] uppercase opacity-60", children: "Performance Overview" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-primary" }),
              /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold tracking-widest uppercase opacity-40", children: "Revenue" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-foreground" }),
              /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold tracking-widest uppercase opacity-40", children: "Orders" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0", children: byDay.every((d) => d.orders === 0 && d.revenue === 0) ? /* @__PURE__ */ jsx(EmptyState, { icon: Inbox, text: "No data available", small: true }) : /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: byDay, margin: {
          top: 5,
          right: 5,
          left: -20,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "gradRev", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#c5a880", stopOpacity: 0.1 }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#c5a880", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "0", stroke: "rgba(197, 168, 128, 0.05)", vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "day", fontSize: 8, tickLine: false, axisLine: false, tick: {
            fill: "currentColor",
            opacity: 0.3
          } }),
          /* @__PURE__ */ jsx(YAxis, { fontSize: 8, tickLine: false, axisLine: false, tick: {
            fill: "currentColor",
            opacity: 0.3
          } }),
          /* @__PURE__ */ jsx(Tooltip, { isAnimationActive: false, contentStyle: {
            background: "var(--surface)",
            border: "none",
            fontSize: "10px",
            borderRadius: 0
          } }),
          /* @__PURE__ */ jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "#c5a880", strokeWidth: 1.5, fill: "url(#gradRev)", isAnimationActive: false }),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "orders", stroke: "currentColor", strokeWidth: 1.5, dot: false, isAnimationActive: false })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 min-h-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 glass-panel p-6 flex flex-col", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-4 text-center", children: "Status Distribution" }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
            /* @__PURE__ */ jsx(Pie, { data: byStatus, dataKey: "value", nameKey: "name", innerRadius: "60%", outerRadius: "90%", paddingAngle: 4, isAnimationActive: false, children: byStatus.map((s) => /* @__PURE__ */ jsx(Cell, { fill: STATUS_COLORS[s.key] || "#c5a880", stroke: "none" }, s.key)) }),
            /* @__PURE__ */ jsx(Tooltip, { isAnimationActive: false })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "h-40 glass-panel p-5 overflow-hidden shrink-0", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3 h-3 text-primary" }),
            " Inventory"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-1.5 overflow-y-auto h-full pr-1 no-scrollbar", children: lowStock.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-[8px] uppercase tracking-widest opacity-30 text-center py-4", children: "Sufficient stock" }) : lowStock.map((p) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-[10px] p-2 bg-surface/20 border border-border/20", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate max-w-[120px] font-serif", children: p.name_ar || p.name }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-destructive", children: p.stock })
          ] }, p.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "h-48 glass-panel p-6 shrink-0 flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 shrink-0", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[10px] font-bold tracking-[0.2em] uppercase opacity-40", children: "Latest Transactions" }),
        /* @__PURE__ */ jsx("button", { className: "text-[8px] font-bold tracking-widest uppercase text-primary hover:underline transition-all", children: "Export" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsx("table", { className: "w-full", children: /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border/20", children: recent.map((o) => {
        const num = o.order_number || `#${o.id.slice(0, 8)}`;
        const addr = o.shipping_address;
        return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-surface/30 transition-colors", children: [
          /* @__PURE__ */ jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "font-serif font-bold text-xs tracking-tight leading-none", children: addr?.name || "Guest" }),
            /* @__PURE__ */ jsx("span", { className: "text-[8px] font-mono font-bold opacity-30 uppercase", children: num })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "py-2 text-[9px] font-bold opacity-30 hidden sm:table-cell uppercase tracking-tighter", children: new Date(o.created_at).toLocaleDateString("ar-TN") }),
          /* @__PURE__ */ jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full", style: {
              background: STATUS_COLORS[o.status]
            } }),
            /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold tracking-widest uppercase opacity-40", children: STATUS_LABEL[o.status] })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "py-2 text-left font-serif font-bold text-primary text-xs", children: Number(o.total_amount).toFixed(2) })
        ] }, o.id);
      }) }) }) })
    ] })
  ] });
}
function EmptyState({
  icon: Icon,
  text,
  small
}) {
  return /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center py-12", children: [
    /* @__PURE__ */ jsx("div", { className: `${small ? "w-16 h-16" : "w-24 h-24"} bg-surface/50 border border-border flex items-center justify-center mb-6`, children: /* @__PURE__ */ jsx(Icon, { className: `${small ? "w-6 h-6" : "w-10 h-10"} text-muted-foreground/30` }) }),
    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-40", children: text })
  ] });
}
export {
  AdminDashboard as component
};
