import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beautiful Moments 💕 | A Gallery for Someone Special",
  description: "Every photo in this gallery reminds me of your smile. A collection of beautiful portraits that capture grace, elegance, and the kind of beauty that takes my breath away.",
  keywords: "portrait gallery, beautiful photography, elegant photos, artistic portraits, love, beauty",
  authors: [{ name: "Someone who cares" }],
  openGraph: {
    title: "Beautiful Moments 💕 | A Gallery for Someone Special",
    description: "Every photo tells a story, just like every moment with you creates a memory worth treasuring",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beautiful Portrait Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beautiful Moments 💕 | A Gallery for Someone Special",
    description: "Every photo tells a story, just like every moment with you creates a memory worth treasuring",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
