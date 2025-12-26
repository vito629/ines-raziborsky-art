import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PageLoader } from "@/components/page-loader";
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
  description: "Exploring the intersection of light, emotion, and form through contemporary art. View the portfolio and collection of Ines Raziborsky.",
  keywords: ["contemporary art", "artist", "portfolio", "gallery", "Ines Raziborsky"],
  authors: [{ name: "Ines Raziborsky" }],
  openGraph: {
    title: "Ines Raziborsky — Contemporary Artist",
    description: "Exploring the intersection of light, emotion, and form through contemporary art.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ines Raziborsky — Contemporary Artist",
    description: "Exploring the intersection of light, emotion, and form through contemporary art.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hide-scrollbar">
      <body
        className={`${ebGaramond.variable} ${inter.variable} font-serif antialiased`}
      >
        <PageLoader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
