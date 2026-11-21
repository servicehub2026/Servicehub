import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/config";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Expert Kitchen Chimney, Stove and Microwave Repair | Doorstep Service`,
    template: "%s",
  },
  description: siteConfig.description,
  keywords: [
    "kitchen chimney repair",
    "chimney cleaning service",
    "gas stove repair",
    "gas hob repair",
    "microwave oven repair",
    "chimney suction problem fix",
    "chimney motor noise repair",
    "auto ignition stove repair",
    "microwave not heating food",
    "doorstep appliance repair",
    "kitchen appliance service center",
    "Service Support Hub",
    "servicesupporthub.in",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: `${siteConfig.name} - Expert Kitchen Chimney, Stove and Microwave Repair`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Expert Kitchen Appliance Repair`,
    description: siteConfig.description,
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SchemaJsonLd />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-white selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
