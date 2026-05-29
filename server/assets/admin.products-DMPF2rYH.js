import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { s as supabase, B as Button } from "./router-argkJYP3.js";
import { I as Input } from "./input-sMDTmqyi.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-DrHuHI_M.js";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
  name: "",
  name_ar: "",
  category: "essentials",
  price: "",
  original_price: "",
  image: "",
  description: "",
  description_ar: "",
  stock: "0",
  in_stock: true,
  is_new: false,
  discount: "",
  variants: []
};
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const load = useCallback(async () => {
    setLoading(true);
    const {
      data
    } = await supabase.from("products").select("*").order("created_at", {
      ascending: false
    });
    setProducts(data || []);
    setLoading(false);
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const openEdit = (p) => {
    setForm({
      id: p.id,
      name: p.name,
      name_ar: p.name_ar || "",
      category: p.category,
      price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : "",
      image: p.image || "",
      description: p.description || "",
      description_ar: p.description_ar || "",
      stock: String(p.stock || 0),
      in_stock: p.in_stock ?? true,
      is_new: p.is_new ?? false,
      discount: p.discount ? String(p.discount) : "",
      variants: Array.isArray(p.variants) ? p.variants : []
    });
    setOpen(true);
  };
  const openNew = () => {
    setForm(empty);
    setOpen(true);
  };
  const save = async () => {
    const payload = {
      name: form.name,
      name_ar: form.name_ar,
      category: form.category,
      price: Number(form.price),
      original_price: form.original_price ? Number(form.original_price) : null,
      image: form.image,
      description: form.description,
      description_ar: form.description_ar,
      stock: Number(form.stock),
      in_stock: form.in_stock,
      is_new: form.is_new,
      discount: form.discount ? Number(form.discount) : null,
      variants: form.variants
    };
    const {
      error
    } = form.id ? await supabase.from("products").update(payload).eq("id", form.id) : await supabase.from("products").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(form.id ? "تم التحديث" : "تمت الإضافة");
    setOpen(false);
    load();
  };
  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, {
        id: `v-${Date.now()}`,
        size: "M",
        stock: 10
      }]
    });
  };
  const updateVariant = (idx, field, val) => {
    const next = [...form.variants];
    next[idx] = {
      ...next[idx],
      [field]: val
    };
    setForm({
      ...form,
      variants: next
    });
  };
  const removeVariant = (idx) => {
    setForm({
      ...form,
      variants: form.variants.filter((_, i) => i !== idx)
    });
  };
  const remove = async (id) => {
    if (!confirm("حذف هذا المنتج؟")) return;
    const {
      error
    } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10", dir: "rtl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-6xl font-serif font-bold tracking-tighter uppercase", children: "المنتجات" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-3 text-lg font-sans tracking-wide", children: [
          "إدارة الكتالوج والمخزون — ",
          /* @__PURE__ */ jsxs("span", { className: "text-primary font-bold uppercase tracking-widest", children: [
            products.length,
            " قطعة"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: openNew, className: "luxury-button-square", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 ml-2" }),
        " إضافة منتج"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 opacity-40", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold tracking-[0.3em] uppercase", children: "جاري التحميل" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "glass-panel rounded-none p-0 overflow-hidden border-none shadow-none", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("tr", { className: "text-right", children: [
        /* @__PURE__ */ jsx("th", { className: "p-6 text-[10px] font-bold tracking-widest uppercase opacity-50", children: "المنتج" }),
        /* @__PURE__ */ jsx("th", { className: "p-6 text-[10px] font-bold tracking-widest uppercase opacity-50", children: "الفئة" }),
        /* @__PURE__ */ jsx("th", { className: "p-6 text-[10px] font-bold tracking-widest uppercase opacity-50", children: "السعر" }),
        /* @__PURE__ */ jsx("th", { className: "p-6 text-[10px] font-bold tracking-widest uppercase opacity-50", children: "المخزون" }),
        /* @__PURE__ */ jsx("th", { className: "p-6 text-left text-[10px] font-bold tracking-widest uppercase opacity-50", children: "الإجراءات" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border/30", children: products.map((p) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-surface/30 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-20 bg-surface/50 overflow-hidden border border-border/50", children: p.image ? /* @__PURE__ */ jsx("img", { src: p.image, alt: p.name, className: "w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center opacity-20", children: /* @__PURE__ */ jsx(Package, { className: "w-6 h-6" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "font-serif font-bold text-base tracking-tight", children: p.name }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-widest opacity-40 uppercase", children: p.name_ar })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "p-6", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 bg-surface/80 px-3 py-1 border border-border/30", children: p.category }) }),
        /* @__PURE__ */ jsx("td", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-serif font-bold text-primary", children: [
            Number(p.price).toFixed(2),
            " د.ت"
          ] }),
          p.original_price && /* @__PURE__ */ jsxs("span", { className: "text-[10px] line-through opacity-30", children: [
            Number(p.original_price).toFixed(2),
            " د.ت"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxs("span", { className: `text-[11px] font-bold uppercase tracking-widest ${Number(p.stock) < 5 ? "text-destructive" : "opacity-70"}`, children: [
            p.stock,
            " متبقي"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-16 h-1 bg-border/20", children: /* @__PURE__ */ jsx("div", { className: `h-full ${Number(p.stock) < 5 ? "bg-destructive" : "bg-primary"}`, style: {
            width: `${Math.min(Number(p.stock) / 20 * 100, 100)}%`
          } }) })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "p-6 text-left", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => openEdit(p), className: "w-10 h-10 hover:bg-primary/10 hover:text-primary rounded-none transition-all", children: /* @__PURE__ */ jsx(Pencil, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(p.id), className: "w-10 h-10 hover:bg-destructive/10 hover:text-destructive rounded-none transition-all", children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }) })
        ] }) })
      ] }, p.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl glass-panel rounded-none border-border p-10 bg-surface/95 backdrop-blur-3xl overflow-y-auto max-h-[90vh]", children: [
      /* @__PURE__ */ jsx(DialogHeader, { className: "mb-8 border-b border-border pb-6", children: /* @__PURE__ */ jsx(DialogTitle, { className: "text-3xl font-serif font-bold tracking-tighter uppercase", children: form.id ? "تعديل قطعة" : "إضافة قطعة جديدة" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "الاسم (English)" }),
            /* @__PURE__ */ jsx(Input, { className: "rounded-none bg-background/50 border-border focus:border-primary transition-all font-serif h-12", value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "الاسم (عربي)" }),
            /* @__PURE__ */ jsx(Input, { className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12", value: form.name_ar, onChange: (e) => setForm({
              ...form,
              name_ar: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "الفئة" }),
              /* @__PURE__ */ jsxs("select", { value: form.category, onChange: (e) => setForm({
                ...form,
                category: e.target.value
              }), className: "w-full h-12 px-4 rounded-none border border-border bg-background/50 text-[11px] font-bold tracking-widest uppercase focus:border-primary outline-none transition-all", children: [
                /* @__PURE__ */ jsx("option", { value: "essentials", children: "ESSENTIALS" }),
                /* @__PURE__ */ jsx("option", { value: "drops", children: "DROPS" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "المخزون الكلي" }),
              /* @__PURE__ */ jsx(Input, { type: "number", className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12", value: form.stock, onChange: (e) => setForm({
                ...form,
                stock: e.target.value
              }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "السعر الحالي" }),
              /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 font-serif text-primary", value: form.price, onChange: (e) => setForm({
                ...form,
                price: e.target.value
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "السعر السابق" }),
              /* @__PURE__ */ jsx(Input, { type: "number", step: "0.01", className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 font-serif opacity-50", value: form.original_price, onChange: (e) => setForm({
                ...form,
                original_price: e.target.value
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold tracking-[0.3em] uppercase opacity-50", children: "رابط الصورة" }),
            /* @__PURE__ */ jsx(Input, { className: "rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 font-mono text-[10px]", value: form.image, onChange: (e) => setForm({
              ...form,
              image: e.target.value
            }), placeholder: "/images/..." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 pt-6", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [
              /* @__PURE__ */ jsx("div", { className: `w-5 h-5 border border-primary flex items-center justify-center transition-all ${form.in_stock ? "bg-primary" : "bg-transparent"}`, children: form.in_stock && /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3 text-background rotate-45" }) }),
              /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: form.in_stock, onChange: (e) => setForm({
                ...form,
                in_stock: e.target.checked
              }) }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity", children: "متوفر" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [
              /* @__PURE__ */ jsx("div", { className: `w-5 h-5 border border-primary flex items-center justify-center transition-all ${form.is_new ? "bg-primary" : "bg-transparent"}`, children: form.is_new && /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3 text-background rotate-45" }) }),
              /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: form.is_new, onChange: (e) => setForm({
                ...form,
                is_new: e.target.checked
              }) }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity", children: "إصدار جديد" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2 space-y-6 pt-8 border-t border-border/30", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-serif font-bold tracking-widest uppercase", children: "تخصيص الخيارات" }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: addVariant, className: "rounded-none border-primary text-primary hover:bg-primary hover:text-background transition-all text-[10px] font-bold px-6", children: "إضافة خيار +" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: form.variants.map((v, i) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 gap-4 items-end bg-surface/30 p-6 border border-border/30 group", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-span-3 space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold tracking-widest uppercase opacity-40", children: "المقاس" }),
              /* @__PURE__ */ jsx(Input, { className: "h-10 rounded-none bg-background/50 border-border text-center font-bold", value: v.size || "", onChange: (e) => updateVariant(i, "size", e.target.value), placeholder: "M" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-3 space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold tracking-widest uppercase opacity-40", children: "اللون" }),
              /* @__PURE__ */ jsx(Input, { className: "h-10 rounded-none bg-background/50 border-border text-[11px] font-bold tracking-widest uppercase", value: v.color || "", onChange: (e) => updateVariant(i, "color", e.target.value), placeholder: "BLACK" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-2 space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold tracking-widest uppercase opacity-40", children: "المخزون" }),
              /* @__PURE__ */ jsx(Input, { type: "number", className: "h-10 rounded-none bg-background/50 border-border text-center font-bold", value: v.stock, onChange: (e) => updateVariant(i, "stock", Number(e.target.value)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-3 space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[9px] font-bold tracking-widest uppercase opacity-40", children: "سعر خاص (اختياري)" }),
              /* @__PURE__ */ jsx(Input, { type: "number", className: "h-10 rounded-none bg-background/50 border-border font-serif text-primary", value: v.price || "", onChange: (e) => updateVariant(i, "price", e.target.value ? Number(e.target.value) : void 0) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "col-span-1 pb-1", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeVariant(i), className: "text-destructive opacity-30 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) }) })
          ] }, v.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4 pt-12 border-t border-border mt-10", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => setOpen(false), className: "rounded-none text-[11px] font-bold tracking-widest uppercase px-10", children: "إلغاء" }),
        /* @__PURE__ */ jsx(Button, { onClick: save, className: "luxury-button-square min-w-[200px]", children: "حفظ التغييرات" })
      ] })
    ] }) })
  ] });
}
export {
  AdminProducts as component
};
