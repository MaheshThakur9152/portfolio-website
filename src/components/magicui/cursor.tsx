"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

export const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const { theme } = useTheme();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotate = useMotionValue(0);

  // Velocity for dynamic stretching
  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);
  
  const velocity = useTransform([xVelocity, yVelocity], ([x, y]) => 
    Math.sqrt(Math.pow(x as number, 2) + Math.pow(y as number, 2))
  );

  const stretch = useTransform(velocity, [0, 4000], [1, 1.4]);
  const stretchInverse = useTransform(velocity, [0, 4000], [1, 0.8]);

  // Faster, more precise spring config for precision
  const springConfig = { damping: 30, stiffness: 600, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const cursorRotate = useSpring(rotate, { damping: 25, stiffness: 300 });

  useEffect(() => {
    setMounted(true);
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHoveringClickable(!!isClickable);

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      
      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        rotate.set(angle + 90);
      }

      lastX = e.clientX;
      lastY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[999999]" 
      style={{ display: isVisible ? "block" : "none" }}
    >
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          rotate: cursorRotate,
          scaleX: stretch,
          scaleY: stretchInverse,
          // Shift the origin to the tip of the arrow (top middle of the SVG)
          transformOrigin: "center 0%", 
        }}
        animate={{
          scale: isPressed ? 0.8 : isHoveringClickable ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div style={{ transform: "translate(-50%, 0%)" }}>
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
            <path
              d="M10 18V0"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-background/30"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};
