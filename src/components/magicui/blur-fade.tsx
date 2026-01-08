"use client";

import { useRef, useEffect, useState } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: any;
  blur?: string;
}
const BlurFade = ({
  children,
  className = "",
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(!inView);

  useEffect(() => {
    if (inView) {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: inViewMargin }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [inView, inViewMargin]);

  const style = {
    ["--bf-y" as any]: `${yOffset}px`,
    ["--bf-blur" as any]: blur,
    ["--bf-duration" as any]: `${duration}s`,
    ["--bf-delay" as any]: `${0.04 + delay}s`,
  } as React.CSSProperties;

  return (
    <div ref={ref} className={`${className} blur-fade ${isInView ? "in-view" : ""}`} style={style}>
      {children}
    </div>
  );
};

export default BlurFade;
