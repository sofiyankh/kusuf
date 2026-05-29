import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setManualTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const isDarkSystem = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && isDarkSystem);

    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  const toggle = () => {
    const next = !isDark;

    // Toggle dark class
    document.documentElement.classList.toggle("dark", next);

    // Save preference
    localStorage.setItem("theme", next ? "dark" : "light");
    localStorage.setItem("theme-manual", "true");
    setIsDark(next);

    // Clear dynamic collection palette to prevent mismatch during transition
    const props = [
      "--background",
      "--foreground",
      "--surface",
      "--primary",
      "--secondary",
      "--card",
      "--glass-bg",
      "--glass-border",
      "--btn-bg",
      "--btn-fg",
    ];
    props.forEach((p) => document.documentElement.style.removeProperty(p));

    // Mark as manual theme
    setManualTheme(true);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2.5 rounded-lg border border-glass-border bg-glass-bg text-foreground hover:bg-primary hover:text-background transition-all duration-500 backdrop-blur-md"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
