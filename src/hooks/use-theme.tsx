import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type ThemePalette = {
  "--background": string;
  "--foreground": string;
  "--surface": string;
  "--primary": string;
  "--secondary": string;
  "--card": string;
  "--glass-bg": string;
  "--glass-border": string;
  "--btn-bg": string;
  "--btn-fg": string;
};

type ThemeContextType = {
  palette: ThemePalette;
  setPalette: (newPalette: Partial<ThemePalette>) => void;
  isManualTheme: boolean;
  setManualTheme: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [palette, setInternalPalette] = useState<ThemePalette>({
    "--background": "#000000",
    "--foreground": "#f2eee8",
    "--surface": "rgba(20, 20, 20, 0.8)",
    "--primary": "#c5a880",
    "--secondary": "rgba(242, 238, 232, 0.1)",
    "--card": "rgba(15, 15, 15, 0.9)",
    "--glass-bg": "rgba(255, 255, 255, 0.03)",
    "--glass-border": "rgba(255, 255, 255, 0.08)",
    "--btn-bg": "#f2eee8",
    "--btn-fg": "#000000",
  });

  const [isManualTheme, setIsManualTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme-manual") === "true";
    }
    return false;
  });

  const applyPalette = useCallback((p: ThemePalette) => {
    Object.entries(p).forEach(([key, value]) => {
      if (value) {
        document.documentElement.style.setProperty(key, value);
      }
    });
  }, []);

  // Initial sync and class management
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Theme Class
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);

    // 2. Dynamic Palette
    const savedPalette = localStorage.getItem("Kusuf-dynamic-palette");
    if (savedPalette && localStorage.getItem("theme-manual") !== "true") {
      try {
        const parsed = JSON.parse(savedPalette);
        setInternalPalette((prev) => ({ ...prev, ...parsed }));
        applyPalette(parsed);
      } catch (e) {
        console.error("Failed to restore palette", e);
      }
    }
  }, [applyPalette]);

  // Apply palette whenever it changes
  useEffect(() => {
    applyPalette(palette);
  }, [palette, applyPalette]);

  const setPalette = useCallback((newPalette: Partial<ThemePalette>) => {
    setInternalPalette((prev) => ({ ...prev, ...newPalette }));
  }, []);

  const setManualTheme = (value: boolean) => {
    setIsManualTheme(value);
    localStorage.setItem("theme-manual", value.toString());
  };

  return (
    <ThemeContext.Provider value={{ palette, setPalette, isManualTheme, setManualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
