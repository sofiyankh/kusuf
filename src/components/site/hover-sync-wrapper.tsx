import React, { useState, useEffect, useRef } from "react";
import { useColorSync } from "@/hooks/use-color-sync";

interface HoverSyncWrapperProps {
  children: React.ReactNode;
  imageUrl: string;
  className?: string;
  onClick?: () => void;
}

export const HoverSyncWrapper = ({
  children,
  imageUrl,
  className,
  onClick,
}: HoverSyncWrapperProps) => {
  const [isActive, setIsActive] = useState(false);
  const [sampleY, setSampleY] = useState(0.5);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useColorSync(imageUrl, isActive, sampleY);

  useEffect(() => {
    // DESKTOP: IntersectionObserver for basic visibility (performance)
    // MOBILE: Specialized scroll listener for the 20px center-zone detection
    if (window.innerWidth >= 768) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // On desktop, we still rely on hover, but this can pre-warm or handle touch
        },
        { threshold: 0.1 },
      );
      if (wrapperRef.current) observer.observe(wrapperRef.current);
      return () => observer.disconnect();
    } else {
      const handleScroll = () => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const vCenter = window.innerHeight / 2;
        const bandSize = 96; // Matching h-48 indicator (192px total band)

        // Check if the wrapper is currently within the center band
        if (rect.top < vCenter + bandSize && rect.bottom > vCenter - bandSize) {
          setIsActive(true);

          // Calculate which part of the image is passing through the center band
          const relativeY = Math.max(0, Math.min(1, (vCenter - rect.top) / rect.height));
          setSampleY(relativeY);
        } else {
          setIsActive(false);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Initial check
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={className}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
};
