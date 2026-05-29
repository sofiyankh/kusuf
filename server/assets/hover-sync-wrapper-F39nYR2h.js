import { jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { u as useColorSync } from "./use-color-sync-3KHhHXEH.js";
const HoverSyncWrapper = ({
  children,
  imageUrl,
  className,
  onClick
}) => {
  const [isActive, setIsActive] = useState(false);
  const [sampleY, setSampleY] = useState(0.5);
  const wrapperRef = useRef(null);
  useColorSync(imageUrl, isActive, sampleY);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      const observer = new IntersectionObserver(
        ([entry]) => {
        },
        { threshold: 0.1 }
      );
      if (wrapperRef.current) observer.observe(wrapperRef.current);
      return () => observer.disconnect();
    } else {
      const handleScroll = () => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const vCenter = window.innerHeight / 2;
        const bandSize = 96;
        if (rect.top < vCenter + bandSize && rect.bottom > vCenter - bandSize) {
          setIsActive(true);
          const relativeY = Math.max(0, Math.min(1, (vCenter - rect.top) / rect.height));
          setSampleY(relativeY);
        } else {
          setIsActive(false);
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: wrapperRef,
      className,
      onMouseEnter: () => setIsActive(true),
      onMouseLeave: () => setIsActive(false),
      onTouchStart: () => setIsActive(true),
      onClick,
      role: onClick ? "button" : void 0,
      children
    }
  );
};
export {
  HoverSyncWrapper as H
};
