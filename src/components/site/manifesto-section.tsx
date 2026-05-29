import { PHILOSOPHY } from "@/data/philosophy";

export const ManifestoSection = () => {
  return (
    <section
      className="reveal relative bg-background py-24 md:py-32 overflow-hidden transition-all duration-1000"
      dir="rtl"
    >
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-3 flex md:block items-center gap-8">
            <h2 className="text-7xl md:text-[10rem] font-display text-foreground leading-[0.85] uppercase tracking-tighter md:[writing-mode:vertical-rl] md:rotate-180 transition-colors duration-1000">
              Move In <span className="text-primary italic">Silence</span>
            </h2>
            <div className="w-px h-24 md:h-48 bg-primary/20 md:mx-auto mt-8 hidden md:block transition-all duration-1000"></div>
          </div>

          <div className="lg:col-span-9 space-y-24">
            <div className="max-w-2xl text-right space-y-6">
              <span className="text-primary font-bold uppercase tracking-[0.5em] text-[9px] block transition-colors duration-1000">
                — THE MANIFESTO
              </span>
              <p className="text-2xl md:text-4xl text-foreground font-light leading-tight transition-colors duration-1000">
                نتحرّك في صمت لأن القوة الحقيقية لا تحتاج إلى ضجيج. جودة القطعة وتفاصيلها هي التي
                تتحدث بالنيابة عنك.
              </p>
              <p className="text-foreground/80 text-base font-light leading-relaxed transition-colors duration-1000">
                فلسفة Kusuf تعتمد على التميز الهادئ. نستخدم أفضل الخامات التونسية لنخلق هوية حضرية
                تجمع بين الفخامة والشارع.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
              {PHILOSOPHY.map((p, i) => (
                <div key={p.name} className="group relative space-y-6 text-right">
                  <div className="flex items-center gap-6 justify-end">
                    <span className="text-foreground/90 font-display text-5xl leading-none group-hover:text-primary transition-all duration-1000">
                      0{i + 1}
                    </span>
                    <div className="h-px flex-1 bg-glass-border transition-all duration-1000"></div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-foreground uppercase group-hover:text-primary transition-all duration-1000 tracking-tight">
                      {p.name}
                    </h3>
                    <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase transition-colors duration-1000">
                      {p.arabic}
                    </p>
                  </div>
                  <p className="text-foreground/80 text-base leading-relaxed max-w-sm mr-auto ml-0 transition-colors duration-1000">
                    {p.description}
                  </p>
                  <ul className="flex flex-wrap gap-x-6 gap-y-3 justify-end pt-4 border-t border-glass-border transition-all duration-1000">
                    {p.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-[10px] text-foreground/90 font-bold tracking-widest uppercase transition-colors duration-1000"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary transition-colors duration-1000" />{" "}
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 opacity-[0.02] pointer-events-none select-none transition-colors duration-1000">
        <span className="text-[40vw] font-display leading-none uppercase tracking-tighter text-foreground">
          Kusuf
        </span>
      </div>
    </section>
  );
};
