"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingElement = ({ delay = 0, duration = 20, size = "size-20", color = "bg-primary/20", initialX = "10%", initialY = "10%" }) => {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, rotate: 0 }}
      animate={{
        x: [initialX, "80%", "40%", initialX],
        y: [initialY, "40%", "80%", initialY],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
      className={`fixed ${size} ${color} blur-[80px] rounded-full -z-20 pointer-events-none opacity-40`}
    />
  );
};

export const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const gridRotateX = useTransform(springY, [-500, 500], [5, -5]);
  const gridRotateY = useTransform(springX, [-500, 500], [-5, 5]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 perspective-1000">
      <motion.div 
        style={{ 
          rotateX: gridRotateX, 
          rotateY: gridRotateY,
          transformStyle: "preserve-3d"
        }}
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]"
      >
        <div className="absolute inset-[-100%] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(45deg)_translateZ(-200px)]" />
      </motion.div>
      
      <FloatingElement delay={0} duration={25} size="size-64" color="bg-primary/5" initialX="10%" initialY="20%" />
      <FloatingElement delay={2} duration={30} size="size-72" color="bg-foreground/5" initialX="70%" initialY="10%" />
      <FloatingElement delay={5} duration={35} size="size-80" color="bg-primary/5" initialX="20%" initialY="70%" />
      <FloatingElement delay={8} duration={20} size="size-48" color="bg-foreground/5" initialX="80%" initialY="60%" />
    </div>
  );
};
