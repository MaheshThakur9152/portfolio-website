"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { PropsWithChildren, useRef, useEffect } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border border-border/10 bg-background/5 backdrop-blur-md"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // We'll update child icon sizes directly for performance via rAF
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const icons = Array.from(el.querySelectorAll<HTMLDivElement>('[data-dock-icon]'))
        .map((node) => ({ node, rect: node.getBoundingClientRect() }));

      let raf = 0;
      let pageX = Infinity;

      const onMove = (e: MouseEvent) => {
        pageX = e.pageX;
      };

      const onLeave = () => {
        pageX = Infinity;
      };

      const update = () => {
        icons.forEach(({ node }) => {
          const bounds = node.getBoundingClientRect();
          const center = bounds.left + bounds.width / 2;
          const distanceToMouse = Math.abs(pageX - center);
          const pct = Math.max(0, 1 - distanceToMouse / distance);
          const width = Math.max(40, Math.round(40 + (magnification - 40) * pct));
          node.style.width = `${width}px`;
        });
        raf = requestAnimationFrame(update);
      };

      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseleave', onLeave, { passive: true });
      raf = requestAnimationFrame(update);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      };
    }, [magnification, distance]);

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            magnification,
            distance,
          } as DockIconProps);
        }
        return child;
      });
    };

    return (
      <div ref={(node) => { (ref as any) = node; containerRef.current = node; }} {...props} className={cn(dockVariants({ className }))}>
        {renderChildren()}
      </div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mousex?: any;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // initial size
  useEffect(() => {
    if (ref.current) ref.current.style.width = `40px`;
  }, []);

  return (
    <div
      ref={ref}
      data-dock-icon
      className={cn("flex aspect-square cursor-pointer items-center justify-center rounded-full", className)}
      {...props}
    >
      {children}
    </div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
