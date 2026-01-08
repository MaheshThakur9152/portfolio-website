"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
}
const BlurFadeText = ({
  text,
  className,
  characterDelay = 0.03,
  delay = 0,
  duration = 0.4,
  yOffset = 8,
  animateByCharacter = false,
}: BlurFadeTextProps) => {
  const characters = useMemo(() => Array.from(text), [text]);

  if (animateByCharacter) {
    return (
      <div className="flex">
        {characters.map((char, i) => (
          <span
            key={i}
            className={cn("inline-block blur-fade-text", className)}
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${delay + i * characterDelay}s`,
              transform: `translateY(${yOffset}px)`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex">
      <span
        className={cn("inline-block blur-fade-text", className)}
        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s`, transform: `translateY(${yOffset}px)` }}
      >
        {text}
      </span>
    </div>
  );
};

export default BlurFadeText;
