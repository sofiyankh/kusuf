import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { s as supabase, B as Button } from "./router-argkJYP3.js";
import { ShieldOff, Shield } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
function AdminUsers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    const [{
      data: profiles
    }, {
      data: roles
    }] = await Promise.all([supabase.from("profiles").select("id,name,email,created_at").order("created_at", {
      ascending: false
    }), supabase.from("user_roles").select("user_id,role")]);
    const adminSet = new Set((roles || []).filter((r) => r.role === "admin").map((r) => r.user_id));
    setRows((profiles || []).map((p) => ({
      ...p,
      isAdmin: adminSet.has(p.id)
    })));
    setLoading(false);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const toggleAdmin = async (userId, currentlyAdmin) => {
    if (currentlyAdmin) {
      const {
        error
      } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
      if (error) return toast.error(error.message);
      toast.success("تم إزالة صلاحية المسؤول");
    } else {
      const {
        error
      } = await supabase.from("user_roles").insert({
        user_id: userId,
        role: "admin"
      });
      if (error) return toast.error(error.message);
      toast.success("تم منح صلاحية المسؤول");
    }
    load();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10", dir: "rtl", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-serif font-bold tracking-tighter uppercase", children: "العملاء" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-3 text-lg font-sans tracking-wide", children: [
        "إدارة قاعدة البيانات — ",
        /* @__PURE__ */ jsxs("span", { className: "text-primary font-bold uppercase tracking-widest", children: [
          rows.length,
          " مستخدم"
        ] })
      ] })
    ] }) }),
    loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 opacity-40", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.3em] uppercase", children: "جاري التحميل" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "glass-panel rounded-none p-0 overflow-hidden border-none shadow-none", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-right", children: [
        /* @__PURE__ */ jsx("th", { className: "p-6 text-[10px] font-bold tracking-widest uppercase opacity-50", children: "المستخدم" }),
        /* @__PURE__ */ jsx("th", { className: "p-6 text-[10px] font-bold tracking-widest uppercase opacity-50", children: "البريد الإلكتروني" }),
        /* @__PURE__ */ jsx("th", { className: "p-6 text-[10px] font-bold tracking-widest uppercase opacity-50", children: "تاريخ الانضمام" }),
        /* @__PURE__ */ jsx("th", { className: "p-6 text-[10px] font-bold tracking-widest uppercase opacity-50", children: "الصلاحية" }),
        /* @__PURE__ */ jsx("th", { className: "p-6 text-left text-[10px] font-bold tracking-widest uppercase opacity-50", children: "الإجراءات" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border/30", children: rows.map((r) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-surface/30 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary/10 flex items-center justify-center font-serif font-bold text-primary", children: (r.name || r.email || "?")[0].toUpperCase() }),
          /* @__PURE__ */ jsx("span", { className: "font-serif font-bold text-base tracking-tight", children: r.name || "—" })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "p-6 text-[11px] font-bold opacity-60 tracking-widest uppercase", children: r.email }),
        /* @__PURE__ */ jsx("td", { className: "p-6 text-[11px] font-bold opacity-40 tracking-widest uppercase", children: new Date(r.created_at).toLocaleDateString("ar-TN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }) }),
        /* @__PURE__ */ jsx("td", { className: "p-6", children: r.isAdmin ? /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-[0.2em] uppercase bg-primary text-background px-3 py-1", children: "ADMIN" }) : /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-[0.2em] uppercase border border-border/50 opacity-40 px-3 py-1", children: "CUSTOMER" }) }),
        /* @__PURE__ */ jsx("td", { className: "p-6 text-left", children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => toggleAdmin(r.id, r.isAdmin), className: `rounded-none text-[10px] font-bold tracking-widest uppercase px-6 h-10 transition-all ${r.isAdmin ? "hover:bg-destructive/10 hover:text-destructive" : "hover:bg-primary/10 hover:text-primary"}`, children: r.isAdmin ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(ShieldOff, { className: "w-3.5 h-3.5 ml-2" }),
          " إزالة"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Shield, { className: "w-3.5 h-3.5 ml-2" }),
          " ترقية"
        ] }) }) })
      ] }, r.id)) })
    ] }) }) })
  ] });
}
export {
  AdminUsers as component
};
