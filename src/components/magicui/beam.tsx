"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const position = useTransform(scrollY, [0, 1], ["-20%", "120%"]);

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
      <motion.div
        style={{
          [vertical ? "y" : "x"]: scrollLinked ? position : undefined,
          [vertical ? "height" : "width"]: "35%",
          [vertical ? "width" : "height"]: "100%",
          filter: "brightness(6) contrast(2) blur(0px)",
        }}
        initial={!scrollLinked ? (vertical ? { y: "-100%" } : { x: "-100%" }) : false}
        animate={!scrollLinked ? (vertical ? { y: "200%" } : { x: "200%" }) : false}
        transition={!scrollLinked ? {
          duration,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
          delay,
        } : undefined}
        className={cn(
          "absolute z-30",
          vertical ? "w-full bg-gradient-to-b" : "h-full bg-gradient-to-r",
          "from-transparent via-white to-transparent"
        )}
      >
        {/* Laser Head (Point of impact) */}
        <div 
          className={cn(
            "absolute shadow-[0_0_50px_10px_rgba(255,255,255,0.9),0_0_100px_20px_rgba(168,85,247,0.8)]",
            vertical ? "bottom-0 left-[-6px] right-[-6px] h-[3px] bg-white rounded-full" : "right-0 top-[-6px] bottom-[-6px] w-[3px] bg-white rounded-full",
          )}
        />
      </motion.div>

      {/* Extreme Purple Glow */}
      <motion.div
        style={{
          [vertical ? "y" : "x"]: scrollLinked ? position : undefined,
          [vertical ? "height" : "width"]: "40%",
          [vertical ? "width" : "height"]: "100%",
          filter: "blur(12px) brightness(2)",
        }}
        initial={!scrollLinked ? (vertical ? { y: "-100%" } : { x: "-100%" }) : false}
        animate={!scrollLinked ? (vertical ? { y: "200%" } : { x: "200%" }) : false}
        transition={!scrollLinked ? {
          duration: duration * 1.1,
          repeat: Infinity,
          ease: "easeOut",
          delay,
        } : undefined}
        className={cn(
          "absolute z-20",
          vertical ? "w-full bg-gradient-to-b" : "h-full bg-gradient-to-r",
          color
        )}
      />

      {/* Screen-Filling Atmosphere Glow */}
      <motion.div
        style={{
          [vertical ? "y" : "x"]: scrollLinked ? position : undefined,
          [vertical ? "height" : "width"]: "60%",
          [vertical ? "width" : "height"]: "100%",
          filter: "blur(40px) saturate(3)",
          opacity: 0.6,
        }}
        initial={!scrollLinked ? (vertical ? { y: "-100%" } : { x: "-100%" }) : false}
        animate={!scrollLinked ? (vertical ? { y: "200%" } : { x: "200%" }) : false}
        transition={!scrollLinked ? {
          duration: duration * 1.5,
          repeat: Infinity,
          ease: "linear",
          delay,
        } : undefined}
        className={cn(
          "absolute z-10",
          vertical ? "w-full bg-gradient-to-b" : "h-full bg-gradient-to-r",
          color
        )}
      />

      {/* Laser Particles (Constant stream) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
             ...(scrollLinked ? { [vertical ? "y" : "x"]: position } : {}),
             width: 2,
             height: 2,
             boxShadow: "0 0 15px 2px #fff",
          }}
          initial={!scrollLinked ? (vertical ? { y: "-100%", x: "50%" } : { x: "-100%", y: "50%" }) : { x: "50%", opacity: 0 }}
          animate={!scrollLinked ? {
            [vertical ? "y" : "x"]: "200%",
            [vertical ? "x" : "y"]: ["40%", "60%", "40%"],
            opacity: [0, 1, 0]
          } : {
            opacity: [0, 1, 0],
            scale: [1, 2, 0],
            [vertical ? "x" : "y"]: `${30 + (i * 15)}%`
          }}
          transition={!scrollLinked ? {
            duration: duration * (0.6 + i * 0.1),
            repeat: Infinity,
            ease: "linear",
            delay: delay + (i * 0.05),
          } : {
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
          className="absolute z-40 bg-white rounded-full"
        />
      ))}
    </div>
  );
};
