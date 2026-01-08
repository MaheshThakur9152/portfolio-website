"use client";

import { useEffect, useRef } from "react";

const FloatingElement = ({ delay = 0, duration = 20, size = "size-20", color = "bg-primary/20", initialX = "10%", initialY = "10%" }) => {
  return (
    <div
      className={`fixed ${size} ${color} float-element blur-[80px] rounded-full -z-20 pointer-events-none opacity-40`}
      style={{
        left: initialX,
        top: initialY,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export const FloatingElements = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let targetRX = 0;
    let targetRY = 0;
    let curRX = 0;
    let curRY = 0;
    let rafId = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      targetRY = -x;
      targetRX = y;
    };

    const update = () => {
      curRX = lerp(curRX, targetRX, 0.08);
      curRY = lerp(curRY, targetRY, 0.08);
      el.style.transform = `rotateX(${curRX}deg) rotateY(${curRY}deg)`;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-20 perspective-1000">
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]">
        <div className="absolute inset-[-100%] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(45deg)_translateZ(-200px)]" />
      </div>

      <FloatingElement delay={0} duration={25} size="size-64" color="bg-primary/5" initialX="10%" initialY="20%" />
      <FloatingElement delay={2} duration={30} size="size-72" color="bg-foreground/5" initialX="70%" initialY="10%" />
      <FloatingElement delay={5} duration={35} size="size-80" color="bg-primary/5" initialX="20%" initialY="70%" />
      <FloatingElement delay={8} duration={20} size="size-48" color="bg-foreground/5" initialX="80%" initialY="60%" />
    </div>
  );
};
