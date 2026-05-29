import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { s as supabase, B as Button } from "./router-argkJYP3.js";
import { I as Input } from "./input-sMDTmqyi.js";
import { T as Textarea } from "./textarea-BL7vV12y.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DrHuHI_M.js";
import { Plus, Tag, Power, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "vaul";
const empty = {
  title: "",
  title_ar: "",
  description_ar: "",
  discount_pct: "10",
  category: "",
  starts_at: "",
  ends_at: "",
  active: true
};
function AdminOffers() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const load = useCallback(async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("offers").select("*").order("created_at", {
      ascending: false
    });
    setList(data || []);
    setLoading(false);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const save = async () => {
    const payload = {
      title: form.title,
      title_ar: form.title_ar || null,
      description_ar: form.description_ar || null,
      discount_pct: Number(form.discount_pct),
      category: form.category || null,
      starts_at: form.starts_at || null,
      ends_at: form.ends_at || null,
      active: form.active
    };
    const {
      error
    } = form.id ? await supabase.from("offers").update(payload).eq("id", form.id) : await supabase.from("offers").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(form.id ? "تم التحديث" : "تمت الإضافة");
    setOpen(false);
    setForm(empty);
    load();
  };
  const toggleActive = async (o) => {
    await supabase.from("offers").update({
      active: !o.active
    }).eq("id", o.id);
    load();
  };
  const remove = async (id) => {
    if (!confirm("حذف هذا العرض؟")) return;
    await supabase.from("offers").delete().eq("id", id);
    toast("تم الحذف");
    load();
  };
  const openEdit = (o) => {
    setForm({
      id: o.id,
      title: o.title,
      title_ar: o.title_ar || "",
      description_ar: o.description_ar || "",
      discount_pct: String(o.discount_pct),
      category: o.category || "",
      starts_at: o.starts_at ? o.starts_at.slice(0, 16) : "",
      ends_at: o.ends_at ? o.ends_at.slice(0, 16) : "",
      active: o.active
    });
    setOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10", dir: "rtl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-serif font-bold tracking-tighter uppercase", children: "العروض" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-3 text-lg font-sans tracking-wide", children: [
          "الحملات الترويجية والخصومات — ",
          /* @__PURE__ */ jsxs("span", { className: "text-primary font-bold uppercase tracking-widest", children: [
            list.length,
            " حملة"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => {
        setForm(empty);
        setOpen(true);
      }, className: "luxury-button-square", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 ml-2" }),
        " إضافة عرض"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 opacity-40", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.3em] uppercase", children: "جاري التحميل" })
    ] }) : list.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-32 glass-panel rounded-none", children: [
      /* @__PURE__ */ jsx(Tag, { className: "w-10 h-10 mx-auto text-muted-foreground/20 mb-6" }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-40", children: "لا توجد عروض ترويجية متاحة" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: list.map((o) => /* @__PURE__ */ jsxs("div", { className: `group glass-panel rounded-none p-8 transition-all duration-500 border-none ${o.active ? "bg-surface/50" : "opacity-50 grayscale"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-4xl font-serif font-bold text-primary tracking-tighter", children: [
            "-",
            o.discount_pct,
            "%"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mt-1", children: "Discount Rate" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => toggleActive(o), className: `w-10 h-10 rounded-none transition-all ${o.active ? "text-primary hover:bg-primary/10" : "text-muted-foreground hover:bg-surface"}`, children: /* @__PURE__ */ jsx(Power, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => openEdit(o), className: "w-10 h-10 rounded-none hover:bg-primary/10 hover:text-primary", children: /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(o.id), className: "w-10 h-10 rounded-none hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-serif font-bold tracking-tight mb-2", children: o.title_ar || o.title }),
      o.description_ar && /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold opacity-60 tracking-wide line-clamp-2 min-h-[32px]", children: o.description_ar }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-border/30", children: [
        o.category && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold tracking-widest uppercase bg-primary/10 text-primary px-3 py-1", children: o.category }),
        o.ends_at && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase opacity-40", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "حتى ",
            new Date(o.ends_at).toLocaleDateString("ar-TN")
          ] })
        ] })
      ] })
    ] }, o.id)) }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl glass-panel rounded-none border-border p-10 bg-surface/95 backdrop-blur-3xl overflow-y-auto max-h-[90vh]", dir: "rtl", children: [
      /* @__PURE__ */ jsx(DialogHeader, { className: "mb-8 border-b border-border pb-6", children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-3xl font-serif font-bold tracking-tighter uppercase", children: form.id ? "تعديل العرض" : "عرض ترويجي جديد" }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "العنوان (English)" }),
            /* @__PURE__ */ jsx(Input, { className: "rounded-none bg-background/50 border-border focus:border-primary transition-all font-serif h-12", value: form.title, onChange: (e) => setForm({
              ...form,
              title: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "العنوان (عربي)" }),
            /* @__PURE__ */ jsx(Input, { className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12", value: form.title_ar, onChange: (e) => setForm({
              ...form,
              title_ar: e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "الوصف (عربي)" }),
          /* @__PURE__ */ jsx(Textarea, { className: "rounded-none bg-background/50 border-border focus:border-primary transition-all min-h-[100px]", value: form.description_ar, onChange: (e) => setForm({
            ...form,
            description_ar: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "نسبة الخصم %" }),
            /* @__PURE__ */ jsx(Input, { type: "number", min: "1", max: "100", className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 font-serif text-primary text-xl", value: form.discount_pct, onChange: (e) => setForm({
              ...form,
              discount_pct: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "الفئة المستهدفة" }),
            /* @__PURE__ */ jsxs("select", { value: form.category, onChange: (e) => setForm({
              ...form,
              category: e.target.value
            }), className: "w-full h-12 px-4 rounded-none border border-border bg-background/50 text-[11px] font-bold tracking-widest uppercase focus:border-primary outline-none transition-all", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "كل المنتجات" }),
              /* @__PURE__ */ jsx("option", { value: "essentials", children: "ESSENTIALS" }),
              /* @__PURE__ */ jsx("option", { value: "drops", children: "DROPS" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "تاريخ البدء" }),
            /* @__PURE__ */ jsx(Input, { type: "datetime-local", className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 text-[10px] font-bold", value: form.starts_at, onChange: (e) => setForm({
              ...form,
              starts_at: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "تاريخ الانتهاء" }),
            /* @__PURE__ */ jsx(Input, { type: "datetime-local", className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 text-[10px] font-bold", value: form.ends_at, onChange: (e) => setForm({
              ...form,
              ends_at: e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group pt-4", children: [
          /* @__PURE__ */ jsx("div", { className: `w-5 h-5 border border-primary flex items-center justify-center transition-all ${form.active ? "bg-primary" : "bg-transparent"}`, children: form.active && /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3 text-background rotate-45" }) }),
          /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: form.active, onChange: (e) => setForm({
            ...form,
            active: e.target.checked
          }) }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity", children: "تفعيل العرض حالياً" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4 pt-12 border-t border-border mt-10", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => setOpen(false), className: "rounded-none text-[11px] font-bold tracking-widest uppercase px-10", children: "إلغاء" }),
        /* @__PURE__ */ jsx(Button, { onClick: save, className: "luxury-button-square min-w-[200px]", children: "حفظ العرض" })
      ] })
    ] }) })
  ] });
}
export {
  AdminOffers as component
};
