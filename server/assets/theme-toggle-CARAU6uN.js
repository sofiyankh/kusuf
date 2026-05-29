import { jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { e as useTheme } from "./router-argkJYP3.js";
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setManualTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const isDarkSystem = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || !stored && isDarkSystem;
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);
  if (!mounted) return /* @__PURE__ */ jsx("div", { className: "w-9 h-9" });
  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    localStorage.setItem("theme-manual", "true");
    setIsDark(next);
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
      "--btn-fg"
    ];
    props.forEach((p) => document.documentElement.style.removeProperty(p));
    setManualTheme(true);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": "Toggle theme",
      className: "p-2.5 rounded-lg border border-glass-border bg-glass-bg text-foreground hover:bg-primary hover:text-background transition-all duration-500 backdrop-blur-md",
      children: isDark ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" })
    }
  );
}
export {
  ThemeToggle as T
};
