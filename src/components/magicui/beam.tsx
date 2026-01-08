"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

interface BeamProps {
  className?: string;
  duration?: number;
  delay?: number;
  color?: string;
  vertical?: boolean;
  scrollLinked?: boolean;
}

export const Beam = ({
  className,
  duration = 4,
  delay = 0,
  color = "from-transparent via-primary to-transparent",
  vertical = true,
  scrollLinked = false,
}: BeamProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If scrollLinked is true, we can update a CSS variable based on scroll position
    if (!scrollLinked) return;
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);
      el.style.setProperty("--beam-pos", `${-20 + progress * 140}%`);
    };

    const tick = () => {
      onScroll();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollLinked]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute overflow-hidden",
        vertical ? "h-full w-[2px]" : "h-[2px] w-full",
        className
      )}
    >
      {/* Laser Core */}
      <div
        className={cn("absolute z-30", vertical ? "w-full" : "h-full")}
        style={{
          animation: scrollLinked ? "none" : `beam-move ${duration}s linear infinite ${delay}s`,
        }}
      >
        <div
          className={cn(vertical ? "w-full bg-gradient-to-b" : "h-full bg-gradient-to-r", "from-transparent via-white to-transparent")}
          style={{ filter: "brightness(6) contrast(2)" }}
        />

        <div
          className={cn(
            "absolute shadow-[0_0_50px_10px_rgba(255,255,255,0.9),0_0_100px_20px_rgba(168,85,247,0.8)]",
            vertical ? "bottom-0 left-[-6px] right-[-6px] h-[3px] bg-white rounded-full" : "right-0 top-[-6px] bottom-[-6px] w-[3px] bg-white rounded-full"
          )}
        />
      </div>

      {/* Glows */}
      <div className={cn("absolute z-20", vertical ? "w-full bg-gradient-to-b" : "h-full bg-gradient-to-r", color)} style={{ animation: `beam-move ${duration * 1.1}s ease-out infinite ${delay}s`, filter: "blur(12px) brightness(2)" }} />
      <div className={cn("absolute z-10", vertical ? "w-full bg-gradient-to-b" : "h-full bg-gradient-to-r", color)} style={{ animation: `beam-move ${duration * 1.5}s linear infinite ${delay}s`, filter: "blur(40px) saturate(3)", opacity: 0.6 }} />

      {/* Particles (CSS) */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute z-40 bg-white rounded-full beam-particle"
          style={{
            width: 2,
            height: 2,
            boxShadow: "0 0 15px 2px #fff",
            animationDelay: `${delay + i * 0.05}s`,
            animationDuration: `${duration * (0.6 + i * 0.1)}s`,
            left: vertical ? undefined : `${30 + i * 15}%`,
            top: vertical ? `${30 + i * 15}%` : undefined,
          }}
        />
      ))}
    </div>
  );
};
