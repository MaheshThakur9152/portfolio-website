"use client";

import { useEffect, useState } from "react";
import { DATA } from "@/data/resume";

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    setLoading(true);
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
      sessionStorage.setItem("hasLoaded", "true");
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!loading) return null;

  const circumference = 2 * Math.PI * 80; // matches radius 80
  const dashOffset = circumference - (circumference * progress) / 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background cursor-none perspective-1000">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [transform:rotateX(45deg)_translateZ(-100px)]" />

      <div className="relative flex flex-col items-center transform-3d">
        <div className="relative size-48 flex items-center justify-center">
          <svg className="size-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/5"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="text-primary shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-[stroke-dashoffset] duration-200 linear"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">
              {DATA.initials}
            </span>
            <span className="text-xs font-mono mt-2 text-foreground/40">{progress}%</span>
          </div>

          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 animate-pulse" />
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 opacity-80">
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-medium">Initializing Environment</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="size-1 rounded-full bg-foreground/40 shadow-[0_0_8px_rgba(255,255,255,0.2)] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)] pointer-events-none" />
    </div>
  );
};
