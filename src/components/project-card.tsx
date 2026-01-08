"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className
}: Props) {
  return (
    <div className="group h-full transform-gpu transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]">
      <Card
        className={
          "flex flex-col overflow-hidden border border-white/10 bg-background/5 backdrop-blur-md hover:bg-muted/10 transition-colors duration-500 ease-in-out h-full shadow-none relative"
        }
      >
        <Link
          href={href || "#"}
          className={cn("block cursor-none overflow-hidden rounded-t-xl z-10", className)}
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 lg:h-48 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" // needed because random black line at bottom of video
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 lg:h-48 w-full overflow-hidden object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </Link>
        <CardHeader className="px-3 z-10">
          <div className="space-y-1">
            <CardTitle className="mt-1 text-base lg:text-lg group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
            <time className="font-sans text-xs lg:text-sm text-muted-foreground">{dates}</time>
            <div className="hidden font-sans text-xs underline print:visible">
              {link?.replace("https://", "").replace("www.", "").replace("/", "")}
            </div>
            <Markdown className="prose max-w-full text-pretty font-sans text-xs lg:text-sm text-muted-foreground dark:prose-invert leading-relaxed">
              {description}
            </Markdown>
          </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-3 z-10">
          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {tags?.map((tag) => (
                <Badge
                  className="px-1 py-0 text-[10px] lg:text-xs font-medium bg-primary/5 hover:bg-primary/10 border-none"
                  variant="secondary"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="px-3 pb-3 mt-2 z-10">
          {links && links.length > 0 && (
            <div className="flex flex-row flex-wrap items-start gap-1">
              {links?.map((link, idx) => (
                <Link href={link?.href} key={idx} target="_blank">
                  <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px] lg:text-xs transition-all hover:bg-primary hover:text-primary-foreground border-border/10">
                    <React.Fragment>{link.icon} {link.type}</React.Fragment>
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
