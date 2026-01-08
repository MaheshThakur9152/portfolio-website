import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/magicui/cursor";
import { FloatingElements } from "@/components/magicui/floating-elements";
import dynamic from "next/dynamic";
const LoadingScreen = dynamic(() => import("@/components/magicui/loading-screen").then((m) => m.LoadingScreen), { ssr: false });
import { Beam } from "@/components/magicui/beam";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl lg:max-w-6xl mx-auto py-12 sm:py-24 px-6 relative overflow-x-hidden",
          fontSans.variable
        )}
      >
        <FloatingElements />
        <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-primary/20 blur-[120px] -z-10 pointer-events-none opacity-40 animate-pulse"></div>
        <div className="fixed -bottom-20 -left-20 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] -z-10 pointer-events-none rounded-full"></div>
        <div className="fixed -top-20 -right-20 w-[300px] h-[300px] bg-primary/5 blur-[100px] -z-10 pointer-events-none rounded-full"></div>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <TooltipProvider delayDuration={0}>
            <LoadingScreen />
            {children}
            <Navbar />
            <CustomCursor />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
