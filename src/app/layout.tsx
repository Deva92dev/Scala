import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Scala B2B – Premier Wholesale Electronics Platform",
    template: "%s | Scala B2B",
  },
  description:
    "Streamline your corporate procurement with Scala B2B. Access volume pricing, real-time inventory, and automated invoicing for premium electronics.",
  keywords: [
    "B2B Electronics",
    "Corporate Procurement",
    "Wholesale Tech",
    "Bulk Laptop Ordering",
    "Enterprise Supply Chain",
    "Volume Discounts",
    "IT Procurement",
  ],
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Scala B2B – Enterprise Electronics Procurement",
    description:
      "The dedicated B2B marketplace for IT teams and retailers. Bulk ordering, net-terms payments, and fast shipping.",
    url: "/",
    siteName: "Scala B2B",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Scala B2B - Enterprise Procurement Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scala B2B – Wholesale Electronics Platform",
    description:
      "Simplify your supply chain. Order premium electronics in bulk with tiered pricing.",
    images: ["/opengraph-image.png"],
    creator: "@Dev92rishi", // Your handle
  },
  applicationName: "Scala B2B",
  appleWebApp: {
    capable: true,
    title: "Scala B2B",
    statusBarStyle: "default",
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
        <Toaster />
      </body>
    </html>
  );
}
