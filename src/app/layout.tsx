import type { Metadata } from "next";
import { Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const vazirmatn = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ووهِد فارسی | دیتابیس فارسی World of Warcraft",
  description:
    "بزرگ‌ترین دیتابیس فارسی بازی World of Warcraft — آیتم‌ها، کوئست‌ها، موجودات، مناطق، اسپل‌ها، کلاس‌ها و اخبار، همه به زبان فارسی.",
  keywords: [
    "وورکرافت",
    "وارکرفت",
    "دیتابیس وارکرفت",
    "World of Warcraft",
    "آیتم",
    "کوئست",
    "فارسی",
  ],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ووهِد فارسی | دیتابیس فارسی World of Warcraft",
    description: "همه‌چیز درباره آزراث، به زبان فارسی",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
