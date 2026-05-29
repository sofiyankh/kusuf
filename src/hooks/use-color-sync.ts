import { useEffect, useCallback, useState } from "react";
import { useTheme } from "./use-theme";

const COLOR_STORAGE_KEY = "Kusuf-dynamic-palette";

/**
 * useColorSync Hook
 * Extracts dominant color from an image, updates global CSS variables via ThemeProvider,
 * and persists them until the next change.
 */
export function useColorSync(imageUrl: string | null, active: boolean, sampleY: number = 0.5) {
  const { setPalette } = useTheme();
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true,
  );

  // Sync isDark with document class changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const updateColors = useCallback(
    (rgb: { r: number; g: number; b: number }) => {
      let bg, fg, primary, secondary, surface, card, glassBg, glassBorder, btnBg, btnFg;

      if (isDark) {
        // Deep, saturated dark mode with the extracted color
        bg = `rgba(${Math.floor(rgb.r * 0.08)}, ${Math.floor(rgb.g * 0.07)}, ${Math.floor(rgb.b * 0.06)}, 0.95)`;
        fg = `rgb(${Math.min(255, rgb.r + 210)}, ${Math.min(255, rgb.g + 210)}, ${Math.min(255, rgb.b + 210)})`;
        primary = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        secondary = `rgb(${Math.min(255, rgb.r + 80)}, ${Math.min(255, rgb.g + 80)}, ${Math.min(255, rgb.b + 80)})`;

        glassBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;
        glassBorder = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25)`;

        btnBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)`;
        btnFg = `#ffffff`;

        surface = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.18)`;
        card = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28)`;
      } else {
        // Luminous, tinted light mode
        bg = `rgba(${Math.min(255, 250 + rgb.r * 0.02)}, ${Math.min(255, 250 + rgb.g * 0.02)}, ${Math.min(255, 250 + rgb.b * 0.02)}, 0.9)`;
        fg = `rgb(${Math.floor(rgb.r * 0.2)}, ${Math.floor(rgb.g * 0.2)}, ${Math.floor(rgb.b * 0.2)})`;
        primary = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        secondary = `rgb(${Math.floor(rgb.r * 1.1)}, ${Math.floor(rgb.g * 1.1)}, ${Math.floor(rgb.b * 1.1)})`;

        glassBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`;
        glassBorder = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;

        btnBg = `rgb(${Math.floor(rgb.r * 0.4)}, ${Math.floor(rgb.g * 0.4)}, ${Math.floor(rgb.b * 0.4)})`;
        btnFg = `#ffffff`;

        surface = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`;
        card = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`;
      }

      const palette = {
        "--background": bg,
        "--foreground": fg,
        "--primary": primary,
        "--secondary": secondary,
        "--surface": surface,
        "--card": card,
        "--glass-bg": glassBg,
        "--glass-border": glassBorder,
        "--btn-bg": btnBg,
        "--btn-fg": btnFg,
      };

      setPalette(palette);
      localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(palette));
    },
    [isDark, setPalette],
  );

  // Extract colors when active, image changes, or dark mode toggles
  useEffect(() => {
    if (!active || !imageUrl) return;

    // Small delay to allow transitions or class changes to settle
    const timer = setTimeout(() => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          canvas.width = 10;
          canvas.height = 4;
          const sourceY = Math.max(
            0,
            Math.min(img.naturalHeight - 4, img.naturalHeight * sampleY - 2),
          );
          ctx.drawImage(img, 0, sourceY, img.naturalWidth, 4, 0, 0, 10, 4);
        } else {
          canvas.width = 10;
          canvas.height = 10;
          ctx.drawImage(img, 0, 0, 10, 10);
        }

        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        let r = 0,
          g = 0,
          b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        const count = data.length / 4;
        updateColors({
          r: Math.floor(r / count),
          g: Math.floor(g / count),
          b: Math.floor(b / count),
        });
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [imageUrl, active, sampleY, updateColors, isDark]);
}
