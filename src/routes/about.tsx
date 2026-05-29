import { createFileRoute } from "@tanstack/react-router";
import { Zap, Globe, Shield, Shirt } from "lucide-react";
import Header from "@/components/site/header";
import Footer from "@/components/site/footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "قصتنا — Kusuf" },
      {
        name: "description",
        content:
          "تعرف على قصة Kusuf: علامة تجارية تونسية لملابس الشارع تجمع بين الهوية الحضرية والجودة الفاخرة.",
      },
      { property: "og:title", content: "قصة خسوف Kusuf" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col bg-background transition-all duration-1000"
    >
      <Header />
      <main className="flex-1 pt-[100px] md:pt-[120px]">
        <section className="reveal relative py-16 md:py-28 overflow-hidden border-b border-glass-border">
          <div className="absolute inset-0 liquid-glass opacity-30 pointer-events-none" />

          {/* Background Motif */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none transition-colors duration-1000">
            <span className="text-[20vw] font-display leading-none whitespace-nowrap tracking-tighter uppercase">
              THE STORY
            </span>
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-4">
              <div className="w-6 h-[1px] bg-primary transition-all duration-1000"></div>
              <span className="text-primary font-bold uppercase tracking-[0.5em] text-[9px] transition-colors">
                Kusuf ATELIER
              </span>
              <div className="w-6 h-[1px] bg-primary transition-all duration-1000"></div>
            </div>
            <h1 className="text-6xl md:text-[7rem] font-display leading-[0.85] uppercase tracking-tighter transition-colors">
              الهوية الحضرية <br /> <span className="text-primary italic">من تونس</span>
            </h1>
            <p className="text-xl text-foreground/80 font-light leading-relaxed max-w-2xl mx-auto transition-colors">
              Kusuf هي علامة تجارية تونسية لملابس الشارع، وُلدت من رحم الشوارع التونسية لتعبر عن جيل
              جديد يقدّر الجودة والهوية.
            </p>
          </div>
        </section>

        <section className="reveal py-24 bg-transparent">
          <div className="max-w-[1600px] mx-auto px-6 md:px-14 grid md:grid-cols-2 gap-20 items-center">
            <div className="aspect-square glass-card rounded-container overflow-hidden p-2">
              <img
                src="/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg"
                alt="Kusuf Streetwear"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-none">
                تحرّك في <br /> <span className="text-primary italic">صمت</span>
              </h2>
              <div className="space-y-4">
                <p className="text-foreground/80 leading-relaxed text-xl font-light">
                  بدأنا برؤية واضحة: خلق ملابس تعكس قوة الهوية التونسية دون الحاجة للكثير من الكلام.
                  نؤمن أن الجودة العالية والتصميم المتقن هما أصدق وسيلة للتعبير.
                </p>
                <p className="text-foreground/90 leading-relaxed text-base font-light">
                  كل قطعة من Kusuf هي نتيجة لعمل دقيق، من اختيار أجود أنواع القطن التونسي إلى
                  اللمسات النهائية التي تضمن التميز.
                </p>
              </div>
              <div className="pt-4">
                <button className="luxury-button-square">اكتشف المجموعة</button>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal py-24 relative overflow-hidden border-y border-glass-border">
          <div className="absolute inset-0 liquid-glass opacity-20 pointer-events-none" />
          <div className="max-w-[1600px] mx-auto px-6 md:px-14 relative z-10">
            <h2 className="text-6xl md:text-[7rem] font-display uppercase tracking-tighter text-center mb-24">
              قيمنا <span className="text-primary italic">الأساسية</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: "صنع في تونس",
                  desc: "ندعم الصناعة المحلية ونفتخر باستخدام الخبرات التونسية في كل مراحل الإنتاج.",
                },
                {
                  icon: Shirt,
                  title: "جودة لا تساوم",
                  desc: "نستخدم أفضل الخامات والمواد لضمان قطع تدوم طويلاً وتحافظ على رونقها.",
                },
                {
                  icon: Shield,
                  title: "هوية مستقلة",
                  desc: "تصاميمنا تعبر عن روح الشارع التونسي بعيداً عن التقليد الأعمى.",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="glass-card p-10 rounded-container space-y-6 hover:-translate-y-2 transition-all duration-700 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                    <v.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display uppercase tracking-tight">{v.title}</h3>
                  <p className="text-foreground/80 leading-relaxed font-light text-base transition-colors">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal py-32 bg-transparent overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative">
            <Zap className="w-12 h-12 text-primary mx-auto animate-pulse" />
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-none">
              رسالتنا <span className="text-primary italic">إليك</span>
            </h2>
            <p className="text-xl text-foreground/80 leading-relaxed font-light">
              Kusuf ليست مجرد ملابس، إنها موقف. نؤمن أن التميز الحقيقي يكمن في البساطة والجودة.{" "}
              <span className="text-primary font-bold">كن أنت، وتحرّك في صمت</span>.
            </p>
            <p className="text-2xl md:text-4xl font-display font-bold text-primary uppercase tracking-[0.3em] transition-all duration-1000">
              Move in silence.
            </p>

            {/* Faint Background Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.015] select-none pointer-events-none">
              <span className="text-[25vw] font-display leading-none">Kusuf</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
