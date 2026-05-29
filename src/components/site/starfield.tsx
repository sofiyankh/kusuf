import { useEffect, useRef, memo } from "react";

interface StarfieldProps {
  isLightMode?: boolean;
}

const starCount = 300;
const colorsDark = ["173, 232, 244, ", "197, 168, 128, ", "255, 185, 185, ", "255, 255, 255, "];
const colorsLight = ["30, 64, 175, ", "197, 168, 128, ", "15, 118, 110, ", "19, 78, 74, "];

class Star {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  baseOpacity: number = 0;
  twinkleOffset: number = 0;
  colorIndex: number = 0;
  opacity: number = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 2 + 1;
    this.baseOpacity = Math.random() * 0.5 + 0.3;
    this.twinkleOffset = Math.random() * Math.PI * 2;
    this.colorIndex = Math.floor(Math.random() * 4);
  }

  update(t: number) {
    const phase = t * 0.001 + this.twinkleOffset;
    this.opacity = this.baseOpacity * (0.3 + Math.abs(Math.sin(phase)) * 0.7);
  }

  draw(ctx: CanvasRenderingContext2D, isLight: boolean) {
    const colors = isLight ? colorsLight : colorsDark;
    const colorStr = colors[this.colorIndex];

    ctx.fillStyle = "rgba(" + colorStr + this.opacity + ")";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const Starfield = memo(function Starfield({ isLightMode = false }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current.forEach((s) => s.reset());
    };

    const animate = (t: number) => {
      // Background fill instead of clearRect for better performance with { alpha: false }
      ctx.fillStyle = isLightMode ? "#ffffff" : "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((s) => {
        s.update(t);
        s.draw(ctx, isLightMode);
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();

    if (starsRef.current.length === 0) {
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push(new Star());
      }
    }

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isLightMode]);

  return (
    <>
      <div className="nebula nebula-cyan fixed inset-0 z-[-2] pointer-events-none opacity-20 dark:opacity-10 will-change-opacity" />
      <div className="nebula nebula-purple fixed inset-0 z-[-2] pointer-events-none opacity-20 dark:opacity-15 will-change-opacity" />
      <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none w-full h-full" />
    </>
  );
});

export default Starfield;
