import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Mail, Check, Trash2 } from "lucide-react";
import { B as Button, s as supabase } from "./router-argkJYP3.js";
import { toast } from "sonner";
import "@tanstack/react-router";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
function AdminMessages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("contact_messages").select("*").order("created_at", {
      ascending: false
    });
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const markRead = async (id) => {
    await supabase.from("contact_messages").update({
      read: true
    }).eq("id", id);
    load();
  };
  const remove = async (id) => {
    if (!confirm("حذف هذه الرسالة؟")) return;
    const {
      error
    } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold tracking-tight flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(Mail, { className: "w-8 h-8 text-primary" }),
        " الرسائل"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "رسائل العملاء من نموذج التواصل" })
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "جاري التحميل..." }) : items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-12 text-center border border-border/40", children: [
      /* @__PURE__ */ jsx(Mail, { className: "w-12 h-12 mx-auto text-muted-foreground/40 mb-3" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "لا توجد رسائل" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: items.map((m) => /* @__PURE__ */ jsxs("div", { className: `glass rounded-2xl border p-5 transition-all ${m.read ? "border-border/40 opacity-70" : "border-primary/30 shadow-md"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-foreground", children: m.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: m.email }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: new Date(m.created_at).toLocaleString("ar-TN") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          !m.read && /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => markRead(m.id), children: [
            /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 ml-1" }),
            " قراءة"
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(m.id), className: "text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm whitespace-pre-wrap", children: m.message })
    ] }, m.id)) })
  ] });
}
export {
  AdminMessages as component
};
