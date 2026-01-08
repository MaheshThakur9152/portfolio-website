"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const transformRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let curRX = 0;
    let curRY = 0;
    let raf = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const update = () => {
      const { x: targetRX, y: targetRY } = transformRef.current;
      curRX = lerp(curRX, targetRX, 0.08);
      curRY = lerp(curRY, targetRY, 0.08);
      el.style.transform = `rotateX(${curRX}deg) rotateY(${curRY}deg)`;
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = event.clientX - rect.left;
    const mouseYRelative = event.clientY - rect.top;

    const x = (mouseXRelative / width - 0.5) * 10;
    const y = (mouseYRelative / height - 0.5) * 10;

    transformRef.current = { x: -y, y: x };
  }

  function handleMouseLeave() {
     transformRef.current = { x: 0, y: 0 };
  }

  return (
    <Link
      href={href || "#"}
      className="block cursor-none perspective-1000"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={wrapperRef} style={{ transformStyle: "preserve-3d" }}>

        <Card className="flex transition-all duration-300 bg-transparent hover:bg-muted/10 backdrop-blur-[2px] group border-none hover:border-none shadow-none relative overflow-hidden">
          <div className="flex-none transition-transform duration-300 group-hover:scale-105 p-4 z-10">
            <Avatar className="border-none size-12 m-auto bg-transparent shadow-none">
              <AvatarImage
                src={logoUrl}
                alt={altText}
                className="object-contain"
              />
              <AvatarFallback className="bg-transparent">{altText[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow items-center flex-col group pr-4 py-4 z-10">
            <CardHeader className="p-0">
              <div className="flex items-center justify-between gap-x-2 text-base">
                <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm lg:text-base group-hover:text-primary transition-colors">
                  {title}
                  {badges && (
                    <span className="inline-flex gap-x-1 ml-2">
                      {badges.map((badge, index) => (
                        <Badge
                          variant="secondary"
                          className="align-middle text-[10px] bg-primary/5 border-none"
                          key={index}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </span>
                  )}
                  <ChevronRightIcon
                    className={cn(
                      "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                      isExpanded ? "rotate-90" : "rotate-0"
                    )}
                  />
                </h3>
                <div className="text-xs sm:text-sm lg:text-base tabular-nums text-muted-foreground text-right font-medium">
                  {period}
                </div>
              </div>
              {subtitle && <div className="font-sans text-xs lg:text-sm text-muted-foreground mt-1">{subtitle}</div>}
            </CardHeader>
            {description && (
              <div className={`mt-2 text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {description}
              </div>
            )}
          </div>
        </Card>
      </div>
    </Link>
  );
};
