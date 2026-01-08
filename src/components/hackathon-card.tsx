import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: Props) {
  return (
    <li className="relative ml-10 py-4 lg:py-8 group transition-all duration-300 hover:bg-muted/5 rounded-xl px-4 -mx-4">
      <div className="absolute -left-16 top-2 lg:top-6 flex items-center justify-center bg-transparent rounded-full shadow-none">
        <Avatar className="border-none size-12 lg:size-14 m-auto bg-transparent">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback className="bg-transparent">{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && (
          <time className="text-xs text-muted-foreground lg:text-sm">{dates}</time>
        )}
        <h2 className="font-semibold leading-none lg:text-xl">{title}</h2>
        {location && (
          <p className="text-sm text-muted-foreground lg:text-base">{location}</p>
        )}
        {description && (
          <span className="prose dark:prose-invert text-sm text-muted-foreground lg:text-base">
            {description}
          </span>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {links?.map((link, idx) => (
            <Link href={link.href} target="_blank" key={idx}>
              <Badge key={idx} title={link.title} className="flex gap-2">
                {link.icon}
                {link.title}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
