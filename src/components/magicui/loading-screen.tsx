"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DATA } from "@/data/resume";

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if we've already shown the loader in this session
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    setLoading(true);
    document.body.style.overflow = "hidden";
    
    // Smooth progress counter
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

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background cursor-none perspective-1000"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [transform:rotateX(45deg)_translateZ(-100px)]"></div>
          
          <motion.div 
            initial={{ rotateX: 20, rotateY: -20 }}
            animate={{ rotateX: 0, rotateY: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative flex flex-col items-center transform-3d"
          >
            {/* 3D Circular Progress */}
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
                <motion.circle
                  cx="96"
                  cy="96"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="502.4"
                  initial={{ strokeDashoffset: 502.4 }}
                  animate={{ strokeDashoffset: 502.4 - (502.4 * progress) / 100 }}
                  className="text-primary shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                />
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50"
                >
                  {DATA.initials}
                </motion.span>
                <motion.span 
                  className="text-xs font-mono mt-2 text-foreground/40"
                >
                  {progress}%
                </motion.span>
              </div>

              {/* Ambient Glows */}
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 animate-pulse"></div>
            </div>

            {/* Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-medium">
                Initializing Environment
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.5, 0.2] 
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }}
                    className="size-1 rounded-full bg-foreground/40 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Global decorative elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)] pointer-events-none"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
