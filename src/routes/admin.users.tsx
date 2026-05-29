import { useEffect, useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

interface Row {
  id: string;
  name: string | null;
  email: string | null;
  created_at: string;
  isAdmin: boolean;
}

function AdminUsers() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id,name,email,created_at")
        .order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id,role"),
    ]);
    const adminSet = new Set((roles || []).filter((r) => r.role === "admin").map((r) => r.user_id));
    setRows(
      ((profiles as Tables<"profiles">[]) || []).map((p) => ({
        ...p,
        isAdmin: adminSet.has(p.id),
      })),
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleAdmin = async (userId: string, currentlyAdmin: boolean) => {
    if (currentlyAdmin) {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");
      if (error) return toast.error(error.message);
      toast.success("تم إزالة صلاحية المسؤول");
    } else {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });
      if (error) return toast.error(error.message);
      toast.success("تم منح صلاحية المسؤول");
    }
    load();
  };

  return (
    <div className="space-y-10" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter uppercase">
            العملاء
          </h1>
          <p className="text-muted-foreground mt-3 text-lg font-sans tracking-wide">
            إدارة قاعدة البيانات — <span className="text-primary font-bold uppercase tracking-widest">{rows.length} مستخدم</span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-40">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase">جاري التحميل</p>
        </div>
      ) : (
        <div className="glass-panel rounded-none p-0 overflow-hidden border-none shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-right">
                  <th className="p-6 text-[10px] font-bold tracking-widest uppercase opacity-50">المستخدم</th>
                  <th className="p-6 text-[10px] font-bold tracking-widest uppercase opacity-50">البريد الإلكتروني</th>
                  <th className="p-6 text-[10px] font-bold tracking-widest uppercase opacity-50">تاريخ الانضمام</th>
                  <th className="p-6 text-[10px] font-bold tracking-widest uppercase opacity-50">الصلاحية</th>
                  <th className="p-6 text-left text-[10px] font-bold tracking-widest uppercase opacity-50">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {rows.map((r) => (
                  <tr key={r.id} className="group hover:bg-surface/30 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center font-serif font-bold text-primary">
                          {(r.name || r.email || "?")[0].toUpperCase()}
                        </div>
                        <span className="font-serif font-bold text-base tracking-tight">{r.name || "—"}</span>
                      </div>
                    </td>
                    <td className="p-6 text-[11px] font-bold opacity-60 tracking-widest uppercase">{r.email}</td>
                    <td className="p-6 text-[11px] font-bold opacity-40 tracking-widest uppercase">
                      {new Date(r.created_at).toLocaleDateString("ar-TN", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="p-6">
                      {r.isAdmin ? (
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase bg-primary text-background px-3 py-1">
                          ADMIN
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase border border-border/50 opacity-40 px-3 py-1">
                          CUSTOMER
                        </span>
                      )}
                    </td>
                    <td className="p-6 text-left">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleAdmin(r.id, r.isAdmin)}
                        className={`rounded-none text-[10px] font-bold tracking-widest uppercase px-6 h-10 transition-all ${
                          r.isAdmin 
                            ? "hover:bg-destructive/10 hover:text-destructive" 
                            : "hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        {r.isAdmin ? (
                          <>
                            <ShieldOff className="w-3.5 h-3.5 ml-2" /> إزالة
                          </>
                        ) : (
                          <>
                            <Shield className="w-3.5 h-3.5 ml-2" /> ترقية
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
