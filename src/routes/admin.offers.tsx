import { useEffect, useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tables } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Tag, Power } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/offers")({
  component: AdminOffers,
});

interface OfferForm {
  id?: string;
  title: string;
  title_ar: string;
  description_ar: string;
  discount_pct: string;
  category: string;
  starts_at: string;
  ends_at: string;
  active: boolean;
}

const empty: OfferForm = {
  title: "",
  title_ar: "",
  description_ar: "",
  discount_pct: "10",
  category: "",
  starts_at: "",
  ends_at: "",
  active: true,
};

function AdminOffers() {
  const [list, setList] = useState<Tables<"offers">[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<OfferForm>(empty);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false });
    setList((data as Tables<"offers">[]) || []);
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
      active: form.active,
    };
    const { error } = form.id
      ? await supabase.from("offers").update(payload).eq("id", form.id)
      : await supabase.from("offers").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(form.id ? "تم التحديث" : "تمت الإضافة");
    setOpen(false);
    setForm(empty);
    load();
  };

  const toggleActive = async (o: Tables<"offers">) => {
    await supabase.from("offers").update({ active: !o.active }).eq("id", o.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذا العرض؟")) return;
    await supabase.from("offers").delete().eq("id", id);
    toast("تم الحذف");
    load();
  };

  const openEdit = (o: Tables<"offers">) => {
    setForm({
      id: o.id,
      title: o.title,
      title_ar: o.title_ar || "",
      description_ar: o.description_ar || "",
      discount_pct: String(o.discount_pct),
      category: o.category || "",
      starts_at: o.starts_at ? o.starts_at.slice(0, 16) : "",
      ends_at: o.ends_at ? o.ends_at.slice(0, 16) : "",
      active: o.active,
    });
    setOpen(true);
  };

  return (
    <div className="space-y-10" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter uppercase">
            العروض
          </h1>
          <p className="text-muted-foreground mt-3 text-lg font-sans tracking-wide">
            الحملات الترويجية والخصومات — <span className="text-primary font-bold uppercase tracking-widest">{list.length} حملة</span>
          </p>
        </div>
        <Button
          onClick={() => {
            setForm(empty);
            setOpen(true);
          }}
          className="luxury-button-square"
        >
          <Plus className="w-4 h-4 ml-2" /> إضافة عرض
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-40">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase">جاري التحميل</p>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-32 glass-panel rounded-none">
          <Tag className="w-10 h-10 mx-auto text-muted-foreground/20 mb-6" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">لا توجد عروض ترويجية متاحة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((o) => (
            <div
              key={o.id}
              className={`group glass-panel rounded-none p-8 transition-all duration-500 border-none ${o.active ? "bg-surface/50" : "opacity-50 grayscale"}`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-serif font-bold text-primary tracking-tighter">-{o.discount_pct}%</span>
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mt-1">Discount Rate</span>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleActive(o)}
                    className={`w-10 h-10 rounded-none transition-all ${o.active ? "text-primary hover:bg-primary/10" : "text-muted-foreground hover:bg-surface"}`}
                  >
                    <Power className="w-3.5 h-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => openEdit(o)}
                    className="w-10 h-10 rounded-none hover:bg-primary/10 hover:text-primary"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => remove(o.id)}
                    className="w-10 h-10 rounded-none hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-serif font-bold tracking-tight mb-2">{o.title_ar || o.title}</h3>
              {o.description_ar && (
                <p className="text-[11px] font-bold opacity-60 tracking-wide line-clamp-2 min-h-[32px]">
                  {o.description_ar}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-border/30">
                {o.category && (
                  <span className="text-[9px] font-bold tracking-widest uppercase bg-primary/10 text-primary px-3 py-1">
                    {o.category}
                  </span>
                )}
                {o.ends_at && (
                  <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase opacity-40">
                    <Clock className="w-3 h-3" />
                    <span>حتى {new Date(o.ends_at).toLocaleDateString("ar-TN")}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl glass-panel rounded-none border-border p-10 bg-surface/95 backdrop-blur-3xl overflow-y-auto max-h-[90vh]" dir="rtl">
          <DialogHeader className="mb-8 border-b border-border pb-6">
            <DialogTitle className="text-3xl font-serif font-bold tracking-tighter uppercase">
              {form.id ? "تعديل العرض" : "عرض ترويجي جديد"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">العنوان (English)</label>
                <Input
                  className="rounded-none bg-background/50 border-border focus:border-primary transition-all font-serif h-12"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">العنوان (عربي)</label>
                <Input
                  className="rounded-none bg-background/50 border-border focus:border-primary transition-all h-12"
                  value={form.title_ar}
                  onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">الوصف (عربي)</label>
              <Textarea
                className="rounded-none bg-background/50 border-border focus:border-primary transition-all min-h-[100px]"
                value={form.description_ar}
                onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">نسبة الخصم %</label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  className="rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 font-serif text-primary text-xl"
                  value={form.discount_pct}
                  onChange={(e) => setForm({ ...form, discount_pct: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">الفئة المستهدفة</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-12 px-4 rounded-none border border-border bg-background/50 text-[11px] font-bold tracking-widest uppercase focus:border-primary outline-none transition-all"
                >
                  <option value="">كل المنتجات</option>
                  <option value="essentials">ESSENTIALS</option>
                  <option value="drops">DROPS</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">تاريخ البدء</label>
                <Input
                  type="datetime-local"
                  className="rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 text-[10px] font-bold"
                  value={form.starts_at}
                  onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">تاريخ الانتهاء</label>
                <Input
                  type="datetime-local"
                  className="rounded-none bg-background/50 border-border focus:border-primary transition-all h-12 text-[10px] font-bold"
                  value={form.ends_at}
                  onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group pt-4">
              <div className={`w-5 h-5 border border-primary flex items-center justify-center transition-all ${form.active ? 'bg-primary' : 'bg-transparent'}`}>
                {form.active && <Plus className="w-3 h-3 text-background rotate-45" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">تفعيل العرض حالياً</span>
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-12 border-t border-border mt-10">
            <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-none text-[11px] font-bold tracking-widest uppercase px-10">
              إلغاء
            </Button>
            <Button onClick={save} className="luxury-button-square min-w-[200px]">
              حفظ العرض
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
