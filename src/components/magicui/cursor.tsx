"use client";

import React, { useEffect, useRef } from "react";

export const CustomCursor = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
       return;
    }

    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    let visible = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;
    let lastFrameX = 0;
    let lastFrameY = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let currentScale = 0;
    let targetScale = 1;
    let isHovering = false;
    let isPressed = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    
    // Calculate shortest distance between angles to avoid spinning 360deg
    const shortestAngleDist = (a: number, b: number) => {
      let diff = (b - a) % 360;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;
      return diff;
    };

    const update = () => {
      // 1. Smooth position
      const prevX = currentX;
      const prevY = currentY;
      
      currentX = lerp(currentX, targetX, 0.2);
      currentY = lerp(currentY, targetY, 0.2);

      // 2. Calculate smooth scale
      // Determine target scale based on state
      const desiredScale = isPressed ? 0.9 : (isHovering ? 1.2 : 1);
      targetScale = desiredScale;
      currentScale = lerp(currentScale, targetScale, 0.15);

      // 3. Calculate smoothed movement vector
      const dx = currentX - prevX;
      const dy = currentY - prevY;

      // 4. Update rotation target if moving fast enough
      // Threshold prevents jitter when effectively stopped
      if (Math.hypot(dx, dy) > 0.6) {
        // SVG points UP, so we adjust +90deg to match atan2's 0deg=RIGHT baseline
        targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      }

      // 5. Smooth rotation
      const angleDist = shortestAngleDist(currentAngle, targetAngle);
      currentAngle += angleDist * 0.12;

      // 6. Apply transforms
      // center the cursor (SVG height 24, width 20) -> offset -10, -12
      // Using rotate3d/translate3d for GPU acceleration
      cursor.style.transform = `translate3d(${currentX - 10}px, ${currentY - 12}px, 0) rotate3d(0, 0, 1, ${currentAngle}deg) scale(${currentScale})`;
      
      rafId = requestAnimationFrame(update);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!visible) {
        visible = true;
        container.style.display = "block";
      }

      // Detect clickable under pointer without causing React renders
      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        getComputedStyle(target).cursor === "pointer"
      );
      isHovering = isClickable;
      
      // Toggle class for other potential styles (color etc), but transform is handled in JS
      cursor.classList.toggle("cursor--hovering", isClickable);
    };

    const onMouseDown = () => {
      isPressed = true;
      cursor.classList.add("cursor--pressed");
    };
    const onMouseUp = () => {
      isPressed = false;
      cursor.classList.remove("cursor--pressed");
    };
    const onMouseLeave = () => {
      visible = false;
      container.style.display = "none";
    };
    const onMouseEnter = () => {
      visible = true;
      container.style.display = "block";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("mouseenter", onMouseEnter, { passive: true });

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[999999]" style={{ display: "none" }}>
      <div
        ref={cursorRef}
        className="cursor-element transform-gpu will-change-transform origin-center"
        style={{ transition: "none" }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          className="drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Precision Arrow Path */}
          <path
            d="M10 0L0 22L10 18L20 22L10 0Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="text-foreground"
          />
          {/* Center Detail */}
          <path d="M10 18V0" stroke="currentColor" strokeWidth="0.5" className="text-background/30" />
        </svg>
      </div>
    </div>
  );
};
