import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ines Raziborsky — Contemporary Artist",
  description: "Exploring the intersection of light, emotion, and form through contemporary art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} ${inter.variable} font-serif antialiased`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
