import { useEffect, useState } from "react";
import { Toaster as Sonner } from "sonner";
import { Check, X, AlertTriangle, Info, Sparkles, Loader2 } from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Breathtaking boutique synthesized audio chimes for tactile feedback
const playPremiumChime = (type: string) => {
  try {
    const AudioContextClass =
      (window as unknown as { AudioContext: typeof AudioContext }).AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (type === "success") {
      const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.07 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.5);
        osc.connect(gainNode);
        gainNode.connect(masterGain);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.6);
      });
    } else if (type === "error") {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === "warning") {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === "info") {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } else {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch (e) {
    console.warn("AudioContext initialization bypassed until interaction.", e);
  }
};

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setTheme(isDarkNow ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Play audio chimes when toasts appear
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement && node.hasAttribute("data-sonner-toast")) {
              const type = node.getAttribute("data-type") || "default";
              playPremiumChime(type);
            }
          });
        }
      });
    });

    const toasterContainer = document.querySelector("section[data-sonner-toaster]");
    if (toasterContainer) {
      observer.observe(toasterContainer, { childList: true, subtree: true });
    } else {
      // If it's not mounted yet, wait a bit and try again
      const timeout = setTimeout(() => {
        const tc = document.querySelector("section[data-sonner-toaster]");
        if (tc) observer.observe(tc, { childList: true, subtree: true });
      }, 1000);
      return () => {
        clearTimeout(timeout);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group font-sans"
      icons={{}}
      toastOptions={{
        classNames: {
          toast:
            "group toast glass rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden transition-all duration-300",
          description:
            "group-[.toast]:text-foreground/60 text-[11px] tracking-[0.12em] leading-relaxed",
          title:
            "text-[12px] font-semibold tracking-[0.18em] uppercase text-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground rounded-none text-[10px] font-bold tracking-[0.2em] uppercase px-5 h-8",
          cancelButton:
            "group-[.toast]:bg-foreground/5 group-[.toast]:text-foreground rounded-none text-[10px] font-bold tracking-[0.2em] uppercase px-5 h-8",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
