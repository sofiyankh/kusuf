import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import {
  ShoppingCart,
  TrendingUp,
  Package,
  Users,
  AlertTriangle,
  Clock,
  Inbox,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const STATUS_COLORS: Record<string, string> = {
  pending: "#c5a880", // Brand Sand
  processing: "#a08e70", // Muted Gold
  shipped: "#2d2a26", // Deep Charcoal
  delivered: "#141414", // Near Black
  cancelled: "#ef4444", // Keep red for cancel but muted if possible
};

const STATUS_LABEL: Record<string, string> = {
  pending: "قيد الانتظار",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغى",
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const points = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={32}>
      <LineChart data={points}>
        <Line 
          type="monotone" 
          dataKey="v" 
          stroke={color} 
          strokeWidth={1.5} 
          dot={false}
          isAnimationActive={false} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    products: 0,
    users: 0,
    todayRev: 0,
    pending: 0,
  });
  const [byStatus, setByStatus] = useState<{ name: string; value: number; key: string }[]>([]);
  const [byDay, setByDay] = useState<{ day: string; orders: number; revenue: number }[]>([]);
  const [recent, setRecent] = useState<Tables<"orders">[]>([]);
  const [lowStock, setLowStock] = useState<Tables<"products">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: ordersData }, { count: prodCount }, { count: userCount }, { data: low }] =
        await Promise.all([
          supabase.from("orders").select("*").order("created_at", { ascending: false }),
          supabase.from("products").select("*", { count: "exact", head: true }),
          supabase.from("profiles").select("*", { count: "exact", head: true }),
          supabase
            .from("products")
            .select("*")
            .lt("stock", 5)
            .order("stock", { ascending: true })
            .limit(5),
        ]);
      const orders = (ordersData as Tables<"orders">[]) || [];
      const revenue = orders.reduce((s, o) => s + Number(o.total_amount || 0), 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayRev = orders
        .filter((o) => new Date(o.created_at) >= today)
        .reduce((s, o) => s + Number(o.total_amount || 0), 0);
      const pending = orders.filter((o) => o.status === "pending").length;

      const counts: Record<string, number> = {};
      orders.forEach((o) => {
        counts[o.status] = (counts[o.status] || 0) + 1;
      });
      setByStatus(
        Object.entries(counts).map(([k, v]) => ({ key: k, name: STATUS_LABEL[k] || k, value: v })),
      );

      const days: { day: string; orders: number; revenue: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        const next = new Date(d);
        next.setDate(d.getDate() + 1);
        const dayOrders = orders.filter((o) => {
          const t = new Date(o.created_at);
          return t >= d && t < next;
        });
        days.push({
          day: d.toLocaleDateString("ar-TN", { weekday: "short" }),
          orders: dayOrders.length,
          revenue: dayOrders.reduce((s, o) => s + Number(o.total_amount || 0), 0),
        });
      }
      setByDay(days);

      setRecent(orders.slice(0, 4)); // Less items for compact view
      setLowStock((low as Tables<"products">[]) || []);
      setStats({
        orders: orders.length,
        revenue,
        products: prodCount || 0,
        users: userCount || 0,
        todayRev,
        pending,
      });
      setLoading(false);
    })();
  }, []);

  const revSpark = byDay.map((d) => d.revenue);
  const ordSpark = byDay.map((d) => d.orders);

  const cards = [
    { label: "إيرادات اليوم", value: `${stats.todayRev.toFixed(2)} د.ت`, icon: TrendingUp, color: "text-primary", spark: revSpark, sparkColor: "#c5a880" },
    { label: "إيرادات إجمالية", value: `${stats.revenue.toFixed(2)} د.ت`, icon: Sparkles, color: "text-primary", spark: revSpark, sparkColor: "#c5a880" },
    { label: "إجمالي الطلبات", value: stats.orders, icon: ShoppingCart, color: "text-foreground", spark: ordSpark, sparkColor: "#2d2a26" },
    { label: "في الانتظار", value: stats.pending, icon: Clock, color: "text-primary" },
    { label: "المنتجات", value: stats.products, icon: Package, color: "text-foreground" },
    { label: "العملاء", value: stats.users, icon: Users, color: "text-primary" },
  ];

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden" dir="rtl">
      {/* Header - Compact */}
      <div className="flex items-end justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tighter uppercase leading-none">
            Dashboard
          </h1>
          <p className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase mt-1 opacity-60">
            Real-time shop performance
          </p>
        </div>
      </div>

      {/* KPI Cards — Very Compact Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 shrink-0">
        {cards.map((c) => (
          <div
            key={c.label}
            className="glass-panel p-3 border-none flex flex-col justify-between h-24"
          >
            <div className="flex items-start justify-between">
              <p className="text-[8px] text-muted-foreground font-bold tracking-[0.2em] uppercase">{c.label}</p>
              <c.icon className={`w-3 h-3 ${c.color} opacity-40`} />
            </div>
            <p className="text-lg font-serif font-bold tracking-tight">
              {loading ? "..." : c.value}
            </p>
            {c.spark && c.spark.some((v) => v > 0) && (
              <div className="mt-1 opacity-40 h-4">
                <Sparkline data={c.spark} color={c.sparkColor!} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Analytics Section — Main Fixed Area */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-3 gap-4">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">Performance Overview</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary" />
                <span className="text-[8px] font-bold tracking-widest uppercase opacity-40">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-foreground" />
                <span className="text-[8px] font-bold tracking-widest uppercase opacity-40">Orders</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            {byDay.every((d) => d.orders === 0 && d.revenue === 0) ? (
              <EmptyState icon={Inbox} text="No data available" small />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={byDay} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c5a880" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#c5a880" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" stroke="rgba(197, 168, 128, 0.05)" vertical={false} />
                  <XAxis dataKey="day" fontSize={8} tickLine={false} axisLine={false} tick={{ fill: "currentColor", opacity: 0.3 }} />
                  <YAxis fontSize={8} tickLine={false} axisLine={false} tick={{ fill: "currentColor", opacity: 0.3 }} />
                  <Tooltip isAnimationActive={false} contentStyle={{ background: "var(--surface)", border: "none", fontSize: "10px", borderRadius: 0 }} />
                  <Area type="monotone" dataKey="revenue" stroke="#c5a880" strokeWidth={1.5} fill="url(#gradRev)" isAnimationActive={false} />
                  <Line type="monotone" dataKey="orders" stroke="currentColor" strokeWidth={1.5} dot={false} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Distribution & Low Stock — Column */}
        <div className="flex flex-col gap-4 min-h-0">
          <div className="flex-1 glass-panel p-6 flex flex-col">
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-4 text-center">Status Distribution</h2>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="90%" paddingAngle={4} isAnimationActive={false}>
                    {byStatus.map((s) => (
                      <Cell key={s.key} fill={STATUS_COLORS[s.key] || "#c5a880"} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip isAnimationActive={false} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="h-40 glass-panel p-5 overflow-hidden shrink-0">
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-primary" /> Inventory
            </h2>
            <div className="space-y-1.5 overflow-y-auto h-full pr-1 no-scrollbar">
              {lowStock.length === 0 ? (
                <p className="text-[8px] uppercase tracking-widest opacity-30 text-center py-4">Sufficient stock</p>
              ) : (
                lowStock.map((p) => (
                  <div key={p.id} className="flex justify-between items-center text-[10px] p-2 bg-surface/20 border border-border/20">
                    <span className="truncate max-w-[120px] font-serif">{p.name_ar || p.name}</span>
                    <span className="font-bold text-destructive">{p.stock}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Row — Compact */}
      <div className="h-48 glass-panel p-6 shrink-0 flex flex-col">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">Latest Transactions</h2>
          <button className="text-[8px] font-bold tracking-widest uppercase text-primary hover:underline transition-all">Export</button>
        </div>
        <div className="flex-1 overflow-hidden">
          <table className="w-full">
            <tbody className="divide-y divide-border/20">
              {recent.map((o) => {
                const num = o.order_number || `#${o.id.slice(0, 8)}`;
                const addr = o.shipping_address as unknown as Record<string, string>;
                return (
                  <tr key={o.id} className="hover:bg-surface/30 transition-colors">
                    <td className="py-2">
                      <div className="flex flex-col">
                        <span className="font-serif font-bold text-xs tracking-tight leading-none">{addr?.name || "Guest"}</span>
                        <span className="text-[8px] font-mono font-bold opacity-30 uppercase">{num}</span>
                      </div>
                    </td>
                    <td className="py-2 text-[9px] font-bold opacity-30 hidden sm:table-cell uppercase tracking-tighter">
                      {new Date(o.created_at).toLocaleDateString("ar-TN")}
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ background: STATUS_COLORS[o.status] }} />
                        <span className="text-[8px] font-bold tracking-widest uppercase opacity-40">{STATUS_LABEL[o.status]}</span>
                      </div>
                    </td>
                    <td className="py-2 text-left font-serif font-bold text-primary text-xs">
                      {Number(o.total_amount).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  text,
  small,
}: {
  icon: React.ElementType;
  text: string;
  small?: boolean;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-12">
      <div
        className={`${small ? "w-16 h-16" : "w-24 h-24"} bg-surface/50 border border-border flex items-center justify-center mb-6`}
      >
        <Icon className={`${small ? "w-6 h-6" : "w-10 h-10"} text-muted-foreground/30`} />
      </div>
      <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">{text}</p>
    </div>
  );
}

