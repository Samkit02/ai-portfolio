import type { Metadata } from "next";
import { Syne, DM_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { CustomCursor } from "@/components/layout/CustomCursor";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-cabinet",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Samkit Shah — Full Stack Engineer & AI Builder",
  description:
    "Portfolio and AI tools marketplace. I build fast, resilient software — from React UIs to AI-powered voice bots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${syne.variable} ${dmMono.variable} ${plusJakarta.variable}`}>
        <body className="antialiased">
          <CustomCursor />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
