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
  title: "Beautiful Moments - Portrait Gallery",
  description: "A curated collection of beautiful portrait photography showcasing elegance and grace",
  keywords: "portrait photography, beautiful images, elegant photos, artistic gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Beautiful Moments - Portrait Gallery",
    description:
      "A curated collection of beautiful portrait photography showcasing elegance and grace",
    url: "https://your-domain.com",
    author: {
      "@type": "Person",
      name: "Gallery Creator",
    },
    dateCreated: "2025-06-22",
    keywords:
      "portrait photography, beautiful images, elegant photos, artistic gallery",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
