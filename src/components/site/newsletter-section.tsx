import { useState, useEffect } from "react";
import { Bell, Mail, Check, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    supabase.rpc("newsletter_count").then(({ data }) => {
      if (typeof data === "number") setCount(data);
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    if (error && !error.message.includes("duplicate")) {
      toast.error(error.message);
      return;
    }
    setDone(true);
    setEmail("");
    setCount((c) => (c ?? 0) + 1);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <section
      className="reveal relative overflow-hidden py-24 md:py-32 transition-all duration-1000"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      dir="rtl"
    >
      <div className="absolute inset-0 backdrop-blur-[60px] opacity-20 pointer-events-none transition-all duration-1000" />

      <div className="blur-overlay blur-overlay-top" />
      <div className="max-w-3xl mx-auto px-6 text-center space-y-10 relative z-20">
        <div className="inline-block px-5 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md transition-all">
          <p className="text-primary font-bold text-xs flex items-center gap-3 tracking-[0.2em] uppercase">
            <Bell className="w-4 h-4" /> قائمة الانتظار
          </p>
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight uppercase transition-colors">
          كن أول من يعلم <span className="text-primary">بالإصدار القادم</span>
        </h2>
        <p className="text-xl text-foreground/80 font-light leading-relaxed transition-colors">
          اشترك في قائمة الانتظار لتصلك رسالة عند توفر الإصدارات الجديدة والمحدودة.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div className="flex-1 relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/90" />
            <Input
              type="email"
              placeholder="بريدك الإلكتروني..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-14 h-16 rounded-2xl border-glass-border bg-glass-bg backdrop-blur-3xl transition-all text-foreground placeholder:text-foreground/80"
            />
          </div>
          <LuxuryButton type="submit" className="h-16 px-10 rounded-2xl shadow-xl transition-all">
            {done ? "تم الاشتراك ✓" : "سجل في قائمة الانتظار"}
          </LuxuryButton>
        </form>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-12 border-t border-glass-border transition-colors">
          <div className="text-center group">
            <p className="font-bold text-3xl text-foreground mb-1 transition-transform group-hover:scale-110">
              +{(count ?? 1500).toLocaleString("ar-TN")}
            </p>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/90">
              في قائمة الانتظار
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Check key={i} className="w-4 h-4 text-primary" />
              ))}
            </div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/90">
              جودة مضمونة
            </p>
          </div>
          <div className="text-center">
            <Clock className="w-6 h-6 mx-auto mb-3 text-primary" />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/90">
              إصدارات دورية
            </p>
          </div>
        </div>
      </div>
      <div className="blur-overlay blur-overlay-bottom" />
    </section>
  );
};
